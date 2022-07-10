import React from 'react';
import ItemTab from './../components/ItemTab';
import Input from '../components/Input';
import Results from '../components/Results';

const checkBoxStyle = {
  'display':'flex',
}

const Home = () => {
  const [reqData, setReqData] = React.useState(null);

  return (
    <>
      {reqData === null && <Input setData={setReqData}></Input>}
      {reqData !== null && <Results key={reqData} data={reqData}></Results>}
    </>
  )
};

export default Home;