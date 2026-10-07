import { describe, it, expect } from "vitest";
import { calculateDailyProtein, calculateProteinPerMeal, gramsOfFoodNeeded } from "./protein";

describe("calculateDailyProtein", () => {
    it("returns 128 g for 80 kg on maintain", () =>  {
        expect(calculateDailyProtein(80, "maintain")).toBe(128);
    });

    it("returns 144 g for 80 kg on bulk", () =>  {
        expect(calculateDailyProtein(80, "bulk")).toBe(144);
    });

    it("returns 176 g for 80 kg on cut", () =>  {
        expect(calculateDailyProtein(80, "cut")).toBe(176);
    });

    it("rounding cases, returns 130 g for 81 kg on maintain", () =>  {
        expect(calculateDailyProtein(81, "maintain")).toBe(130);
    });

    it("throws when weight is zero", () => {
        expect(() => calculateDailyProtein(0, "maintain")).toThrow();
    });

    it("throws when weight is negative", () => {
        expect(() => calculateDailyProtein(-10, "maintain")).toThrow();
    });
});

describe("calculateProteinPerMeal", () => {
    it("returns 32 g for 128 g daily protein and 4 meals", () => {
        expect(calculateProteinPerMeal(128, 4)).toBe(32);
    });

    it("rounding cases, returns 33 g for 100 g daily protein and 3 meals", () => {
        expect(calculateProteinPerMeal(100, 3)).toBe(33);
    });

    it("throws when mealsPerDay is zero", () => {
        expect(() => calculateProteinPerMeal(128, 0)).toThrow();
    });

    it("throws when mealsPerDay is negative", () => {
        expect(() => calculateProteinPerMeal(128, -2)).toThrow();
    });
});

describe("gramsOfFoodNeeded", () => {
    it("returns 140 g for food with 31 g protein per 100 g and target of 43 g protein", () => {
        expect(gramsOfFoodNeeded(31, 43)).toBe(140);
    });

    it("returns 135 g for food with 31 g protein per 100 g and target of 42 g protein", () => {
        expect(gramsOfFoodNeeded(31, 42)).toBe(135);
    });

    it("returns 0 g for food with 31 g protein per 100 g and target of 0 g protein", () => {
        expect(gramsOfFoodNeeded(31, 0)).toBe(0);
    });

    it("throws when foodProteinPer100g is negative", () => {
        expect(() => gramsOfFoodNeeded(-31, 43)).toThrow();
    });

    it("throws when foodProteinPer100g is zero", () => {
        expect(() => gramsOfFoodNeeded(0, 43)).toThrow();
    });

    it("throws when targetProtein is negative", () => {
        expect(() => gramsOfFoodNeeded(31, -43)).toThrow();
    });
})