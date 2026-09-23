import React, { use, useEffect, useState } from 'react'
import styles from './Menu.module.css'
import MenuCard from '../../components/menu-card/MenuCard'
import Categories from '../../components/catagories/Categories'
import Search from '../../components/search/Search'
import LoadingSpinner from '../../components/loading-sppiner/LoadingSpinner'
import Error from '../../components/error/Error'

function Menu() {
    const [dishes, setDishes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [searchTerm, setSearchTerm] = useState('')
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
                setLoading(false)
            })
            .catch(err => {
                console.log('fetch error:', err.message);
                setError(err.message)
                setLoading(false)
            })




    }, [])
    const filteredDishes = selectedCategory === 'All'
        ? dishes
        : dishes.filter((d) => d.category === selectedCategory)
    const search = filteredDishes.filter(d => d.nameEn.toLowerCase().includes(searchTerm.toLowerCase()))
if(loading){
    return <LoadingSpinner/>
}
     if(error){
        return <Error error={error}/>
     }

    return (
        <div className={styles.menuPage}>
            <div className={styles.search}>
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <div className={styles.categories}>
                <Categories categories={categories} current={selectedCategory} onSelect={setSelectedCategory} />
            </div>
            <div className={styles.menuCards}>
                {search.map((d) => <MenuCard data={d} key={d.id} />)}
            </div>
        </div>
    )
}

export default Menu