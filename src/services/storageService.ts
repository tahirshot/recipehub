import { Recipe, PersonalRecipeInput } from '../types/recipe';

const FAVORITES_KEY = 'recipehub_favorites';
const PERSONAL_RECIPES_KEY = 'recipehub_personal_recipes';
const SETTINGS_KEY = 'recipehub_settings';

export interface AppSettings {
  userName: string;
  simulateOffline: boolean;
  measurementUnit: 'metric' | 'us';
  autoCookTimer: boolean;
}

const DEFAULT_SETTINGS: AppSettings = {
  userName: 'Student Chef',
  simulateOffline: false,
  measurementUnit: 'metric',
  autoCookTimer: true,
};

export const storageService = {
  // Get all favorite IDs
  getFavoriteIds(): string[] {
    try {
      const data = localStorage.getItem(FAVORITES_KEY);
      return data ? JSON.parse(data) : ['52772', '52855']; // default starter favorites
    } catch {
      return ['52772', '52855'];
    }
  },

  // Toggle favorite
  toggleFavorite(id: string): string[] {
    const favorites = this.getFavoriteIds();
    const index = favorites.indexOf(id);
    let updated: string[];
    if (index >= 0) {
      updated = favorites.filter((fId) => fId !== id);
    } else {
      updated = [id, ...favorites];
    }
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save favorites to localStorage', e);
    }
    return updated;
  },

  // Check if recipe is favorited
  isFavorite(id: string): boolean {
    const favorites = this.getFavoriteIds();
    return favorites.includes(id);
  },

  // Get personal recipes
  getPersonalRecipes(): Recipe[] {
    try {
      const data = localStorage.getItem(PERSONAL_RECIPES_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to read personal recipes', e);
    }
    // Return sample personal recipe created by student
    const samplePersonal: Recipe[] = [
      {
        id: 'personal_1',
        name: 'Grandma’s Spiced Mango Curry',
        category: 'Vegetarian',
        area: 'Indian',
        instructions: 'Heat mustard oil in a heavy clay pot until smoking.\n\nAdd mustard seeds, cumin, dried red chillies, and curry leaves until they crackle.\n\nStir in sliced raw green mangoes, turmeric powder, and Kashmiri chilli powder.\n\nAdd coconut milk and jaggery. Simmer for 15 minutes on medium flame until the mangoes become succulent and tender.\n\nFinish with fresh crushed coriander and serve with steamed basmati rice.',
        thumbnail: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
        tags: ['HomeCooked', 'Curry', 'Spicy'],
        ingredients: [
          { name: 'Raw Green Mangoes', measure: '3 medium, diced' },
          { name: 'Mustard Oil', measure: '2 tbsp' },
          { name: 'Curry Leaves', measure: '10-12 leaves' },
          { name: 'Mustard Seeds', measure: '1 tsp' },
          { name: 'Coconut Milk', measure: '1 cup' },
          { name: 'Jaggery / Brown Sugar', measure: '1 tbsp' },
          { name: 'Turmeric Powder', measure: '1/2 tsp' },
        ],
        cookTimeMinutes: 25,
        servings: 4,
        difficulty: 'Easy',
        isPersonal: true,
        createdAt: '2026-11-01',
      },
    ];
    this.savePersonalRecipes(samplePersonal);
    return samplePersonal;
  },

  // Save personal recipes
  savePersonalRecipes(recipes: Recipe[]): void {
    try {
      localStorage.setItem(PERSONAL_RECIPES_KEY, JSON.stringify(recipes));
    } catch (e) {
      console.error('Failed to save personal recipes to localStorage', e);
    }
  },

  // Add new personal recipe
  addPersonalRecipe(input: PersonalRecipeInput): Recipe {
    const existing = this.getPersonalRecipes();
    const newRecipe: Recipe = {
      id: `personal_${Date.now()}`,
      name: input.name.trim(),
      category: input.category,
      area: 'Personal Kitchen',
      instructions: input.instructions.trim(),
      thumbnail: input.thumbnail.trim() || 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80',
      tags: ['Personal', input.category],
      ingredients: input.ingredients,
      cookTimeMinutes: input.cookTimeMinutes,
      servings: input.servings,
      difficulty: input.difficulty,
      isPersonal: true,
      createdAt: new Date().toISOString(),
    };
    const updated = [newRecipe, ...existing];
    this.savePersonalRecipes(updated);
    return newRecipe;
  },

  // Delete personal recipe
  deletePersonalRecipe(id: string): Recipe[] {
    const existing = this.getPersonalRecipes();
    const updated = existing.filter((r) => r.id !== id);
    this.savePersonalRecipes(updated);
    return updated;
  },

  // Settings
  getSettings(): AppSettings {
    try {
      const data = localStorage.getItem(SETTINGS_KEY);
      return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  saveSettings(settings: AppSettings): void {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings', e);
    }
  },
};
