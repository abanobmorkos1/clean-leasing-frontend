import { useState } from "react";
import "./CollapsiblePanel.css";

const CollapsiblePanel = ({
  title,
  children,
  defaultOpen = false,
  icon,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`collapsible-panel ${className}`}>
      <button
        className="collapsible-panel__toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="collapsible-panel__header">
          {icon && <span className="collapsible-panel__icon">{icon}</span>}
          <span className="collapsible-panel__title">{title}</span>
        </div>
        <span
          className={`collapsible-panel__arrow ${isOpen ? "collapsible-panel__arrow--open" : ""}`}
        >
          ▼
        </span>
      </button>
      <div
        className={`collapsible-panel__content ${isOpen ? "collapsible-panel__content--open" : ""}`}
      >
        <div className="collapsible-panel__inner">{children}</div>
      </div>
    </div>
  );
};

export default CollapsiblePanel;
