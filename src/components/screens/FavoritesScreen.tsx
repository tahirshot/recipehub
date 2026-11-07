import React from 'react';
import { useRecipe } from '../../context/RecipeContext';
import { RecipeCard } from '../widgets/RecipeCard';
import { Heart, Compass, Trash2 } from 'lucide-react';

export const FavoritesScreen: React.FC = () => {
  const { recipes, favorites, toggleFavorite, setScreen } = useRecipe();

  // Filter recipes that are in favorites
  const favoriteRecipes = recipes.filter((r) => favorites.includes(r.id));

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 fill-rose-500 text-rose-500" />
            <h1 className="text-2xl md:text-3xl font-extrabold text-stone-900 tracking-tight">
              Saved Favourites
            </h1>
          </div>
          <p className="text-xs md:text-sm text-stone-500 mt-1">
            {favoriteRecipes.length} recipes marked for easy access. Saved permanently to local storage.
          </p>
        </div>

        {favoriteRecipes.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to clear all favourites?')) {
                favoriteRecipes.forEach((r) => toggleFavorite(r.id));
              }
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-500 hover:text-rose-600 border border-stone-200 rounded-xl bg-white hover:bg-stone-50 transition-colors self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Favourites</span>
          </button>
        )}
      </div>

      {/* Grid or Empty State */}
      {favoriteRecipes.length === 0 ? (
        <div className="rounded-3xl bg-white border border-stone-200/90 p-8 md:p-14 text-center max-w-lg mx-auto space-y-4 shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 mx-auto flex items-center justify-center">
            <Heart className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-stone-900">No Favourites Yet</h3>
            <p className="text-xs md:text-sm text-stone-500 mt-1.5 leading-relaxed">
              You haven't saved any dishes to your favourites list. Tap the heart icon on any recipe card to save it here permanently!
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setScreen('list')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Recipes</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {favoriteRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} layout="grid" />
          ))}
        </div>
      )}
    </div>
  );
};
