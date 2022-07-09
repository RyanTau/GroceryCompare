import React from 'react';
import ItemTab from './../components/ItemTab';

const Home = () => {
  const [items, setItems] = React.useState([{name: "", min_amount: 0}]);
  const [budget, setBudget] = React.useState(0);
  const [companies, setCompanies] = React.useState(["WOOLWORTHS"]);

  // const echoFunc = async () => {
  //   var params = { "data" : "shrek" };
  //   var url = new URL("http://127.0.0.1:8050/echo");
  //   for (let k in params) { url.searchParams.append(k, params[k]); }

  //   const r = await fetch(url, {
  //     'methods':'GET',
  //     headers : {
  //       'Content-Type':'application/json'
  //     },
  //   })
  //   if (r.ok) {
  //     const data = await r.json();
  //     console.log(data);
  //   } else {
  //     console.log('Sumting wong');
  //   }
  // }

  // React.useEffect(() => {
  //   console.log('echoing from backend');
  //   echoFunc();
  // }, [click]);

  // const activate = () => {
  //   console.log('activated');
  //   setClick(!click);
  // };

  React.useEffect(() => {
    console.log('state');
    console.log(items);
    // setCompanies("Woolworths");
  }, [items])

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

  
  // # Input parameters
  // # input['budget'] - '150'
  // # input['companies'] - ['COLES', 'WOOLWORTHS']
  // # input['products'] - [{name: 'carrot', min_amount: '10'}, {name: 'bananna', min_amount: '2'}]

  const startCalc = async () => {
    // var params = { "data" : "shrek" };
    var url = new URL("http://127.0.0.1:8050/calcProducts");
    // for (let k in params) { url.searchParams.append(k, params[k]); }

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
    } else {
      console.log('Sumting wong');
    }
  }

  return (
    <>
      <h1>Input Calculator L</h1>
      <p>Set budget, current budget = {budget}</p>
      <input type="number" onChange={e => setBudget(e.target.value)}></input>
      <div>
        <p>Woolworths</p>
        <input type="checkbox"></input>
        <p>Coles</p>
        <input type="checkbox"></input>
      </div>
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

export default Home;