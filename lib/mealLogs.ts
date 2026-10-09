import { supabase } from "@/lib/supabase";

export type NewMealLog = {
    foodId: string;
    grams: number;
    proteinG: number;
};

export type MealLog = NewMealLog & {
    id: string;
    eatenAt: string;
};

type MealLogRow = {
    id: string;
    food_id: string;
    grams: number;
    protein_g: number;
    eaten_at: string;
};

function toMealLog(row: MealLogRow): MealLog {
    return {
        id: row.id,
        foodId: row.food_id,
        grams: row.grams,
        proteinG: row.protein_g,
        eatenAt: row.eaten_at,
    };
}

export async function logMeal(meal: NewMealLog): Promise<MealLog> {
    const { data, error } = await supabase
        .from("meal_logs")
        .insert({
            food_id: meal.foodId,
            grams: meal.grams,
            protein_g: meal.proteinG,
        })
        .select()
        .single();

    if (error) throw new Error(error.message);
    return toMealLog(data);
}

export async function loadTodaysMeals(): Promise<MealLog[]> {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const { data, error } = await supabase
        .from("meal_logs")
        .select()
        .gte("eaten_at", startOfToday.toISOString())
        .order("eaten_at", { ascending: false });

    if (error) throw new Error(error.message);
    return data.map(toMealLog);
}

export async function deleteMeal(id: string): Promise<void> {
    const { error } = await supabase.from("meal_logs").delete().eq("id", id);

    if (error) throw new Error(error.message);
}
