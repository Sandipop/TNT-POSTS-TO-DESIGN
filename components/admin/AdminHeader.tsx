import React from 'react';
import Icon from '../Icon';

const logoBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA+gAAABQCAYAAAC04r+rAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAYbSURBVHgB7d2tVdswFAXQzYAGYARGoARGoARGEAagBEagBEagBEagBEbABoygDej+V3ccQJLz5JKzc13f09VbS3K35N45SgghpEeybUncb6vPj9P3CCHEe5O2JDt+L8t/T3b+nBBC3L+kLUnO/Y9s/jkhhLgDkpYk535s87WEEOLekrYk5X4gO9WEEEJuStqSlPvhbI8QQkibkpYk5T4wGyOEEEKakbQkKfWBsQlCCCFNSdqSlPrAZoYQQpSSNCUp9YHTHEIIUUrSkqT0wNmcIYSQIkxaklIDM7sSQghRYtKSVGaGzhBCiBKTlqQyM3SGEOF9SVsq1dnpk8vldrvdXq/X+/3+mUwmk8vlTCbT7/fPZrPxeLzZbHa73W632+12pVLp9/vNZrPZbJbL5XK5nEwmk8lkMplMJpPJJxaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaE2JB0JO35cR6EEELcj7Ql6T4/ziOEEOL+JW1J+paf5xJCCPETkpYk/fLTfCSEEEJMSFqS9MtP8ykhhBAjkvYk/fJT/JgQQgijSXuSfvlpXhJCiGFJe5K+gZ/nEUIIUX/S/hEAAAAvSURBVAYnCQ+5A4kAAAAASUVORK5CYII=';

interface AdminHeaderProps {
    userEmail: string | null;
    onLogout: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ userEmail, onLogout }) => {
  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
                <a href="https://www.tagntarget.com" target="_blank" rel="noopener noreferrer">
                    <img src={logoBase64} alt="Tagntarget Logo" className="h-8" />
                </a>
                <span className="text-lg font-semibold text-gray-700">Admin Panel</span>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 hidden sm:block">{userEmail}</span>
                <button
                    onClick={onLogout}
                    className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors px-3 py-2 rounded-md hover:bg-gray-100"
                    aria-label="Logout"
                >
                    <Icon name="logout" className="h-5 w-5" />
                    <span className="hidden md:inline">Logout</span>
                </button>
            </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
