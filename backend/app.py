from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from pymongo import MongoClient

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure Google Gemini AI
GENAI_API_KEY = "YOUR_API_KEY"  # Replace with a valid API key
genai.configure(api_key=GENAI_API_KEY)
model = genai.GenerativeModel("gemini-pro")

# Connect to MongoDB
try:
    client = MongoClient("mongodb+srv://Santhu:2610@cluster1.zdau8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1")
    db = client["donation_db"]
    donation_stats = db["statistics"]
    print("✅ MongoDB connected successfully")

except Exception as e:
    print("❌ MongoDB connection failed:", e)

# Predefined donation-related responses
predefined_responses = {
    "how to donate": "To donate, sign up on our website, select items, and choose a collection center.",
    "what can be donated": "Books, clothes, toys, stationery, electronics, and non-perishable food items.",
    "website details": "Campus-Connect allows students to donate essential items seamlessly.",
    "what is campus connect?": "campus connect is a platform where students can donate old books and clothes to those in need, such as orphanages and underprivileged communities.",
  "how does this platform work?": "you can sign up, list the items you want to donate, and track where they go. we ensure donations reach verified recipients.",
  "who can use this platform?": "any student who wants to donate books or clothes, and any registered organization looking for donations.",
  "is this service free?": "yes! campus connect is completely free to use for both donors and recipients.",
  "how can i donate books?": "after signing in, go to the 'donate now' section, upload details of the books you want to donate, and we will guide you through the process.",
  "where do the donated clothes go?": "we distribute donations to orphanages, ngos, and underprivileged students.",
  "what types of books and clothes can i donate?": "you can donate schoolbooks, college textbooks, novels, and general knowledge books. clothes should be in good condition, washed, and wearable.",
  "is there a pickup service for donations?": "currently, we do not offer pickups, but we will guide you to the nearest drop-off location.",
  "can i donate used books?": "yes! used books are welcome as long as they are in readable condition.",
  "how do i track my donations?": "you can check the 'my donations' section in your profile to see where your donated items have been sent.",
  "how do i sign up on campus connect?": "click 'sign up', enter your username, phone number, email, roll number, and password, and create your account.",
  "i forgot my password. how do i reset it?": "go to the 'forgot password?' section on the login page and follow the instructions to reset your password.",
  "how can i update my profile details?": "go to your profile settings and update your personal information.",
  "can i delete my account?": "if you wish to delete your account, please contact support from the 'help & support' section.",
  "how do i earn points for donating?": "you earn points based on the number and quality of donations. more meaningful donations = more points!",
  "what can i do with my reward points?": "your reward points can be used for leaderboard rankings, redeeming special rewards (if applicable), or earning social recognition.",
  "do my points expire?": "no, your points remain valid as long as your account is active.",
  "how do i know who gets my donations?": "we partner with verified organizations, and you can track where your donation is sent from the 'my donations' page.",
  "can i choose which orphanage/school receives my items?": "yes! during donation, you can select from a list of verified recipients.",
  "are there any upcoming donation events?": "visit the 'events' section to stay updated on upcoming donation drives.",
  "can i volunteer for donation drives?": "yes! you can sign up as a volunteer in the 'volunteer' section of the platform.",
  "how do i connect with other donors?": "join our community forums or social media groups to engage with other donors.",
  "are there any donation events near me?": "check the 'events' section for donation drives happening in your area.",
  "i’m having trouble logging in. what should i do?": "make sure your credentials are correct. if the problem persists, reset your password or contact support.",
  "the website/app is not working properly. how can i report a bug?": "go to the 'help & support' section and submit a bug report with details.",
  "my donation status is not updating. who should i contact?": "if your donation is not updating, please wait for verification. if the issue continues, contact Rithwik Mohan for support(Contactnom : 8019853653..calls only !!) through the 'my donations' page."
}    

# Fetch donation statistics
def get_donation_stats():
    stats = donation_stats.find_one({}, {"_id": 0})
    if not stats:
        return {"total_donations": 0, "top_donors": []}
    return stats

# Chatbot API
@app.route("/chatbot", methods=["POST"])
def chatbot():
    data = request.get_json()
    user_question = data.get("question", "").lower()

    # Check predefined responses
    for key, response in predefined_responses.items():
        if key in user_question:
            return jsonify({"response": response})

    # Check donation statistics
    if "donation statistics" in user_question or "stats" in user_question:
        stats = get_donation_stats()
        return jsonify({
            "response": f"Total donations: {stats['total_donations']}. Top donors: {', '.join(stats['top_donors'])}."
        })

    # Use Gemini AI for other questions
    try:
        gemini_response = model.generate_content(user_question)
        if hasattr(gemini_response, "text"):
            return jsonify({"response": gemini_response.text})
        else:
            return jsonify({"response": "Gemini AI could not generate a response."})
    except Exception as e:
        return jsonify({"response": "I'm unable to process your request now. Please try again later."})

# Run Flask app
if __name__ == "__main__":
    app.run(debug=True)
