import { FOODS } from "@/lib/foods";
import { type MealLog } from "@/lib/mealLogs";
import { progressPercent } from "@/lib/protein";

type DailyProgressProps = {
    target: number;
    eaten: number;
    meals: MealLog[];
    onDelete: (id: string) => void;
};

export default function DailyProgress({ target, eaten, meals, onDelete }: DailyProgressProps) {
    const percent = progressPercent(eaten, target);
    const remaining = Math.max(0, Math.round((target - eaten) * 10) / 10);

    return (
        <section className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-ink-900">Today</h2>

            <div className="flex flex-col gap-2">
                <p className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-brand-700">{eaten} g</span>
                    <span className="text-lavender-700">of {target} g</span>
                </p>

            <div
                role="progressbar"
                aria-label="Protein eaten today"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={percent}
                className="h-3 overflow-hidden rounded-full bg-sand-100"
            >
                <div 
                    className="h-full rounded-full bg-brand-500 transition-all duration-500"
                    style={{ width: `${percent}%` }}
                />
            </div>

            <p className="text-sm text-ink-700">
                {remaining > 0 ? `${remaining} g to go.` : "Target reached for today."}
            </p>
        </div>

        {meals.length === 0 ? (
            <p className="text-sm text-lavender-700">Nothing logged yet today.</p>
        ) : (
            <ul className="flex flex-col">
                {meals.map((meal) => {
                    const foodName =
                        FOODS.find((food) => food.id === meal.foodId)?.name ?? meal.foodId;
                    const time = new Date(meal.eatenAt).toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                    });

                    return (
                        <li
                            key={meal.id}
                            className="flex items-center justify-between gap-3 border-t border-sand-200 py-2 text-sm"
                        >
                            <div className="flex flex-col">
                                <span className="font-medium text-ink-900">{foodName}</span>
                                <span className="text-lavender-700">
                                    {meal.grams} g at {time}
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="font-semibold text-ink-900">{meal.proteinG} g</span>
                                <button
                                    type="button"
                                    onClick={() => onDelete(meal.id)}
                                    aria-label={`Remove ${foodName} from today`}
                                    className="rounded-md px-2 py-1 text-xs font-medium text-brand-700 transition-colors duration-200 hover:bg-brand-50"
                                >
                                    Remove
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        )}
        </section>
    )
} 