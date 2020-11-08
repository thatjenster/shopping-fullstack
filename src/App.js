import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Cart from './component/Cart';
import Products from './component/Products';


const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

function App() {
  const [products, setProducts] = useState([]);

  const [cartId, setCartId] = useState(null);
  const [cartItems, setCartItems] = useState([]);
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

  const addToCart = async (newProductId) => {
    const body = {
      productId: newProductId,
    }
    if(!cartId) {
    const response = await fetch('http://localhost:3000/carts', {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
    const data = await response.json();
    setCartId(data.id);
    setCartItems(data.products);
  } else {
    const response = await fetch(`http://localhost:3000/carts/${cartId}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body),
    })
    const data = await response.json();
    setCartItems(data.products);
  }
  }
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Buy our Products!</h1>
        </header>
        <main>
          <section>
              <Link to="/cart">View your cart!</Link>
              <Route exact path="/" render={() => <Products addToCart={addToCart} products={products} />} />
              <Route path="/cart" render={() => <Cart cartItems={cartItems} />} />
          </section>
        </main>
      </div>
    </Router>
  );
}

export default App;
