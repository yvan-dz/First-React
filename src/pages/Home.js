import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api/products';
import { useCartStore } from '../state/cart';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
  TextField,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [filterText, setFilterText] = useState('');
  const [notification, setNotification] = useState('');
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      const updatedProducts = data.map((product) => ({
        ...product,
        image: product.image || `https://via.placeholder.com/400`,
      }));
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
    };
    loadProducts();
  }, []);

  const handleSort = (order) => {
    const sorted = [...filteredProducts].sort((a, b) => {
      if (order === 'price-asc') return a.price - b.price;
      if (order === 'price-desc') return b.price - a.price;
      if (order === 'name-asc') return a.name.localeCompare(b.name);
      if (order === 'name-desc') return b.name.localeCompare(a.name);
      return 0;
    });
    setFilteredProducts(sorted);
    setSortOrder(order);
  };

  const handleFilter = (text) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);
    setFilterText(text);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setNotification(`${product.name} wurde dem Warenkorb hinzugefügt!`);
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero">
        <h1>Willkommen bei unserem Shop </h1>
        <p>Entdecke die neuesten Angebote und Produkte!</p>
        <Button variant="contained" color="secondary" size="large">
          Jetzt starten
        </Button>
      </div>

      {/* Notification */}
      {notification && (
        <Snackbar open={!!notification} autoHideDuration={3000}>
          <Alert severity="success">{notification}</Alert>
        </Snackbar>
      )}

      {/* Filter and Sort Section */}
      <div className="filter-sort">
        <TextField
          fullWidth
          label="Nach Jobtitel filtern"
          variant="outlined"
          value={filterText}
          onChange={(e) => handleFilter(e.target.value)}
        />
        <Select
          fullWidth
          value={sortOrder}
          onChange={(e) => handleSort(e.target.value)}
          displayEmpty
        >
          <MenuItem value="">Sortieren</MenuItem>
          <MenuItem value="price-asc">Gehalt: aufsteigend</MenuItem>
          <MenuItem value="price-desc">Gehalt: absteigend</MenuItem>
          <MenuItem value="name-asc">Name: A-Z</MenuItem>
          <MenuItem value="name-desc">Name: Z-A</MenuItem>
        </Select>
      </div>

      {/* Product List */}
      <Grid container spacing={3} className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card className="job-card">
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Link to={`/products/${product.id}`} className="job-link">
                    <Typography variant="h6" gutterBottom>
                      {product.name}
                    </Typography>
                  </Link>
                  <Typography variant="body2" color="textSecondary">
                    {product.price} €
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddToCart(product)}
                    className="add-to-cart-btn"
                  >
                    In den Warenkorb
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary" align="center">
            Keine Produkte verfügbar.
          </Typography>
        )}
      </Grid>

      {/* Testimonials */}
      <div className="carousel">
        <h2>Was unsere Nutzer sagen</h2>
        <div className="carousel-container">
          <div className="carousel-item">"Beste Plattform für Technik!" - Maria</div>
          <div className="carousel-item">
            "Alles perfekt!" - Stefan
          </div>
          <div className="carousel-item">"Sehr benutzerfreundlich!" - Anna</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
