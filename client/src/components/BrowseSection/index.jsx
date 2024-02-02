import React from 'react';

const BrowserSection = ({ data, onSelect }) => {
    console.log("test", data)
  return (
    <div className="browser-section">
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

export default BrowserSection;