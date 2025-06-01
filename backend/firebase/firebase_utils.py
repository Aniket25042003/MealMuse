import firebase_admin
from firebase_admin import credentials, firestore, auth
from fastapi import HTTPException
from models.preference import UserPreferences
from typing import List

# Initialize Firebase only once
if not firebase_admin._apps:
    cred = credentials.Certificate("firebase/serviceAccountKey.json")
    firebase_admin.initialize_app(cred)

db = firestore.client()

# ------------------ Authentication ------------------ #

def verify_firebase_token(id_token: str) -> str:
    """
    Verifies the Firebase ID token and returns the user's UID.
    """
    try:
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token["uid"]
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Invalid Firebase token: {e}")

# ------------------ Preferences ------------------ #

def save_user_preferences(user_id: str, prefs: UserPreferences):
    doc_ref = db.collection("users").document(user_id)
    doc_ref.set({"preferences": prefs.dict()}, merge=True)

def get_user_preferences(user_id: str) -> UserPreferences:
    doc_ref = db.collection("users").document(user_id)
    doc = doc_ref.get()
    if doc.exists and "preferences" in doc.to_dict():
        return UserPreferences(**doc.to_dict()["preferences"])
    else:
        return UserPreferences(diet="vegetarian", allergies=[], dislikes=[])

# ------------------ Grocery History ------------------ #

def save_grocery_history(user_id: str, items: List[str]):
    doc_ref = db.collection("users").document(user_id)
    doc_ref.set({"grocery_history": items}, merge=True)

def get_grocery_history(user_id: str) -> List[str]:
    doc_ref = db.collection("users").document(user_id)
    doc = doc_ref.get()
    if doc.exists and "grocery_history" in doc.to_dict():
        return doc.to_dict()["grocery_history"]
    return []
