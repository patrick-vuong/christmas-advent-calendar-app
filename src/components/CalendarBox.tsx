import { Gift, Lock, Star } from 'lucide-react';
import { useState } from 'react';

interface CalendarBoxProps {
  day: number;
  isUnlocked: boolean;
  isToday: boolean;
  onOpen: () => void;
}

export function CalendarBox({ day, isUnlocked, isToday, onOpen }: CalendarBoxProps) {
  const [isHovered, setIsHovered] = useState(false);

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