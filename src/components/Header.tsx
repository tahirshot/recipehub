import React from 'react';
import { useRecipe } from '../context/RecipeContext';
import { Utensils, Code2, WifiOff, Smartphone, Monitor } from 'lucide-react';
import { ScreenType } from '../types/recipe';

export const Header: React.FC = () => {
  const {
    currentScreen,
    setScreen,
    setIsFlutterStudioOpen,
    simulateOffline,
    setSimulateOffline,
    deviceFrame,
    setDeviceFrame,
  } = useRecipe();

  const navItems: { screen: ScreenType; label: string }[] = [
    { screen: 'home', label: 'Home' },
    { screen: 'list', label: 'Explore' },
    { screen: 'add', label: 'Add Recipe' },
    { screen: 'favorites', label: 'Favourites' },
    { screen: 'profile', label: 'Profile' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-stone-200/80 px-4 md:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single text element) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setScreen('home')}
            className="flex items-center gap-2.5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-lg"
          >
            <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow-sm shadow-orange-600/20 group-hover:bg-orange-500 transition-colors">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-stone-900 group-hover:text-orange-600 transition-colors whitespace-nowrap">
                RecipeHub
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links (single line, no capsules) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          {navItems.map((item) => {
            const isActive = currentScreen === item.screen;
            return (
              <button
                key={item.screen}
                onClick={() => setScreen(item.screen)}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 text-[15px] ${
                  isActive
                    ? 'text-orange-600 border-orange-600 font-semibold'
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Utilities */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Offline Test Toggle */}
          <button
            onClick={() => setSimulateOffline(!simulateOffline)}
            title={simulateOffline ? 'Disable Offline Mode' : 'Simulate Offline Mode (Tests College Error State)'}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap ${
              simulateOffline
                ? 'bg-rose-50 border-rose-300 text-rose-700'
                : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
            }`}
          >
            <WifiOff className={`w-3.5 h-3.5 ${simulateOffline ? 'text-rose-600' : 'text-stone-500'}`} />
            <span>{simulateOffline ? 'Offline Active' : 'Test Offline'}</span>
          </button>

          {/* Viewport Frame Switcher */}
          <div className="hidden lg:flex items-center bg-stone-100 rounded-lg p-0.5 border border-stone-200 text-stone-600">
            <button
              onClick={() => setDeviceFrame('phone')}
              title="Android Phone Mockup View"
              className={`p-1.5 rounded-md transition-colors ${
                deviceFrame === 'phone' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceFrame('responsive')}
              title="Full Responsive View"
              className={`p-1.5 rounded-md transition-colors ${
                deviceFrame === 'responsive' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <Monitor className="w-4 h-4" />
            </button>
          </div>

          {/* Primary CTA: Open Flutter Code Suite */}
          <button
            onClick={() => setIsFlutterStudioOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 active:scale-95 transition-all rounded-xl shadow-xs whitespace-nowrap shrink-0"
          >
            <Code2 className="w-4 h-4 text-orange-400" />
            <span>Flutter Code Studio</span>
          </button>
        </div>
      </div>
    </header>
  );
};
