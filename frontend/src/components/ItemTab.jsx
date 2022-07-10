import React from 'react';

const tabStyle = {
  'display': 'flex',
  'marginBottom': '10px'
};

const inputStyle = {
  'marginLeft': '15px'
}

const ItemTab = ({ index, updateItem, updateMin }) => {
  return (
    <div key={`${index}`} className="item-tab" style={tabStyle}>
      <span key={`item-${index + 1}`}>Item{`${index}`}: 
        <input style={inputStyle} type="text" placeholder="Item here" onChange={e => updateItem(e.target.value, index)}></input>
        <input style={inputStyle} type="number" placeholder="Minimum Quantity" onChange={e => updateMin(e.target.value, index)}></input>
      </span>
    </div>
  );
};

export default ItemTab;
