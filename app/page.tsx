"use client";

import { useState } from "react";
import { calculateDailyProtein } from "@/lib/protein";
import { Goal } from "@/lib/protein";

export default function Home() {
  const [weight, setWeight] = useState("");
  const weightKg = Number(weight);

  const [goal, setGoal] = useState<Goal>("maintain");

  const [mealPerDay, setMealsPerDay] = useState(3);
  
  const dailyProtein = 
    weightKg > 0 ? calculateDailyProtein(weightKg, goal) : null;

  return (
    <main>
      <h1>Protein calculator</h1>

      <label>
        Weight (kg):
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </label>

      <label>
        Goal:
        <select value={goal} onChange={(e) => setGoal(e.target.value as Goal)}>
          <option value="maintain">Maintain</option>
          <option value="bulk">Bulk</option>
          <option value="cut">Cut</option>
        </select>
      </label>

      <label>
        Meals per day:
        <input
          type="number"
          value={mealPerDay}
          onChange={(e) => setMealsPerDay(Number(e.target.value))}
        />
      </label>

      {dailyProtein !== null && <p>Daily target: {dailyProtein} g</p>}
      {dailyProtein !== null && mealPerDay > 0 && (
        <p>Protein per meal: {Math.round(dailyProtein / mealPerDay)} g</p>
      )}
    </main>
  )
}