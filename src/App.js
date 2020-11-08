import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';


const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      // GET products
      const response = await fetch('http://localhost:3000/products', {
        method: 'GET',
        headers: headers,

      });
      const data = await response.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Buy our Products!</h1>
      </header>
      <main>
        <section>
          <div className="products">
            {products.map((product) => {
              return(
                <div>
                  <h3>{product.title}</h3>
                  <p>{product.price}.00</p>
                </div>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
