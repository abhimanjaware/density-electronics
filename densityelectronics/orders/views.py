import json
import base64
import urllib.error
import urllib.request
import os
import random
import re
from decimal import Decimal, InvalidOperation

import razorpay
import resend

from django.conf import settings
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password, check_password
from django.http import JsonResponse
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import (
    getSampleStyleSheet,
    ParagraphStyle,
)
from reportlab.lib.units import mm
from reportlab.lib.utils import ImageReader
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    Image,
)

from .models import Order, OrderItem, EmailOTP, Customer


# =========================================================
# DENSITY ELECTRONICS THEME
# =========================================================

BRAND_BLUE = "#5474D8"
BRAND_BLUE_DARK = "#3F5FC4"

TEXT_DARK = "#303030"
TEXT_GREY = "#666666"

LINE_GREY = "#BFC3CC"
LIGHT_BLUE = "#F3F6FF"
WHITE = "#FFFFFF"


# =========================================================
# RAZORPAY CLIENT
# =========================================================

client = razorpay.Client(
    auth=(
        settings.RAZORPAY_KEY_ID,
        settings.RAZORPAY_KEY_SECRET,
    )
)


# =========================================================
# HELPER - DECIMAL
# =========================================================

def decimal_amount(value):
    try:
        return Decimal(str(value or 0))
    except (
        InvalidOperation,
        ValueError,
        TypeError,
    ):
        return Decimal("0.00")


# =========================================================
# HELPER - DENSITY LOGO
# =========================================================

def get_density_logo_path():
    """
    Uses the existing Density Electronics logo:

    D:\\densityelectronics\\density-electronics-main
    \\src\\assets\\headerlogo33.png
    """

    possible_paths = [

        getattr(
            settings,
            "DENSITY_LOGO_PATH",
            "",
        ),

        os.path.join(
            settings.BASE_DIR.parent,
            "density-electronics-main",
            "src",
            "assets",
            "headerlogo33.png",
        ),

        os.path.join(
            settings.BASE_DIR,
            "density-electronics-main",
            "src",
            "assets",
            "headerlogo33.png",
        ),

        os.path.join(
            settings.BASE_DIR,
            "assets",
            "headerlogo33.png",
        ),
    ]

    for path in possible_paths:

        if path and os.path.exists(path):
            return os.path.abspath(path)

    return None


# =========================================================
# HELPER - SUPPORT EMAIL
# =========================================================

def get_support_email():

    return (
        getattr(
            settings,
            "DENSITY_SUPPORT_EMAIL",
            "",
        )
        or getattr(
            settings,
            "DEFAULT_FROM_EMAIL",
            "",
        )
    )


# =========================================================
# HELPER - RESEND EMAIL
# =========================================================

def send_resend_email(to_email, subject, text, html, attachments=None):
    """Send an email through Resend without using Django SMTP."""
    api_key = os.getenv("RESEND_API_KEY")
    if not api_key:
        raise RuntimeError("RESEND_API_KEY is not configured")

    from_email = os.getenv("RESEND_FROM_EMAIL", "").strip()
    if not from_email:
        raise RuntimeError("RESEND_FROM_EMAIL is not configured")

    payload = {
        "from": from_email,
        "to": [to_email],
        "subject": subject,
        "text": text,
        "html": html,
    }

    if attachments:
        payload["attachments"] = attachments

    request = urllib.request.Request(
        "https://api.resend.com/emails",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(request, timeout=15) as response:
            response_body = response.read().decode("utf-8")
    except urllib.error.HTTPError as error:
        error_body = error.read().decode("utf-8", errors="replace")
        raise RuntimeError(
            f"Resend HTTP {error.code}: {error_body}"
        ) from error
    except urllib.error.URLError as error:
        raise RuntimeError(
            f"Resend connection error: {error.reason}"
        ) from error

    try:
        return json.loads(response_body or "{}")
    except json.JSONDecodeError:
        return {"raw_response": response_body}


# =========================================================
# PDF HEADER / FOOTER
# =========================================================

def pdf_header_footer(canvas, doc):

    canvas.saveState()

    width, height = A4

    # Top blue line
    canvas.setStrokeColor(
        colors.HexColor(BRAND_BLUE)
    )

    canvas.setLineWidth(2)

    canvas.line(
        18 * mm,
        height - 13 * mm,
        width - 18 * mm,
        height - 13 * mm,
    )

    # Footer line
    canvas.setStrokeColor(
        colors.HexColor(LINE_GREY)
    )

    canvas.setLineWidth(0.6)

    canvas.line(
        18 * mm,
        15 * mm,
        width - 18 * mm,
        15 * mm,
    )

    canvas.setFont(
        "Helvetica",
        7.5,
    )

    canvas.setFillColor(
        colors.HexColor(TEXT_GREY)
    )

    canvas.drawString(
        18 * mm,
        9 * mm,
        "Density Electronics",
    )

    canvas.drawRightString(
        width - 18 * mm,
        9 * mm,
        f"Page {doc.page}",
    )

    canvas.restoreState()


# =========================================================
# GENERATE INVOICE PDF
# =========================================================

def generate_invoice_pdf(order):

    file_path = os.path.abspath(
        f"invoice_{order.order_reference}.pdf"
    )

    doc = SimpleDocTemplate(

        file_path,

        pagesize=A4,

        rightMargin=18 * mm,
        leftMargin=18 * mm,

        topMargin=20 * mm,
        bottomMargin=22 * mm,

        title=(
            "Density Electronics Invoice "
            f"{order.order_reference}"
        ),

        author="Density Electronics",
    )

    styles = getSampleStyleSheet()

    body_style = ParagraphStyle(
        "InvoiceBody",

        parent=styles["Normal"],

        fontName="Helvetica",

        fontSize=9,

        leading=13,

        textColor=colors.HexColor(
            TEXT_DARK
        ),
    )

    small_style = ParagraphStyle(
        "InvoiceSmall",

        parent=body_style,

        fontSize=8,

        leading=11,

        textColor=colors.HexColor(
            TEXT_GREY
        ),
    )

    label_style = ParagraphStyle(
        "InvoiceLabel",

        parent=body_style,

        fontName="Helvetica-Bold",

        fontSize=8.5,

        leading=11,

        textColor=colors.HexColor(
            TEXT_DARK
        ),
    )

    blue_label_style = ParagraphStyle(
        "InvoiceBlueLabel",

        parent=body_style,

        fontName="Helvetica-Bold",

        fontSize=8.5,

        leading=11,

        textColor=colors.HexColor(
            BRAND_BLUE
        ),
    )

    title_style = ParagraphStyle(
        "InvoiceTitle",

        parent=styles["Heading1"],

        fontName="Helvetica-Bold",

        fontSize=28,

        leading=31,

        textColor=colors.HexColor(
            TEXT_DARK
        ),

        spaceAfter=12,
    )

    section_style = ParagraphStyle(
        "InvoiceSection",

        parent=styles["Normal"],

        fontName="Helvetica-Bold",

        fontSize=10,

        leading=12,

        textColor=colors.HexColor(
            TEXT_DARK
        ),

        spaceBefore=5,

        spaceAfter=7,
    )

    thanks_style = ParagraphStyle(
        "InvoiceThanks",

        parent=styles["Normal"],

        fontName="Helvetica-Bold",

        fontSize=20,

        leading=24,

        alignment=TA_CENTER,

        textColor=colors.HexColor(
            BRAND_BLUE
        ),

        spaceBefore=10,
    )

    story = []


    # =====================================================
    # LOGO HEADER
    # =====================================================

    logo_path = get_density_logo_path()

    if logo_path:

        try:

            logo_reader = ImageReader(
                logo_path
            )

            logo_width, logo_height = (
                logo_reader.getSize()
            )

            target_width = 55 * mm

            target_height = (
                target_width
                * logo_height
                / logo_width
            )

            logo = Image(
                logo_path,
                width=target_width,
                height=target_height,
            )

        except Exception:

            logo = Paragraph(
                "<b>DENSITY ELECTRONICS</b>",
                title_style,
            )

    else:

        logo = Paragraph(
            "<b>DENSITY ELECTRONICS</b>",
            title_style,
        )


    support_email = get_support_email()


    contact_text = (
        "<b>Density Electronics</b><br/>"
        "Electronics & Robotics Store<br/>"
        "Phone: +91 9890400165<br/>"
        f"Email: {support_email or '-'}"
    )


    header_table = Table(

        [[
            logo,

            Paragraph(
                contact_text,

                ParagraphStyle(
                    "HeaderContact",

                    parent=small_style,

                    alignment=2,

                    leading=13,
                ),
            ),
        ]],

        colWidths=[
            100 * mm,
            70 * mm,
        ],
    )


    header_table.setStyle(
        TableStyle(
            [
                (
                    "VALIGN",
                    (0, 0),
                    (-1, -1),
                    "TOP",
                ),

                (
                    "ALIGN",
                    (1, 0),
                    (1, 0),
                    "RIGHT",
                ),

                (
                    "LEFTPADDING",
                    (0, 0),
                    (-1, -1),
                    0,
                ),

                (
                    "RIGHTPADDING",
                    (0, 0),
                    (-1, -1),
                    0,
                ),

                (
                    "TOPPADDING",
                    (0, 0),
                    (-1, -1),
                    0,
                ),

                (
                    "BOTTOMPADDING",
                    (0, 0),
                    (-1, -1),
                    0,
                ),
            ]
        )
    )


    story.append(header_table)

    story.append(
        Spacer(1, 18)
    )


    # =====================================================
    # INVOICE TITLE
    # =====================================================

    story.append(
        Paragraph(
            "INVOICE",
            title_style,
        )
    )


    invoice_date = (

        order.created_at.strftime(
            "%Y-%m-%d"
        )

        if order.created_at

        else "-"
    )


    left_meta = [

        [
            Paragraph(
                "INVOICE #",
                label_style,
            ),

            str(
                order.order_reference
                or "-"
            ),
        ],

        [
            Paragraph(
                "DATE",
                label_style,
            ),

            invoice_date,
        ],
    ]


    right_meta = [

        [
            Paragraph(
                "BILLED TO:",
                label_style,
            ),

            "",
        ],

        [
            Paragraph(
                str(
                    order.customer_name
                    or "-"
                ),

                body_style,
            ),

            "",
        ],

        [
            Paragraph(
                str(
                    order.customer_email
                    or "-"
                ),

                small_style,
            ),

            "",
        ],

        [
            Paragraph(
                str(
                    order.customer_mobile
                    or "-"
                ),

                small_style,
            ),

            "",
        ],
    ]


    left_table = Table(
        left_meta,
        colWidths=[
            30 * mm,
            65 * mm,
        ],
    )


    right_table = Table(
        right_meta,
        colWidths=[
            75 * mm,
            20 * mm,
        ],
    )


    left_table.setStyle(
        TableStyle(
            [
                (
                    "LEFTPADDING",
                    (0, 0),
                    (-1, -1),
                    0,
                ),

                (
                    "RIGHTPADDING",
                    (0, 0),
                    (-1, -1),
                    0,
                ),

                (
                    "TOPPADDING",
                    (0, 0),
                    (-1, -1),
                    2,
                ),

                (
                    "BOTTOMPADDING",
                    (0, 0),
                    (-1, -1),
                    2,
                ),

                (
                    "VALIGN",
                    (0, 0),
                    (-1, -1),
                    "TOP",
                ),
            ]
        )
    )


    right_table.setStyle(
        TableStyle(
            [
                (
                    "LEFTPADDING",
                    (0, 0),
                    (-1, -1),
                    0,
                ),

                (
                    "RIGHTPADDING",
                    (0, 0),
                    (-1, -1),
                    0,
                ),

                (
                    "TOPPADDING",
                    (0, 0),
                    (-1, -1),
                    2,
                ),

                (
                    "BOTTOMPADDING",
                    (0, 0),
                    (-1, -1),
                    2,
                ),

                (
                    "VALIGN",
                    (0, 0),
                    (-1, -1),
                    "TOP",
                ),
            ]
        )
    )


    meta_table = Table(

        [[
            left_table,
            right_table,
        ]],

        colWidths=[
            95 * mm,
            75 * mm,
        ],
    )


    meta_table.setStyle(
        TableStyle(
            [
                (
                    "VALIGN",
                    (0, 0),
                    (-1, -1),
                    "TOP",
                ),

                (
                    "LEFTPADDING",
                    (0, 0),
                    (-1, -1),
                    0,
                ),

                (
                    "RIGHTPADDING",
                    (0, 0),
                    (-1, -1),
                    0,
                ),

                (
                    "TOPPADDING",
                    (0, 0),
                    (-1, -1),
                    0,
                ),

                (
                    "BOTTOMPADDING",
                    (0, 0),
                    (-1, -1),
                    0,
                ),
            ]
        )
    )


    story.append(meta_table)

    story.append(
        Spacer(1, 20)
    )


    # =====================================================
    # DELIVERY ADDRESS
    # =====================================================

    address_text = str(
        order.delivery_address
        or "-"
    ).replace(
        "\n",
        "<br/>",
    )


    address_table = Table(

        [
            [
                Paragraph(
                    "BILLING / DELIVERY ADDRESS",
                    section_style,
                )
            ],

            [
                Paragraph(
                    address_text,
                    body_style,
                )
            ],
        ],

        colWidths=[
            170 * mm
        ],

        style=[
            (
                "LINEBELOW",
                (0, 0),
                (-1, 0),
                0.6,
                colors.HexColor(
                    LINE_GREY
                ),
            ),

            (
                "LEFTPADDING",
                (0, 0),
                (-1, -1),
                0,
            ),

            (
                "RIGHTPADDING",
                (0, 0),
                (-1, -1),
                0,
            ),

            (
                "TOPPADDING",
                (0, 0),
                (-1, -1),
                5,
            ),

            (
                "BOTTOMPADDING",
                (0, 0),
                (-1, -1),
                5,
            ),
        ],
    )


    story.append(address_table)

    story.append(
        Spacer(1, 14)
    )


    # =====================================================
    # PRODUCTS
    # =====================================================

    item_rows = [

        [
            "ITEM DESCRIPTION",
            "UNIT PRICE",
            "QTY",
            "TOTAL",
        ]

    ]


    subtotal = Decimal("0.00")


    for item in order.items.all():

        line_total = (
            Decimal(
                str(item.price)
            )
            * int(item.quantity)
        )

        subtotal += line_total


        item_rows.append(

            [
                Paragraph(
                    str(
                        item.product_name
                        or "-"
                    ),
                    body_style,
                ),

                f"₹{float(item.price):.2f}",

                str(
                    item.quantity
                ),

                f"₹{float(line_total):.2f}",
            ]
        )


    if len(item_rows) == 1:

        item_rows.append(
            [
                "No items",
                "-",
                "-",
                "-",
            ]
        )


    item_table = Table(

        item_rows,

        colWidths=[
            83 * mm,
            30 * mm,
            22 * mm,
            35 * mm,
        ],

        repeatRows=1,
    )


    item_table.setStyle(

        TableStyle(

            [

                (
                    "LINEABOVE",
                    (0, 0),
                    (-1, 0),
                    0.8,
                    colors.HexColor(
                        TEXT_DARK
                    ),
                ),

                (
                    "LINEBELOW",
                    (0, 0),
                    (-1, 0),
                    0.8,
                    colors.HexColor(
                        TEXT_DARK
                    ),
                ),

                (
                    "LINEBELOW",
                    (0, -1),
                    (-1, -1),
                    0.8,
                    colors.HexColor(
                        LINE_GREY
                    ),
                ),

                (
                    "TEXTCOLOR",
                    (0, 0),
                    (-1, 0),
                    colors.HexColor(
                        BRAND_BLUE
                    ),
                ),

                (
                    "FONTNAME",
                    (0, 0),
                    (-1, 0),
                    "Helvetica-Bold",
                ),

                (
                    "FONTSIZE",
                    (0, 0),
                    (-1, -1),
                    8.5,
                ),

                (
                    "ALIGN",
                    (1, 1),
                    (-1, -1),
                    "RIGHT",
                ),

                (
                    "VALIGN",
                    (0, 0),
                    (-1, -1),
                    "MIDDLE",
                ),

                (
                    "LEFTPADDING",
                    (0, 0),
                    (-1, -1),
                    5,
                ),

                (
                    "RIGHTPADDING",
                    (0, 0),
                    (-1, -1),
                    5,
                ),

                (
                    "TOPPADDING",
                    (0, 0),
                    (-1, -1),
                    8,
                ),

                (
                    "BOTTOMPADDING",
                    (0, 0),
                    (-1, -1),
                    8,
                ),
            ]
        )
    )


    story.append(item_table)

    story.append(
        Spacer(1, 10)
    )


    # =====================================================
    # TOTAL
    # =====================================================

    grand_total = Decimal(
        str(
            order.total_amount
            or 0
        )
    )


    totals_rows = [

        [
            Paragraph(
                "SUBTOTAL",
                blue_label_style,
            ),

            f"₹{float(subtotal):.2f}",
        ],

        [
            Paragraph(
                "TOTAL AMOUNT",
                label_style,
            ),

            Paragraph(
                (
                    f"<b>₹"
                    f"{float(grand_total):.2f}"
                    f"</b>"
                ),

                body_style,
            ),
        ],
    ]


    totals_table = Table(

        totals_rows,

        colWidths=[
            130 * mm,
            40 * mm,
        ],
    )


    totals_table.setStyle(

        TableStyle(

            [

                (
                    "LINEABOVE",
                    (0, 0),
                    (-1, 0),
                    0.6,
                    colors.HexColor(
                        LINE_GREY
                    ),
                ),

                (
                    "LINEBELOW",
                    (0, -1),
                    (-1, -1),
                    0.8,
                    colors.HexColor(
                        TEXT_DARK
                    ),
                ),

                (
                    "ALIGN",
                    (1, 0),
                    (1, -1),
                    "RIGHT",
                ),

                (
                    "LEFTPADDING",
                    (0, 0),
                    (-1, -1),
                    5,
                ),

                (
                    "RIGHTPADDING",
                    (0, 0),
                    (-1, -1),
                    5,
                ),

                (
                    "TOPPADDING",
                    (0, 0),
                    (-1, -1),
                    7,
                ),

                (
                    "BOTTOMPADDING",
                    (0, 0),
                    (-1, -1),
                    7,
                ),
            ]
        )
    )


    story.append(totals_table)

    story.append(
        Spacer(1, 18)
    )


    # =====================================================
    # PAYMENT INFO
    # =====================================================

    story.append(

        Paragraph(
            "PAYMENT INFO",
            section_style,
        )

    )


    payment_table = Table(

        [
            [
                Paragraph(
                    "<b>Payment Method</b>",
                    body_style,
                ),

                "Razorpay",
            ],

            [
                Paragraph(
                    "<b>Payment ID</b>",
                    body_style,
                ),

                str(
                    order.razorpay_payment_id
                    or "-"
                ),
            ],
        ],

        colWidths=[
            42 * mm,
            128 * mm,
        ],
    )


    payment_table.setStyle(

        TableStyle(

            [

                (
                    "LINEABOVE",
                    (0, 0),
                    (-1, 0),
                    0.6,
                    colors.HexColor(
                        LINE_GREY
                    ),
                ),

                (
                    "LINEBELOW",
                    (0, -1),
                    (-1, -1),
                    0.6,
                    colors.HexColor(
                        LINE_GREY
                    ),
                ),

                (
                    "LEFTPADDING",
                    (0, 0),
                    (-1, -1),
                    0,
                ),

                (
                    "RIGHTPADDING",
                    (0, 0),
                    (-1, -1),
                    0,
                ),

                (
                    "TOPPADDING",
                    (0, 0),
                    (-1, -1),
                    7,
                ),

                (
                    "BOTTOMPADDING",
                    (0, 0),
                    (-1, -1),
                    7,
                ),
            ]
        )
    )


    story.append(payment_table)

    story.append(
        Spacer(1, 20)
    )


    # =====================================================
    # THANK YOU
    # =====================================================

    thank_table = Table(

        [
            [
                Paragraph(
                    "THANK YOU!",
                    thanks_style,
                )
            ]
        ],

        colWidths=[
            170 * mm
        ],

        style=[

            (
                "LINEABOVE",
                (0, 0),
                (-1, 0),
                0.7,
                colors.HexColor(
                    LINE_GREY
                ),
            ),

            (
                "LEFTPADDING",
                (0, 0),
                (-1, -1),
                0,
            ),

            (
                "RIGHTPADDING",
                (0, 0),
                (-1, -1),
                0,
            ),

            (
                "TOPPADDING",
                (0, 0),
                (-1, -1),
                14,
            ),

            (
                "BOTTOMPADDING",
                (0, 0),
                (-1, -1),
                0,
            ),
        ],
    )


    story.append(thank_table)

    story.append(
        Spacer(1, 5)
    )


    story.append(

        Paragraph(

            "Thank you for shopping with "
            "Density Electronics.",

            ParagraphStyle(

                "ThanksSub",

                parent=small_style,

                alignment=TA_CENTER,

                fontSize=8.5,
            ),
        )
    )


    doc.build(

        story,

        onFirstPage=pdf_header_footer,

        onLaterPages=pdf_header_footer,
    )


    return file_path


# =========================================================
# CREATE RAZORPAY ORDER
# =========================================================

@csrf_exempt
def create_razorpay_order(request):

    if request.method != "POST":

        return JsonResponse(
            {
                "success": False,
                "message": "Only POST method allowed",
            },
            status=405,
        )

    try:

        data = json.loads(
            request.body or "{}"
        )

        amount = data.get("amount")

        if amount is None:

            return JsonResponse(
                {
                    "success": False,
                    "message": "Amount is required",
                },
                status=400,
            )


        amount_decimal = decimal_amount(
            amount
        )


        if amount_decimal <= 0:

            return JsonResponse(
                {
                    "success": False,
                    "message": "Invalid amount",
                },
                status=400,
            )


        # Payment.jsx sends INR. Convert to paise exactly once here.
        amount_in_paise = int(
            (amount_decimal * 100).quantize(Decimal("1"))
        )


        razorpay_order = client.order.create(

            {
                "amount": amount_in_paise,
                "currency": "INR",
                "payment_capture": 1,
            }
        )


        print(
            "RAZORPAY ORDER CREATED:",
            razorpay_order["id"],
        )


        return JsonResponse(

            {
                "success": True,

                "order_id":
                    razorpay_order["id"],

                "amount":
                    amount_in_paise,

                "currency":
                    "INR",

                "key_id":
                    settings.RAZORPAY_KEY_ID,
            }
        )


    except Exception as e:

        print(
            "CREATE RAZORPAY ORDER ERROR:",
            repr(e),
        )

        return JsonResponse(

            {
                "success": False,
                "message":
                    "Unable to create Razorpay order",
            },

            status=500,
        )


# =========================================================
# VERIFY RAZORPAY PAYMENT
# =========================================================

@csrf_exempt
def verify_razorpay_payment(request):

    if request.method != "POST":

        return JsonResponse(
            {
                "success": False,
                "message":
                    "Only POST method allowed",
            },
            status=405,
        )


    invoice_file = None


    try:

        data = json.loads(
            request.body or "{}"
        )


        # -------------------------------------------------
        # PAYMENT
        # -------------------------------------------------

        razorpay_order_id = str(
            data.get(
                "razorpay_order_id"
            )
            or ""
        ).strip()


        razorpay_payment_id = str(
            data.get(
                "razorpay_payment_id"
            )
            or ""
        ).strip()


        razorpay_signature = str(
            data.get(
                "razorpay_signature"
            )
            or ""
        ).strip()


        # -------------------------------------------------
        # CUSTOMER
        # -------------------------------------------------

        customer_name = str(
            data.get(
                "customer_name"
            )
            or ""
        ).strip()


        customer_email = str(
            data.get(
                "customer_email"
            )
            or ""
        ).strip().lower()


        customer_mobile = str(
            data.get(
                "customer_mobile"
            )
            or ""
        ).strip()


        delivery_address = str(
            data.get(
                "delivery_address"
            )
            or ""
        ).strip()


        # -------------------------------------------------
        # ORDER
        # -------------------------------------------------

        total_amount = decimal_amount(
            data.get(
                "total_amount"
            )
        )


        items = data.get(
            "items"
        ) or []


        # -------------------------------------------------
        # VALIDATION
        # -------------------------------------------------

        if not razorpay_order_id:

            return JsonResponse(
                {
                    "success": False,
                    "message":
                        "Razorpay order ID is missing",
                },
                status=400,
            )


        if not razorpay_payment_id:

            return JsonResponse(
                {
                    "success": False,
                    "message":
                        "Razorpay payment ID is missing",
                },
                status=400,
            )


        if not razorpay_signature:

            return JsonResponse(
                {
                    "success": False,
                    "message":
                        "Razorpay signature is missing",
                },
                status=400,
            )


        if not customer_name:

            return JsonResponse(
                {
                    "success": False,
                    "message":
                        "Customer name is required",
                },
                status=400,
            )


        if not customer_email:

            return JsonResponse(
                {
                    "success": False,
                    "message":
                        "Customer email is required",
                },
                status=400,
            )


        if total_amount <= 0:

            return JsonResponse(
                {
                    "success": False,
                    "message":
                        "Invalid total amount",
                },
                status=400,
            )


        if (
            not isinstance(items, list)
            or len(items) == 0
        ):

            return JsonResponse(
                {
                    "success": False,
                    "message":
                        "Order items are required",
                },
                status=400,
            )


        # -------------------------------------------------
        # DUPLICATE PAYMENT
        # -------------------------------------------------

        existing_order = (

            Order.objects

            .filter(
                razorpay_payment_id=
                    razorpay_payment_id
            )

            .first()
        )


        if existing_order:

            return JsonResponse(

                {
                    "success": True,

                    "message":
                        "Payment already processed",

                    "order_reference":
                        existing_order.order_reference,

                    "payment_id":
                        existing_order.razorpay_payment_id,

                    "already_processed":
                        True,
                }
            )


        # -------------------------------------------------
        # VERIFY RAZORPAY SIGNATURE
        # -------------------------------------------------

        client.utility.verify_payment_signature(

            {
                "razorpay_order_id":
                    razorpay_order_id,

                "razorpay_payment_id":
                    razorpay_payment_id,

                "razorpay_signature":
                    razorpay_signature,
            }
        )


        print(
            "RAZORPAY PAYMENT VERIFIED:",
            razorpay_payment_id,
        )


        # -------------------------------------------------
        # ORDER REFERENCE
        # -------------------------------------------------

        order_reference = (

            "DEN-"

            + timezone.now().strftime(
                "%Y%m%d%H%M%S"
            )

            + "-"

            + razorpay_payment_id[-6:]
        )


        # -------------------------------------------------
        # SAVE ORDER
        # -------------------------------------------------

        order = Order.objects.create(

            order_reference=
                order_reference,

            razorpay_order_id=
                razorpay_order_id,

            razorpay_payment_id=
                razorpay_payment_id,

            customer_name=
                customer_name,

            customer_email=
                customer_email,

            customer_mobile=
                customer_mobile,

            delivery_address=
                delivery_address,

            total_amount=
                total_amount,

            status="Paid",
        )


        # -------------------------------------------------
        # SAVE ITEMS
        # -------------------------------------------------

        for item in items:

            product_name = str(

                item.get(
                    "product_name",

                    item.get(
                        "name",
                        "Product",
                    ),
                )

            ).strip()


            product_id = str(

                item.get(
                    "product_id",

                    item.get(
                        "id",
                        "",
                    ),
                )

            ).strip()


            quantity = int(

                item.get(
                    "quantity",
                    1,
                )
                or 1
            )


            price = decimal_amount(

                item.get(
                    "price",
                    0,
                )
            )


            if quantity < 1:
                quantity = 1


            OrderItem.objects.create(

                order=order,

                product_name=
                    product_name,

                product_id=
                    product_id,

                quantity=
                    quantity,

                price=
                    price,
            )


        print(
            "ORDER SAVED:",
            order_reference,
        )


        # -------------------------------------------------
        # GENERATE PDF
        # -------------------------------------------------

        invoice_file = (
            generate_invoice_pdf(order)
        )


        print(
            "INVOICE GENERATED:",
            invoice_file,
        )


        support_email = (
            get_support_email()
        )


        logo_path = (
            get_density_logo_path()
        )


        # =================================================
        # CUSTOMER EMAIL
        # =================================================

        customer_email_sent = False
        customer_email_error = ""


        email_subject = (
            "Density Electronics - "
            f"Order Confirmation "
            f"{order_reference}"
        )


        email_text = f"""
Hello {customer_name},

Thank you for shopping with Density Electronics.

Your payment has been successfully received.

Order Reference: {order_reference}

Order Date:
{order.created_at.strftime("%d %b %Y")}

Payment ID:
{razorpay_payment_id}

Total Amount:
₹{float(total_amount):.2f}

Your invoice PDF is attached.

Regards,
Density Electronics

Support:
{support_email or "-"}
"""


        # -------------------------------------------------
        # EMAIL LOGO
        # -------------------------------------------------

        if logo_path:

            email_logo_html = """
<img
src="cid:density_logo"
alt="Density Electronics"
style="
display:block;
max-width:240px;
max-height:75px;
width:auto;
height:auto;
">
"""

        else:

            email_logo_html = """
<div style="
font-size:24px;
font-weight:800;
letter-spacing:1px;
color:#303030;
">
Density Electronics
</div>

<div style="
font-size:12px;
letter-spacing:3px;
color:#666666;
margin-top:3px;
">
ELECTRONICS & ROBOTICS
</div>
"""


        # -------------------------------------------------
        # ITEMS HTML
        # -------------------------------------------------

        items_html = ""


        for item in order.items.all():

            line_total = (

                Decimal(
                    str(item.price)
                )

                * int(
                    item.quantity
                )
            )


            items_html += f"""

<tr>

<td style="
padding:13px 10px;
border-bottom:1px solid #e1e4ea;
color:#303030;
font-size:13px;
">
{item.product_name}
</td>


<td style="
padding:13px 10px;
border-bottom:1px solid #e1e4ea;
text-align:center;
color:#303030;
font-size:13px;
">
{item.quantity}
</td>


<td style="
padding:13px 10px;
border-bottom:1px solid #e1e4ea;
text-align:right;
color:#303030;
font-size:13px;
">
₹{float(line_total):.2f}
</td>

</tr>

"""


        if not items_html:

            items_html = """

<tr>

<td
colspan="3"
style="
padding:15px;
color:#666;
">

No item information available.

</td>

</tr>

"""


        subtotal_value = sum(

            (
                Decimal(
                    str(item.price)
                )
                *
                int(item.quantity)
            )

            for item in order.items.all()
        )


        # -------------------------------------------------
        # CUSTOMER EMAIL HTML
        # -------------------------------------------------

        customer_email_html = f"""

<!DOCTYPE html>

<html>

<body style="
margin:0;
padding:0;
background:#ffffff;
font-family:Arial,Helvetica,sans-serif;
color:#303030;
">

<div style="
max-width:720px;
margin:0 auto;
padding:30px 22px 40px;
background:#ffffff;
">


<!-- HEADER -->

<table
width="100%"
cellpadding="0"
cellspacing="0"
style="border-collapse:collapse;"
>

<tr>

<td
style="vertical-align:top;"
>

{email_logo_html}

</td>


<td style="
vertical-align:top;
text-align:right;
font-size:12px;
line-height:19px;
color:#666666;
">

<strong
style="color:#303030;"
>
Density Electronics
</strong>

<br>

Electronics &amp; Robotics Store

<br>

Phone: +91 9890400165

<br>

Email:
{support_email or "-"}

</td>

</tr>

</table>


<!-- BLUE LINE -->

<div style="
height:3px;
background:#5474D8;
margin:24px 0 30px;
">
</div>


<!-- THANK YOU -->

<h1 style="
font-size:34px;
letter-spacing:2px;
margin:0 0 10px;
color:#303030;
">

THANK YOU

</h1>


<p style="
font-size:14px;
line-height:24px;
margin:0 0 25px;
color:#666666;
">

Hello

<strong style="color:#303030;">
{customer_name}
</strong>,

your order has been received and
your payment was successfully completed.

</p>


<!-- ORDER META -->

<table
width="100%"
cellpadding="0"
cellspacing="0"
style="
border-collapse:collapse;
margin-bottom:25px;
"
>

<tr>

<td style="
width:50%;
padding:12px 0;
border-bottom:1px solid #d7d9df;
">

<strong>
Order number
</strong>

<br>

<span style="color:#666666;">
{order_reference}
</span>

</td>


<td style="
width:50%;
padding:12px 0;
border-bottom:1px solid #d7d9df;
text-align:right;
">

<strong>
Order date
</strong>

<br>

<span style="color:#666666;">
{order.created_at.strftime("%d %b %Y")}
</span>

</td>

</tr>

</table>


<!-- ORDER DETAILS -->

<h2 style="
font-size:16px;
letter-spacing:1px;
margin:0 0 12px;
color:#303030;
">

ORDER DETAILS

</h2>


<table
width="100%"
cellpadding="0"
cellspacing="0"
style="border-collapse:collapse;"
>

<tr>

<th style="
padding:12px 10px;
border-top:1px solid #303030;
border-bottom:1px solid #303030;
text-align:left;
font-size:12px;
color:#5474D8;
letter-spacing:1px;
">

PRODUCT

</th>


<th style="
padding:12px 10px;
border-top:1px solid #303030;
border-bottom:1px solid #303030;
text-align:center;
font-size:12px;
color:#5474D8;
letter-spacing:1px;
">

QTY

</th>


<th style="
padding:12px 10px;
border-top:1px solid #303030;
border-bottom:1px solid #303030;
text-align:right;
font-size:12px;
color:#5474D8;
letter-spacing:1px;
">

PRICE

</th>

</tr>


{items_html}


</table>


<!-- TOTALS -->

<table
width="100%"
cellpadding="0"
cellspacing="0"
style="
border-collapse:collapse;
margin-top:18px;
"
>

<tr>

<td style="
padding:8px 0;
text-align:right;
font-size:14px;
color:#666666;
">

Subtotal

</td>


<td style="
padding:8px 0;
width:120px;
text-align:right;
font-size:14px;
color:#303030;
">

₹{float(subtotal_value):.2f}

</td>

</tr>


<tr>

<td style="
padding:12px 0;
text-align:right;
font-size:16px;
font-weight:bold;
color:#303030;
border-top:1px solid #303030;
">

TOTAL

</td>


<td style="
padding:12px 0;
text-align:right;
font-size:18px;
font-weight:bold;
color:#5474D8;
border-top:1px solid #303030;
">

₹{float(total_amount):.2f}

</td>

</tr>

</table>


<!-- PAYMENT -->

<div style="
margin-top:28px;
padding:18px 0;
border-top:1px solid #d7d9df;
border-bottom:1px solid #d7d9df;
">


<h3 style="
margin:0 0 12px;
font-size:14px;
letter-spacing:1px;
">

PAYMENT INFO

</h3>


<p style="
margin:6px 0;
font-size:13px;
color:#666666;
">

<strong style="color:#303030;">
Payment Method:
</strong>

Razorpay

</p>


<p style="
margin:6px 0;
font-size:13px;
color:#666666;
word-break:break-all;
">

<strong style="color:#303030;">
Payment ID:
</strong>

{razorpay_payment_id}

</p>


</div>


<!-- CUSTOMER DETAILS -->

<div style="
margin-top:24px;
">


<h3 style="
margin:0 0 12px;
font-size:14px;
letter-spacing:1px;
">

BILLING / DELIVERY DETAILS

</h3>


<p style="
margin:5px 0;
font-size:13px;
line-height:21px;
color:#666666;
">

<strong style="color:#303030;">
Name:
</strong>

{customer_name}

</p>


<p style="
margin:5px 0;
font-size:13px;
line-height:21px;
color:#666666;
">

<strong style="color:#303030;">
Email:
</strong>

{customer_email}

</p>


<p style="
margin:5px 0;
font-size:13px;
line-height:21px;
color:#666666;
">

<strong style="color:#303030;">
Mobile:
</strong>

{customer_mobile or "-"}

</p>


<p style="
margin:5px 0;
font-size:13px;
line-height:21px;
color:#666666;
">

<strong style="color:#303030;">
Address:
</strong>

<br>

{delivery_address or "-"}

</p>


</div>


<!-- FOOTER -->

<div style="
margin-top:35px;
padding-top:22px;
border-top:1px solid #d7d9df;
text-align:center;
">


<p style="
margin:0;
font-size:23px;
font-weight:bold;
letter-spacing:3px;
color:#5474D8;
">

THANK YOU!

</p>


<p style="
margin:10px 0 0;
font-size:12px;
color:#666666;
">

Thank you for shopping with
Density Electronics.

</p>


<p style="
margin:8px 0 0;
font-size:12px;
color:#666666;
">

Support:
{support_email or "-"}

</p>


</div>


</div>

</body>

</html>

"""


        # -------------------------------------------------
        # SEND CUSTOMER EMAIL VIA RESEND
        # -------------------------------------------------

        try:
            attachments = []

            if logo_path and os.path.exists(logo_path):
                with open(logo_path, "rb") as logo_file:
                    logo_content = base64.b64encode(
                        logo_file.read()
                    ).decode("ascii")

                attachments.append({
                    "filename": "density-electronics-logo.png",
                    "content": logo_content,
                    "content_id": "density_logo",
                })

            if invoice_file and os.path.exists(invoice_file):
                with open(invoice_file, "rb") as invoice:
                    invoice_content = base64.b64encode(
                        invoice.read()
                    ).decode("ascii")

                attachments.append({
                    "filename": f"{order_reference}.pdf",
                    "content": invoice_content,
                })

            resend_response = send_resend_email(
                to_email=customer_email,
                subject=email_subject,
                text=email_text,
                html=customer_email_html,
                attachments=[],
            )

            customer_email_sent = True
            print("CUSTOMER EMAIL SENT VIA RESEND:", customer_email)
            print("RESEND CUSTOMER RESPONSE:", resend_response)

        except Exception as email_error:
            customer_email_error = str(email_error)
            print("CUSTOMER RESEND EMAIL ERROR:", repr(email_error))

        # =================================================
        # DENSITY / ADMIN EMAIL
        # =================================================

        admin_email_sent = False
        admin_email_error = ""


        admin_email = (

            getattr(
                settings,
                "ORDER_NOTIFICATION_EMAIL",
                "",
            )

            or getattr(
                settings,
                "DEFAULT_FROM_EMAIL",
                "",
            )
        )


        if admin_email:

            admin_subject = (

                "Density Electronics - "
                "NEW ORDER RECEIVED - "
                f"{order_reference}"
            )


            admin_text = f"""
NEW ORDER RECEIVED

Density Electronics

Order Reference:
{order_reference}

Customer:
{customer_name}

Email:
{customer_email}

Mobile:
{customer_mobile}

Address:
{delivery_address}

Total:
₹{float(total_amount):.2f}

Payment ID:
{razorpay_payment_id}

Please find the invoice PDF attached.
"""


            admin_items_html = ""


            for item in order.items.all():

                line_total = (

                    Decimal(
                        str(item.price)
                    )

                    *
                    int(item.quantity)
                )


                admin_items_html += f"""

<tr>

<td style="
padding:11px;
border-bottom:1px solid #e1e4ea;
">

{item.product_name}

</td>


<td style="
padding:11px;
text-align:center;
border-bottom:1px solid #e1e4ea;
">

{item.quantity}

</td>


<td style="
padding:11px;
text-align:right;
border-bottom:1px solid #e1e4ea;
">

₹{float(line_total):.2f}

</td>

</tr>

"""


            admin_html = f"""

<!DOCTYPE html>

<html>

<body style="
margin:0;
padding:0;
background:#ffffff;
font-family:Arial,Helvetica,sans-serif;
color:#303030;
">

<div style="
max-width:720px;
margin:auto;
padding:30px 22px 40px;
">


<!-- HEADER -->

<table
width="100%"
cellpadding="0"
cellspacing="0"
>

<tr>

<td>

{email_logo_html}

</td>


<td style="
text-align:right;
font-size:12px;
line-height:19px;
color:#666666;
">

<strong>
NEW ORDER
</strong>

<br>

Density Electronics

<br>

{order_reference}

</td>

</tr>

</table>


<div style="
height:3px;
background:#5474D8;
margin:24px 0 30px;
">
</div>


<h1 style="
font-size:30px;
letter-spacing:1px;
margin:0 0 10px;
">

NEW ORDER RECEIVED

</h1>


<p style="
font-size:14px;
color:#666666;
line-height:22px;
">

A new paid order has been received
through the Density Electronics website.

</p>


<!-- ORDER INFO -->

<table
width="100%"
cellpadding="0"
cellspacing="0"
style="
border-collapse:collapse;
margin-top:25px;
"
>

<tr>

<td style="
padding:12px 0;
border-bottom:1px solid #d7d9df;
">

<strong>
Order Number
</strong>

<br>

<span style="color:#666666;">
{order_reference}
</span>

</td>


<td style="
padding:12px 0;
border-bottom:1px solid #d7d9df;
text-align:right;
">

<strong>
Date
</strong>

<br>

<span style="color:#666666;">
{order.created_at.strftime("%d %b %Y")}
</span>

</td>

</tr>

</table>


<h2 style="
font-size:16px;
letter-spacing:1px;
margin-top:30px;
">

CUSTOMER DETAILS

</h2>


<div style="
border-top:1px solid #d7d9df;
border-bottom:1px solid #d7d9df;
padding:15px 0;
color:#666666;
font-size:13px;
line-height:22px;
">

<strong style="color:#303030;">
Name:
</strong>
{customer_name}

<br>

<strong style="color:#303030;">
Email:
</strong>
{customer_email}

<br>

<strong style="color:#303030;">
Mobile:
</strong>
{customer_mobile or "-"}

<br>

<strong style="color:#303030;">
Address:
</strong>
{delivery_address or "-"}

</div>


<h2 style="
font-size:16px;
letter-spacing:1px;
margin-top:30px;
">

ORDER ITEMS

</h2>


<table
width="100%"
cellpadding="0"
cellspacing="0"
style="border-collapse:collapse;"
>

<tr>

<th style="
padding:12px;
text-align:left;
border-top:1px solid #303030;
border-bottom:1px solid #303030;
color:#5474D8;
">

PRODUCT

</th>


<th style="
padding:12px;
text-align:center;
border-top:1px solid #303030;
border-bottom:1px solid #303030;
color:#5474D8;
">

QTY

</th>


<th style="
padding:12px;
text-align:right;
border-top:1px solid #303030;
border-bottom:1px solid #303030;
color:#5474D8;
">

TOTAL

</th>

</tr>


{admin_items_html}


</table>


<!-- TOTAL -->

<div style="
margin-top:20px;
padding:15px 0;
border-top:1px solid #303030;
border-bottom:1px solid #303030;
text-align:right;
">

<span style="
font-size:14px;
color:#666666;
">

TOTAL

</span>


<strong style="
font-size:22px;
color:#5474D8;
margin-left:20px;
">

₹{float(total_amount):.2f}

</strong>

</div>


<h2 style="
font-size:16px;
letter-spacing:1px;
margin-top:30px;
">

PAYMENT INFO

</h2>


<div style="
padding:15px 0;
border-top:1px solid #d7d9df;
border-bottom:1px solid #d7d9df;
font-size:13px;
line-height:22px;
color:#666666;
">

<strong style="color:#303030;">
Payment Method:
</strong>

Razorpay

<br>

<strong style="color:#303030;">
Payment ID:
</strong>

{razorpay_payment_id}

<br>

<strong style="color:#303030;">
Status:
</strong>

Paid

</div>


<div style="
margin-top:35px;
padding-top:22px;
border-top:1px solid #d7d9df;
text-align:center;
">

<p style="
margin:0;
font-size:22px;
font-weight:bold;
letter-spacing:3px;
color:#5474D8;
">

DENSITY ELECTRONICS

</p>

<p style="
margin:8px 0 0;
font-size:12px;
color:#666666;
">

New order notification

</p>

</div>


</div>

</body>

</html>

"""


            try:
                attachments = []

                if logo_path and os.path.exists(logo_path):
                    with open(logo_path, "rb") as logo_file:
                        logo_content = base64.b64encode(
                            logo_file.read()
                        ).decode("ascii")

                    attachments.append({
                        "filename": "density-electronics-logo.png",
                        "content": logo_content,
                        "content_id": "density_logo",
                    })

                if invoice_file and os.path.exists(invoice_file):
                    with open(invoice_file, "rb") as invoice:
                        invoice_content = base64.b64encode(
                            invoice.read()
                        ).decode("ascii")

                    attachments.append({
                        "filename": f"{order_reference}.pdf",
                        "content": invoice_content,
                    })

                resend_response = send_resend_email(
                    to_email=admin_email,
                    subject=admin_subject,
                    text=admin_text,
                    html=admin_html,
                    attachments=[],
                )

                admin_email_sent = True
                print("DENSITY EMAIL SENT VIA RESEND:", admin_email)
                print("RESEND ADMIN RESPONSE:", resend_response)

            except Exception as admin_error:
                admin_email_error = str(admin_error)
                print("DENSITY RESEND EMAIL ERROR:", repr(admin_error))

        # -------------------------------------------------
        # DELETE TEMP PDF
        # -------------------------------------------------

        try:

            if invoice_file and os.path.exists(
                invoice_file
            ):

                os.remove(
                    invoice_file
                )

        except Exception as cleanup_error:

            print(
                "INVOICE CLEANUP ERROR:",
                repr(cleanup_error),
            )


        # -------------------------------------------------
        # RESPONSE
        # -------------------------------------------------

        return JsonResponse(

            {
                "success": True,

                "message":
                    "Payment verified and order saved",

                "order_reference":
                    order_reference,

                "payment_id":
                    razorpay_payment_id,

                "customer": {

                    "name":
                        customer_name,

                    "email":
                        customer_email,

                    "mobile":
                        customer_mobile,
                },

                "email_sent":
                    customer_email_sent,

                "admin_email_sent":
                    admin_email_sent,

                "email_error":
                    customer_email_error,

                "admin_email_error":
                    admin_email_error,
            }
        )


    except Exception as e:

        print(
            "VERIFY PAYMENT ERROR:",
            repr(e),
        )


        if invoice_file:

            try:

                if os.path.exists(
                    invoice_file
                ):

                    os.remove(
                        invoice_file
                    )

            except Exception:
                pass


        return JsonResponse(

            {
                "success": False,

                "message":
                    "Payment verification failed",

                "error":
                    str(e),
            },

            status=500,
        )


# =========================================================
# ADMIN LOGIN
# =========================================================

@csrf_exempt
def admin_login(request):

    if request.method != "POST":

        return JsonResponse(
            {
                "success": False,
                "message":
                    "Only POST method allowed",
            },
            status=405,
        )


    try:

        data = json.loads(
            request.body or "{}"
        )


        username = str(
            data.get(
                "username"
            )
            or ""
        ).strip()


        password = data.get(
            "password",
            "",
        )


        if not username or not password:

            return JsonResponse(
                {
                    "success": False,
                    "message":
                        "Username and password are required",
                },
                status=400,
            )


        user = authenticate(

            request,

            username=username,

            password=password,
        )


        if user is None:

            return JsonResponse(
                {
                    "success": False,
                    "message":
                        "Invalid username or password",
                },
                status=401,
            )


        if not user.is_staff:

            return JsonResponse(
                {
                    "success": False,
                    "message":
                        "Admin access required",
                },
                status=403,
            )


        login(
            request,
            user
        )


        request.session.save()


        return JsonResponse(

            {
                "success": True,

                "message":
                    "Admin login successful",

                "user": {

                    "id":
                        user.id,

                    "username":
                        user.username,

                    "name":
                        user.first_name,

                    "email":
                        user.email,

                    "is_staff":
                        user.is_staff,
                },
            }
        )


    except Exception as e:

        print(
            "ADMIN LOGIN ERROR:",
            repr(e),
        )


        return JsonResponse(

            {
                "success": False,
                "message":
                    "Unable to login",
                "error":
                    str(e),
            },

            status=500,
        )


# =========================================================
# ADMIN LOGOUT
# =========================================================

@csrf_exempt
def admin_logout(request):

    if request.method != "POST":

        return JsonResponse(
            {
                "success": False,
                "message":
                    "Only POST method allowed",
            },
            status=405,
        )


    logout(request)


    return JsonResponse(

        {
            "success": True,

            "message":
                "Admin logged out successfully",
        }
    )


# =========================================================
# ADMIN ORDER DASHBOARD
# =========================================================

def admin_order_dashboard(request):

    # =====================================================
    # ADMIN AUTHENTICATION
    # =====================================================

    if not request.user.is_authenticated:
        return JsonResponse(
            {
                "success": False,
                "message": "Authentication required."
            },
            status=401
        )

    if not request.user.is_staff:
        return JsonResponse(
            {
                "success": False,
                "message": "Admin access required."
            },
            status=403
        )

    # =====================================================
    # GET ALL ORDERS
    # =====================================================

    orders = Order.objects.all().order_by("-created_at")

    # =====================================================
    # SUMMARY CALCULATION
    # =====================================================

    total_orders = orders.count()

    paid_orders = orders.filter(
        status__iexact="Paid"
    ).count()

    total_sales = 0

    for order in orders:

        if str(order.status).lower() == "paid":

            total_sales += float(
                order.total_amount or 0
            )

    # =====================================================
    # ORDER DATA
    # =====================================================

    order_list = []

    for order in orders:

        # -------------------------------------------------
        # ORDER ITEMS
        # -------------------------------------------------

        item_list = []

        for item in order.items.all():

            quantity = int(
                item.quantity or 0
            )

            price = float(
                item.price or 0
            )

            item_total = (
                quantity * price
            )

            item_list.append(
                {
                    "product_name":
                        item.product_name,

                    "product_id":
                        item.product_id,

                    "quantity":
                        quantity,

                    "price":
                        price,

                    "item_total":
                        item_total,
                }
            )

        # -------------------------------------------------
        # ORDER OBJECT
        # -------------------------------------------------

        order_list.append(
            {
                "id":
                    order.id,

                "order_reference":
                    order.order_reference,

                "razorpay_order_id":
                    order.razorpay_order_id,

                "razorpay_payment_id":
                    order.razorpay_payment_id,

                "customer_name":
                    order.customer_name,

                "customer_email":
                    order.customer_email,

                "customer_mobile":
                    order.customer_mobile,

                "delivery_address":
                    order.delivery_address,

                "total_amount":
                    float(
                        order.total_amount or 0
                    ),

                "status":
                    order.status,

                "created_at":
                    order.created_at.isoformat()
                    if order.created_at
                    else None,

                "items":
                    item_list,
            }
        )

    # =====================================================
    # FINAL RESPONSE
    # =====================================================

    return JsonResponse(
        {
            "success": True,

            "username":
                request.user.username,

            "summary":
                {
                    "total_orders":
                        total_orders,

                    "paid_orders":
                        paid_orders,

                    "total_sales":
                        total_sales,
                },

            "orders":
                order_list,
        }
    )# =========================================================
# ADMIN CUSTOMER MANAGEMENT
# =========================================================

def admin_customers(request):

    # -----------------------------------------------------
    # ADMIN AUTH CHECK
    # -----------------------------------------------------

    if not request.user.is_authenticated:

        return JsonResponse(
            {
                "success": False,
                "message": "Admin login required",
            },
            status=401,
        )

    if not request.user.is_staff:

        return JsonResponse(
            {
                "success": False,
                "message": "Admin access required",
            },
            status=403,
        )

    # =====================================================
    # GET - CUSTOMER LIST
    # =====================================================

    if request.method == "GET":

        customers = Customer.objects.all().order_by(
            "-registered_at"
        )

        customer_data = []

        for customer in customers:

            customer_data.append(
                {
                    "id": customer.id,

                    "name": customer.name,

                    "email": customer.email,

                    "mobile": customer.mobile,

                    "is_logged_in":
                        customer.is_logged_in,

                    "registered_at": (
                        customer.registered_at.isoformat()
                        if customer.registered_at
                        else None
                    ),

                    "last_login": (
                        customer.last_login.isoformat()
                        if customer.last_login
                        else None
                    ),
                }
            )

        return JsonResponse(
            {
                "success": True,
                "customers": customer_data,
            }
        )

    # =====================================================
    # POST - CREATE CUSTOMER
    # =====================================================

    if request.method == "POST":

        try:

            data = json.loads(
                request.body or "{}"
            )

            name = str(
                data.get("name") or ""
            ).strip()

            email = str(
                data.get("email") or ""
            ).strip().lower()

            mobile = str(
                data.get("mobile") or ""
            ).strip()

            password = str(
                data.get("password") or ""
            )

            # ---------------------------------------------
            # VALIDATION
            # ---------------------------------------------

            if not name:

                return JsonResponse(
                    {
                        "success": False,
                        "message": "Name is required",
                    },
                    status=400,
                )

            if not email:

                return JsonResponse(
                    {
                        "success": False,
                        "message": "Email is required",
                    },
                    status=400,
                )

            if Customer.objects.filter(
                email__iexact=email
            ).exists():

                return JsonResponse(
                    {
                        "success": False,
                        "message":
                            "Customer with this email already exists",
                    },
                    status=409,
                )

            if User.objects.filter(
                username__iexact=email
            ).exists():

                return JsonResponse(
                    {
                        "success": False,
                        "message":
                            "A user with this email already exists",
                    },
                    status=409,
                )

            # ---------------------------------------------
            # PASSWORD
            # ---------------------------------------------

            if not password:

                password = User.objects.make_random_password()

            # ---------------------------------------------
            # CREATE DJANGO USER
            # ---------------------------------------------

            user = User.objects.create_user(

                username=email,

                email=email,

                first_name=name,

                password=password,
            )

            # ---------------------------------------------
            # CREATE CUSTOMER
            # ---------------------------------------------

            customer = Customer.objects.create(

                name=name,

                email=email,

                mobile=mobile or None,

                password=password,

                is_logged_in=False,
            )

            return JsonResponse(

                {
                    "success": True,

                    "message":
                        "Customer created successfully",

                    "customer": {

                        "id":
                            customer.id,

                        "name":
                            customer.name,

                        "email":
                            customer.email,

                        "mobile":
                            customer.mobile,

                        "is_logged_in":
                            customer.is_logged_in,

                        "registered_at": (
                            customer.registered_at.isoformat()
                            if customer.registered_at
                            else None
                        ),

                        "last_login": None,
                    },
                },

                status=201,
            )

        except Exception as e:

            print(
                "ADMIN CREATE CUSTOMER ERROR:",
                repr(e),
            )

            return JsonResponse(
                {
                    "success": False,
                    "message":
                        "Unable to create customer",
                    "error":
                        str(e),
                },
                status=500,
            )

    # =====================================================
    # INVALID METHOD
    # =====================================================

    return JsonResponse(
        {
            "success": False,
            "message": "Method not allowed",
        },
        status=405,
    )


# =========================================================
# ADMIN CUSTOMER DETAIL
# =========================================================

@csrf_exempt
def admin_customer_detail(
    request,
    customer_id
):

    # -----------------------------------------------------
    # ADMIN AUTH CHECK
    # -----------------------------------------------------

    if not request.user.is_authenticated:

        return JsonResponse(
            {
                "success": False,
                "message": "Admin login required",
            },
            status=401,
        )

    if not request.user.is_staff:

        return JsonResponse(
            {
                "success": False,
                "message": "Admin access required",
            },
            status=403,
        )

    # -----------------------------------------------------
    # FIND CUSTOMER
    # -----------------------------------------------------

    try:

        customer = Customer.objects.get(
            id=customer_id
        )

    except Customer.DoesNotExist:

        return JsonResponse(
            {
                "success": False,
                "message": "Customer not found",
            },
            status=404,
        )

    # =====================================================
    # PUT / PATCH - UPDATE CUSTOMER
    # =====================================================

    if request.method in ["PUT", "PATCH"]:

        try:

            data = json.loads(
                request.body or "{}"
            )

            name = str(
                data.get(
                    "name",
                    customer.name
                )
                or ""
            ).strip()

            email = str(
                data.get(
                    "email",
                    customer.email
                )
                or ""
            ).strip().lower()

            mobile = str(
                data.get(
                    "mobile",
                    customer.mobile or ""
                )
                or ""
            ).strip()

            password = data.get(
                "password"
            )

            # ---------------------------------------------
            # VALIDATION
            # ---------------------------------------------

            if not name:

                return JsonResponse(
                    {
                        "success": False,
                        "message":
                            "Name is required",
                    },
                    status=400,
                )

            if not email:

                return JsonResponse(
                    {
                        "success": False,
                        "message":
                            "Email is required",
                    },
                    status=400,
                )

            # ---------------------------------------------
            # EMAIL DUPLICATE CHECK
            # ---------------------------------------------

            duplicate_customer = (
                Customer.objects
                .filter(
                    email__iexact=email
                )
                .exclude(
                    id=customer.id
                )
                .first()
            )

            if duplicate_customer:

                return JsonResponse(
                    {
                        "success": False,
                        "message":
                            "Another customer already uses this email",
                    },
                    status=409,
                )

            # ---------------------------------------------
            # UPDATE CUSTOMER
            # ---------------------------------------------

            old_email = customer.email

            customer.name = name
            customer.email = email
            customer.mobile = mobile or None

            if password:

                customer.password = password

            customer.save()

            # ---------------------------------------------
            # UPDATE DJANGO USER
            # ---------------------------------------------

            user = User.objects.filter(
                username__iexact=old_email
            ).first()

            if user:

                user.first_name = name
                user.email = email
                user.username = email

                if password:

                    user.set_password(
                        password
                    )

                user.save()

            return JsonResponse(
                {
                    "success": True,

                    "message":
                        "Customer updated successfully",

                    "customer": {

                        "id":
                            customer.id,

                        "name":
                            customer.name,

                        "email":
                            customer.email,

                        "mobile":
                            customer.mobile,

                        "is_logged_in":
                            customer.is_logged_in,

                        "registered_at": (
                            customer.registered_at.isoformat()
                            if customer.registered_at
                            else None
                        ),

                        "last_login": (
                            customer.last_login.isoformat()
                            if customer.last_login
                            else None
                        ),
                    },
                }
            )

        except Exception as e:

            print(
                "ADMIN UPDATE CUSTOMER ERROR:",
                repr(e),
            )

            return JsonResponse(
                {
                    "success": False,
                    "message":
                        "Unable to update customer",
                    "error":
                        str(e),
                },
                status=500,
            )

    # =====================================================
    # DELETE - DELETE CUSTOMER
    # =====================================================

    if request.method == "DELETE":

        try:

            email = customer.email

            # Delete Customer record
            customer.delete()

            # Delete corresponding Django User
            User.objects.filter(
                username__iexact=email
            ).delete()

            return JsonResponse(
                {
                    "success": True,

                    "message":
                        "Customer deleted successfully",
                }
            )

        except Exception as e:

            print(
                "ADMIN DELETE CUSTOMER ERROR:",
                repr(e),
            )

            return JsonResponse(
                {
                    "success": False,
                    "message":
                        "Unable to delete customer",
                    "error":
                        str(e),
                },
                status=500,
            )

    # =====================================================
    # INVALID METHOD
    # =====================================================

    return JsonResponse(
        {
            "success": False,
            "message": "Method not allowed",
        },
        status=405,
    )

# =========================================================
# SEND REGISTRATION OTP
# =========================================================

@csrf_exempt
def send_registration_otp(request):

    if request.method != "POST":

        return JsonResponse(
            {
                "success": False,
                "message":
                    "Only POST method allowed",
            },
            status=405,
        )


    try:

        data = json.loads(
            request.body or "{}"
        )


        name = str(
            data.get(
                "name"
            )
            or ""
        ).strip()


        email = str(
            data.get(
                "email"
            )
            or ""
        ).strip().lower()


        mobile = str(
            data.get(
                "mobile"
            )
            or ""
        ).strip()

        mobile = re.sub(r"\D", "", mobile)


        password = data.get(
            "password",
            "",
        )


        confirm_password = data.get(
            "confirm_password",
            "",
        )


        if not name:

            return JsonResponse(
                {
                    "success": False,
                    "message":
                        "Name is required",
                },
                status=400,
            )


        if not email:

            return JsonResponse(
                {
                    "success": False,
                    "message":
                        "Email is required",
                },
                status=400,
            )


        if not mobile:

            return JsonResponse(
                {
                    "success": False,
                    "message":
                        "Mobile number is required",
                },
                status=400,
            )


        if not re.fullmatch(r"[6-9]\d{9}", mobile):

            return JsonResponse(
                {
                    "success": False,
                    "message":
                        "Please enter a valid 10-digit Indian mobile number",
                },
                status=400,
            )


        if not password:

            return JsonResponse(
                {
                    "success": False,
                    "message":
                        "Password is required",
                },
                status=400,
            )


        if len(password) < 6:

            return JsonResponse(
                {
                    "success": False,
                    "message":
                        "Password must be at least 6 characters",
                },
                status=400,
            )


        if password != confirm_password:

            return JsonResponse(
                {
                    "success": False,
                    "message":
                        "Passwords do not match",
                },
                status=400,
            )


        if User.objects.filter(
            username=email
        ).exists() or Customer.objects.filter(
            email__iexact=email
        ).exists():

            return JsonResponse(
                {
                    "success": False,
                    "message":
                        "An account with this email already exists",
                },
                status=409,
            )


        otp = str(
            random.randint(
                100000,
                999999,
            )
        )


        hashed_password = make_password(
            password
        )


        EmailOTP.objects.update_or_create(

            email=email,

            defaults={

                "otp":
                    otp,

                "name":
                    name,

                "password":
                    hashed_password,

                "created_at":
                    timezone.now(),
            },
        )

        # EmailOTP model does not need a mobile column.
        # Keep the mobile number in the registration session
        # until the email OTP is verified.
        request.session["registration_mobile"] = mobile
        request.session["registration_email"] = email
        request.session.save()


        support_email = (
            get_support_email()
        )


        subject = (
            "Density Electronics - "
            "Email Verification OTP"
        )


        email_body = f"""
Hello {name},

Welcome to Density Electronics!

Your email verification OTP is:

{otp}

This OTP is valid for 10 minutes.

Please enter this OTP on the registration page
to complete your account creation.

If you did not request this registration,
please ignore this email.

Regards,
Density Electronics
Electronics & Robotics Store

Support:
{support_email or "-"}
"""


        email_html = f"""

<html>

<body style="
font-family:Arial,sans-serif;
background:#ffffff;
padding:30px;
">

<div style="
max-width:600px;
margin:auto;
background:#ffffff;
padding:30px;
">


<div style="
border-bottom:3px solid #5474D8;
padding-bottom:20px;
">

<h1 style="
color:#303030;
margin-bottom:5px;
">

Density Electronics

</h1>


<p style="
color:#666666;
margin-top:0;
">

Electronics & Robotics Store

</p>

</div>


<h2 style="
color:#5474D8;
margin-top:30px;
">

Verify your email

</h2>


<p>
Hello <strong>{name}</strong>,
</p>


<p>

Thank you for creating an account
with Density Electronics.

</p>


<p>

Your email verification OTP is:

</p>


<div style="
text-align:center;
background:#F3F6FF;
border:1px solid #d7d9df;
padding:25px;
margin:25px 0;
">

<span style="
font-size:36px;
font-weight:bold;
letter-spacing:10px;
color:#5474D8;
">

{otp}

</span>

</div>


<p style="
color:#666666;
font-size:14px;
">

This OTP is valid for
<strong>10 minutes</strong>.

</p>


<p style="
color:#666666;
font-size:14px;
">

If you did not request this registration,
you can safely ignore this email.

</p>


<p style="
margin-top:30px;
">

Regards,<br>

<strong>
Density Electronics
</strong>

</p>


</div>

</body>

</html>

"""


        resend_response = send_resend_email(
            to_email=email,
            subject=subject,
            text=email_body,
            html=email_html,
        )

        print(
            "REGISTRATION OTP SENT VIA RESEND:",
            email,
        )

        print(
            "RESEND RESPONSE:",
            resend_response,
        )

        return JsonResponse(
            {
                "success": True,
                "message":
                    "OTP sent successfully to your email",
            }
        )

    except Exception as e:

        print(
            "SEND REGISTRATION OTP ERROR:",
            repr(e),
        )

        return JsonResponse(
            {
                "success": False,
                "message":
                    "Unable to send OTP",
                "error":
                    str(e),
            },
            status=500,
        )


# =========================================================
# VERIFY REGISTRATION OTP
# =========================================================

@csrf_exempt
def verify_registration_otp(request):

    if request.method != "POST":

        return JsonResponse(
            {
                "success": False,
                "message":
                    "Only POST method allowed",
            },
            status=405,
        )


    try:

        data = json.loads(
            request.body or "{}"
        )


        email = str(
            data.get(
                "email"
            )
            or ""
        ).strip().lower()


        otp = str(
            data.get(
                "otp"
            )
            or ""
        ).strip()


        if not email:

            return JsonResponse(
                {
                    "success": False,
                    "message":
                        "Email is required",
                },
                status=400,
            )


        if not otp:

            return JsonResponse(
                {
                    "success": False,
                    "message":
                        "OTP is required",
                },
                status=400,
            )


        registration_email = str(
            request.session.get(
                "registration_email"
            )
            or ""
        ).strip().lower()

        if registration_email and registration_email != email:
            return JsonResponse(
                {
                    "success": False,
                    "message":
                        "Registration session expired. Please request a new OTP.",
                },
                status=400,
            )

        mobile = str(
            request.session.get(
                "registration_mobile"
            )
            or ""
        ).strip()

        otp_record = (

            EmailOTP.objects

            .filter(
                email=email
            )

            .first()
        )


        if not otp_record:

            return JsonResponse(
                {
                    "success": False,
                    "message":
                        "OTP not found. Please request a new OTP.",
                },
                status=404,
            )


        otp_age = (

            timezone.now()
            - otp_record.created_at

        ).total_seconds()


        if otp_age > 600:

            otp_record.delete()


            return JsonResponse(
                {
                    "success": False,
                    "message":
                        "OTP has expired. Please request a new OTP.",
                },
                status=400,
            )


        if otp_record.otp != otp:

            return JsonResponse(
                {
                    "success": False,
                    "message":
                        "Invalid OTP. Please try again.",
                },
                status=400,
            )


        if User.objects.filter(
            username=email
        ).exists():

            otp_record.delete()


            return JsonResponse(
                {
                    "success": False,
                    "message":
                        "An account with this email already exists",
                },
                status=409,
            )


        user = User(

            username=email,

            email=email,

            first_name=
                otp_record.name,
        )


        user.password = (
            otp_record.password
        )


        user.save()


        customer = Customer.objects.create(

            name=otp_record.name,

            email=email,

            mobile=mobile or None,

            password=otp_record.password,

            is_logged_in=True,

            last_login=timezone.now(),
        )


        otp_record.delete()

        request.session.pop("registration_mobile", None)
        request.session.pop("registration_email", None)


        login(
            request,
            user
        )


        request.session.save()


        print(
            "CUSTOMER REGISTERED:",
            email,
        )


        return JsonResponse(

            {
                "success": True,

                "message":
                    "Email verified and account created successfully",

                "user": {

                    "id":
                        user.id,

                    "name":
                        user.first_name,

                    "email":
                        user.email,

                    "mobile":
                        customer.mobile,
                },
            }
        )


    except Exception as e:

        print(
            "VERIFY REGISTRATION OTP ERROR:",
            repr(e),
        )


        return JsonResponse(

            {
                "success": False,

                "message":
                    "Unable to verify OTP",

                "error":
                    str(e),
            },

            status=500,
        )


# =========================================================
# CUSTOMER REGISTER
# =========================================================

@csrf_exempt
def customer_register(request):

    return JsonResponse(

        {
            "success": False,

            "message":
                "Please verify your email using OTP",
        },

        status=400,
    )


# =========================================================
# CUSTOMER LOGIN
# =========================================================

@csrf_exempt
def customer_login(request):

    if request.method != "POST":

        return JsonResponse(
            {
                "success": False,
                "message":
                    "Only POST method allowed",
            },
            status=405,
        )


    try:

        data = json.loads(
            request.body or "{}"
        )


        email = str(
            data.get(
                "email"
            )
            or ""
        ).strip().lower()


        password = data.get(
            "password",
            "",
        )


        if not email or not password:

            return JsonResponse(
                {
                    "success": False,
                    "message":
                        "Email and password are required",
                },
                status=400,
            )


        user = authenticate(

            request,

            username=email,

            password=password,
        )


        # If the customer was created from Django admin, there may
        # not be a matching Django User yet. In that case validate
        # the Customer password and create the Django session user.
        if user is None:

            customer = Customer.objects.filter(
                email__iexact=email
            ).first()

            if customer and check_password(
                password,
                customer.password,
            ):

                user = User.objects.filter(
                    username=email
                ).first()

                if user is None:

                    user = User.objects.create_user(
                        username=email,
                        email=email,
                        first_name=customer.name,
                        password=password,
                    )

            else:

                return JsonResponse(
                    {
                        "success": False,
                        "message":
                            "Invalid email or password",
                    },
                    status=401,
                )


        if user.is_staff:

            return JsonResponse(
                {
                    "success": False,
                    "message":
                        "Please use admin login",
                },
                status=403,
            )


        login(
            request,
            user
        )


        request.session.save()

        customer, _ = Customer.objects.get_or_create(
            email__iexact=email,
            defaults={
                "name": user.first_name or email.split("@")[0],
                "email": email,
                "mobile": None,
                "password": user.password,
            },
        )

        customer.name = user.first_name or customer.name
        customer.is_logged_in = True
        customer.last_login = timezone.now()
        if not customer.password:
            customer.password = user.password
        customer.save()


        return JsonResponse(

            {
                "success": True,

                "message":
                    "Login successful",

                "user": {

                    "id":
                        user.id,

                    "name":
                        user.first_name,

                    "email":
                        user.email,
                },
            }
        )


    except Exception as e:

        print(
            "CUSTOMER LOGIN ERROR:",
            repr(e),
        )


        return JsonResponse(

            {
                "success": False,

                "message":
                    "Unable to login",

                "error":
                    str(e),
            },

            status=500,
        )


# =========================================================
# CUSTOMER LOGOUT
# =========================================================

@csrf_exempt
def customer_logout(request):

    if request.method != "POST":

        return JsonResponse(
            {
                "success": False,
                "message":
                    "Only POST method allowed",
            },
            status=405,
        )


    if request.user.is_authenticated and not request.user.is_staff:
        try:
            customer = Customer.objects.filter(
                email__iexact=request.user.email
            ).first()
            if customer:
                customer.is_logged_in = False
                customer.save()
        except Exception as customer_error:
            print(
                "CUSTOMER LOGOUT STATUS ERROR:",
                repr(customer_error),
            )


    logout(request)


    return JsonResponse(

        {
            "success": True,

            "message":
                "Logged out successfully",
        }
    )


# =========================================================
# CURRENT CUSTOMER
# =========================================================

def current_customer(request):

    # User login केलेला नसेल
    if not request.user.is_authenticated:
        return JsonResponse(
            {
                "success": False,
                "authenticated": False,
                "user": None,
                "message": "User is not logged in."
            },
            status=401
        )

    # Logged-in user साठी Customer शोधा
    customer = Customer.objects.filter(
        email__iexact=request.user.email
    ).first()

    return JsonResponse(
        {
            "success": True,

            "authenticated": True,

            "user": {
                "id": request.user.id,

                "name": (
                    request.user.get_full_name()
                    or request.user.first_name
                    or request.user.username
                ),

                "email": request.user.email,

                "mobile": (
                    customer.mobile
                    if customer
                    else None
                ),

                "is_logged_in": (
                    customer.is_logged_in
                    if customer
                    else True
                ),
            },
        }
    )

