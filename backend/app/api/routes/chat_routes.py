from fastapi import APIRouter
from pydantic import BaseModel

from app.agents.graph import graph


router = APIRouter()


class ChatRequest(BaseModel):
    message: str


@router.get("/health")
def health_check():

    return {
        "status": "Backend running successfully"
    }


@router.post("/chat")
def chat_with_agent(request: ChatRequest):

    input_data = {
        "user_input": request.message
    }

    result = graph.invoke(input_data)

    return result