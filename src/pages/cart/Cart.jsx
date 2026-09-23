import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import styles from './Cart.module.css'

function Cart() {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart()
  const navigate = useNavigate()

  const subtotal = cartTotal()
  
  const deliveryFee = subtotal >= 1200 ? 0 : 40
  const tax = Math.round(subtotal * 0.15)
  const grandTotal = subtotal + deliveryFee + tax

  if (cart.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>Your basket is empty.</p>
        <Link to="/menu">Browse the menu</Link>
      </div>
    )
  }

  return (
    <div className={styles.cartPage}>
      <h1 className={styles.title}>Your Gursha Basket</h1>

      <div className={styles.layout}>
        <div className={styles.items}>
          <h2 className={styles.sectionLabel}>
            Clay Pot Stews & Provisions
            <span className={styles.count}>({cart.length} handcrafted selections)</span>
          </h2>

          {cart.map((item) => (
            <div key={item.id} className={styles.card}>
              <img src='doro.png' alt={item.nameEn} className={styles.image} />

              <div className={styles.info}>
                <h3>{item.nameEn}</h3>
                <p className={styles.description}>{item.description}</p>
              </div>

              <div className={styles.priceQty}>
                <span className={styles.price}>ETB {item.priceETB}</span>
                <div className={styles.qtyControl}>
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <button
                  className={styles.removeBtn}
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.ledger}>
          <h2>Basket Ledger</h2>

          <div className={styles.row}>
            <span>Items Subtotal ({cart.length} items)</span>
            <span>ETB {subtotal}</span>
          </div>
          <div className={styles.row}>
            <span>Delivery Fee</span>
            <span>{deliveryFee === 0 ? 'FREE' : `ETB ${deliveryFee}`}</span>
          </div>
          <div className={styles.row}>
            <span>VAT & Tourism Levy (15%)</span>
            <span>ETB {tax}</span>
          </div>

          <div className={styles.grandTotal}>
            <span>Grand Total</span>
            <span>ETB {grandTotal}</span>
          </div>

          <button
            className={styles.checkoutBtn}
            onClick={() => navigate('/checkout')}
          >
            Proceed to Delivery Checkout →
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart