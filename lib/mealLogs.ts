import { supabase } from "@/lib/supabase";

export type NewMealLog = {
    foodId: string;
    grams: number;
    proteinG: number;
};

export async function logMeal(meal: NewMealLog): Promise<void> {
    const { error } = await supabase.from("meal_logs").insert({
        food_id: meal.foodId,
        grams: meal.grams,
        protein_g: meal.proteinG,
    });

    if (error) throw new Error(error.message);
}
