import React, { useEffect, useState } from 'react'

import MenuCard from '../../components/menu-card/MenuCard'
import './Menu.css'
import Categories from '../../components/catagories/Categories'
function Menu() {
    const [dishes, setDishes] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('All')
    const categories = [
        "All",
        "Traditional Stews & Wat",
        "Tibs & Grills",
        "Raw & Cured Delicacies / Kitfo",
        "Fasting & Vegan / Tsom",
        "Beverages & Tej"
    ]
    
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
                <Categories categories={categories} current={selectedCategory} onSelect={setSelectedCategory}/>
            </div>
            <div className='menu-cards'>
                {dishes.map((d) => <MenuCard data={d} key={d.id} />)}
            </div>
        </div>
    )
}

export default Menu