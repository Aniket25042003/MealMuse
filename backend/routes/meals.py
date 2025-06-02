from fastapi import APIRouter
from models.ingredient import IngredientList
from models.preference import UserPreferences
from models.meal import Dish, WeeklyMealPlan, GroceryList
from typing import List

from crew_interface import run_mealmuse_crew

router = APIRouter()

@router.post("/generate-meals")
async def generate_meals(
    inventory: IngredientList,
    preferences: UserPreferences
):
    try:
        result = run_mealmuse_crew(inventory=inventory, preferences=preferences)

        # If result is not a dict with all keys, extract safely
        dishes = result.get("dishes") if isinstance(result, dict) else result if isinstance(result, list) else []
        meal_plan = result.get("meal_plan", {}) if isinstance(result, dict) else {}
        grocery_list = result.get("grocery_list", []) if isinstance(result, dict) else []

        return {
            "dishes": dishes,
            "meal_plan": meal_plan,
            "grocery_list": grocery_list
        }
    except Exception as e:
        return {
            "error": f"Meal generation failed: {str(e)}"
        }

