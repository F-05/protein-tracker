"use client";

import { type FoodCategory, FOODS } from "@/lib/foods";
import { gramsOfFoodNeeded } from "@/lib/protein";
import { useState } from "react";

type PortionListProps = {
    proteinPerMeal: number;
}

const CATEGORIES: { value: FoodCategory; label: string }[] = [
    { value: "meat", label: "Meat & poultry" },
    { value: "seafood", label: "Seafood" },
    { value: "dairy", label: "Eggs & dairy" },
    { value: "plant-based", label: "Plant-based" },
]

export default function PortionList({ proteinPerMeal }: PortionListProps) {
    const [openCategory, setOpenCategory] = useState<FoodCategory | null>("meat");

    return (
        <section className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-slate-900">
                To get {proteinPerMeal} g of protein in one meal, you can eat:
            </h2>
            <ul className="flex flex-col">
                {CATEGORIES.map((category) => {
                    const isOpen = openCategory === category.value;
                    const foods = FOODS.filter((food) => food.category === category.value);

                    return (
                        <li key={category.value} className="border-b border-slate-200 last:border-b-0">
                            <button
                                type="button"
                                onClick={() => setOpenCategory(isOpen ? null : category.value)}
                                aria-expanded={isOpen}
                                className="flex w-full items-center justify-between py-3 text-left"
                            >
                                <span className="text-sm font-semibold text-slate-900">
                                    {category.label}
                                </span>
                                <span
                                    className={`text-slate-500 transition-transform duration-200 ${
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
                                                className="flex justify-between border-b border-slate-200 py-2 text-sm last:border-b-0"
                                            >
                                                <span className="text-slate-700">{food.name}</span>
                                                <span className="font-medium text-slate-900">about {gramsNeeded} g</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </li>
                    );
                })}
            </ul>
            <p className="text-xs text-slate-500">
                Note: Amounts are approximate values based on the protein content per 100 g of each food.
            </p>
        </section>
    )
}