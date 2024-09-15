import React from 'react';

export const Avatar = ({ src, alt, className = '' }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <img
        className="h-full w-full rounded-full object-cover shadow-lg ring-2 ring-white"
        src={src}
        alt={alt}
      />
      <span className="absolute bottom-0 right-0 block h-1/4 w-1/4 rounded-full bg-green-400 ring-2 ring-white"></span>
    </div>
  );
};
