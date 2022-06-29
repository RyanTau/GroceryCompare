import React from 'react';

const Home = () => {
  const [click, setClick] = React.useState(false);
  const echoFunc = async () => {
    var params = { "data" : "shrek" };
    var url = new URL("http://127.0.0.1:8050/echo");
    for (let k in params) { url.searchParams.append(k, params[k]); }

    const r = await fetch(url, {
      'methods':'GET',
      headers : {
        'Content-Type':'application/json'
      },
    })
    if (r.ok) {
      const data = await r.json();
      console.log(data);
    } else {
      console.log('Sumting wong');
    }
}

  React.useEffect(() => {
    console.log('echoing from backend');
    echoFunc();
  }, [click]);
  
  const activate = () => {
    console.log('activated');
    setClick(!click);
  };

  return (
    <>
      <h1>Calc Input</h1>
      <button onClick={activate}>Activate</button>
    </>
  )
};

export default Home;