"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image_url: string;
  beden: string;
  quantity: number;
};

type CartState = { items: CartItem[] };

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "HYDRATE"; payload: CartItem[] };

const STORAGE_KEY = "meternelle-cart";

function loadFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveToStorage(items: CartItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.id === action.payload.id);
      let next: CartItem[];
      if (existing) {
        next = state.items.map((i) =>
          i.id === action.payload.id
            ? { ...i, quantity: i.quantity + action.payload.quantity }
            : i
        );
      } else {
        next = [...state.items, action.payload];
      }
      saveToStorage(next);
      return { items: next };
    }
    case "REMOVE_ITEM": {
      const next = state.items.filter((i) => i.id !== action.payload);
      saveToStorage(next);
      return { items: next };
    }
    case "UPDATE_QUANTITY": {
      if (action.payload.quantity < 1) {
        const next = state.items.filter((i) => i.id !== action.payload.id);
        saveToStorage(next);
        return { items: next };
      }
      const next = state.items.map((i) =>
        i.id === action.payload.id
          ? { ...i, quantity: action.payload.quantity }
          : i
      );
      saveToStorage(next);
      return { items: next };
    }
    case "CLEAR_CART":
      saveToStorage([]);
      return { items: [] };
    case "HYDRATE":
      return { items: action.payload };
    default:
      return state;
  }
}

type CartContextValue = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  lastAddedSlug: string | null;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const [lastAddedSlug, setLastAddedSlug] = useState<string | null>(null);

  useEffect(() => {
    dispatch({ type: "HYDRATE", payload: loadFromStorage() });
  }, []);

  const addItem = useCallback((item: CartItem) => {
    dispatch({ type: "ADD_ITEM", payload: item });
    setLastAddedSlug(item.slug);
  }, []);

  useEffect(() => {
    if (!lastAddedSlug) return;
    const t = setTimeout(() => setLastAddedSlug(null), 3000);
    return () => clearTimeout(t);
  }, [lastAddedSlug]);

  const removeItem = useCallback((id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        lastAddedSlug,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
