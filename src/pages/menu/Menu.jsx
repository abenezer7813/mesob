import React, { useEffect, useState } from 'react'

import MenuCard from '../../components/menu-card/MenuCard'
import './Menu.css'
function Menu() {
    const [dishes, setDishes] = useState([])
    useEffect(() => {
        
            fetch('https://addis-eats-backend.onrender.com/menu/')
                .then(res => res.json())
                .then(json => {
                    console.log('raw response:', json)
                    setDishes(json.data)
                })
                .catch(err => console.log('fetch error:', err.message))


       

    }, [])
    return (
        <div className='menu-page'>
            <div className='categories'>

            </div>
            <div className='menu-cards'>
                {dishes.map((d)=><MenuCard data={d} key={d.id}/>)}
            </div>
        </div>
    )
}

export default Menu