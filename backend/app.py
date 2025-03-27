from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from pymongo import MongoClient

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# Configure Google Gemini AI (Replace with your actual API Key)
GENAI_API_KEY = "AIzaSyB3tFOcObuObe_dR481XP2vlXukL-eiyBM"
genai.configure(api_key=GENAI_API_KEY)
model = genai.GenerativeModel("gemini-pro")

# Connect to MongoDB (Replace with your connection details)
client = MongoClient("mongodb://localhost:27017/")
db = client["donation_db"]
donation_stats = db["statistics"]

# Predefined donation-related prompts
predefined_responses = {
    "how to donate": "To donate, sign up on our website, select the items you want to donate, and choose the nearest collection center.",
    "what can be donated": "You can donate clothes, books, toys, stationery, electronic gadgets, and non-perishable food items.",
    "website details": "Our platform, Campus-Connect, Created by Rithwik Mohan connects students with underprivileged communities, allowing them to donate essential items seamlessly.",
    
}

# Function to fetch donation statistics from MongoDB
def get_donation_stats():
    stats = donation_stats.find_one({}, {"_id": 0})  # Get latest stats
    return stats if stats else {"total_donations": 0, "top_donors": []}

# Chatbot API endpoint
@app.route("/chatbot", methods=["POST"])
def chatbot():
    data = request.get_json()
    user_question = data.get("question", "").lower()

    # Check predefined responses
    for key, response in predefined_responses.items():
        if key in user_question:
            return jsonify({"response": response})

    # Check for donation statistics
    if "donation statistics" in user_question or "stats" in user_question:
        stats = get_donation_stats()
        response_text = f"Total donations: {stats['total_donations']}. Top donors: {', '.join(stats['top_donors'])}."
        return jsonify({"response": response_text})

    # If no predefined answer, use Gemini AI
    try:
        gemini_response = model.generate_content(user_question)
        return jsonify({"response": gemini_response.text})
    except Exception as e:
        return jsonify({"response": "I'm unable to process your request right now. Please try again later."})

# Run Flask app
if __name__ == "__main__":
    app.run(debug=True)