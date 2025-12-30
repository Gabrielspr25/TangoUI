// src/componentes/ui/select.jsx
import React, { useState } from 'react';

export const Select = ({ children, onValueChange, value, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      {children}
    </div>
  );
};

export const SelectTrigger = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center justify-between ${className}`}
    >
      {children}
      <span className="text-gray-400">▼</span>
    </button>
  );
};

export const SelectValue = ({ placeholder }) => {
  return (
    <span className="text-gray-400">
      {placeholder}
    </span>
  );
};

export const SelectContent = ({ children, className = "" }) => {
  return (
    <div className={`absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-600 rounded-md shadow-lg z-10 ${className}`}>
      {children}
    </div>
  );
};

export const SelectItem = ({ value, children, onSelect, className = "" }) => {
  return (
    <div
      onClick={() => onSelect && onSelect(value)}
      className={`px-3 py-2 text-white hover:bg-gray-700 cursor-pointer ${className}`}
    >
      {children}
    </div>
  );
};