import React, { useState } from "react";
import "./CollapsibleDiv.css";

const CollapsibleDiv = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`collapsible ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="collapsible-header" onClick={handleToggle}>
        <span className="collapsible-icon">{isCollapsed ? '+' : '-'}</span>
      </div>
      <div className="collapsible-content">{children}</div>
    </div>
  );
};

export default CollapsibleDiv;
