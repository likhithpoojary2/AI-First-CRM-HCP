from app.services.groq_service import generate_response

prompt = """
You are an AI assistant for a pharma CRM system.

Summarize this interaction:

"Met Dr. Smith today and discussed Product X.
Doctor showed positive interest and requested brochures."
"""

response = generate_response(prompt)

print("\nAI Response:\n")
print(response)