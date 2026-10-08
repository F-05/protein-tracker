"use client";

import { useState, useEffect } from "react";
import { calculateDailyProtein, calculateProteinPerMeal, type Goal } from "@/lib/protein";
import PortionList from "@/components/PortionList";
import { ensureSession } from "@/lib/auth";


const GOALS: { value: Goal; label: string }[] = [
  { value: "maintain", label: "Maintain" },
  { value: "bulk", label: "Bulk" },
  { value: "cut", label: "Cut" },
];

const labelClasses = "text-sm font-medium text-slate-700";

const fieldClasses =
"rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 transition-colors duration-200 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500";

export default function Home() {
  const [weight, setWeight] = useState("");
  const weightKg = Number(weight);

  const [goal, setGoal] = useState<Goal>("maintain");

  const [mealsPerDay, setMealsPerDay] = useState("3");
  const meals = Number(mealsPerDay);

  useEffect(() => {
    ensureSession();
  }, []);

  const dailyProtein = 
    weightKg > 0 ? calculateDailyProtein(weightKg, goal) : null;

  const proteinPerMeal =
    dailyProtein !== null && meals > 0
      ? calculateProteinPerMeal(dailyProtein, meals)
      : null;

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <main className="mx-auto flex max-w-4xl flex-col gap-4 md:flex-row md:items-start md:justify-center">
        <div className="flex w-full flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm md:w-96 md:shrink-0">
          <h1 className="text-2xl font-bold text-slate-900">Protein calculator</h1>
          <label className="flex flex-col gap-1">
            <span className={labelClasses}> Weight (kg)</span>
            <input
              className={fieldClasses}
              type="number"
              inputMode="decimal"
              min="0"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </label>

          <div className="flex flex-col gap-1">
            <span className={labelClasses}>Goal</span>
            <div className="grid grid-cols-3 gap-2">
              {GOALS.map((option) => {
                const isSelected = goal === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setGoal(option.value)}
                    aria-pressed={isSelected}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors duration-200 active:scale-95 ${
                      isSelected
                        ? "border-brand-500 bg-brand-500 text-white"
                        : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <label className="flex flex-col gap-1">
            <span className={labelClasses}>Meals per day</span>
            <input
              className={fieldClasses}
              type="number"
              inputMode="numeric"
              min="1"
              value={mealsPerDay}
              onChange={(e) => setMealsPerDay(e.target.value)}
            />
          </label>

          {dailyProtein !== null && proteinPerMeal !== null ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-brand-50 p-4">
                <p className="text-sm text-slate-500">Daily Protein Target</p>
                <p className="text-3xl font-bold text-brand-700">{dailyProtein} g</p>
              </div>
              <div className="rounded-xl bg-brand-50 p-4">
                <p className="text-sm text-slate-500">Protein per Meal</p>
                <p className="text-3xl font-bold text-brand-700">{proteinPerMeal} g</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              Please enter your weight and meals per day to calculate protein targets.
            </p>
          )}
        </div>

        {proteinPerMeal !== null && (
          <div className="w-full rounded-2xl bg-white p-6 shadow-sm md:flex-1">
            <PortionList proteinPerMeal={proteinPerMeal} />
          </div>
        )}
      </main>
    </div>
  )
}