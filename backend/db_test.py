from pymongo import MongoClient

client = MongoClient("mongodb+srv://Santhu:2610@cluster1.zdau8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1")
db = client["donation_db"]
db.statistics.insert_one({"total_donations": 50, "top_donors": ["Rithwik", "Santhosh"]})
print("Data inserted successfully!")
