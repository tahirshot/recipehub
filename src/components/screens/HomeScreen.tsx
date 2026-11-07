import React, { useState } from 'react';
import { useRecipe } from '../../context/RecipeContext';
import { RecipeCard } from '../widgets/RecipeCard';
import { Search, Flame, Clock, Sparkles, ChefHat, ArrowRight } from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const {
    recipes,
    featuredRecipe,
    categories,
    selectedCategory,
    setSelectedCategory,
    executeSearch,
    setScreen,
    viewRecipeDetails,
  } = useRecipe();

  const [localSearch, setLocalSearch] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      executeSearch(localSearch.trim());
      setScreen('list');
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    executeSearch(localSearch, categoryName);
    setScreen('list');
  };

  const quickSearchTags = ['Pasta', 'Chicken', 'Curry', 'Chocolate', 'Salad', 'Breakfast'];

  return (
    <div className="space-y-10 pb-16">
      {/* 1. Hero Search & Banner Section */}
      <section className="relative rounded-3xl bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 text-white p-6 md:p-10 shadow-lg shadow-orange-500/10 overflow-hidden">
        {/* Subtle decorative radial scrim */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-orange-100 text-xs font-semibold uppercase tracking-wider mb-2">
            <ChefHat className="w-4 h-4" />
            <span>Welcome to RecipeHub</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3 text-balance">
            Cook Delicious Meals with Real Ingredients
          </h1>
          <p className="text-orange-50/90 text-sm md:text-base leading-relaxed mb-6 max-w-xl">
            Explore thousands of culinary recipes powered by TheMealDB API, create personal recipes, and save your favourite dishes permanently.
          </p>

          {/* Search Input Box */}
          <form onSubmit={handleSearchSubmit} className="flex items-center bg-white rounded-2xl p-1.5 shadow-md max-w-xl">
            <div className="flex items-center gap-2 pl-3 flex-1">
              <Search className="w-5 h-5 text-stone-400 shrink-0" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search chicken, pasta, desserts, tacos..."
                className="w-full py-2 text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold rounded-xl transition-colors shrink-0"
            >
              Search
            </button>
          </form>

          {/* Quick Query Suggestions */}
          <div className="flex items-center flex-wrap gap-2 mt-4 text-xs">
            <span className="text-orange-100/90 font-medium">Quick ideas:</span>
            {quickSearchTags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setLocalSearch(tag);
                  executeSearch(tag, 'All');
                  setScreen('list');
                }}
                className="text-white hover:text-orange-200 transition-colors underline decoration-white/40 hover:decoration-white"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Featured Recipe Spotlight */}
      {featuredRecipe && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-orange-600" />
              <h2 className="text-xl md:text-2xl font-bold text-stone-900">Featured Recipe of the Day</h2>
            </div>
            <button
              onClick={() => viewRecipeDetails(featuredRecipe)}
              className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1 transition-colors"
            >
              <span>View Recipe</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div
            onClick={() => viewRecipeDetails(featuredRecipe)}
            className="group relative rounded-3xl overflow-hidden bg-stone-900 cursor-pointer h-72 md:h-96 shadow-md"
          >
            <img
              src={featuredRecipe.thumbnail}
              alt={featuredRecipe.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
            />
            {/* Measured contrast scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col justify-end text-white">
              <div className="flex items-center gap-2 text-xs text-orange-300 font-medium mb-2">
                <span>{featuredRecipe.category}</span>
                <span aria-hidden="true">·</span>
                <span>{featuredRecipe.area || 'International'} Cuisine</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{featuredRecipe.cookTimeMinutes} mins</span>
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 max-w-2xl text-balance group-hover:text-orange-300 transition-colors">
                {featuredRecipe.name}
              </h3>

              <p className="text-xs md:text-sm text-stone-200 line-clamp-2 max-w-xl leading-relaxed mb-4">
                {featuredRecipe.instructions.replace(/\r?\n|\r/g, ' ')}
              </p>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-semibold shadow-sm group-hover:bg-orange-500 transition-colors">
                  <span>Start Cooking</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <span className="text-xs text-stone-300">
                  {featuredRecipe.ingredients.length} fresh ingredients required
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Recipe Categories Carousel / Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-stone-900">Explore by Category</h2>
            <p className="text-xs text-stone-500 mt-0.5">Filter dishes across popular culinary styles</p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('All');
              executeSearch('', 'All');
              setScreen('list');
            }}
            className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.slice(0, 8).map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.id || cat.name}
                onClick={() => handleCategoryClick(cat.name)}
                className={`group flex flex-col items-center p-3 rounded-2xl border text-center transition-all ${
                  isSelected
                    ? 'bg-orange-50 border-orange-300 text-orange-900 shadow-xs'
                    : 'bg-white border-stone-200/90 hover:border-orange-200 hover:bg-stone-50/80 text-stone-700'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50/80 p-1 mb-2 flex items-center justify-center overflow-hidden">
                  <img
                    src={cat.thumbnail}
                    alt={cat.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-200"
                  />
                </div>
                <span className="text-xs font-semibold tracking-tight">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. Popular & Trending Recipes */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-600" />
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-stone-900">Popular Recipes</h2>
              <p className="text-xs text-stone-500 mt-0.5">Top-rated community favorites ready to make tonight</p>
            </div>
          </div>
          <button
            onClick={() => setScreen('list')}
            className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1"
          >
            <span>Browse Grid</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {recipes.slice(0, 8).map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      {/* 5. Personal Recipe Creation Callout */}
      <section className="rounded-3xl bg-[#FAF5EE] border border-orange-200/70 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-bold text-orange-700 uppercase tracking-wider">
            Personal Kitchen Mode
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-stone-900">
            Have a special secret family recipe?
          </h3>
          <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
            Add your own dishes with custom ingredients, photos, cooking steps, and preparation times. Your custom recipes persist permanently in local storage!
          </p>
        </div>
        <button
          onClick={() => setScreen('add')}
          className="px-6 py-3 bg-orange-600 hover:bg-orange-700 active:scale-95 text-white text-sm font-semibold rounded-2xl shadow-sm transition-all whitespace-nowrap shrink-0"
        >
          Add Personal Recipe
        </button>
      </section>
    </div>
  );
};
