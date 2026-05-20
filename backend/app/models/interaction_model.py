from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime

from app.db.database import Base


class Interaction(Base):

    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)

    hcp_name = Column(String, nullable=False)

    interaction_type = Column(String, nullable=True)

    topics_discussed = Column(Text, nullable=True)

    materials_shared = Column(Text, nullable=True)

    sentiment = Column(String, nullable=True)

    follow_up_actions = Column(Text, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)