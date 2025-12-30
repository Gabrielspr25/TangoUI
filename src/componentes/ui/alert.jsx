// src/componentes/ui/alert.jsx
import React from 'react';

export const Alert = ({ children, variant = "info", className = "" }) => {
  const variants = {
    info: "bg-blue-900 border-blue-500 text-blue-200",
    success: "bg-green-900 border-green-500 text-green-200",
    error: "bg-red-900 border-red-500 text-red-200",
    warning: "bg-yellow-900 border-yellow-500 text-yellow-200"
  };

  return (
    <div className={`p-4 border-l-4 rounded-md ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};