import React from 'react';
import ItemTab from './ItemTab';


const borderStyle = {
  'border':'solid',
  'borderRadius':'1px',
  'justifyContent':'center',
  'width': '800px',
  'padding': '30px',
  'position': 'absolute',
  'left': '50%',
  'top': '50%',
  'marginRight': '-50%',
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

const buttonContainer = {
  'marginTop': '40px',
}

const buttonsStyle = {
  'margin': '0 20px 0 20px',
}

const headingText = {
  'textAlign': 'left',
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
    newItems.push({name: "", min_amount: 0});
    setItems(newItems);
  };

  const updateItem = (item, index) => {
    const newItems = [...items];
    newItems[index]["name"] = item;
    setItems(newItems);
  };

  const updateMin = (min, index) => {
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
        <h1>Grocery Calculator</h1>
        <p>Current budget = {budget}</p>
        <input type="number" onChange={e => setBudget(e.target.value)} placeholder='Enter budget amount'></input>
        <div style={headingText}>
          <h3>Available Outlets:</h3>
        </div>
        <div style={checkBoxContainer}>
          <div style={checkBoxStyle}>
            <span>Woolworths: <input type="checkbox" checked={woolies} onClick={() => setWoolies(!woolies)}></input></span>
          </div>
          <div style={checkBoxStyle}>
            <span>Coles: <input type="checkbox" checked={coles} onClick={() => setColes(!coles)}></input></span>
          </div>
        </div>
        <div>
          <div style={headingText}>
            <h3>List of Items:</h3>
          </div>
          {items.map((item, index) => {
            return (
              <ItemTab index={index} updateItem={updateItem} updateMin={updateMin}></ItemTab>
            )
          })}
        </div>
        <div style={buttonContainer}>
          <button style={buttonsStyle} onClick={addItem}>Add New Item</button>
          <button style={buttonsStyle} onClick={startCalc}>Submit Items</button>
        </div>
      </div>
      
    </>
  )
};

export default Input;