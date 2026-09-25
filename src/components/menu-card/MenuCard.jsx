import React from 'react'
import { FiPlus } from 'react-icons/fi'
import styles from './MenuCard.module.css'
import { useCart } from '../../hooks/useCart'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../../store/cartStore'
function MenuCard({ data }) {
    
    const addItem=useCartStore((s)=>s.addItem)
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
                <button onClick={(e)=>{e.stopPropagation(); addItem(data,1)}} className={styles.addBtn}><FiPlus /> Add</button>
            </div>
        </div>

    )
}

export default MenuCard