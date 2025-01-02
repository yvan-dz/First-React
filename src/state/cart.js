import { create } from 'zustand';

export const useCartStore = create((set) => ({
  cart: [],
  total: 0,
  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);
      let updatedCart;

      if (existingItem) {
        updatedCart = state.cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...state.cart, { ...product, quantity: 1 }];
      }

      return {
        cart: updatedCart,
        total: updatedCart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
      };
    }),
  removeFromCart: (id) =>
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.id !== id);
      return {
        cart: updatedCart,
        total: updatedCart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
      };
    }),
  updateQuantity: (id, quantity) =>
    set((state) => {
      const updatedCart = state.cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      return {
        cart: updatedCart,
        total: updatedCart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
      };
    }),
  clearCart: () => set({ cart: [], total: 0 }),
}));
