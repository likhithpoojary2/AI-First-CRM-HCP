from app.agents.graph import graph

input_data = {
    "user_input": "Met Dr. Smith today and discussed Product X."
}

result = graph.invoke(input_data)

print("\nFINAL RESULT:\n")
print(result)