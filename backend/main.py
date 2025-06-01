from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes import inventory, meals, preferences

app = FastAPI(
    title="MealMuse API",
    description="Smart Meal Planner powered by CrewAI + Hugging Face",
    version="1.0.0"
)

# Allow frontend access (adjust origin if needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(inventory.router, prefix="/api")
app.include_router(meals.router, prefix="/api")
app.include_router(preferences.router, prefix="/api")

@app.get("/")
def root():
    return {"message": "MealMuse backend is running!"}
