import { createContext, useReducer, useEffect } from "react"

export const CartContext = createContext()

const CART_KEY = 'cart_items'

function getInitialCart() {
    const stored = localStorage.getItem(CART_KEY)
    return stored ? JSON.parse(stored) : []
}

function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const { item, quantity } = action
            const existing = state.find((i) => i.id === item.id)

            if (existing) {
                return state.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
                )
            }
            return [...state, { ...item, quantity }]
        }

        case 'REMOVE_FROM_CART': {
            return state.filter((i) => i.id !== action.itemId)
        }

        case 'UPDATE_QUANTITY': {
            const { itemId, quantity } = action
            if (quantity <= 0) {
                return state.filter((i) => i.id !== itemId)
            }
            return state.map((i) =>
                i.id === itemId ? { ...i, quantity } : i
            )
        }

        case 'CLEAR_CART': {
            return []
        }

        default:
            return state
    }
}

export function CartProvider({ children }) {
    const [cart, dispatch] = useReducer(cartReducer, undefined, getInitialCart)

    useEffect(() => {
        localStorage.setItem(CART_KEY, JSON.stringify(cart))
    }, [cart])

    function addToCart(item, quantity = 1) {
        dispatch({ type: 'ADD_TO_CART', item, quantity })
    }

    function removeFromCart(itemId) {
        dispatch({ type: 'REMOVE_FROM_CART', itemId })
    }

    function updateQuantity(itemId, quantity) {
        dispatch({ type: 'UPDATE_QUANTITY', itemId, quantity })
    }

    function clearCart() {
        dispatch({ type: 'CLEAR_CART' })
    }

    function cartCount() {
        return cart.reduce((sum, i) => sum + i.quantity, 0)
    }

    function cartTotal() {
        return cart.reduce((sum, i) => sum + i.priceETB * i.quantity, 0)
    }

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}
        >
            {children}
        </CartContext.Provider>
    )
}