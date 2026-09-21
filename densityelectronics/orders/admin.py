from django.contrib import admin
from .models import Customer, Order, OrderItem, EmailOTP


# =========================================================
# CUSTOMER ADMIN
# =========================================================

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "name",
        "email",
        "mobile",
        "login_status",
        "registered_at",
        "last_login",
    )

    list_display_links = (
        "id",
        "name",
        "email",
    )

    search_fields = (
        "name",
        "email",
        "mobile",
    )

    list_filter = (
        "is_logged_in",
        "registered_at",
        "last_login",
    )

    ordering = (
        "-registered_at",
    )

    readonly_fields = (
        "registered_at",
        "last_login",
    )

    fieldsets = (
        (
            "Customer Information",
            {
                "fields": (
                    "name",
                    "email",
                    "mobile",
                )
            },
        ),
        (
            "Account",
            {
                "fields": (
                    "password",
                    "is_logged_in",
                )
            },
        ),
        (
            "Account Activity",
            {
                "fields": (
                    "registered_at",
                    "last_login",
                )
            },
        ),
    )

    @admin.display(
        boolean=True,
        description="Login Status",
    )
    def login_status(self, obj):
        return obj.is_logged_in


# =========================================================
# ORDER ADMIN
# =========================================================

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "order_reference",
        "customer_name",
        "customer_email",
        "customer_mobile",
        "total_amount",
        "status",
        "created_at",
    )

    search_fields = (
        "order_reference",
        "customer_name",
        "customer_email",
        "customer_mobile",
    )

    list_filter = (
        "status",
        "created_at",
    )

    ordering = (
        "-created_at",
    )


# =========================================================
# ORDER ITEM ADMIN
# =========================================================

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "order",
        "product_name",
        "product_id",
        "quantity",
        "price",
    )

    search_fields = (
        "product_name",
        "product_id",
    )


# =========================================================
# EMAIL OTP ADMIN
# =========================================================

@admin.register(EmailOTP)
class EmailOTPAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "email",
        "name",
        "created_at",
    )

    search_fields = (
        "email",
        "name",
    )

    readonly_fields = (
        "created_at",
    )