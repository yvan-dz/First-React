import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../state/cart';

const Cart = () => {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>Ihr Warenkorb</h2>
      {cart.length > 0 ? (
        <div>
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-details">
                  <p>
                    <strong>{item.name}</strong> - {item.price}€ x {item.quantity}
                  </p>
                </div>
                <div className="cart-item-actions">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value, 10))
                    }
                  />
                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Entfernen
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <h3>Gesamtsumme: {calculateTotal().toFixed(2)}€</h3>
          <div className="cart-actions">
            <button className="clear-cart-button" onClick={clearCart}>
              Warenkorb leeren
            </button>
            <Link to="/checkout">
              <button className="checkout-button">Zum Checkout</button>
            </Link>
          </div>
        </div>
      ) : (
        <p>Ihr Warenkorb ist leer.</p>
      )}
    </div>
  );
};

export default Cart;
