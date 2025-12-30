// src/componentes/ui/calendar.jsx
import React from 'react';

export const Calendar = ({ selected, onSelect, className = "" }) => {
  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    onSelect(date);
  };

  const formatDate = (date) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-300">
        Fecha de Compra
      </label>
      <input
        type="date"
        value={formatDate(selected)}
        onChange={handleDateChange}
        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};