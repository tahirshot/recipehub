import React from 'react';
import { RecipeProvider, useRecipe } from './context/RecipeContext';
import { Header } from './components/Header';
import { BottomNavBar } from './components/BottomNavBar';
import { HomeScreen } from './components/screens/HomeScreen';
import { RecipeListScreen } from './components/screens/RecipeListScreen';
import { RecipeDetailsScreen } from './components/screens/RecipeDetailsScreen';
import { AddRecipeScreen } from './components/screens/AddRecipeScreen';
import { FavoritesScreen } from './components/screens/FavoritesScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { TimerModal } from './components/TimerModal';
import { FlutterStudioModal } from './components/flutter/FlutterStudioModal';

const AppContent: React.FC = () => {
  const { currentScreen, deviceFrame } = useRecipe();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'list':
        return <RecipeListScreen />;
      case 'details':
        return <RecipeDetailsScreen />;
      case 'add':
        return <AddRecipeScreen />;
      case 'favorites':
        return <FavoritesScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  // If Phone Mockup mode is active on desktop
  if (deviceFrame === 'phone') {
    return (
      <div className="min-h-screen bg-stone-200/60 py-8 px-4 flex flex-col items-center justify-center">
        <Header />

        <div className="mt-6 relative w-full max-w-[410px] h-[840px] bg-white rounded-[44px] shadow-2xl border-[10px] border-stone-900 overflow-hidden flex flex-col">
          {/* Simulated Android Status Bar */}
          <div className="h-7 bg-stone-900 text-stone-400 px-6 flex items-center justify-between text-[11px] font-mono shrink-0 select-none">
            <span>09:41</span>
            {/* Center camera notch */}
            <div className="w-16 h-3 bg-stone-800 rounded-full mx-auto" />
            <div className="flex items-center gap-1.5">
              <span>5G</span>
              <span>100%</span>
            </div>
          </div>

          {/* Internal Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 bg-[#FFFDF9] pb-24">
            {renderScreen()}
          </div>

          {/* Bottom navigation within the phone frame */}
          <BottomNavBar />

          {/* Android Bottom Gesture Bar */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-stone-400/60 rounded-full pointer-events-none" />
        </div>

        <TimerModal />
        <FlutterStudioModal />
      </div>
    );
  }

  // Default Responsive Full-Width Layout
  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-6 md:py-8">
        {renderScreen()}
      </main>

      <BottomNavBar />
      <TimerModal />
      <FlutterStudioModal />

      {/* Clean Academic Footer */}
      <footer className="border-t border-stone-200/80 bg-white py-6 px-4 md:px-8 text-center text-xs text-stone-500 mb-16 md:mb-0">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 RecipeHub · Built with Flutter 3.35+ & Material 3 for College Evaluation</p>
          <div className="flex items-center gap-4 text-stone-600">
            <span>TheMealDB API</span>
            <span aria-hidden="true">·</span>
            <span>Provider State</span>
            <span aria-hidden="true">·</span>
            <span>SharedPreferences</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <RecipeProvider>
      <AppContent />
    </RecipeProvider>
  );
}
