import React from 'react';

const colStyle = {
  'border': 'solid',
  'borderWidth': '1px',
  'textAlign': 'center',
  'width': '200px'
}

const container = {
  'width': '1000px',
  'display': 'flex'
}

const BorderStyle = {
  'border':'solid',
  'borderRadius':'1px',
  'justifyContent':'center',
  'width': '1000px',
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

const tableContainer = {
  'margin':'auto'
}

const Results = (data) => {
  const [totalCost, setTotalCost] = React.useState(0);
  const [leftover, setLeftover] = React.useState(0);
  const [colesItems, setColesItems] = React.useState(null);
  const [wooliesItems, setWooliesItems] = React.useState(null);

  React.useEffect(() => {
    if (data !== null) {
      if ('Coles' in data.data) {
        setColesItems(data.data.Coles);
      }
      if ('Woolworths' in data.data) {
        setWooliesItems(data.data.Woolworths);
      }
      setTotalCost(data.data.UNUSED);
      setLeftover(data.data.USED);
    }
  }, [data]);
  
  return (
    <div style={BorderStyle}>
      <h1>Cheapest Ingredients</h1>
      <p>Total Amount Spent: ${totalCost}</p>
      <p>Total Amount Leftover: ${leftover}</p>
      <h3>Coles</h3>
      <div style={tableContainer}>
        <div style={container}>
          <div style={colStyle}>Item</div>
          <div style={colStyle}>Product Name</div>
          <div style={colStyle}>Cost Per Item</div>
          <div style={colStyle}>Cost Per Weight</div>
          <div style={colStyle}>Number of Items Purchased</div>
        </div>
        {colesItems !== null && 
          Object.entries(colesItems).map(([key, item], index) => {
            return (
              <div style={container} key={`${index}`}>
                <div style={colStyle}>{key}</div>
                <div style={colStyle}>{item[0]}</div>
                <div style={colStyle}>{item[1]}</div>
                <div style={colStyle}>{item[2]}</div>
                <div style={colStyle}>{item[3]}</div>
              </div>
            )
          })
        }
      </div>
      <h3>Woolworths</h3>
      <div style={tableContainer}>
        <div style={container}>
          <div style={colStyle}>Item</div>
          <div style={colStyle}>Product Name</div>
          <div style={colStyle}>Cost Per Item</div>
          <div style={colStyle}>Cost Per Weight</div>
          <div style={colStyle}>Number of Items Purchased</div>
        </div>
        {wooliesItems !== null && 
          Object.entries(wooliesItems).map(([key, item], index) => {
            return (
              <div style={container} key={`${index}`}>
                <div style={colStyle}>{key}</div>
                <div style={colStyle}>{item[0]}</div>
                <div style={colStyle}>{item[1]}</div>
                <div style={colStyle}>{item[2]}</div>
                <div style={colStyle}>{item[3]}</div>
              </div>
            )
          })
        }
      </div>
      
    </div>

  )

}

export default Results;