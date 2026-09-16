import React from 'react'
import { FiPlus } from 'react-icons/fi'
import "./MenuCard.css"
function MenuCard({ data }) {
    return (

        <div >
            <div>
                <img src="./" alt="" />
            </div>
            <div>{data.nameEn}</div>
            <div>
                {data.description}
            </div>
            <div>
                <span>{data.priceETB} ETB</span>
                <button><FiPlus /> Add</button>
            </div>
        </div>

    )
}

export default MenuCard