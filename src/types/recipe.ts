export interface Recipe {
  id: string;
  name: string;
  category: string;
  area?: string;
  instructions: string;
  thumbnail: string;
  tags?: string[];
  youtubeUrl?: string;
  ingredients: { name: string; measure: string }[];
  source?: string;
  isPersonal?: boolean;
  cookTimeMinutes?: number;
  servings?: number;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  createdAt?: string;
}

export interface Category {
  id: string;
  name: string;
  thumbnail: string;
  description: string;
}

export type ScreenType = 'home' | 'list' | 'details' | 'add' | 'favorites' | 'profile';

export type ListState = 'loading' | 'error' | 'empty' | 'data';

export interface PersonalRecipeInput {
  name: string;
  category: string;
  description: string;
  cookTimeMinutes: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  thumbnail: string;
  ingredients: { name: string; measure: string }[];
  instructions: string;
}

export interface FormErrors {
  name?: string;
  category?: string;
  description?: string;
  cookTimeMinutes?: string;
  servings?: string;
  ingredients?: string;
  instructions?: string;
  thumbnail?: string;
}
