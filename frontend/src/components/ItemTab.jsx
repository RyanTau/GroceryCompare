import React from 'react';

const tabStyle = {
  'display': 'flex',
};

const ItemTab = ({ index, updateItem, updateMin }) => {
  return (
    <div key={`${index}`} className="item-tab" style={tabStyle}>
      <input type="text" placeholder="Item here" onChange={e => updateItem(e.target.value, index)}></input>
      <input type="number" placeholder="Minimum Quantity" onChange={e => updateMin(e.target.value, index)}></input>
      <button>Up</button>
      <button>Down</button>
    </div>
  );
};

export default ItemTab;
