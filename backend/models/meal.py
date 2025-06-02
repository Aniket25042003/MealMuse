from pydantic import BaseModel
from typing import List, Optional, Dict

class Dish(BaseModel):
    name: str
    description: str
    ingredients: List[str]
    cooking_time: Optional[str] = None  # e.g., "20 minutes"


class MealPlanDay(BaseModel):
    day: str  # e.g., "Monday"
    meals: List[str]  # Dish names or IDs

from typing import Dict

class WeeklyMealPlan(BaseModel):
    plan: Dict[str, Dict[str, str]]  # e.g., { "Monday": { "Breakfast": "..." } }

class GroceryItem(BaseModel):
    name: str
    category: Optional[str] = None  # e.g., "Produce", "Dairy"

class GroceryList(BaseModel):
    items: Dict[str, List[str]]  # e.g., { "Dairy": ["Milk"], "Produce": ["Bananas"] }
