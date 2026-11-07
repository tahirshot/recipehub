import React from 'react';
import { useRecipe } from '../context/RecipeContext';
import { Play, Pause, X, Plus, RotateCcw, Flame } from 'lucide-react';

export const TimerModal: React.FC = () => {
  const {
    activeCookingTimer,
    stopCookingTimer,
    pauseResumeCookingTimer,
    startCookingTimer,
  } = useRecipe();

  if (!activeCookingTimer) return null;

  const minutes = Math.floor(activeCookingTimer.remainingSeconds / 60);
  const seconds = activeCookingTimer.remainingSeconds % 60;
  const isFinished = activeCookingTimer.remainingSeconds === 0;

  const progressPercent = activeCookingTimer.totalMinutes > 0
    ? ((activeCookingTimer.totalMinutes * 60 - activeCookingTimer.remainingSeconds) /
        (activeCookingTimer.totalMinutes * 60)) *
      100
    : 100;

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="bg-stone-900 text-white rounded-3xl p-4 sm:p-5 shadow-2xl border border-stone-800 w-80 sm:w-96 backdrop-blur-md">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-orange-600 flex items-center justify-center text-white">
              <Flame className="w-4 h-4" />
            </div>
            <div className="truncate pr-2">
              <span className="text-xs font-bold block truncate">
                {activeCookingTimer.recipeName}
              </span>
              <span className="text-[10px] text-stone-400">Active Cooking Timer</span>
            </div>
          </div>

          <button
            onClick={stopCookingTimer}
            className="p-1.5 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Big Countdown display */}
        <div className="py-4 text-center">
          <div
            className={`font-mono text-4xl sm:text-5xl font-black tracking-tight tabular-nums ${
              isFinished ? 'text-emerald-400 animate-pulse' : 'text-white'
            }`}
          >
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          {isFinished && (
            <span className="text-xs font-bold text-emerald-400 mt-1 block">
              Time's up! Your dish is ready!
            </span>
          )}

          {/* Progress bar */}
          <div className="w-full bg-stone-800 rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className="bg-orange-500 h-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-2 pt-2">
          <button
            onClick={() =>
              startCookingTimer(activeCookingTimer.recipeName, activeCookingTimer.totalMinutes)
            }
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium transition-colors"
            title="Reset Timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={pauseResumeCookingTimer}
            className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold transition-colors ${
              activeCookingTimer.isRunning
                ? 'bg-amber-600 hover:bg-amber-500 text-white'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {activeCookingTimer.isRunning ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Resume</span>
              </>
            )}
          </button>

          <button
            onClick={() =>
              startCookingTimer(
                activeCookingTimer.recipeName,
                Math.ceil(activeCookingTimer.remainingSeconds / 60) + 1
              )
            }
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium flex items-center gap-1 transition-colors"
            title="Add 1 minute"
          >
            <Plus className="w-4 h-4" />
            <span className="text-[10px] font-mono">+1m</span>
          </button>
        </div>
      </div>
    </div>
  );
};
