from django.urls import path
from . import views

urlpatterns = [
    #  Payment processing endpoints: this is the main endpoint, pay with new card details (dummy validation)
    path("process/dummy/", views.DirectProcessDummyView.as_view(), name="process-payment-dummy"),

    #pay with saved card (by token)
    path("process/direct/", views.DirectProcessPaymentView.as_view(), name="process-payment-direct"),

    # List user's saved payment methods (GET only)
    path("methods/", views.PaymentMethodListView.as_view(), name="payment-methods"),

    # Payment information : List all user's payment
    path("", views.ListPaymentsView.as_view(), name="payment-list"),

    # Verify payment status by reference
    path("verify/<str:reference>/", views.VerifyPaymentView.as_view(), name="payments-verify"),

    # Refund a payment by reference
    path("<str:reference>/refund/", views.RefundByReferenceView.as_view(), name="payments-refund"),

    # Get full payment details by reference
    # this must be last because <str:reference> matches anything
    path("<str:reference>/", views.PaymentDetailView.as_view(), name="payments-detail"),
    
]
