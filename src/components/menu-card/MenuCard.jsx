import React from 'react'
import { FiPlus } from 'react-icons/fi'
import styles from './MenuCard.module.css'
import { useCart } from '../../hooks/useCart'
function MenuCard({ data }) {
    const {addToCart,}=useCart()
    return (

        <div className={styles.card}>
            <div>
                <img src="doro.png" alt="" />
            </div>
            <div className={styles.nameDesc}>
                <div className={styles.name}>{data.nameEn}</div>
                <div className={styles.desc}>
                    {data.description}
                </div>
            </div>
            <div className={styles.priceAdd}>
                <span className={styles.price}>{data.priceETB} ETB</span>
                <button onClick={()=>addToCart(data)} className={styles.addBtn}><FiPlus /> Add</button>
            </div>
        </div>

    )
}

export default MenuCard