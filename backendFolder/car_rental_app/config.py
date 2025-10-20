from django.conf import settings
from supabase import create_client, ClientOptions
import httpx

# Set a default timeout of 10 seconds and enable SSL verification
http_client = httpx.Client(timeout=10.0, verify=True)

options = ClientOptions(
    httpx_client=http_client,
)

supabase = create_client(
    settings.SUPABASE_URL,
    settings.SUPABASE_KEY,
    options=options,
)