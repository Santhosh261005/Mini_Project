from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from pymongo import MongoClient

# Initialize Flask app
app = Flask(__name__)
CORS(app)

genai.configure(api_key="AIzaSyBqz9fG2a903h7DjLFIHm5mVxiWO-17jxU")
model = genai.GenerativeModel("gemini-1.5-pro-latest")

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
    "what is campus connect": "Campus Connect is a platform where students can donate old books and clothes to those in need, such as orphanages and underprivileged communities.",
    "how does this platform work": "You can sign up, list the items you want to donate, and track where they go. We ensure donations reach verified recipients.",
    "who can use this platform": "Any student who wants to donate books or clothes, and any registered organization looking for donations.",
    "is this service free": "Yes! Campus Connect is completely free to use for both donors and recipients.",
    "how can i donate books": "After signing in, go to the 'donate now' section, upload details of the books you want to donate, and we will guide you through the process.",
    "where do the donated clothes go": "We distribute donations to orphanages, NGOs, and underprivileged students.",
    "what types of books and clothes can i donate": "You can donate schoolbooks, college textbooks, novels, and general knowledge books. Clothes should be in good condition, washed, and wearable.",
    "is there a pickup service for donations": "Currently, we do not offer pickups, but we will guide you to the nearest drop-off location.",
    "can i donate used books": "Yes! Used books are welcome as long as they are in readable condition.",
    "how do i track my donations": "You can check the 'my donations' section in your profile to see where your donated items have been sent.",
    "how do i sign up on campus connect": "Click 'sign up', enter your username, phone number, email, roll number, and password, and create your account.",
    "i forgot my password how do i reset it": "Go to the 'forgot password?' section on the login page and follow the instructions to reset your password.",
    "how can i update my profile details": "Go to your profile settings and update your personal information.",
    "can i delete my account": "If you wish to delete your account, please contact support from the 'help & support' section.",
    "how do i earn points for donating": "You earn points based on the number and quality of donations. More meaningful donations = more points!",
    "what can i do with my reward points": "Your reward points can be used for leaderboard rankings, redeeming special rewards (if applicable), or earning social recognition.",
    "do my points expire": "No, your points remain valid as long as your account is active.",
    "how do i know who gets my donation": "We partner with verified organizations, and you can track where your donation is sent from the 'my donations' page.",
    "can i choose which orphanage/school receives my items": "Yes! During donation, you can select from a list of verified recipients.",
    "are there any upcoming donation events": "Visit the 'events' section to stay updated on upcoming donation drives.",
    "can i volunteer for donation drives": "Yes! You can sign up as a volunteer in the 'volunteer' section of the platform.",
    "how do i connect with other donors": "Join our community forums or social media groups to engage with other donors.",
    "are there any donation events near me": "Check the 'events' section for donation drives happening in your area.",
    "i'm having trouble logging in what should i do": "Make sure your credentials are correct. If the problem persists, reset your password or contact support.",
    "the website/app is not working properly how can i report a bug": "Go to the 'help & support' section and submit a bug report with details.",
    "my donation status is not updating who should i contact": "If your donation is not updating, please wait for verification. If the issue continues, contact Rithwik Mohan for support (Contactnom: 8019853653..calls only!!) through the 'my donations' page."
}

# Context for Gemini AI to keep responses focused on Campus Connect
CAMPUS_CONNECT_CONTEXT = """
You are a helpful assistant for Campus Connect, a platform where students can donate books, clothes, and other essential items to those in need. 

Key Features:
1. Donation System: Students can donate books, clothes, toys, stationery, electronics, and non-perishable food items.
2. Tracking: Donors can track where their donations go.
3. Reward Points: Users earn points for donations which can be used for leaderboard rankings or rewards.
4. Community: Platform connects donors with verified recipients like orphanages and underprivileged communities.

Only answer questions related to Campus Connect or donation processes. For unrelated questions, politely decline and guide back to platform topics.
"""

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
    user_question = data.get("question", "").lower().strip()
    
    # First interaction welcome message
    if not hasattr(chatbot, "is_first_interaction"):
        chatbot.is_first_interaction = True
        return jsonify({
            "response": "Welcome to Campus-Connect! This platform allows students to donate books, clothes, and other essential items to those in need. Please ask any questions related to the donation process, and I'll guide you."
        })
    
    # Check predefined responses
    for key in predefined_responses:
        if key in user_question:
            return jsonify({"response": predefined_responses[key]})

    # Check donation statistics
    if "donation statistics" in user_question or "stats" in user_question:
        stats = get_donation_stats()
        return jsonify({
            "response": f"Current Campus Connect donation statistics: Total donations: {stats['total_donations']}. Top donors: {', '.join(stats['top_donors'])}."
        })

    # Use Gemini AI with Campus Connect context
    try:
        # Combine context with user question
        prompt = f"{CAMPUS_CONNECT_CONTEXT}\n\nUser Question: {user_question}\n\nPlease provide a helpful response focused on Campus Connect donation platform:"
        
        gemini_response = model.generate_content(prompt)
        if hasattr(gemini_response, "text"):
            # Verify response is relevant to Campus Connect
            response_text = gemini_response.text
            if any(keyword in response_text.lower() for keyword in ["campus connect", "donation", "donate"]):
                return jsonify({"response": response_text})
            else:
                return jsonify({"response": "I can only answer questions related to Campus Connect donation platform. Please ask about donations, rewards, or how our platform works."})
        else:
            return jsonify({"response": "I couldn't generate a response. Please ask about Campus Connect donation platform features."})
    except Exception as e:
        print("Gemini Error:", e)
        return jsonify({"response": "I'm unable to process your request now. Please try again later with a question about Campus Connect."})

# Run Flask app
if __name__ == "__main__":
    app.run(debug=True)