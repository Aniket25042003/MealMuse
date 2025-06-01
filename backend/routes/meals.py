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
    result = run_mealmuse_crew(inventory=inventory, preferences=preferences)

    return {
        "dishes": result["dishes"],
        "meal_plan": result["meal_plan"],
        "grocery_list": result["grocery_list"]
    }
