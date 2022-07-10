import React from 'react';
import ItemTab from './ItemTab';


const borderStyle = {
  'border':'solid',
  'borderRadius':'1px',
  'justifyContent':'center',
  'width': '800px',
  'padding': '20px',
  'position': 'absolute',
  'left': '50%',
  'top': '50%',
  'margin-right': '-50%',
  'transform': 'translate(-50%, -50%)',
  'display':'flex',
  'flexDirection': 'column', 
  'justifyContent': 'center',
  'textAlign': 'center'
}

const checkBoxContainer = {
  'display': 'flex',
}

const checkBoxStyle = {
  'flex':'1',
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
      <div style={borderStyle}>
        <h1>Input Calculator</h1>
        <p>Set budget, current budget = {budget}</p>
        <input type="number" onChange={e => setBudget(e.target.value)} placeholder='Enter budget amount'></input>
        <p>Available Outlets</p>
        <div style={checkBoxContainer}>
          <div style={checkBoxStyle}>
            <p>Woolworths</p>
            <input type="checkbox" checked={woolies} onClick={() => setWoolies(!woolies)}></input>
          </div>
          <div style={checkBoxStyle}>
            <p>Coles</p>
            <input type="checkbox" checked={coles} onClick={() => setColes(!coles)}></input>
          </div>
        </div>
        <div>
          <p>List of Items:</p>
          {items.map((item, index) => {
              return (
                <div key={`${index}`}>
                  <span>Item{`${index}`}: <ItemTab index={index} updateItem={updateItem} updateMin={updateMin}></ItemTab></span>
                </div>
              )
          })}
        </div>
        <div>
          <button onClick={addItem}>Add New Item</button>
          <button onClick={startCalc}>Submit Items</button>
        </div>
      </div>
      
    </>
  )
};

export default Input;