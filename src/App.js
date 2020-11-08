import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';


const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

function App() {
  useEffect(() => {
    const fetchProducts = async () => {
      // GET products
      const response = await fetch('http://localhost:3000/products', {
        method: 'GET',
        headers: headers,

      });
      const data = await response.json();
      console.log(data);
    }
    fetchProducts();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
