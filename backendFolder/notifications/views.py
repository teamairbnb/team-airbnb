# notifications/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Notification
from .serializers import NotificationSerializer
from drf_spectacular.utils import extend_schema, OpenApiResponse

class UserNotificationsView(APIView):
    permission_classes = [IsAuthenticated]
    @extend_schema(
        summary="Get user notifications",
        description=(
            "Returns all notifications for the currently authenticated user. "
            "This includes unread and read notifications."
        ),
        responses={
            200: OpenApiResponse(
                response=NotificationSerializer(many=True),
                description="List of notifications"
            ),
            401: OpenApiResponse(description="Unauthorized – Authentication required")
        },
        tags=["Notifications"]
    )

    def get(self, request):
        notifications = Notification.objects.filter(user=request.user).order_by('-created_at')
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data)
