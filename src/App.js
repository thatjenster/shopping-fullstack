import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';


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
    <div className="App">
      <header className="App-header">
        <h1>Buy our Products!</h1>
      </header>
      <main>
        <section>
          <div className="products">
            {products.map((product) => {
              return(
                <div key={product.id} className="product-single">
                  <h3>{product.title}</h3>
                  <p>{product.price}.00</p>
                  <button onClick={() => { addToCart(product.id) }}>Add to cart</button>
                </div>
              )
            })}
          </div>
        </section>
        <section>
          <h2>Your Cart</h2>
          <div className="products__cart">
            {cartItems.map((item) => (
              <div>
                <h4>{item.title}</h4>
                <p>${item.price}.00</p>
                <p>{item.count}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
