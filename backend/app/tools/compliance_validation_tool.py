from app.services.groq_service import llm


def compliance_validation_tool(user_input: str):

    prompt = f"""
    Analyze this pharma interaction text
    for compliance risks.

    Detect:
    - misleading claims
    - guaranteed outcomes
    - unethical promotion

    Interaction:

    {user_input}

    Return concise compliance analysis.
    """

    response = llm.invoke(prompt)

    return {
        "message": "Compliance analysis completed",
        "analysis": response.content
    }