import { X } from 'lucide-react';
import { StorySegment } from '../data/storyData';

interface ComicPanelProps {
  segment: StorySegment;
  onClose: () => void;
}

export function ComicPanel({ segment, onClose }: ComicPanelProps) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-gradient-to-br from-red-50 to-green-50 rounded-xl sm:rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 sm:border-4 border-red-600 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 sm:h-2 bg-gradient-to-r from-red-600 via-green-600 to-red-600"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 sm:h-2 bg-gradient-to-r from-green-600 via-red-600 to-green-600"></div>
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="sticky top-3 sm:top-4 right-3 sm:right-4 float-right bg-white rounded-full p-1.5 sm:p-2 shadow-lg hover:bg-red-100 active:scale-95 transition-all z-10"
          aria-label="Close"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
        </button>

        <div className="p-4 sm:p-6 md:p-8 pt-8 sm:pt-12 clear-both">
          {/* Comic strip frame */}
          <div className="bg-white rounded-lg sm:rounded-xl border-2 sm:border-4 border-black shadow-lg p-3 sm:p-4 md:p-6 mb-3 sm:mb-4">
            {/* Day number badge */}
            <div className="inline-block bg-red-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full mb-3 sm:mb-4 text-sm sm:text-base">
              December {segment.day}, 2025
            </div>

            {/* Illustration */}
            <div className="text-center mb-4 sm:mb-6">
              <div className="inline-block bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 sm:border-4 border-black">
                <span className="text-5xl sm:text-6xl md:text-8xl">{segment.illustration}</span>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-center mb-3 sm:mb-4 text-red-700 text-lg sm:text-xl md:text-2xl">{segment.title}</h2>

            {/* Story content */}
            <div className="bg-yellow-50 rounded-lg p-3 sm:p-4 border-2 border-black relative">
              {/* Speech bubble tail */}
              <div className="absolute -top-2 sm:-top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] sm:border-l-[12px] border-l-transparent border-r-[8px] sm:border-r-[12px] border-r-transparent border-b-[8px] sm:border-b-[12px] border-b-black"></div>
              <div className="absolute -top-1.5 sm:-top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] sm:border-l-[10px] border-l-transparent border-r-[7px] sm:border-r-[10px] border-r-transparent border-b-[7px] sm:border-b-[10px] border-b-yellow-50"></div>
              
              <p className="text-center text-gray-800 leading-relaxed text-sm sm:text-base">{segment.content}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-xs sm:text-sm text-gray-600">
            <p>🎄 Deep Sleigh Learning - A Holiday Model 🎄</p>
          </div>
        </div>
      </div>
    </div>
  );
}