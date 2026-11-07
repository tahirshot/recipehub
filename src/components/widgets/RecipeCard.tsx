import React from 'react';
import { Recipe } from '../../types/recipe';
import { useRecipe } from '../../context/RecipeContext';
import { Clock, Heart, Users } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
  onRemoveFavorite?: () => void;
  layout?: 'grid' | 'list';
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, layout = 'grid' }) => {
  const { viewRecipeDetails, isFavorite, toggleFavorite } = useRecipe();
  const favorited = isFavorite(recipe.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(recipe.id);
  };

  if (layout === 'list') {
    return (
      <div
        onClick={() => viewRecipeDetails(recipe)}
        className="group flex flex-col sm:flex-row items-stretch bg-white border border-stone-200/90 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer"
      >
        <div className="relative w-full sm:w-52 h-44 shrink-0 bg-stone-100 overflow-hidden">
          <img
            src={recipe.thumbnail}
            alt={recipe.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <button
            onClick={handleFavoriteClick}
            aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
            className="absolute top-3 right-3 min-w-[38px] min-h-[38px] rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-stone-700 hover:text-rose-600 transition-colors shadow-xs"
          >
            <Heart
              className={`w-4 h-4 ${favorited ? 'fill-rose-500 text-rose-500' : 'text-stone-600'}`}
            />
          </button>
        </div>

        <div className="p-5 flex flex-col justify-between flex-1">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5">
              <span className="font-medium text-orange-700">{recipe.category}</span>
              <span aria-hidden="true">·</span>
              <span>{recipe.area || 'International'}</span>
              {recipe.isPersonal && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-amber-700 font-medium">Personal Recipe</span>
                </>
              )}
            </div>

            <h3 className="text-lg font-bold text-stone-900 group-hover:text-orange-600 transition-colors line-clamp-1">
              {recipe.name}
            </h3>

            <p className="text-xs text-stone-600 line-clamp-2 mt-2 leading-relaxed">
              {recipe.instructions.replace(/\r?\n|\r/g, ' ')}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-stone-500 pt-3 mt-3 border-t border-stone-100">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span>{recipe.cookTimeMinutes || 30} mins</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-stone-400" />
              <span>{recipe.servings || 4} servings</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-medium text-stone-700">{recipe.difficulty || 'Medium'}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => viewRecipeDetails(recipe)}
      className="group flex flex-col bg-white border border-stone-200/90 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer h-full"
    >
      <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden">
        <img
          src={recipe.thumbnail}
          alt={recipe.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <button
          onClick={handleFavoriteClick}
          aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute top-2.5 right-2.5 min-w-[36px] min-h-[36px] rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-stone-700 hover:text-rose-600 transition-colors shadow-xs"
        >
          <Heart
            className={`w-4 h-4 ${favorited ? 'fill-rose-500 text-rose-500' : 'text-stone-600'}`}
          />
        </button>
      </div>

      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          {/* Zero-pill metadata */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
            <span className="font-medium text-orange-700">{recipe.category}</span>
            <span aria-hidden="true">·</span>
            <span>{recipe.area || 'Kitchen'}</span>
          </div>

          <h3 className="text-base font-bold text-stone-900 group-hover:text-orange-600 transition-colors line-clamp-1">
            {recipe.name}
          </h3>
        </div>

        <div className="flex items-center justify-between text-xs text-stone-500 pt-3 mt-2 border-t border-stone-100">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-stone-400" />
            <span>{recipe.cookTimeMinutes || 30}m</span>
          </span>
          <span className="font-medium text-stone-700">{recipe.difficulty || 'Medium'}</span>
        </div>
      </div>
    </div>
  );
};
