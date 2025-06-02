#!/usr/bin/env python
from dotenv import load_dotenv
load_dotenv()
import os
os.environ["GROQ_API_KEY"] = os.getenv("GROQ_API_KEY")

import sys
import warnings


from mealmuse_crew.crew import MealmuseCrew

warnings.filterwarnings("ignore", category=SyntaxWarning, module="pysbd")

# Sample inputs for the MealMuse app (these will be used by CrewAI tasks)
def get_sample_inputs():
    return {
        "fridge_items": [
            "spinach", "cherry tomatoes", "eggs", "milk", "cheddar cheese"
        ],
        "user_preferences": {
            "diet": "vegetarian",
            "allergies": ["nuts"],
            "dislikes": ["mushrooms"]
        },
        "grocery_history": [
            "spinach", "onions", "milk", "bread", "eggs", "pasta", "cheese", "bell peppers"
        ]
    }

def run():
    """
    Run the MealMuse crew using sample fridge and user data.
    """
    inputs = get_sample_inputs()
    try:
        MealmuseCrew().crew().kickoff(inputs=inputs)
    except Exception as e:
        raise Exception(f"An error occurred while running the crew: {e}")

def train():
    """
    Train the crew for a given number of iterations.
    """
    inputs = get_sample_inputs()
    try:
        MealmuseCrew().crew().train(n_iterations=int(sys.argv[1]), filename=sys.argv[2], inputs=inputs)
    except Exception as e:
        raise Exception(f"An error occurred while training the crew: {e}")

def replay():
    """
    Replay the crew execution from a specific task.
    """
    try:
        MealmuseCrew().crew().replay(task_id=sys.argv[1])
    except Exception as e:
        raise Exception(f"An error occurred while replaying the crew: {e}")

def test():
    """
    Test the crew execution and return results.
    """
    inputs = get_sample_inputs()
    try:
        MealmuseCrew().crew().test(n_iterations=int(sys.argv[1]), eval_llm=sys.argv[2], inputs=inputs)
    except Exception as e:
        raise Exception(f"An error occurred while testing the crew: {e}")
