CREATE TABLE public.profiles (
    id uuid primary key references auth.users (id) on delete cascade,
    weight_kg numeric(5, 2) check (weight_kg > 0),
    goal text not null default 'maintain' check (goal in ('maintain', 'cut', 'bulk')),
    meals_per_day smallint not null default 3 check (meals_per_day between 1 and 10),
    updated_at timestamptz not null default now()
);

CREATE TABLE public.meal_logs (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
    food_id text not null,
    grams numeric(6, 1) not null check (grams > 0),
    protein_g numeric(6, 1) not null check (protein_g >= 0),
    eaten_at timestamptz not null default now()
);

CREATE INDEX idx_meal_logs_user_id_eaten_at
    ON public.meal_logs (user_id, eaten_at);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.meal_logs TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;

ALTER TABLE public.meal_logs ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow logged-in users to view their own meal logs"
    ON public.meal_logs FOR SELECT
    TO authenticated
    USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Allow logged-in users to insert their own meal logs"
    ON public.meal_logs FOR INSERT
    TO authenticated
    WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Allow logged-in users to update their own meal logs"
    ON public.meal_logs FOR UPDATE
    TO authenticated
    USING ((SELECT auth.uid()) = user_id)
    WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Allow logged-in users to delete their own meal logs"
    ON public.meal_logs FOR DELETE
    TO authenticated
    USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Allow logged-in users to view their own profile"
    ON public.profiles FOR SELECT
    TO authenticated
    USING ((SELECT auth.uid()) = id);

CREATE POLICY "Allow logged-in users to insert their own profile"
    ON public.profiles FOR INSERT
    TO authenticated
    WITH CHECK ((SELECT auth.uid()) = id);

CREATE POLICY "Allow logged-in users to update their own profile"
    ON public.profiles FOR UPDATE
    TO authenticated
    USING ((SELECT auth.uid()) = id)
    WITH CHECK ((SELECT auth.uid()) = id);

CREATE POLICY "Allow logged-in users to delete their own profile"
    ON public.profiles FOR DELETE
    TO authenticated
    USING ((SELECT auth.uid()) = id);

-- Using filters which existing rows a user can see or act on
-- With check validates rows being written, so a user can't insert a row under someone else's id. 