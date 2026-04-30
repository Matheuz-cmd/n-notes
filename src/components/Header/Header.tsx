import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full px-4 py-2 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm flex items-center justify-center md:justify-start">
      <div className="flex items-center gap-3">
        <img src="/favicon.svg" alt="n-notes logo" className="w-10 h-10 object-contain drop-shadow-sm" />
        <span className="text-3xl font-black text-black tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>notes</span>
      </div>
    </header>
  );
};
