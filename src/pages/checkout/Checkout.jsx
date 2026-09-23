import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useCart } from '../../hooks/useCart'
import styles from './Checkout.module.css'

const paymentMethods = [
  { id: 'telebirr', label: 'Telebirr Quick Merchant Pay' },
  { id: 'cbe', label: 'CBE Birr / CBE Mobile Banking' },
  { id: 'cod', label: 'Cash or Card on Delivery' },
  { id: 'amole', label: 'Amole / Awash Birr' },
]

function Checkout() {
  const { user } = useAuth()
  const { cart, cartTotal ,clearCart} = useCart()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    subCity: '',
    street: '',
    landmark: '',
    deliveryTime: 'immediate',
    paymentMethod: 'telebirr',
  })
  const [errors, setErrors] = useState({})

  function handleChange(e) {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  function validate() {
    const errs = {}
    if (!form.fullName) errs.fullName = 'Name is required'
    if (!form.email) errs.email = 'Email is required'
    if (!form.phone) {
      errs.phone = 'Phone number is required'
    } else if (!/^\d{9}$/.test(form.phone)) {
      errs.phone = 'Enter a valid 9-digit number'
    }
    if (!form.subCity) errs.subCity = 'Sub-city is required'
    if (!form.street) errs.street = 'Street address is required'
    return errs
  }
  const subtotal = cartTotal()
  const expressFee = 150
  const grandTotal = subtotal + expressFee

 function handleConfirm(e) {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors)
        return
    }
    setErrors({})

    const order = {
        items: cart,
        grandTotal,
    }

    clearCart()
    navigate('/order-confirmation', { state: order })
}

  return (
    <div className={styles.checkoutPage}>
      <div className={styles.steps}>
        <span className={styles.stepDone}>1. Review Order</span>
        <span className={styles.stepActive}>2. Delivery & Payment</span>
        <span className={styles.stepPending}>3. Confirmation</span>
      </div>

      <form className={styles.layout} onSubmit={handleConfirm}>
        <div className={styles.formColumn}>
          <section className={styles.card}>
            <h2>1. Contact & Guest Details</h2>
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="fullName">Recipient Name</label>
                <input
                  id="fullName"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && <p className={styles.error}>{errors.fullName}</p>}
              </div>
              <div className={styles.field}>
                <label htmlFor="phone">Phone (Ethiopian Telegram Line)</label>
                <div className={styles.phoneInput}>
                  <span>+251</span>
                  <input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="911 234 567"
                  />
                </div>
                {errors.phone && <p className={styles.error}>{errors.phone}</p>}
              </div>
            </div>
            <div className={styles.field}>
              <label htmlFor="email">Email for Digital Receipt</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <p className={styles.error}>{errors.email}</p>}
            </div>
          </section>

          <section className={styles.card}>
            <h2>2. Delivery Location in Addis Ababa</h2>
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="subCity">Sub-City / Neighborhood</label>
                <input
                  id="subCity"
                  name="subCity"
                  value={form.subCity}
                  onChange={handleChange}
                  placeholder="Bole Medhanialem / Kazanchis"
                />
                {errors.subCity && <p className={styles.error}>{errors.subCity}</p>}
              </div>
              <div className={styles.field}>
                <label htmlFor="street">Street, Building, Flat No.</label>
                <input
                  id="street"
                  name="street"
                  value={form.street}
                  onChange={handleChange}
                  placeholder="Bentui Edna Mall, House No. 402, 3rd Floor"
                />
                {errors.street && <p className={styles.error}>{errors.street}</p>}
              </div>
            </div>
            <div className={styles.field}>
              <label htmlFor="landmark">Specific Landmark / Gate Instruction</label>
              <input
                id="landmark"
                name="landmark"
                value={form.landmark}
                onChange={handleChange}
                placeholder="Opposite Boston Day Spa, entrance through dark green gate"
              />
            </div>

            <div className={styles.deliveryOptions}>
              <button
                type="button"
                className={form.deliveryTime === 'immediate' ? styles.optionActive : styles.option}
                onClick={() => setForm({ ...form, deliveryTime: 'immediate' })}
              >
                Immediate Dispatch
              </button>
              <button
                type="button"
                className={form.deliveryTime === 'scheduled' ? styles.optionActive : styles.option}
                onClick={() => setForm({ ...form, deliveryTime: 'scheduled' })}
              >
                Schedule for Dinner
              </button>
            </div>
          </section>

          <section className={styles.card}>
            <h2>3. Payment Method</h2>
            <div className={styles.paymentList}>
              {paymentMethods.map((method) => (
                <button
                  type="button"
                  key={method.id}
                  className={
                    form.paymentMethod === method.id ? styles.paymentActive : styles.paymentOption
                  }
                  onClick={() => setForm({ ...form, paymentMethod: method.id })}
                >
                  {method.label}
                </button>
              ))}
            </div>
          </section>
        </div>

        <aside className={styles.summary}>
          <h2>Order Summary</h2>
          {cart.map((item) => (
            <div key={item.id} className={styles.summaryItem}>
              <span>{item.nameEn} × {item.quantity}</span>
              <span>ETB {item.priceETB * item.quantity}</span>
            </div>
          ))}

          <div className={styles.summaryRow}>
            <span>Items Subtotal</span>
            <span>ETB {subtotal}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Express Delivery</span>
            <span>ETB {expressFee}</span>
          </div>

          <div className={styles.grandTotal}>
            <span>Grand Total</span>
            <span>ETB {grandTotal}</span>
          </div>

          <button type="submit" className={styles.confirmBtn}>
            Confirm Order & Pay ETB {grandTotal} →
          </button>
        </aside>
      </form>
    </div>
  )
}

export default Checkout