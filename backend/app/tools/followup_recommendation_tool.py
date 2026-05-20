from app.services.groq_service import llm


def followup_recommendation_tool(user_input: str):

    prompt = f"""
    You are a pharma CRM assistant.

    Suggest intelligent follow-up actions
    for this HCP interaction:

    {user_input}

    Keep response concise and professional.
    """

    response = llm.invoke(prompt)

    return {
        "message": "Follow-up recommendation generated",
        "recommendation": response.content
    }