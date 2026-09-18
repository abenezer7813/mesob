import React from 'react'
import { FiPlus } from 'react-icons/fi'
import styles from './MenuCard.module.css'
function MenuCard({ data }) {
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
                <button className={styles.addBtn}><FiPlus /> Add</button>
            </div>
        </div>

    )
}

export default MenuCard