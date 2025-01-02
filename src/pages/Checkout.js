import React, { useState } from 'react';
import { useCartStore } from '../state/cart';
import '../styles/checkout.css';

const Checkout = () => {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    payment: '',
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.address && formData.payment) {
      const newOrder = {
        items: cart,
        total: calculateTotal(),
        customer: formData,
      };
      const orders = JSON.parse(localStorage.getItem('orders')) || [];
      orders.push(newOrder);
      localStorage.setItem('orders', JSON.stringify(orders));
  
      clearCart();
      setOrderPlaced(true);
    } else {
      alert('Bitte füllen Sie alle Felder aus!');
    }
  };

  if (orderPlaced) {
    return (
      <div className="checkout-container">
        <h2>Vielen Dank für Ihre Bestellung!</h2>
        <p>Ihre Bestellung wurde erfolgreich aufgegeben.</p>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <h3>Gesamtsumme: {calculateTotal().toFixed(2)}€</h3>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Adresse:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="payment">Zahlungsmethode:</label>
          <select
            id="payment"
            name="payment"
            value={formData.payment}
            onChange={handleChange}
            required
          >
            <option value="">Bitte wählen</option>
            <option value="Kreditkarte">Kreditkarte</option>
            <option value="PayPal">PayPal</option>
            <option value="Rechnung">Rechnung</option>
          </select>
        </div>
        <button className="submit-button" type="submit">
          Bestellung abschließen
        </button>
      </form>
    </div>
  );
};

export default Checkout;
