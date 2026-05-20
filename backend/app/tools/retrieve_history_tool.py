from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.models.interaction_model import Interaction


# -----------------------------
# CLEAN ARRAY FORMATTER
# -----------------------------

def clean_array(value):

    if not value:
        return []

    # Already proper list
    if isinstance(value, list):
        return value

    # PostgreSQL string array format
    if isinstance(value, str):

        cleaned = (
            value
            .replace("{", "")
            .replace("}", "")
            .replace('"', "")
        )

        return [item.strip() for item in cleaned.split(",")]

    return []


# -----------------------------
# RETRIEVE HISTORY TOOL
# -----------------------------

def retrieve_history_tool():

    db: Session = SessionLocal()

    try:

        interactions = db.query(Interaction).all()

        history = []

        for interaction in interactions:

            history.append({

                "hcp_name": interaction.hcp_name,

                "topics_discussed": clean_array(
                    interaction.topics_discussed
                ),

                "sentiment": interaction.sentiment,

                "follow_up_actions": clean_array(
                    interaction.follow_up_actions
                )
            })

        return {
            "message": "Interaction history retrieved",
            "history": history
        }

    finally:

        db.close()