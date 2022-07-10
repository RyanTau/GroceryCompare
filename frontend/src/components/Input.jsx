import React from 'react';
import ItemTab from './ItemTab';

const checkBoxStyle = {
  'display':'flex',
}

// # Input parameters
// # input['budget'] - '150'
// # input['companies'] - ['COLES', 'WOOLWORTHS']
// # input['products'] - [{name: 'carrot', min_amount: '10'}, {name: 'bananna', min_amount: '2'}]

const Input = ({ setData }) => {
  const [items, setItems] = React.useState([{name: "", min_amount: 0}]);
  const [budget, setBudget] = React.useState(0);
  const [coles, setColes] = React.useState(false);
  const [woolies, setWoolies] = React.useState(false);

  const addItem = () => {
    const newItems = [...items];
    console.log(newItems);
    newItems.push({name: "", min_amount: 0});
    console.log(newItems);
    setItems(newItems);
  };

  const updateItem = (item, index) => {
    console.log(item);
    const newItems = [...items];
    newItems[index]["name"] = item;
    setItems(newItems);
  };

  const updateMin = (min, index) => {
    console.log(min);
    const newItems = [...items];
    newItems[index]["min_amount"] = min;
    setItems(newItems);
  };

  const startCalc = async () => {
    var url = new URL("http://127.0.0.1:8050/calcProducts");
    const companies = []
    if (!coles && !woolies) {
      alert('Please select a store');
      return;
    }

    if (!validInputs()) {
        return;
    }

    if (coles) {
      companies.push("COLES");
    }

    if (woolies) {  
      companies.push("WOOLWORTHS");
    }

    console.log(companies);
    const r = await fetch(url, {
      method:'POST',
      headers : {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        'budget': budget,
        'companies': companies,
        'products': items,
      })
    });
    if (r.ok) {
      const data = await r.json();
      console.log(data);
      console.log(setData);
      setData(data);
    } else {
      console.log('Uncaught Error');
    }
  }

  const validInputs = () => {
    let i = 1;
    items.forEach(item => {
        if (item["name"] === "" || item["min_amount"] < 1 || budget < 0) {
            alert(`Item ${i} has incorrect parameters. Please ensure all fields are entered correctly.`);
            return false;
        }
        i += 1;
    })
    return true;
  }

  return (
    <>
      <h1>Input Calculator AAA</h1>
      <p>Set budget, current budget = {budget}</p>
      <input type="number" onChange={e => setBudget(e.target.value)}></input>
      <div style={checkBoxStyle}>
        <div>
          <p>Woolworths</p>
          <input type="checkbox" checked={woolies} onClick={() => setWoolies(!woolies)}></input>
        </div>
        <div>
          <p>Coles</p>
          <input type="checkbox" checked={coles} onClick={() => setColes(!coles)}></input>
        </div>
      </div>
      <p>List of Items:</p>
      {items.map((item, index) => {
          return (
            <div key={`${index}`}>
              <ItemTab index={index} updateItem={updateItem} updateMin={updateMin}></ItemTab><span>item: {item["item"]}, quantity: {item["min_amount"]}</span>
            </div>
          )
      })};
      <button onClick={addItem}>Add New Item</button>
      <button onClick={startCalc}>Submit Items</button>
    </>
  )
};

export default Input;