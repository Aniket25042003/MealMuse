from mealmuse_crew.src.mealmuse_crew.crew import MealmuseCrew
from models.ingredient import IngredientList
from models.preference import UserPreferences
from datetime import datetime

def run_mealmuse_crew(inventory: IngredientList, preferences: UserPreferences) -> dict:
    # Convert structured models to a plain dictionary input for CrewAI
    inputs = {
        "fridge_items": [item.name for item in inventory.items],
        "user_preferences": {
            "diet": preferences.diet,
            "allergies": preferences.allergies,
            "dislikes": preferences.dislikes
        },
        "grocery_history": ["spinach", "onions", "milk", "bread", "eggs", "pasta", "cheese"]  # Optional: Replace with Firestore
    }

    # Run your agent system
    crew = MealmuseCrew().crew()
    result = crew.kickoff(inputs=inputs)

    # You can structure the result output format here (or have agents return JSON-ready output)
    return result
