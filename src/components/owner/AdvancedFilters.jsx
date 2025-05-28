import { useState } from "react";
import Card from "../shared/Card";

const AdvancedFilters = ({ filters, onFiltersChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const carMakes = ["Toyota", "Honda", "BMW", "Mercedes", "Audi", "Lexus"];
  const carModels = {
    Toyota: ["Camry", "Corolla", "RAV4", "Highlander"],
    Honda: ["Accord", "Civic", "CR-V", "Pilot"],
    BMW: ["330i", "X3", "X5", "3 Series"],
    Mercedes: ["C-Class", "E-Class", "GLC", "GLE"],
    Audi: ["A4", "A6", "Q5", "Q7"],
    Lexus: ["ES", "RX", "NX", "GX"],
  };

  const years = Array.from({ length: 10 }, (_, i) => 2024 - i);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const salespeople = ["Sarah Wilson", "David Clark"];
  const drivers = ["Mike Johnson", "Tom Brown", "Lisa Martinez"];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };

    // Reset model when make changes
    if (key === "make") {
      newFilters.model = "";
    }

    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    onFiltersChange({
      make: "",
      model: "",
      month: "",
      year: "",
      salesperson: "",
      driver: "",
    });
  };

  const hasActiveFilters = Object.values(filters).some((value) => value !== "");

  return (
    <Card
      title="Advanced Filters"
      icon="🔍"
      action={
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="filter-toggle"
        >
          {isExpanded ? "Collapse" : "Expand"}
        </button>
      }
    >
      <div className={`filters-container ${isExpanded ? "expanded" : ""}`}>
        {/* Quick Filters - Always Visible */}
        <div className="quick-filters">
          <div className="filter-group">
            <label className="filter-label">Make</label>
            <select
              value={filters.make}
              onChange={(e) => handleFilterChange("make", e.target.value)}
              className="filter-select"
            >
              <option value="">All Makes</option>
              {carMakes.map((make) => (
                <option key={make} value={make}>
                  {make}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Model</label>
            <select
              value={filters.model}
              onChange={(e) => handleFilterChange("model", e.target.value)}
              className="filter-select"
              disabled={!filters.make}
            >
              <option value="">All Models</option>
              {filters.make &&
                carModels[filters.make]?.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Year</label>
            <select
              value={filters.year}
              onChange={(e) => handleFilterChange("year", e.target.value)}
              className="filter-select"
            >
              <option value="">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Advanced Filters - Expandable */}
        {isExpanded && (
          <div className="advanced-filters">
            <div className="filter-section">
              <h4 className="filter-section-title">Time Period</h4>
              <div className="filter-row">
                <div className="filter-group">
                  <label className="filter-label">Month</label>
                  <select
                    value={filters.month}
                    onChange={(e) =>
                      handleFilterChange("month", e.target.value)
                    }
                    className="filter-select"
                  >
                    <option value="">All Months</option>
                    {months.map((month, index) => (
                      <option key={month} value={index + 1}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="filter-section">
              <h4 className="filter-section-title">Personnel</h4>
              <div className="filter-row">
                <div className="filter-group">
                  <label className="filter-label">Salesperson</label>
                  <select
                    value={filters.salesperson}
                    onChange={(e) =>
                      handleFilterChange("salesperson", e.target.value)
                    }
                    className="filter-select"
                  >
                    <option value="">All Salespeople</option>
                    {salespeople.map((person) => (
                      <option key={person} value={person}>
                        {person}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label className="filter-label">Driver</label>
                  <select
                    value={filters.driver}
                    onChange={(e) =>
                      handleFilterChange("driver", e.target.value)
                    }
                    className="filter-select"
                  >
                    <option value="">All Drivers</option>
                    {drivers.map((driver) => (
                      <option key={driver} value={driver}>
                        {driver}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="filter-section">
              <h4 className="filter-section-title">Quick Presets</h4>
              <div className="preset-buttons">
                <button
                  className="preset-button"
                  onClick={() =>
                    onFiltersChange({ ...filters, make: "Toyota" })
                  }
                >
                  Toyota Vehicles
                </button>
                <button
                  className="preset-button"
                  onClick={() => onFiltersChange({ ...filters, year: "2024" })}
                >
                  2024 Models
                </button>
                <button
                  className="preset-button"
                  onClick={() =>
                    onFiltersChange({
                      ...filters,
                      month: new Date().getMonth() + 1,
                    })
                  }
                >
                  This Month
                </button>
                <button
                  className="preset-button"
                  onClick={() =>
                    onFiltersChange({ ...filters, salesperson: "Sarah Wilson" })
                  }
                >
                  Top Performer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filter Actions */}
        <div className="filter-actions">
          {hasActiveFilters && (
            <button onClick={clearFilters} className="clear-filters-button">
              <span className="clear-icon">✕</span>
              Clear All Filters
            </button>
          )}
          <div className="active-filters-count">
            {hasActiveFilters && (
              <span className="filters-badge">
                {Object.values(filters).filter((v) => v !== "").length} active
                filter
                {Object.values(filters).filter((v) => v !== "").length !== 1
                  ? "s"
                  : ""}
              </span>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .filters-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .filter-toggle {
          background: #667eea;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: background 0.2s ease;
        }

        .filter-toggle:hover {
          background: #5a6fd8;
        }

        .quick-filters {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .filter-label {
          font-size: 0.9rem;
          font-weight: 600;
          color: #555;
        }

        .filter-select {
          padding: 0.75rem;
          border: 2px solid #e1e8ed;
          border-radius: 8px;
          background: white;
          font-size: 0.9rem;
          cursor: pointer;
          transition: border-color 0.2s ease;
        }

        .filter-select:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .filter-select:disabled {
          background: #f8f9fa;
          cursor: not-allowed;
          opacity: 0.6;
        }

        .advanced-filters {
          background: #f8f9fa;
          padding: 1.5rem;
          border-radius: 8px;
          border: 1px solid #e1e8ed;
        }

        .filter-section {
          margin-bottom: 1.5rem;
        }

        .filter-section:last-child {
          margin-bottom: 0;
        }

        .filter-section-title {
          font-size: 1rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 1rem;
          border-bottom: 2px solid #e1e8ed;
          padding-bottom: 0.5rem;
        }

        .filter-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .preset-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .preset-button {
          padding: 0.5rem 1rem;
          background: white;
          border: 2px solid #667eea;
          color: #667eea;
          border-radius: 20px;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .preset-button:hover {
          background: #667eea;
          color: white;
        }

        .filter-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid #e1e8ed;
        }

        .clear-filters-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: #f44336;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: background 0.2s ease;
        }

        .clear-filters-button:hover {
          background: #da190b;
        }

        .clear-icon {
          font-size: 0.8rem;
        }

        .filters-badge {
          background: #667eea;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .quick-filters {
            grid-template-columns: 1fr;
          }

          .filter-row {
            grid-template-columns: 1fr;
          }

          .filter-actions {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }

          .preset-buttons {
            justify-content: center;
          }
        }
      `}</style>
    </Card>
  );
};

export default AdvancedFilters;
