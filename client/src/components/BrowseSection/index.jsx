import React from "react";

const BrowseSection = ({ data, onSelect }) => {
  return (
    <div className="browse-section">
      <h2>All Communities</h2>
      <ul>
        {data.map((item) => (
          <li key={item._id} onClick={() => onSelect(item)}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrowseSection;
