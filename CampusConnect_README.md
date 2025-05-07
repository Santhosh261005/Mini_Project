🎓 Campus Connect – Student-Driven Donation Platform

Campus Connect is a student-led donation platform that enables students and faculty to donate books, clothes, and essential items to verified NGOs, orphanages, and shelters. It leverages AI, real-time tracking, and gamification to promote social impact within the campus community and beyond.

🚀 Features

👥 Dual Login System
Student/Donor Login: Donate items, track impact, earn badges.

NGO/Admin Login: Post requirements, manage donations, upload proofs.

📦 Smart Donation Flow
Donate items based on NGO needs and ratings

Real-time inventory tracking and NGO suggestions

💬 AI-Powered Chatbot
Handles FAQs

Recommends NGOs based on needs, past performance, and user behavior

🏅 Rewards & Leaderboard
Students earn badges and climb a leaderboard based on their contributions.

🌍 Map & Media Support
View NGOs on a map with location-based filtering

Media uploads for transparency (donation proofs, photos)

🛠️ Tech Stack
Frontend
React.js

Tailwind CSS

Axios

Backend
Node.js with Express.js

MongoDB for database

Firebase for authentication and email/SMS notifications

JWT for secure user sessions

AI & Integrations
OpenAI API – Chatbot and recommendation logic

NodeMail – SMS/Email updates

Google Maps API – NGO location mapping

🗂️ Project Structure (Backend)
bash
Copy
Edit
backend/
│
├── config/           # DB connection
├── controllers/      # Auth and donation logic
├── middlewares/      # Auth, error handling
├── models/           # Mongoose schemas (User, Donation)
├── routes/           # API routes (auth, donation)
├── utils/            # JWT helpers, Firebase utils
├── index.js
└── .env

✨ Pages Overview (Frontend)
Signup.js / Login.js – Dual login for Donors & Admins

Dashboard.js – Stats overview for users

DonateNow.js – Submit donation forms

Ngo.js – Browse NGOs, requirements & ratings

Rewards.js – Gamification badges & leaderboard

Chatbot.js – AI assistant

AboutOrphanage.js - To update orphanage details

PostRequirements.js - To post Orphanage Requirements

AdminOptions.js – NGO post requirements, upload media

📌 Roadmap
 Basic Signup/Login with JWT

 Donor & NGO role separation

 AI Chatbot integration

 Rewards & leaderboard

 NGO verification system

 Admin analytics dashboard

 Expand to multiple universities

🧠 Future Enhancements
LLM-based smart NGO matching

Blockchain-based donation transparency

College-wide donation challenges

Mobile App using React Native

🤝 Contribution
Want to contribute? Great! Please fork the repo, make changes, and submit a pull request. You can also:

Report issues

Suggest features

Join as an open-source contributor!


📬 Contact
Developed by:
<Santhosh> –www.linkedin.com/in/jakku-santhosh-reddy-b2391920a 
<Rithwik> - https://www.linkedin.com/in/rithwik-mohan/



