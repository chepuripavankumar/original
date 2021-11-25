import React from 'react';
import styled from 'styled-components'
import axios from 'axios';
import constants from './constants';
import  appCss from './appCss.js'
import Table from './Table/Table.jsx'
import processResponse  from './util';
import  {ErrorFallbackComponent}  from './FallBackComponent';

const Styles = styled.div `${appCss}`
const URL= `http://localhost:9001/api/payments`

function App() {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    axios.get(URL).then(res => { 
      setData(processResponse(res.data.results));
    });
  }, []);
  
  return (
    <Styles>
    {(data && data.length) ? <Table  data={data} columns={constants.columns} /> :<ErrorFallbackComponent message="Unable to fetch payments"/> }
    </Styles>
  )

}
export default App
