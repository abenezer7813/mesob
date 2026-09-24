import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
    persist(
        (set) => ({
            items: [],
            addItem: (item, quantity) =>
                set((state) => {
                    const existing = state.items.find((i) => i.id === item.id);

                    if (existing) {
                        return {
                            items: state.items.map((i) =>
                                i.id === item.id
                                    ? { ...i, quantity: i.quantity + quantity }
                                    : i
                            ),
                        };
                    }

                    return {
                        items: [...state.items, { ...item, quantity }],
                    };
                }),

            updateQuantity: (itemId, quantity) =>
                set((state) => ({
                    items: state.items.map((i) =>
                        itemId === i.id ? { ...i, quantity } : i
                    ),
                })),

            removeFromCart: (itemId) =>
                set((state) => ({
                    items: state.items.filter((i) => i.id !== itemId),
                })),
        }),
        {
            name: "cart_items",
        }
    )
);