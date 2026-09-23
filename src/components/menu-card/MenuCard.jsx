import React from 'react'
import { FiPlus } from 'react-icons/fi'
import styles from './MenuCard.module.css'
import { useCart } from '../../hooks/useCart'
import { useNavigate } from 'react-router-dom'
function MenuCard({ data }) {
    const {addToCart,}=useCart()
    const navigate = useNavigate()

  function handleClick() {
    navigate(`/menu/${data.id}`, { state: data })
  }
    return (

        <div className={styles.card} onClick={handleClick}>
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
                <button onClick={(e)=>{e.stopPropagation(); addToCart(data)}} className={styles.addBtn}><FiPlus /> Add</button>
            </div>
        </div>

    )
}

export default MenuCard