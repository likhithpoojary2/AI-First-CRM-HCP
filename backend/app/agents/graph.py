from langgraph.graph import StateGraph, END

from app.agents.state import AgentState
from app.agents.nodes import detect_intent, execute_tool


workflow = StateGraph(AgentState)


# NODES

workflow.add_node(
    "detect_intent",
    detect_intent
)

workflow.add_node(
    "execute_tool",
    execute_tool
)


# ENTRY

workflow.set_entry_point(
    "detect_intent"
)


# EDGES

workflow.add_edge(
    "detect_intent",
    "execute_tool"
)

workflow.add_edge(
    "execute_tool",
    END
)


graph = workflow.compile()