from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .rules import get_response
# Create your views here.


class ChatbotEndpoint(APIView):
    def post(self, request, *args, **kwargs):
        user_message = request.data.get("message")

        if not user_message:
            return Response(
                {"error": "No message provided."},
                status=status.HTTP_400_BAD_REQUEST
            )
        

        # know who is asking by passing the request.user object
        bot_response = get_response(user_message, user=request.user)

        return Response(
            {"reply": bot_response},
            status=status.HTTP_200_OK
        )
