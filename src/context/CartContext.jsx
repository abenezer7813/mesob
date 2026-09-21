import { createContext, useState } from "react";

export const CartContext = createContext()

export function CartProvider({ children }) {
    const CART_KEY = 'cart_items'
    const [cart, setCart] = useState(() => {
        const stored = localStorage.getItem(CART_KEY)
        return stored ? JSON.parse(stored) : []
    })
    function save(newCart) {
        setCart(newCart)
        localStorage.setItem(CART_KEY, JSON.stringify(newCart))
    }
     function addToCart(item) {
    const existing = cart.find((i) => i.id === item.id)

    if (existing) {
        // increment quantity — map over cart, update just this one
        const updated = cart.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
        save(updated)
    } else {

        save([...cart, { ...item, quantity: 1 }])
    }
}
function removeFromCart(itemId) {
    const updated = cart.filter((i) => i.id !== itemId)
    save(updated)
}
function updateQuantity(itemId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(itemId)
        return
    }
    const updated = cart.map((i) =>
        i.id === itemId ? { ...i, quantity: newQuantity } : i
    )
    save(updated)
}
function cartCount() {
    return cart.reduce((sum, i) => sum + i.quantity, 0)
}
function cartTotal() {
    return cart.reduce((sum, i) => sum + i.priceETB * i.quantity, 0)
}

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal }}>
            {children}
        </CartContext.Provider>
    )
}

