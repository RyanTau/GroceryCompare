import React from 'react';

const Results = (data) => {
  React.useEffect(() => {
    if (data !== null) {
      console.log('recieved data');
      console.log(data);
    }
  }, [data]);
  return (
    <h1>Hello World</h1>
  )

}

export default Results;