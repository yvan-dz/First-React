import axios from 'axios';

const API_URL = 'http://localhost:5000/products';

export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Fehler beim Laden der Produkte:', error);
    return [];
  }
};
