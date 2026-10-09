export type Goal = "maintain" | "cut" | "bulk";

const PROTEIN_PER_KG: Record<Goal, number> = {
    maintain: 1.6,
    cut: 2.2,
    bulk: 1.8,
}

export function calculateDailyProtein(weightKg: number, goal: Goal): number {
    if (weightKg <= 0) {
        throw new Error("Weight must be greater than zero");
    }

    const multiplier = PROTEIN_PER_KG[goal];

    const dailyProtein = Math.round(weightKg * multiplier);

    return dailyProtein;
}

export function calculateProteinPerMeal(dailyProtein: number, mealsPerDay: number): number {
    if (mealsPerDay <= 0) {
        throw new Error("MealsPerDay must be greater than zero");
    }

    const proteinPerMeal = Math.round(dailyProtein / mealsPerDay);

    return proteinPerMeal;
}

export function gramsOfFoodNeeded(foodProteinPer100g: number, targetProtein: number): number {
    if (foodProteinPer100g <= 0) {
        throw new Error("Food protein per 100g must be greater than zero");
    }

    if (targetProtein < 0) {
        throw new Error("Target protein must be greater than zero");
    }

    if (targetProtein === 0) {
        return 0;
    }

    const exactGrams = (targetProtein / foodProteinPer100g) * 100;

    return Math.round(exactGrams / 5) * 5;
} 

export function proteinInPortion(grams: number, proteinPer100g: number): number {
    if (grams < 0) {
        throw new Error("Grams of food cannot be negative");
    }

    if (proteinPer100g < 0) {
        throw new Error("Food protein per 100g cannot be negative");
    }

    const proteinGrams = (grams * proteinPer100g) / 100;

    return Math.round(proteinGrams * 10) / 10;
}

export function totalProtein(amounts: number[]): number {
    let totalProtein = 0;

    for (const amount of amounts) {
        totalProtein += amount;
    }

    return Math.round(totalProtein * 10) / 10;
}