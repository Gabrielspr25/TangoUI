// src/componentes/ui/textarea.jsx
import React from 'react';

export const Textarea = ({ placeholder, name, value, onChange, className = "", rows = 3, ...props }) => {
  return (
    <textarea
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      className={`w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical ${className}`}
      {...props}
    />
  );
};