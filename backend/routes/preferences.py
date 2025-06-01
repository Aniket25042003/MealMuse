from fastapi import APIRouter, Depends, Header
from models.preference import UserPreferences
from firebase.firebase_utils import (
    verify_firebase_token,
    save_user_preferences,
    get_user_preferences
)

router = APIRouter()

def get_user_id(authorization: str = Header(...)) -> str:
    """
    Extracts and verifies the Firebase token from the Authorization header.
    """
    if not authorization.startswith("Bearer "):
        raise ValueError("Authorization header must be Bearer token")
    token = authorization.split("Bearer ")[-1]
    return verify_firebase_token(token)

@router.post("/preferences")
async def save_prefs(prefs: UserPreferences, user_id: str = Depends(get_user_id)):
    save_user_preferences(user_id, prefs)
    return {"status": "Preferences saved"}

@router.get("/preferences", response_model=UserPreferences)
async def fetch_prefs(user_id: str = Depends(get_user_id)):
    return get_user_preferences(user_id)
