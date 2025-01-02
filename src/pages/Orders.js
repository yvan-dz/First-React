import React, { useState } from 'react';

const Orders = () => {
  const [orders] = useState(
    JSON.parse(localStorage.getItem('orders')) || []
  );

  return (
    <div className="orders-container">
      <h2>Bestellhistorie</h2>
      {orders.length > 0 ? (
        <ul className="orders-list">
          {orders.map((order, index) => (
            <li key={index} className="order-item">
              <p className="order-header">
                <strong>Bestellung {index + 1}</strong> (Datum: {order.date || 'Nicht verfügbar'})
              </p>
              <ul className="order-details">
                {order.items.map((item) => (
                  <li key={item.id} className="order-detail-item">
                    {item.name} - {item.quantity} x {item.price.toFixed(2)} €
                  </li>
                ))}
              </ul>
              <p className="order-total">Gesamtsumme: {order.total.toFixed(2)} €</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-orders">Keine Bestellungen gefunden.</p>
      )}
    </div>
  );
};

export default Orders;
