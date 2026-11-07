import React from 'react';
import { useRecipe } from '../context/RecipeContext';
import { Home, Compass, PlusCircle, Heart, User } from 'lucide-react';
import { ScreenType } from '../types/recipe';

export const BottomNavBar: React.FC = () => {
  const { currentScreen, setScreen, favorites } = useRecipe();

  const tabs: { screen: ScreenType; label: string; icon: React.ReactNode; badge?: number }[] = [
    { screen: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { screen: 'list', label: 'Explore', icon: <Compass className="w-5 h-5" /> },
    { screen: 'add', label: 'Add Recipe', icon: <PlusCircle className="w-5 h-5" /> },
    { screen: 'favorites', label: 'Favourites', icon: <Heart className="w-5 h-5" />, badge: favorites.length },
    { screen: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/80 md:hidden pb-safe shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
      <div className="grid grid-cols-5 h-16 items-center px-1">
        {tabs.map((tab) => {
          const isActive = currentScreen === tab.screen;
          return (
            <button
              key={tab.screen}
              onClick={() => setScreen(tab.screen)}
              className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] transition-colors relative py-1 focus-visible:outline-none ${
                isActive ? 'text-orange-600 font-semibold' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <div className="relative">
                {tab.icon}
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full bg-orange-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] tracking-tight mt-1 whitespace-nowrap">
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute top-0 w-8 h-0.5 bg-orange-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
