import React from 'react';

function SearchFilters({ onSearch, onFilterChange }) {
  return (
    <div className="dashboard-filters">
      <div className="search-filter">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search orders by number or customer name..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="filter-select">
        <select onChange={(e) => onFilterChange(e.target.value)}>
          <option value="all">All Orders</option>
          <option value="urgent">Urgent Orders</option>
          <option value="normal">Normal Orders</option>
          <option value="processing">Processing</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div className="date-range">
        <div className="date-input">
          <input
            type="date"
            onChange={(e) => console.log('Start date:', e.target.value)}
          />
        </div>
        <span>to</span>
        <div className="date-input">
          <input
            type="date"
            onChange={(e) => console.log('End date:', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchFilters;