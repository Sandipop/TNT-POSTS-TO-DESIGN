import React from 'react';
import Icon from './Icon';

const logoBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA+gAAABQCAYAAAC04r+rAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAYbSURBVHgB7d2tVdswFAXQzYAGYARGoARGoARGEAagBEagBEagBEagBEbABoygDej+V3ccQJLz5JKzc13f09VbS3K35N45SgghpEeybUncb6vPj9P3CCHEe5O2JDt+L8t/T3b+nBBC3L+kLUnO/Y9s/jkhhLgDkpYk535s87WEEOLekrYk5X4gO9WEEEJuStqSlPvhbI8QQkibkpYk5T4wGyOEEEKakbQkKfWBsQlCCCFNSdqSlPrAZoYQQpSSNCUp9YHTHEIIUUrSkqT0wNmcIYSQIkxaklIDM7sSQghRYtKSVGaGzhBCiBKTlqQyM3SGEOF9SVsq1dnpk8vldrvdXq/X+/3+mUwmk8vlTCbT7/fPZrPxeLzZbHa73W632+12pVLp9/vNZrPZbJbL5XK5nEwmk8lkMplMJpPJJxaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaE2JB0JO35cR6EEELcj7Ql6T4/ziOEEOL+JW1J+paf5xJCCPETkpYk/fLTfCSEEEJMSFqS9MtP8ykhhBAjkvYk/fJT/JgQQgijSXuSfvlpXhJCiGFJe5K+gZ/nEUIIUX/S/hEAAAAvSURBVAYnCQ+5A4kAAAAASUVORK5CYII=';

interface HeaderProps {
    userEmail: string | null;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ userEmail, onLogout }) => {
  return (
    <header className="py-6">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <a href="https://www.tagntarget.com" target="_blank" rel="noopener noreferrer">
            <img src={logoBase64} alt="Tagntarget Logo" className="h-10" />
        </a>
        <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 hidden sm:block">{userEmail}</span>
            <button
                onClick={onLogout}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-md hover:bg-gray-200"
                aria-label="Logout"
            >
                <Icon name="logout" className="h-5 w-5" />
                <span className="hidden md:inline">Logout</span>
            </button>
        </div>
      </div>
      <div className="text-center mt-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
          LinkedIn Post Visualizer <span className="text-blue-600">AI</span>
        </h1>
        <p className="text-gray-600 mt-2">
          Transform your posts into stunning visuals with Gemini
        </p>
      </div>
    </header>
  );
};

export default Header;