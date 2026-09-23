import { useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import styles from './OrderConfirmation.module.css'

function OrderConfirmation() {
  const { state } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!state) {
      navigate('/menu', { replace: true })
    }
  }, [state, navigate])

  if (!state) return null

  const { items, grandTotal } = state

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.checkIcon}>✓</div>

        <h1 className={styles.title}>Order Confirmed!</h1>
        <p className={styles.subtitle}>
          Thank you for choosing Mesob House. Your Gursha is on its way.
        </p>

        <div className={styles.items}>
          <h2>Order Summary</h2>
          {items.map((item) => (
            <div key={item.id} className={styles.item}>
              <span>{item.nameEn} × {item.quantity}</span>
              <span>ETB {item.priceETB * item.quantity}</span>
            </div>
          ))}
        </div>

        <div className={styles.total}>
          <span>Grand Total</span>
          <span>ETB {grandTotal}</span>
        </div>

        <Link to="/menu" className={styles.backBtn}>
          Back to Menu
        </Link>
      </div>
    </div>
  )
}

export default OrderConfirmation