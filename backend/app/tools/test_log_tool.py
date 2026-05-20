from app.tools.log_interaction_tool import log_interaction_tool

message = """
Today I met Dr. Smith.

We discussed Product X efficacy.

Doctor showed positive interest.

Shared brochures and clinical trial material.

Follow up next week.
"""

result = log_interaction_tool(message)

print("\nEXTRACTED DATA:\n")
print(result)