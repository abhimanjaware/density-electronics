from django.urls import path
from . import views


urlpatterns = [

    # =====================================================
    # RAZORPAY
    # =====================================================

    path(
        "create-razorpay-order/",
        views.create_razorpay_order,
        name="create_razorpay_order"
    ),

    path(
        "verify-razorpay-payment/",
        views.verify_razorpay_payment,
        name="verify_razorpay_payment"
    ),


    # =====================================================
    # ADMIN
    # =====================================================

    path(
        "admin-login/",
        views.admin_login,
        name="admin_login"
    ),

    path(
        "admin-logout/",
        views.admin_logout,
        name="admin_logout"
    ),

    path(
        "admin-dashboard/",
        views.admin_order_dashboard,
        name="admin_order_dashboard"
    ),

    # =====================================================
    # ADMIN - CUSTOMER MANAGEMENT
    # =====================================================

    path(
        "admin-customers/",
        views.admin_customers,
        name="admin_customers"
    ),

    path(
        "admin-customers/<int:customer_id>/",
        views.admin_customer_detail,
        name="admin_customer_detail"
    ),


    # =====================================================
    # CUSTOMER REGISTRATION
    # =====================================================

    path(
        "register/",
        views.customer_register,
        name="customer_register"
    ),

    path(
        "send-registration-otp/",
        views.send_registration_otp,
        name="send_registration_otp"
    ),

    path(
        "verify-registration-otp/",
        views.verify_registration_otp,
        name="verify_registration_otp"
    ),


    # =====================================================
    # CUSTOMER LOGIN
    # =====================================================

    path(
        "login/",
        views.customer_login,
        name="customer_login"
    ),

    path(
        "logout/",
        views.customer_logout,
        name="customer_logout"
    ),

    path(
        "current-user/",
        views.current_customer,
        name="current_customer"
    ),

]