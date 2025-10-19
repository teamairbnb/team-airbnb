from car_inventories.models import Car
from bookings.models import Booking


def get_available_cars():
    """Query the database for available cars """
    available_cars = Car.objects.filter(is_available=True)[:5]


    if not available_cars.exists():
        return "I'm sorry, no cars are available at the moment. Please check back later."
    response = "Here are a few of our available cars:\n"
    for car in available_cars:
        response += f"- {car.year} {car.make} {car.model}\n"
    return response

def get_user_bookings(user):
    """Query the database for a specific user's bookings."""
    if not user.is_authenticated:
        return "Please login to your account to see your bookings."
    bookings = Booking.objects.filter(user=user).order_by("-start_date")[:3]

    if not bookings.exists():
        return "It looks like you don't have any bookings yet."
    response = "Here are your most recent bookings:\n"
    for booking in bookings:
        response += f"- A {booking.car.make} {booking.car.model} from {booking.start_date.strftime('%b %d, %Y')} to {booking.end_date.strftime('%b %d, %Y')}.\n"
    return response



def get_response(user_message, user=None):
    """
    Predefined rules for user's messages
    """
    message = user_message.lower().strip()

    # Rule for greeting
    if any(word in message for word in ["hello", "hi", "hey"]):
        return "Hi there! How can I help you with your car rental needs today? You can ask about available cars or your bookings."

    # Rule for checking user's bookings
    if "my bookings" in message or "my reservations" in message:
        return get_user_bookings(user)

    # Rule for general booking question
    if "booking" in message or "reservation" in message:
        return "I can help with that. You can ask to see 'my bookings' or browse our available cars to make a new one."

    # Rule to query available cars
    if "available cars" in message or "see cars" in message:
        return get_available_cars()

    # Rule for pricing question
    if "pricing" in message or "cost" in message:
        return "Our pricing varies by car model and rental duration. You can see the price for each car on its details page."

    # Rule for contact/support
    if "contact" in message or "support" in message:
        return "You can reach our support team at teamairbnb50@gmail.com for any detailed inquiries."

    # Default fallback response
    return "I'm sorry, I don't understand that. You can ask me about 'available cars', 'my bookings', pricing, or how to contact support."
