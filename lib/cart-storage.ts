export type StoredCartItem = {
  id: string;
  qty: number;
};

export const CART_STORAGE_KEY = "sams-cart-items";

export function getStoredCart(): StoredCartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  const rawCart = window.localStorage.getItem(CART_STORAGE_KEY);

  if (!rawCart) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawCart) as StoredCartItem[];

    return parsed
      .filter((item) => item.id && Number.isFinite(item.qty) && item.qty > 0)
      .map((item) => ({ id: item.id, qty: Math.floor(item.qty) }));
  } catch {
    window.localStorage.removeItem(CART_STORAGE_KEY);
    return [];
  }
}

export function setStoredCart(items: StoredCartItem[]) {
  const nextItems = items.filter((item) => item.qty > 0);
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(nextItems));
  window.dispatchEvent(new Event("sams-cart-updated"));
  return nextItems;
}

export function addProductToStoredCart(productId: string, qty = 1) {
  const current = getStoredCart();
  const existing = current.find((item) => item.id === productId);

  if (!existing) {
    return setStoredCart([...current, { id: productId, qty }]);
  }

  return setStoredCart(
    current.map((item) =>
      item.id === productId ? { ...item, qty: item.qty + qty } : item
    )
  );
}

export function updateStoredCartQuantity(productId: string, qty: number) {
  return setStoredCart(
    getStoredCart().map((item) =>
      item.id === productId ? { ...item, qty: Math.max(1, qty) } : item
    )
  );
}

export function removeStoredCartItem(productId: string) {
  return setStoredCart(getStoredCart().filter((item) => item.id !== productId));
}

export function cartTotalItems(items: StoredCartItem[]) {
  return items.reduce((total, item) => total + item.qty, 0);
}
