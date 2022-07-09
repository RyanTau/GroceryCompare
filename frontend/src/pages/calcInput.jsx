import React from 'react';
import ItemTab from './../components/ItemTab';
import Input from '../components/Input';
import Results from '../components/Results';

const checkBoxStyle = {
  'display':'flex',
}

const Home = () => {
  const [reqData, setReqData] = React.useState(null);

  const updateData = (data) => {
    setReqData(data);
  }
  // const [items, setItems] = React.useState([{name: "", min_amount: 0}]);
  // const [budget, setBudget] = React.useState(0);
  // const [coles, setColes] = React.useState(false);
  // const [woolies, setWoolies] = React.useState(false);

  // const addItem = () => {
  //   const newItems = [...items];
  //   console.log(newItems);
  //   newItems.push({name: "", min_amount: 0});
  //   console.log(newItems);
  //   setItems(newItems);
  // };

  // const updateItem = (item, index) => {
  //   console.log(item);
  //   const newItems = [...items];
  //   newItems[index]["name"] = item;
  //   setItems(newItems);
  // };

  // const updateMin = (min, index) => {
  //   console.log(min);
  //   const newItems = [...items];
  //   newItems[index]["min_amount"] = min;
  //   setItems(newItems);
  // };

  
  // // # Input parameters
  // // # input['budget'] - '150'
  // // # input['companies'] - ['COLES', 'WOOLWORTHS']
  // // # input['products'] - [{name: 'carrot', min_amount: '10'}, {name: 'bananna', min_amount: '2'}]

  // const startCalc = async () => {
  //   var url = new URL("http://127.0.0.1:8050/calcProducts");
  //   companies = []
  //   if (!coles && !woolies) {
  //     alert('Please select a store');
  //     return
  //   }
  //   if (coles) {
  //     companies.push("COLES");
  //   }

  //   if (woolies) {
  //     companies.push("WOOLWORTHS");
  //   }
  //   console.log(companies);
  //   const r = await fetch(url, {
  //     method:'POST',
  //     headers : {
  //       'Content-Type':'application/json'
  //     },
  //     body: JSON.stringify({
  //       'budget': budget,
  //       'companies': companies,
  //       'products': items,
  //     })
  //   });
  //   if (r.ok) {
  //     const data = await r.json();
  //     console.log(data);
  //   } else {
  //     console.log('Uncaught Error');
  //   }
  // }

  return (
    <>
      {reqData == null && <Input updateData={updateData}></Input>}
      {reqData != null && <Results key={reqData} data={reqData}></Results>}
    </>
  )
};

export default Home;