'use client';

import React, { useEffect, useState } from 'react';

type Screenshot = {
  title: string;
  description: string;
  imageUrl: string;
};

const screenshots: Screenshot[] = [
  {
    title: 'Welcome Dashboard',
    description: 'Clean, organized workspace',
    imageUrl: '/screenshots/dashboard.png',
  },
  {
    title: 'Rich Text Editor',
    description: 'Powerful editing experience',
    imageUrl: '/screenshots/editor.png',
  },
  {
    title: 'Dark Mode',
    description: 'Easy on the eyes',
    imageUrl: '/screenshots/darkmode.png',
  },
  {
    title: 'Light Mode',
    description: 'Bright and focused',
    imageUrl: '/screenshots/lightmode.png',
  },
];

const ScreenshotCarousel: React.FC = () => {
  const [currentScreenshot, setCurrentScreenshot] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScreenshot((prev) => (prev + 1) % screenshots.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const { title, description, imageUrl } = screenshots[currentScreenshot];

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="relative bg-card border rounded-xl shadow-sm overflow-hidden">
        {/* Browser Chrome */}
        <div className="flex items-center space-x-2 px-4 py-3 border-b bg-muted/30">
          <div className="flex space-x-2">
            <div className="w-2.5 h-2.5 bg-red-400 rounded-full" />
            <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full" />
            <div className="w-2.5 h-2.5 bg-green-400 rounded-full" />
          </div>
          <div className="flex-1 text-center">
            <div className="text-xs text-muted-foreground bg-muted rounded px-2 py-1 inline-block">
              {title}
            </div>
          </div>
        </div>

        {/* Screenshot Image */}
        <div className="aspect-video relative overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/30 p-4 text-white">
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm">{description}</p>
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {screenshots.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentScreenshot === index ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenshotCarousel;
