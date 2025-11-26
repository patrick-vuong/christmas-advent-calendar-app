import { Gift, Lock, Star } from 'lucide-react';
import { useMemo, useState } from 'react';
import { formatUnlockTimestamp } from '../utils/timeUtils';

interface CalendarBoxProps {
  day: number;
  isUnlocked: boolean;
  isToday: boolean;
  manualUnlock: boolean;
  unlockDateUtc: Date;
  nowUtc: Date;
  onOpen: () => void;
}
const formatCountdownLabel = (milliseconds: number) => {
  if (milliseconds <= 0) {
    return 'any moment now';
  }

  const totalMinutes = Math.ceil(milliseconds / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes - days * 24 * 60) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) {
    return `${days} day${days === 1 ? '' : 's'} at noon`;
  }

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  return `${minutes} minute${minutes === 1 ? '' : 's'}`;
};

export function CalendarBox({
  day,
  isUnlocked,
  isToday,
  manualUnlock,
  unlockDateUtc,
  nowUtc,
  onOpen,
}: CalendarBoxProps) {
  const [isHovered, setIsHovered] = useState(false);
  const timeUntilUnlockMs = useMemo(
    () => Math.max(0, unlockDateUtc.getTime() - nowUtc.getTime()),
    [unlockDateUtc, nowUtc],
  );
  const unlockTimestamp = useMemo(() => formatUnlockTimestamp(unlockDateUtc), [unlockDateUtc]);
  const showCountdown = !isUnlocked && !manualUnlock;
  const countdownLabel = useMemo(() => formatCountdownLabel(timeUntilUnlockMs), [timeUntilUnlockMs]);

  const handleClick = () => {
    if (isUnlocked) {
      onOpen();
    }
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={!isUnlocked}
      className={`
        relative aspect-square rounded-lg sm:rounded-xl border-2 sm:border-4 transition-all duration-300 transform
        ${isUnlocked 
          ? 'bg-gradient-to-br from-red-500 to-red-700 border-yellow-300 hover:scale-105 hover:shadow-2xl cursor-pointer active:scale-95' 
          : 'bg-gradient-to-br from-gray-400 to-gray-600 border-gray-500 cursor-not-allowed opacity-60'
        }
        ${isToday && isUnlocked ? 'ring-2 sm:ring-4 ring-yellow-400 ring-offset-1 sm:ring-offset-2 animate-pulse' : ''}
      `}
    >
      {/* Snowflake decoration */}
      <div className="absolute top-1 right-1 sm:top-2 sm:right-2">
        {isUnlocked ? (
          <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-300 fill-yellow-300" />
        ) : (
          <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300" />
        )}
      </div>

      {/* Day number */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-xl sm:text-3xl md:text-4xl ${isUnlocked ? 'text-white' : 'text-gray-300'}`}>
          {day}
        </span>

        {isUnlocked && (
          <Gift 
            className={`w-4 h-4 sm:w-6 sm:h-6 mt-1 sm:mt-2 transition-transform duration-300 ${
              isHovered ? 'scale-125 rotate-12' : ''
            } text-yellow-300`}
          />
        )}

        {showCountdown && (
          <span className="mt-2 text-[0.55rem] sm:text-xs md:text-sm text-white/90 text-center leading-tight px-2">
            Unlocks in {countdownLabel}
            {unlockTimestamp && (
              <span className="block text-[0.5rem] sm:text-[0.65rem] text-white/60 mt-1">
                {unlockTimestamp}
              </span>
            )}
          </span>
        )}
      </div>

      {/* Shine effect on hover */}
      {isUnlocked && isHovered && (
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent rounded-lg sm:rounded-xl"></div>
      )}

      {/* Today indicator */}
      {isToday && isUnlocked && (
        <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-yellow-400 text-red-700 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-[10px] sm:text-xs shadow-lg">
          TODAY!
        </div>
      )}
    </button>
  );
}