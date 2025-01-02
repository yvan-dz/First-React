export const fetchProducts = async () => {
  try {
    const response = await fetch('https://raw.githubusercontent.com/yvan-dz/First-React/main/db.json');
    if (!response.ok) {
      throw new Error(`HTTP-Fehler: ${response.status}`);
    }
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error('Fehler beim Abrufen der Produkte:', error.message);
    return [];
  }
};
