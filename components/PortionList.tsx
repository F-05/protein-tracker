"use client";

import { type FoodCategory, type Food, FOODS } from "@/lib/foods";
import { gramsOfFoodNeeded } from "@/lib/protein";
import { useState } from "react";

type PortionListProps = {
    proteinPerMeal: number;
    onLog: (food: Food, grams: number) => void;
}

const CATEGORIES: { value: FoodCategory; label: string }[] = [
    { value: "meat", label: "Meat & poultry" },
    { value: "seafood", label: "Seafood" },
    { value: "dairy", label: "Eggs & dairy" },
    { value: "plant-based", label: "Plant-based" },
]

export default function PortionList({ proteinPerMeal, onLog }: PortionListProps) {
    const [openCategory, setOpenCategory] = useState<FoodCategory | null>("meat");

    return (
        <section className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-ink-900">
                To get {proteinPerMeal} g of protein in one meal, you can eat:
            </h2>
            <p className="text-sm text-lavender-700">
                Tap Add to log after eating a portion to count it towards your protein intake today.
            </p>
            <ul className="flex flex-col">
                {CATEGORIES.map((category) => {
                    const isOpen = openCategory === category.value;
                    const foods = FOODS.filter((food) => food.category === category.value);

                    return (
                        <li key={category.value} className="border-b border-sand-200 last:border-b-0">
                            <button
                                type="button"
                                onClick={() => setOpenCategory(isOpen ? null : category.value)}
                                aria-expanded={isOpen}
                                className="flex w-full items-center justify-between py-3 text-left"
                            >
                                <span className="text-sm font-semibold text-ink-900">
                                    {category.label}
                                </span>
                                <span
                                    className={`text-lavender-700 transition-transform duration-200 ${
                                        isOpen ? "rotate-180" : ""
                                    }`}
                                >
                                    ▾
                                </span>
                            </button>

                            {isOpen && (
                                <ul className="pb-2">
                                    {foods.map((food) => {
                                        const gramsNeeded = gramsOfFoodNeeded(food.proteinPer100g, proteinPerMeal);

                                        return (
                                            <li 
                                                key={food.id} 
                                                className="flex items-center justify-between gap-3 border-b border-sand-200 py-2 text-sm last:border-b-0"
                                            >
                                                <span className="text-ink-700">{food.name}</span>

                                                <div className="flex items-center gap-3">
                                                    <span className="font-medium text-ink-900">about {gramsNeeded} g</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => onLog(food, gramsNeeded)}
                                                        aria-label={`Add ${gramsNeeded} g of ${food.name} to your meal log`}
                                                        className="whitespace-nowrap rounded-md border border-brand-700 px-2 py-1 text-xs font-medium text-brand-700 transition-colors duration-200 hover:bg-brand-50"
                                                    >
                                                        + Add to log
                                                    </button>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </li>
                    );
                })}
            </ul>
            <p className="text-xs text-lavender-700">
                Note: Amounts are approximate values based on the protein content per 100 g of each food.
            </p>
        </section>
    )
}