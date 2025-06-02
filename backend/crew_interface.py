import sys
import os
import json
import re

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../mealmuse_crew")))
from src.mealmuse_crew.crew import MealmuseCrew
from models.ingredient import IngredientList
from models.preference import UserPreferences

def run_mealmuse_crew(inventory: IngredientList, preferences: UserPreferences) -> dict:
    inputs = {
        "fridge_items": [item.name for item in inventory.items],
        "user_preferences": {
            "diet": preferences.diet,
            "allergies": preferences.allergies,
            "dislikes": preferences.dislikes
        },
        "grocery_history": ["spinach", "onions", "milk", "bread", "eggs", "pasta", "cheese"]
    }

    crew = MealmuseCrew().crew()
    result = crew.kickoff(inputs=inputs)

    try:
        result_str = str(result).strip()

        # Remove Markdown fencing and extract JSON block
        json_match = re.search(r"```json\n(.*?)```", result_str, re.DOTALL)
        if json_match:
            clean_json = json_match.group(1).strip()
        else:
            # Fallback: try to find first JSON-looking block
            json_start = result_str.find('{')
            json_end = result_str.rfind('}') + 1
            clean_json = result_str[json_start:json_end]

        parsed_output = json.loads(clean_json)
        return parsed_output

    except Exception as e:
        raise ValueError(f"Failed to parse Crew result as JSON. Got:\n{result_str}\n\nError: {e}")
