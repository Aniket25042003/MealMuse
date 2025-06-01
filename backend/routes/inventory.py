from fastapi import APIRouter, UploadFile, File, Form
from typing import List
from models.ingredient import IngredientList, Ingredient

router = APIRouter()

@router.post("/upload-inventory", response_model=IngredientList)
async def upload_inventory(
    ingredients: List[str] = Form(None),
    file: UploadFile = File(None)
):
    if ingredients:
        ingredient_objs = [Ingredient(name=i) for i in ingredients]
        return {"items": ingredient_objs}
    
    if file:
        # Placeholder: Normally you’d process the image with a model
        # e.g., send to Hugging Face endpoint and return item names
        detected_items = ["milk", "spinach", "cheese"]
        ingredient_objs = [Ingredient(name=i) for i in detected_items]
        return {"items": ingredient_objs}
    
    return {"items": []}
