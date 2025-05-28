import { useState } from "react";
import "./Tabs.css";

const Tabs = ({ tabs, defaultTab = 0, className = "" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className={`tabs ${className}`}>
      <div className="tabs__header">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tabs__button ${activeTab === index ? "tabs__button--active" : ""}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.icon && <span className="tabs__icon">{tab.icon}</span>}
            {tab.label}
            {tab.count !== undefined && (
              <span className="tabs__count">{tab.count}</span>
            )}
          </button>
        ))}
      </div>
      <div className="tabs__content">{tabs[activeTab]?.content}</div>
    </div>
  );
};

export default Tabs;
