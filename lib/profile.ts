import { supabase } from "@/lib/supabase";
import { type Goal } from "@/lib/protein";

export type Profile = {
    weightKg: number;
    goal: Goal;
    mealsPerDay: number;
};

export async function loadProfile(): Promise<Profile | null> {
    const { data, error } = await supabase
        .from("profiles")
        .select("weight_kg, goal, meals_per_day")
        .maybeSingle();

    if (error) throw new Error(error.message);
    if (!data || data.weight_kg === null) return null;

    return {
        weightKg: data.weight_kg,
        goal: data.goal,
        mealsPerDay: data.meals_per_day,
    };
}

export async function saveProfile(profile: Profile): Promise<void> {
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData.session?.user.id;

    if (!userId) throw new Error("Not signed in");

    const { error } = await supabase.from("profiles").upsert({
        id: userId,
        weight_kg: profile.weightKg,
        goal: profile.goal,
        meals_per_day: profile.mealsPerDay,
        updated_at: new Date().toISOString(),
    });

    if (error) throw new Error(error.message);
}
