import { useEffect, useMemo, useState } from 'react';
import { CalendarBox } from './components/CalendarBox';
import { ComicPanel } from './components/ComicPanel';
import { storySegments } from './data/storyData';
import { Sparkles } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { UnlockToggle } from './components/UnlockToggle';
import {
  CalendarStatus,
  formatUnlockTimestamp,
  getCalendarStatus,
  getUnlockDateUtc,
  TOTAL_ADVENT_DAYS,
} from './utils/timeUtils';

const MANUAL_UNLOCK_STORAGE_KEY = 'holiday-advent-calendar:manual-unlock';
const CALENDAR_REFRESH_INTERVAL = 60_000; // 60 seconds

export default function App() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [calendarStatus, setCalendarStatus] = useState<CalendarStatus>(() => getCalendarStatus());
  const [manualUnlock, setManualUnlock] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      return window.localStorage.getItem(MANUAL_UNLOCK_STORAGE_KEY) === 'true';
    } catch (error) {
      console.warn('Unable to read manual unlock preference', error);
      return false;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleStorage = (event: StorageEvent) => {
      if (event.key === MANUAL_UNLOCK_STORAGE_KEY && event.newValue != null) {
        setManualUnlock(event.newValue === 'true');
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    const updateStatus = () => setCalendarStatus(getCalendarStatus());
    updateStatus();

    const timer = window.setInterval(updateStatus, CALENDAR_REFRESH_INTERVAL);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(MANUAL_UNLOCK_STORAGE_KEY, manualUnlock ? 'true' : 'false');
    } catch (error) {
      console.warn('Unable to persist manual unlock preference', error);
    }
  }, [manualUnlock]);

  const { unlockedDay, nextUnlockDate, nextUnlockDay, nowUtc } = calendarStatus;

  const scheduleCurrentDay = unlockedDay > 0 ? unlockedDay : nextUnlockDay ?? 1;

  const isUnlocked = (day: number) => manualUnlock || day <= unlockedDay;
  const isToday = (day: number) => day === scheduleCurrentDay && !manualUnlock;

  const selectedSegment = useMemo(() => {
    if (selectedDay == null) return null;
    return storySegments.find((segment) => segment.day === selectedDay) ?? null;
  }, [selectedDay]);

  const headerStatusMessage = manualUnlock
    ? 'Manual unlock mode enabled — explore any day instantly.'
    : unlockedDay === 0
      ? 'First chapter unlocks at 12:00 PM PST on December 1.'
      : unlockedDay < TOTAL_ADVENT_DAYS
        ? `Days 1-${unlockedDay} are now available.`
        : 'All 24 chapters are unlocked!';

  const nextUnlockMessage =
    !manualUnlock && nextUnlockDay && nextUnlockDate
      ? `Next unlock: Day ${nextUnlockDay} at ${formatUnlockTimestamp(nextUnlockDate)}`
      : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 opacity-20">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1732692582963-f2ea379309e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJpc3RtYXMlMjBzbm93JTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NjQwODI2OTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Christmas snow"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Animated snowflakes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white text-opacity-60 animate-fall"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 100}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
              fontSize: `${10 + Math.random() * 10}px`
            }}
          >
            ❄
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300" />
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl">Holiday Advent Calendar 2025</h1>
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300" />
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 max-w-2xl mx-auto border-2 border-white/20">
            <h2 className="text-yellow-300 mb-2 text-lg sm:text-xl md:text-2xl">🎄 Deep Sleigh Learning - A Holiday Model 🎄</h2>
            <p className="text-white/90 text-xs sm:text-sm md:text-base">
              Open a new box each day to discover a comic strip chapter of Santa's adventure with AI!
            </p>
            <p className="text-blue-100 text-xs sm:text-sm md:text-base mt-2">
              {headerStatusMessage}
              {nextUnlockMessage && (
                <span className="block text-[0.7rem] sm:text-xs md:text-sm text-white/80 mt-1">
                  {nextUnlockMessage}
                </span>
              )}
            </p>
          </div>
          <div className="mt-4 flex justify-center">
            <UnlockToggle enabled={manualUnlock} onChange={(value) => setManualUnlock(value)} />
          </div>
        </header>

        {/* Calendar Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-3 md:gap-4 max-w-5xl mx-auto mb-6 sm:mb-8">
          {storySegments.map((segment) => (
            <CalendarBox
              key={segment.day}
              day={segment.day}
              isUnlocked={isUnlocked(segment.day)}
              isToday={isToday(segment.day)}
              manualUnlock={manualUnlock}
              unlockDateUtc={getUnlockDateUtc(segment.day)}
              nowUtc={nowUtc}
              onOpen={() => setSelectedDay(segment.day)}
            />
          ))}
        </div>

        {/* Footer info */}
        <div className="text-center text-white/70 text-xs sm:text-sm">
          <p>🎅 A story about collaboration between humans and AI 🤖</p>
          <p className="mt-1 sm:mt-2">New chapters unlock daily throughout December 2025!</p>
        </div>
      </div>

      {/* Comic Panel Modal */}
      {selectedSegment && (
        <ComicPanel
          segment={selectedSegment}
          onClose={() => setSelectedDay(null)}
        />
      )}

      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
          }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
      `}</style>
    </div>
  );
}