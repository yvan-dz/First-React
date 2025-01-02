import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProducts } from '../api/products';
import { useCartStore } from '../state/cart';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Container,
  CircularProgress,
  Grid,
} from '@mui/material';

const ProductDetails = () => {
  const { id } = useParams(); // Produkt-ID aus der URL extrahieren
  const [product, setProduct] = useState(null); // Produktdaten speichern
  const [loading, setLoading] = useState(true); // Ladezustand verwalten
  const addToCart = useCartStore((state) => state.addToCart); // Zustand des Warenkorbs

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productId = parseInt(id, 10); // ID aus URL in Zahl konvertieren
        if (isNaN(productId)) {
          console.error('Ungültige Produkt-ID:', id);
          setProduct(null);
          setLoading(false);
          return;
        }

        const data = await fetchProducts(); // Produkte von der API abrufen
        console.log('Geladene Produkte:', data); // Debugging: Produkte anzeigen
        const foundProduct = data.find((item) => item.id === productId); // Passendes Produkt suchen
        setProduct(foundProduct || null);
      } catch (error) {
        console.error('Fehler beim Laden des Produkts:', error);
      } finally {
        setLoading(false); // Ladezustand beenden
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <Container style={{ textAlign: 'center', marginTop: '50px' }}>
        <CircularProgress />
        <Typography variant="h6" style={{ marginTop: '20px' }}>
          Produkt wird geladen...
        </Typography>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container style={{ textAlign: 'center', marginTop: '50px' }}>
        <Typography variant="h5" color="textSecondary">
          Produkt nicht gefunden
        </Typography>
        <Link to="/">
          <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
            Zurück zur Startseite
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container style={{ marginTop: '30px', maxWidth: '800px' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={product.image || 'https://via.placeholder.com/400'}
              alt={product.name}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              {product.description || 'Keine Beschreibung verfügbar.'}
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              <strong>Kategorie:</strong> {product.category || 'Allgemein'}
            </Typography>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Preis: {product.price.toFixed(2)} €
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => addToCart(product)}
              style={{ marginTop: '10px' }}
            >
              In den Warenkorb
            </Button>
            <Link to="/">
              <Button
                variant="outlined"
                color="secondary"
                style={{ marginTop: '10px', marginLeft: '10px' }}
              >
                Zurück zur Startseite
              </Button>
            </Link>
          </CardContent>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetails;
