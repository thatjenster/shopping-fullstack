const Cart = ({ cartItems }) => {
    return (
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
    )
}
export default Cart;