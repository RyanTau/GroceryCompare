import React from 'react';
import ItemTab from './../components/ItemTab';
import Input from '../components/Input';
import Results from '../components/Results';

const checkBoxStyle = {
  'display':'flex',
}

const Home = () => {
  React.useEffect(() => {
    updateData(null);
  }, []);
  const [reqData, setReqData] = React.useState(null);

  const updateData = (data) => {
    setReqData(data);
  };

  return (
    <>
      {reqData == null && <Input setData={setReqData}></Input>}
      {reqData != null && <Results key={reqData} data={reqData}></Results>}
    </>
  )
};

export default Home;