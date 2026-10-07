export type FoodCategory = "meat" | "seafood" | "dairy" | "plant-based";

export type Food = {
    id: string;
    name: string;
    category: FoodCategory;
    proteinPer100g: number;
    caloriesPer100g?: number;    
}

export const FOODS: Food[] = [
  // Meat and poultry
  { id: "chicken-breast", name: "Chicken breast (cooked)", category: "meat", proteinPer100g: 31 },
  { id: "chicken-thigh", name: "Chicken thigh, skinless (cooked)", category: "meat", proteinPer100g: 26 },
  { id: "turkey-breast", name: "Turkey breast (cooked)", category: "meat", proteinPer100g: 29 },
  { id: "beef-steak", name: "Lean beef steak (cooked)", category: "meat", proteinPer100g: 27 },
  { id: "beef-mince", name: "Lean beef mince (cooked)", category: "meat", proteinPer100g: 26 },
  { id: "pork-loin", name: "Pork loin (cooked)", category: "meat", proteinPer100g: 27 },
  { id: "pork-chop", name: "Pork chop (cooked)", category: "meat", proteinPer100g: 26 },
  { id: "lamb-chop", name: "Lamb chop, meat only (cooked)", category: "meat", proteinPer100g: 28 },

  // Seafood
  { id: "salmon", name: "Salmon (cooked)", category: "seafood", proteinPer100g: 25 },
  { id: "tuna-steak", name: "Tuna steak (cooked)", category: "seafood", proteinPer100g: 30 },
  { id: "tuna-canned", name: "Tuna, canned (drained)", category: "seafood", proteinPer100g: 25 },
  { id: "white-fish", name: "White fish (cooked)", category: "seafood", proteinPer100g: 22 },
  { id: "shrimp", name: "Shrimp (cooked)", category: "seafood", proteinPer100g: 24 },
  { id: "sardines-canned", name: "Sardines, canned (drained)", category: "seafood", proteinPer100g: 23 },

  // Eggs and dairy
  { id: "eggs", name: "Eggs", category: "dairy", proteinPer100g: 13 },
  { id: "egg-whites", name: "Egg whites", category: "dairy", proteinPer100g: 11 },
  { id: "greek-yogurt", name: "Greek yogurt, strained (plain)", category: "dairy", proteinPer100g: 10 },
  { id: "cottage-cheese", name: "Cottage cheese", category: "dairy", proteinPer100g: 12 },
  { id: "cheddar", name: "Cheddar cheese", category: "dairy", proteinPer100g: 25 },
  { id: "whey-protein", name: "Whey protein powder", category: "dairy", proteinPer100g: 75 },

  // Plant-based
  { id: "firm-tofu", name: "Firm tofu", category: "plant-based", proteinPer100g: 14 },
  { id: "tempeh", name: "Tempeh", category: "plant-based", proteinPer100g: 19 },
  { id: "edamame", name: "Edamame, shelled (cooked)", category: "plant-based", proteinPer100g: 11 },
  { id: "lentils", name: "Lentils (cooked)", category: "plant-based", proteinPer100g: 8 },
  { id: "chickpeas", name: "Chickpeas, canned (drained)", category: "plant-based", proteinPer100g: 7 },
  { id: "peanut-butter", name: "Peanut butter", category: "plant-based", proteinPer100g: 24 },
  { id: "almonds", name: "Almonds", category: "plant-based", proteinPer100g: 21 },
];

