import { useState } from "react";
import "./Navigation.css";

const Navigation = ({ currentRole, onRoleChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const roles = [
    {
      id: "sales",
      name: "Sales",
      icon: "💼",
      description: "Post & track deliveries",
    },
    {
      id: "driver",
      name: "Driver",
      icon: "🚗",
      description: "Deliveries & clock in/out",
    },
    {
      id: "management",
      name: "Management",
      icon: "👔",
      description: "Approve & assign tasks",
    },
    {
      id: "owner",
      name: "Owner",
      icon: "👑",
      description: "Full analytics & oversight",
    },
  ];

  const currentRoleData = roles.find((role) => role.id === currentRole);

  return (
    <nav className="navigation">
      <div className="navigation__container">
        <div className="navigation__brand">
          <h1 className="navigation__title">Car Leasing Manager</h1>
        </div>

        <div className="navigation__role-selector">
          <button
            className="navigation__current-role"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="navigation__role-icon">
              {currentRoleData?.icon}
            </span>
            <div className="navigation__role-info">
              <span className="navigation__role-name">
                {currentRoleData?.name}
              </span>
              <span className="navigation__role-desc">
                {currentRoleData?.description}
              </span>
            </div>
            <span
              className={`navigation__dropdown-arrow ${isMenuOpen ? "navigation__dropdown-arrow--open" : ""}`}
            >
              ▼
            </span>
          </button>

          {isMenuOpen && (
            <div className="navigation__dropdown">
              {roles.map((role) => (
                <button
                  key={role.id}
                  className={`navigation__role-option ${role.id === currentRole ? "navigation__role-option--active" : ""}`}
                  onClick={() => {
                    onRoleChange(role.id);
                    setIsMenuOpen(false);
                  }}
                >
                  <span className="navigation__role-icon">{role.icon}</span>
                  <div className="navigation__role-info">
                    <span className="navigation__role-name">{role.name}</span>
                    <span className="navigation__role-desc">
                      {role.description}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
