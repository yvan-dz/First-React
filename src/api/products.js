import axios from 'axios';

const API_URL = 'http://localhost:5000/products';

export const fetchProducts = async () => {
  try {
    const response = await fetch('https://cdn.jsdelivr.net/gh/yvan-dz/First-React@main/db.json');
    if (!response.ok) {
      throw new Error('Fehler beim Laden der Produkte');
    }
    const data = await response.json();
    return data.products; // Produkte aus dem JSON-Objekt zurückgeben
  } catch (error) {
    console.error('Fehler in fetchProducts:', error);
    return [];
  }
};

