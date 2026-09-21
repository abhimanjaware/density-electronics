from django.db import models
from django.contrib.auth.hashers import make_password


class Customer(models.Model):

    name = models.CharField(
        max_length=100
    )

    email = models.EmailField(
        unique=True
    )

    mobile = models.CharField(
        max_length=20,
        null=True,
        blank=True
    )

    password = models.CharField(
        max_length=128
    )

    is_logged_in = models.BooleanField(
        default=False
    )

    registered_at = models.DateTimeField(
        auto_now_add=True
    )

    last_login = models.DateTimeField(
        null=True,
        blank=True
    )

    def save(self, *args, **kwargs):

        # Password plain text असेल तर hash करा
        if self.password and not self.password.startswith(
            ("pbkdf2_", "argon2$", "bcrypt", "scrypt$")
        ):
            self.password = make_password(self.password)

        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Order(models.Model):

    order_reference = models.CharField(
        max_length=50,
        unique=True,
        null=True,
        blank=True
    )

    razorpay_order_id = models.CharField(
        max_length=100,
        null=True,
        blank=True
    )

    razorpay_payment_id = models.CharField(
        max_length=100,
        null=True,
        blank=True
    )

    customer_name = models.CharField(
        max_length=100,
        null=True,
        blank=True
    )

    customer_email = models.EmailField(
        null=True,
        blank=True
    )

    customer_mobile = models.CharField(
        max_length=20,
        null=True,
        blank=True
    )

    delivery_address = models.TextField(
        null=True,
        blank=True
    )

    total_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True
    )

    status = models.CharField(
        max_length=30,
        default="Paid"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.order_reference or "Order"


class OrderItem(models.Model):

    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name="items"
    )

    product_name = models.CharField(
        max_length=200
    )

    product_id = models.CharField(
        max_length=100,
        null=True,
        blank=True
    )

    quantity = models.PositiveIntegerField(
        default=1
    )

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    def __str__(self):
        return self.product_name


class EmailOTP(models.Model):

    email = models.EmailField(
        unique=True
    )

    otp = models.CharField(
        max_length=6
    )

    name = models.CharField(
        max_length=100
    )

    password = models.CharField(
        max_length=128
    )

    created_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.email