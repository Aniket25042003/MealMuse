from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from crewai.agents.agent_builder.base_agent import BaseAgent
from typing import List

@CrewBase
class MealmuseCrew():
    """MealmuseCrew crew for smart meal planning"""

    agents: List[BaseAgent]
    tasks: List[Task]

    @agent
    def inventory_analyzer(self) -> Agent:
        return Agent(
            config=self.agents_config['inventory_analyzer'],  # type: ignore[index]
            verbose=True
        )

    @agent
    def preference_filter(self) -> Agent:
        return Agent(
            config=self.agents_config['preference_filter'],  # type: ignore[index]
            verbose=True
        )

    @agent
    def dish_generator(self) -> Agent:
        return Agent(
            config=self.agents_config['dish_generator'],  # type: ignore[index]
            verbose=True
        )

    @agent
    def meal_planner(self) -> Agent:
        return Agent(
            config=self.agents_config['meal_planner'],  # type: ignore[index]
            verbose=True
        )

    @agent
    def grocery_gap_identifier(self) -> Agent:
        return Agent(
            config=self.agents_config['grocery_gap_identifier'],  # type: ignore[index]
            verbose=True
        )

    @task
    def analyze_inventory_task(self) -> Task:
        return Task(
            config=self.tasks_config['analyze_inventory_task'],  # type: ignore[index]
        )

    @task
    def filter_preferences_task(self) -> Task:
        return Task(
            config=self.tasks_config['filter_preferences_task'],  # type: ignore[index]
        )

    @task
    def generate_dishes_task(self) -> Task:
        return Task(
            config=self.tasks_config['generate_dishes_task'],  # type: ignore[index]
        )

    @task
    def plan_meals_task(self) -> Task:
        return Task(
            config=self.tasks_config['plan_meals_task'],  # type: ignore[index]
        )

    @task
    def identify_grocery_gaps_task(self) -> Task:
        return Task(
            config=self.tasks_config['identify_grocery_gaps_task'],  # type: ignore[index]
        )

    @crew
    def crew(self) -> Crew:
        """Creates the MealmuseCrew crew"""
        return Crew(
            agents=self.agents,
            tasks=self.tasks,
            process=Process.sequential,
            verbose=True,
        )
