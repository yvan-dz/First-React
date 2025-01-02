import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { useCartStore } from './state/cart';
import Orders from './pages/Orders';
import ProductDetails from './pages/ProductDetails';


function App() {
  const cartCount = useCartStore((state) =>
    state.cart.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/cart">Warenkorb ({cartCount})</Link>
        <Link to="/checkout">Checkout</Link>
        <Link to="/orders">Bestellhistorie</Link>

      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/products/:id" element={<ProductDetails />} />

      </Routes>
    </Router>
  );
}

export default App;
