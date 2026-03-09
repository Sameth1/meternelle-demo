"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";

export type FavoriteItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image_url: string;
};

type FavoritesState = { items: FavoriteItem[] };

type FavoritesAction =
  | { type: "ADD_FAVORITE"; payload: FavoriteItem }
  | { type: "REMOVE_FAVORITE"; payload: string }
  | { type: "TOGGLE_FAVORITE"; payload: FavoriteItem }
  | { type: "HYDRATE"; payload: FavoriteItem[] };

const STORAGE_KEY = "meternelle-favorites";

function loadFromStorage(): FavoriteItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as FavoriteItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveToStorage(items: FavoriteItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
}

function favoritesReducer(state: FavoritesState, action: FavoritesAction): FavoritesState {
  switch (action.type) {
    case "ADD_FAVORITE": {
      const exists = state.items.some((i) => i.id === action.payload.id);
      if (exists) return state;
      const next = [...state.items, action.payload];
      saveToStorage(next);
      return { items: next };
    }
    case "REMOVE_FAVORITE": {
      const next = state.items.filter((i) => i.id !== action.payload);
      saveToStorage(next);
      return { items: next };
    }
    case "TOGGLE_FAVORITE": {
      const exists = state.items.some((i) => i.id === action.payload.id);
      const next = exists
        ? state.items.filter((i) => i.id !== action.payload.id)
        : [...state.items, action.payload];
      saveToStorage(next);
      return { items: next };
    }
    case "HYDRATE":
      return { items: action.payload };
    default:
      return state;
  }
}

type FavoritesContextValue = {
  items: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (item: FavoriteItem) => void;
  isFavorite: (id: string) => boolean;
  count: number;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(favoritesReducer, { items: [] });

  useEffect(() => {
    dispatch({ type: "HYDRATE", payload: loadFromStorage() });
  }, []);

  const addFavorite = useCallback((item: FavoriteItem) => {
    dispatch({ type: "ADD_FAVORITE", payload: item });
  }, []);

  const removeFavorite = useCallback((id: string) => {
    dispatch({ type: "REMOVE_FAVORITE", payload: id });
  }, []);

  const toggleFavorite = useCallback((item: FavoriteItem) => {
    dispatch({ type: "TOGGLE_FAVORITE", payload: item });
  }, []);

  const isFavorite = useCallback(
    (id: string) => state.items.some((i) => i.id === id),
    [state.items]
  );

  return (
    <FavoritesContext.Provider
      value={{
        items: state.items,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite,
        count: state.items.length,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
