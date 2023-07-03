import { useEffect } from 'react';
import './App.css';
import {RoutesPath} from './Routes';
import { getProductsData } from './serverCalls/getProductsData';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  useEffect(() => {
    getProductsData()
  
  },[] )
  return (
  
  
  <>
  
    <div className="App">
      <RoutesPath />
    </div>
  </>
  );
}

export default App;
