from app.services.groq_service import generate_response
from app.models.interaction_model import Interaction
from app.db.database import SessionLocal

from datetime import datetime

import json


def log_interaction_tool(user_input: str):

    prompt = f"""
        You are an AI CRM assistant for pharmaceutical field representatives.

        Extract the following details from the interaction conversation.

        Return ONLY valid JSON.

        {{
            "hcp_name": "",
            "interaction_type": "",
            "interaction_date": "",
            "interaction_time": "",
            "attendees": [],
            "topics_discussed": [],
            "materials_shared": [],
            "samples_distributed": [],
            "sentiment": "",
            "follow_up_actions": []
        }}

        Rules:
        - interaction_type must be one of:
        ["Meeting", "Online", "Email"]

        - sentiment must be one of:
        ["Positive", "Neutral", "Negative"]

        - attendees must be an array

        - topics_discussed must be an array

        - materials_shared must be an array

        - samples_distributed must be an array

        - follow_up_actions must be an array

        Conversation:
        {user_input}
    """

    response = generate_response(prompt)

    try:

        cleaned_response = (
            response
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

        data = json.loads(cleaned_response)

        # -----------------------------------
        # AUTO DATE & TIME
        # -----------------------------------

        now = datetime.now()

        data["interaction_date"] = now.strftime("%Y-%m-%d")

        data["interaction_time"] = now.strftime("%H:%M")

        # -----------------------------------
        # DEFAULT VALUES
        # -----------------------------------

        if not data.get("interaction_type"):

            data["interaction_type"] = "Meeting"

        if not data.get("sentiment"):

            data["sentiment"] = "Neutral"

        # -----------------------------------
        # SAVE TO DATABASE
        # -----------------------------------

        db = SessionLocal()

        interaction = Interaction(
            hcp_name=data.get("hcp_name"),
            interaction_type=data.get("interaction_type"),
            topics_discussed=data.get("topics_discussed"),
            materials_shared=data.get("materials_shared"),
            sentiment=data.get("sentiment"),
            follow_up_actions=data.get("follow_up_actions")
        )

        db.add(interaction)

        db.commit()

        db.refresh(interaction)

        db.close()

        return {
            "message": "Interaction logged successfully",
            "interaction_id": interaction.id,
            "data": data
        }

    except Exception as e:

        return {
            "error": str(e),
            "raw_response": response
        }