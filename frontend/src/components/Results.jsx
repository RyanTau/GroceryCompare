import React from 'react';

const Results = (data) => {
  const [totalCost, setTotalCost] = React.useState(0);
  const [leftover, setLeftover] = React.useState(0);
  const [colesItems, setColesItems] = React.useState([]);
  const [wooliesItems, setWooliesItems] = React.useState([]);

  React.useEffect(() => {
    if (data !== null) {
      console.log('recieved data');
      if ('Coles' in data) {
        setColesItems(data['Coles']);
      }
      if ('Woolworths' in data) {
        setWooliesItems(data['Woolworths']);
      }
      setTotalCost(data['UNUSED']);
      setLeftover(data['USED']);
      console.log(data);
    }
  }, [data]);

  React.useEffect(() => {
    console.log(totalCost, leftover, colesItems, wooliesItems);
  }, [totalCost])
  
  return (
    <h1>Cheapest Ingredients</h1>
  )

}

export default Results;