import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "lets-build-cart";

function loadCart() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveCart(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // localStorage unavailable
  }
}

function cartReducer(state, action) {
  let newState;

  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.find(
        (item) =>
          item.id === action.payload.id &&
          item.selectedColor === action.payload.selectedColor &&
          item.selectedSize === action.payload.selectedSize
      );
      if (existing) {
        newState = state.map((item) =>
          item === existing
            ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
            : item
        );
      } else {
        newState = [
          ...state,
          {
            ...action.payload,
            quantity: action.payload.quantity || 1,
            selectedColor: action.payload.selectedColor || "",
            selectedSize: action.payload.selectedSize || "",
          },
        ];
      }
      break;
    }
    case "REMOVE_ITEM":
      newState = state.filter(
        (item) =>
          !(
            item.id === action.payload.id &&
            item.selectedColor === action.payload.selectedColor &&
            item.selectedSize === action.payload.selectedSize
          )
      );
      break;
    case "UPDATE_QUANTITY":
      newState = state.map((item) =>
        item.id === action.payload.id &&
        item.selectedColor === action.payload.selectedColor &&
        item.selectedSize === action.payload.selectedSize
          ? { ...item, quantity: Math.max(1, action.payload.quantity) }
          : item
      );
      break;
    case "CLEAR_CART":
      newState = [];
      break;
    default:
      return state;
  }

  saveCart(newState);
  return newState;
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [], loadCart);

  const addItem = (product, selectedColor = "", selectedSize = "", quantity = 1) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        originalPrice: product.originalPrice,
        thumbnail: product.thumbnail,
        brand: product.brand,
        selectedColor,
        selectedSize,
        quantity,
      },
    });
  };

  const removeItem = (id, selectedColor = "", selectedSize = "") => {
    dispatch({ type: "REMOVE_ITEM", payload: { id, selectedColor, selectedSize } });
  };

  const updateQuantity = (id, quantity, selectedColor = "", selectedSize = "") => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id, quantity, selectedColor, selectedSize },
    });
  };

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = items.reduce(
    (sum, item) =>
      sum + (item.originalPrice - item.price) * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + shipping;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        discount,
        shipping,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}

export default CartContext;
