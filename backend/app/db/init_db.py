from app.db.database import engine
from app.models.interaction_model import Interaction
from app.db.database import Base

print("Creating database tables...")

Base.metadata.create_all(bind=engine)

print("Tables created successfully!")