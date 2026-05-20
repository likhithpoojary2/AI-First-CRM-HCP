from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.models.interaction_model import Interaction


def edit_interaction_tool(user_input: str):

    db: Session = SessionLocal()

    try:

        interaction = db.query(Interaction).order_by(
            Interaction.id.desc()
        ).first()

        if not interaction:

            return {
                "message": "No interaction found"
            }

        response_data = {
            "message": "Interaction updated successfully"
        }

        user_input_lower = user_input.lower()

        # -----------------------------------
        # UPDATE SENTIMENT
        # -----------------------------------

        if "neutral" in user_input_lower:

            interaction.sentiment = "Neutral"

            response_data["updated_sentiment"] = "Neutral"

        elif "positive" in user_input_lower:

            interaction.sentiment = "Positive"

            response_data["updated_sentiment"] = "Positive"

        elif "negative" in user_input_lower:

            interaction.sentiment = "Negative"

            response_data["updated_sentiment"] = "Negative"

        # -----------------------------------
        # UPDATE HCP NAME
        # -----------------------------------

        if "change name to" in user_input_lower:

            new_name = (
                user_input_lower
                .replace("change name to", "")
                .strip()
                .title()
            )

            interaction.hcp_name = new_name

            response_data["updated_hcp_name"] = new_name

        # -----------------------------------
        # UPDATE INTERACTION TYPE
        # -----------------------------------

        if "online" in user_input_lower:

            interaction.interaction_type = "Online"

            response_data["updated_interaction_type"] = "Online"

        elif "meeting" in user_input_lower:

            interaction.interaction_type = "Meeting"

            response_data["updated_interaction_type"] = "Meeting"

        elif "email" in user_input_lower:

            interaction.interaction_type = "Email"

            response_data["updated_interaction_type"] = "Email"

        db.commit()

        return response_data

    finally:

        db.close()