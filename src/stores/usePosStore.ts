import { create } from "zustand";
import { Inventory, Customer } from "@/types/database.types";

export type CartItem = Inventory & { cart_quantity: number };

interface PosState {
  selectedCustomer: Customer | null;
  cart: CartItem[];
  discount: number;
  advancePaid: number;
  
  // Actions
  setCustomer: (customer: Customer | null) => void;
  addToCart: (item: Inventory) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  setDiscount: (discount: number) => void;
  setAdvancePaid: (advance: number) => void;
  clearCart: () => void;
}

export const usePosStore = create<PosState>((set) => ({
  selectedCustomer: null,
  cart: [],
  discount: 0,
  advancePaid: 0,

  setCustomer: (customer) => set({ selectedCustomer: customer }),
  
  addToCart: (item) =>
    set((state) => {
      const existing = state.cart.find((c) => c.id === item.id);
      if (existing) {
        return {
          cart: state.cart.map((c) =>
            c.id === item.id
              ? { ...c, cart_quantity: c.cart_quantity + 1 }
              : c
          ),
        };
      }
      return { cart: [...state.cart, { ...item, cart_quantity: 1 }] };
    }),

  removeFromCart: (itemId) =>
    set((state) => ({
      cart: state.cart.filter((c) => c.id !== itemId),
    })),

  updateQuantity: (itemId, quantity) =>
    set((state) => ({
      cart: state.cart.map((c) =>
        c.id === itemId ? { ...c, cart_quantity: quantity } : c
      ),
    })),

  setDiscount: (discount) => set({ discount }),
  setAdvancePaid: (advancePaid) => set({ advancePaid }),
  
  clearCart: () => set({ cart: [], selectedCustomer: null, discount: 0, advancePaid: 0 }),
}));
