import { useEffect, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import styles from './DishDetail.module.css'

function DishDetail() {
    const { state: dish } = useLocation()
    const navigate = useNavigate()
    const { addToCart } = useCart()
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        if (!dish) {
            navigate('/menu', { replace: true })
        }
    }, [dish, navigate])

    if (!dish) return null

    const {
        nameEn,
        nameAm,
        category,
        priceETB,
        spiceLevel,
        isFasting,
        isSpecial,
        description,
        ingredients,
        servings,
    } = dish

    function handleAddToOrder() {
        addToCart(dish, quantity)
        navigate('/cart')
    }

    return (
        <div className={styles.page}>
            <div className={styles.breadcrumb}>
                <Link to="/menu">Menu</Link> / <span>{category}</span> / <span>{nameEn}</span>
            </div>

            <div className={styles.layout}>
                <div className={styles.imageColumn}>
                    
                    <img src="/doro.png" alt={nameEn} className={styles.mainImage} />
                   
                <div className={styles.badges}>
                        {isSpecial && <span className={styles.badgeSpecial}>Chef's Special</span>}
                        {isFasting && <span className={styles.badgeFasting}>Fasting Friendly</span>}
                    </div>
                </div>

                <div className={styles.details}>
                    <div className={styles.headerRow}>
                        <div>
                            <h1>{nameEn}</h1>
                            <p className={styles.nameAm}>{nameAm}</p>
                        </div>
                        <span className={styles.price}>ETB {priceETB}</span>
                    </div>

                    <p className={styles.description}>{description}</p>

                    <div className={styles.infoGrid}>
                        <div className={styles.infoBlock}>
                            <span className={styles.infoLabel}>Spice Level</span>
                            <span className={styles.infoValue}>{spiceLevel}</span>
                        </div>
                        <div className={styles.infoBlock}>
                            <span className={styles.infoLabel}>Servings</span>
                            <span className={styles.infoValue}>{servings}</span>
                        </div>
                    </div>

                    {ingredients?.length > 0 && (
                        <div className={styles.section}>
                            <h2>Ingredients</h2>
                            <div className={styles.tags}>
                                {ingredients.map((ing) => (
                                    <span key={ing} className={styles.tag}>{ing}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className={styles.orderRow}>
                        <div className={styles.qtyControl}>
                            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
                            <span>{quantity}</span>
                            <button onClick={() => setQuantity((q) => q + 1)}>+</button>
                        </div>

                        <button className={styles.addBtn} onClick={handleAddToOrder}>
                            Add to Order · ETB {priceETB * quantity}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DishDetail