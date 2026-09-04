import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => {
  return (
    <div className={`relative flex items-center justify-center rounded-full bg-[#03363d] border-2 border-[#14616f] shadow-lg ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center text-[8px] font-bold tracking-widest text-teal-200 uppercase text-center p-1 leading-none rounded-full">
        <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 transform -rotate-90">
          <path id="heading-curve" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
          <text className="text-[9px] fill-teal-200 uppercase font-semibold tracking-wider">
            <textPath href="#heading-curve" startOffset="0%">
              Human-Centered Computing Foundation
            </textPath>
          </text>
        </svg>
        <div className="w-6 h-6 rounded-full bg-teal-400/20 border border-teal-300 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-teal-200"></div>
        </div>
      </div>
    </div>
  );
};