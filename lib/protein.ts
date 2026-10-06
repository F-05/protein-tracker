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