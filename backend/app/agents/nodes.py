from app.tools.log_interaction_tool import log_interaction_tool
from app.tools.edit_interaction_tool import edit_interaction_tool
from app.tools.retrieve_history_tool import retrieve_history_tool
from app.tools.followup_recommendation_tool import followup_recommendation_tool
from app.tools.compliance_validation_tool import compliance_validation_tool


# -------------------------------
# INTENT DETECTION
# -------------------------------

def detect_intent(state):

    user_input = state["user_input"].lower()

    # -----------------------------------
    # RETRIEVE HISTORY
    # -----------------------------------

    if any(word in user_input for word in [
        "history",
        "previous",
        "past",
        "show interactions",
        "show previous"
    ]):

        state["intent"] = "retrieve_history"

    # -----------------------------------
    # EDIT INTERACTION
    # -----------------------------------

    elif any(word in user_input for word in [
        "edit",
        "update",
        "change",
        "modify"
    ]):

        state["intent"] = "edit_interaction"

    # -----------------------------------
    # FOLLOW-UP RECOMMENDATION
    # -----------------------------------

    elif any(word in user_input for word in [
        "follow up",
        "next action",
        "recommendation",
        "suggest"
    ]):

        state["intent"] = "followup_recommendation"

    # -----------------------------------
    # COMPLIANCE CHECK
    # -----------------------------------

    elif any(word in user_input for word in [
        "compliance",
        "risk",
        "ethical",
        "guaranteed cure"
    ]):

        state["intent"] = "compliance_check"

    # -----------------------------------
    # LOG INTERACTION
    # -----------------------------------

    elif any(word in user_input for word in [

    # COMMON INTERACTION WORDS

    "met",
    "meeting",
    "discussed",
    "discussion",
    "interaction",
    "interacted",
    "conversation",
    "spoke",
    "talked",
    "consulted",
    "engaged",

    # HCP / MEDICAL TERMS

    "doctor",
    "dr.",
    "physician",
    "hcp",
    "specialist",
    "surgeon",
    "clinician",
    "provider",

    # COMMUNICATION TYPES

    "email",
    "emailed",
    "sent",
    "shared",
    "online",
    "virtual",
    "zoom",
    "teams",
    "call",
    "phone call",
    "video call",
    "webinar",

    # SALES / CRM RELATED

    "presentation",
    "detail",
    "detailing",
    "product discussion",
    "clinical discussion",
    "follow-up",
    "follow up",
    "presentation shared",
    "samples",
    "brochure",
    "material",
    "demo",

    # INTERNATIONAL / BUSINESS TERMS

    "appointment",
    "session",
    "conference",
    "briefing",
    "visit",
    "hospital visit",
    "clinic visit",
    "roundtable",
    "scientific exchange"

]):

        state["intent"] = "log_interaction"

    else:

        state["intent"] = "log_interaction"

    return state


# -------------------------------
# TOOL EXECUTION
# -------------------------------

def execute_tool(state):

    intent = state["intent"]

    user_input = state["user_input"]

    # LOG INTERACTION

    if intent == "log_interaction":

        result = log_interaction_tool(user_input)

    # EDIT INTERACTION

    elif intent == "edit_interaction":

        result = edit_interaction_tool(user_input)

    # RETRIEVE HISTORY

    elif intent == "retrieve_history":

        result = retrieve_history_tool()

    # FOLLOW-UP RECOMMENDATION

    elif intent == "followup_recommendation":

        result = followup_recommendation_tool(user_input)

    # COMPLIANCE CHECK

    elif intent == "compliance_check":

        result = compliance_validation_tool(user_input)

    else:

        result = {
            "message": "Unknown intent"
        }

    state["response"] = result

    return state