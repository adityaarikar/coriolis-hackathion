import sqlite3
import openai

# Function to interact with the OpenAI API and generate a response
def generate_response(user_message, schema):
    # Construct the prompt with the database schema and user message
    prompt = f"User: {user_message}\nSchema: {schema}\nChatGPT:"

    # Generate a response using the OpenAI API
    response = openai.Completion.create(
        engine="text-davinci-002",  # Use appropriate OpenAI engine
        prompt=prompt,
        max_tokens=150  # Set response length as required
    )

    return response['choices'][0]['text'].strip()

# Main chatbot loop
def chat_with_database(database_schema):
    print("Chatbot: Hi! I'm your chatbot. Please ask a question or request data from the database.")

    while True:
        user_message = input("You: ")
        
        if user_message.lower() == 'exit':
            print("Chatbot: Goodbye!")
            break

        # Check if the user is asking for data from the database
        if "get data for" in user_message.lower():
            try:
                # Extract the table name from the user's message
                table_name = user_message.split()[-1]

                # Construct a database query based on the table name
                query = f"SELECT * FROM {table_name};"

                # Query the database and get the data
                data = get_data_from_database(query)

                # Convert the data to a string and format it as a response
                response = f"Here is the data from the '{table_name}' table:\n\n{data.to_string(index=False)}"
            except Exception as e:
                response = f"Error: {str(e)}"
        else:
            # Generate a response using the OpenAI API and provide the database schema as reference
            response = generate_response(user_message, database_schema)

        print("Chatbot:", response)

if __name__ == "__main__":
    # Sample database schema (Replace with your actual database schema)
    database_schema = """
    Table: api_user
    -----------
    user_id (Primary Key, AutoField)
    email (Unique, CharField with max length 50)
    emp_id (CharField with max length 10, blank)
    first_name (CharField with max length 20)
    last_name (CharField with max length 20)
    date_of_joining (DateField, blank)
    is_admin (BooleanField with default False)

    Table: api_category
    ---------------
    cat_id (Primary Key, AutoField)
    name (Unique, CharField with max length 20)
    created_by_id (Foreign Key to api_user table, related name: created_by)
    created_at (DateField with auto_now)

    Table: api_inventory
    ----------------
    invent_id (Primary Key, AutoField)
    cat_id_id (Foreign Key to api_category table, related name: category)
    alloted_at (DateField)
    alloted_to_id (Foreign Key to api_user table, related name: alloted_to)
    alloted_by_id (Foreign Key to api_user table, related name: alloted_by)
    alloted_till (DateField)
    working_status (BooleanField with default True)
    location (CharField with max length 50)
    """

    # Create and initialize the SQLite database
    conn = sqlite3.connect("db.sqlite3")
    cursor = conn.cursor()

    # openai.api_key = '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'

    cursor.execute(database_schema)

    conn.commit()
    conn.close()

    chat_with_database(database_schema)
