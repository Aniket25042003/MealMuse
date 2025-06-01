from pydantic import BaseModel
from typing import List

class UserPreferences(BaseModel):
    diet: str  # Example: "vegan", "vegetarian", "keto"
    allergies: List[str] = []  # Example: ["nuts", "gluten"]
    dislikes: List[str] = []  # Example: ["mushrooms", "okra"]
