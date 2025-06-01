from pydantic import BaseModel
from typing import List

class Ingredient(BaseModel):
    name: str
    quantity: str = ""  # Optional, e.g., "2 cups", "1 piece"

class IngredientList(BaseModel):
    items: List[Ingredient]
