import React, { useState } from 'react';
import { useRecipe } from '../../context/RecipeContext';
import {
  ArrowLeft,
  Heart,
  Clock,
  Users,
  ChefHat,
  CheckCircle2,
  Circle,
  Play,
  Timer,
  Share2,
  Sparkles,
} from 'lucide-react';

export const RecipeDetailsScreen: React.FC = () => {
  const {
    selectedRecipe,
    setScreen,
    isFavorite,
    toggleFavorite,
    startCookingTimer,
  } = useRecipe();

  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const [copiedLink, setCopiedLink] = useState(false);

  if (!selectedRecipe) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-xl font-bold text-stone-900">No recipe selected</h2>
        <button
          onClick={() => setScreen('list')}
          className="px-4 py-2 bg-orange-600 text-white rounded-xl text-xs font-semibold"
        >
          Back to Explore
        </button>
      </div>
    );
  }

  const favorited = isFavorite(selectedRecipe.id);

  const toggleCheck = (idx: number) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Split instructions into readable steps
  const instructionSteps = selectedRecipe.instructions
    .split(/\r?\n+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 5);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* Top Nav Action Row */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setScreen('list')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Recipes</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            aria-label="Share recipe"
            className="p-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleFavorite(selectedRecipe.id)}
            aria-label={favorited ? 'Remove favorite' : 'Add favorite'}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
              favorited
                ? 'bg-rose-50 text-rose-600 border border-rose-200'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500 text-rose-500' : 'text-stone-500'}`} />
            <span>{favorited ? 'Favourited' : 'Add to Favourites'}</span>
          </button>
        </div>
      </div>

      {copiedLink && (
        <div className="text-center text-xs text-emerald-600 font-medium py-1 bg-emerald-50 rounded-lg">
          Recipe link copied to clipboard!
        </div>
      )}

      {/* Large Recipe Hero Card */}
      <div className="relative rounded-3xl overflow-hidden bg-stone-900 shadow-md">
        <div className="h-72 sm:h-96 w-full">
          <img
            src={selectedRecipe.thumbnail}
            alt={selectedRecipe.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80';
            }}
          />
        </div>
        {/* Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
          {/* Zero-pill metadata */}
          <div className="flex items-center gap-2 text-xs text-orange-300 font-medium mb-2">
            <span>{selectedRecipe.category}</span>
            <span aria-hidden="true">·</span>
            <span>{selectedRecipe.area || 'International'} Cuisine</span>
            {selectedRecipe.isPersonal && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-amber-300 font-semibold">Personal Dish</span>
              </>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2 text-balance">
            {selectedRecipe.name}
          </h1>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-stone-300 mt-3 pt-3 border-t border-white/10">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-orange-400" />
              <span>{selectedRecipe.cookTimeMinutes || 30} mins cook time</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-orange-400" />
              <span>{selectedRecipe.servings || 4} servings</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5">
              <ChefHat className="w-4 h-4 text-orange-400" />
              <span>{selectedRecipe.difficulty || 'Medium'} difficulty</span>
            </span>
          </div>
        </div>
      </div>

      {/* Action Strip: Interactive Cooking Timer & Video */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() =>
            startCookingTimer(selectedRecipe.name, selectedRecipe.cookTimeMinutes || 30)
          }
          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 active:scale-95 text-white text-xs font-bold transition-all shadow-xs"
        >
          <Timer className="w-4 h-4" />
          <span>Start {selectedRecipe.cookTimeMinutes || 30}-Minute Cook Timer</span>
        </button>

        {selectedRecipe.youtubeUrl && (
          <a
            href={selectedRecipe.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white border border-stone-200 text-stone-700 hover:text-red-600 hover:border-red-200 text-xs font-semibold transition-colors"
          >
            <Play className="w-4 h-4 fill-red-600 text-red-600" />
            <span>Watch Video on YouTube</span>
          </a>
        )}
      </div>

      {/* Main Content: 2-Column Split for Ingredients & Instructions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Ingredients Checklist (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-stone-200/90 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <h2 className="text-lg font-bold text-stone-900">Ingredients</h2>
              <p className="text-xs text-stone-500">Tap items to mark off as you prep</p>
            </div>
            <span className="text-xs font-mono font-semibold text-stone-500">
              {Object.values(checkedIngredients).filter(Boolean).length}/
              {selectedRecipe.ingredients.length}
            </span>
          </div>

          <div className="space-y-2">
            {selectedRecipe.ingredients.map((item, idx) => {
              const isChecked = !!checkedIngredients[idx];
              return (
                <div
                  key={idx}
                  onClick={() => toggleCheck(idx)}
                  className={`flex items-start justify-between gap-3 p-2.5 rounded-xl transition-colors cursor-pointer select-none ${
                    isChecked
                      ? 'bg-stone-50 text-stone-400'
                      : 'hover:bg-amber-50/50 text-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    {isChecked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-stone-300 shrink-0" />
                    )}
                    <span
                      className={`text-xs font-medium truncate ${
                        isChecked ? 'line-through text-stone-400' : 'text-stone-800'
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>
                  {item.measure && (
                    <span className="text-xs font-medium text-orange-700 shrink-0">
                      {item.measure}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {selectedRecipe.tags && selectedRecipe.tags.length > 0 && (
            <div className="pt-4 border-t border-stone-100 text-xs text-stone-500">
              <span className="font-medium text-stone-700">Tags: </span>
              {selectedRecipe.tags.join(' · ')}
            </div>
          )}
        </div>

        {/* Right Column: Step-by-Step Instructions (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-stone-900">Step-by-Step Instructions</h2>
              <p className="text-xs text-stone-500">Follow each stage to complete the recipe</p>
            </div>
            <Sparkles className="w-4 h-4 text-orange-500" />
          </div>

          <div className="space-y-5">
            {instructionSteps.length > 1 ? (
              instructionSteps.map((step, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-stone-700 leading-relaxed">{step}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="prose prose-stone text-sm leading-relaxed whitespace-pre-line text-stone-700">
                {selectedRecipe.instructions}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
