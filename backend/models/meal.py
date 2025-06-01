from pydantic import BaseModel
from typing import List, Optional

class Dish(BaseModel):
    name: str
    description: str
    ingredients: List[str]
    cooking_time_minutes: Optional[int] = None
    tags: List[str] = []

class MealPlanDay(BaseModel):
    day: str  # e.g., "Monday"
    meals: List[str]  # Dish names or IDs

class WeeklyMealPlan(BaseModel):
    plan: List[MealPlanDay]

class GroceryItem(BaseModel):
    name: str
    category: Optional[str] = None  # e.g., "Produce", "Dairy"

class GroceryList(BaseModel):
    missing_items: List[GroceryItem]
