import React, { useEffect, useMemo, useState } from 'react'
import styles from './Menu.module.css'
import MenuCard from '../../components/menu-card/MenuCard'
import Categories from '../../components/catagories/Categories'
import Search from '../../components/search/Search'
import LoadingSpinner from '../../components/loading-sppiner/LoadingSpinner'
import Error from '../../components/error/ErrorMessage'
import ErrorBoundary from '../../components/ErrorBoundary'

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
    const filteredDishes = useMemo(() => {
        return dishes.filter((d) => selectedCategory === "All" || d.category === selectedCategory)
            .filter((d) => d.nameEn.toLowerCase().includes(searchTerm.toLowerCase()))
    }, [dishes, selectedCategory, searchTerm])
    //const search = filteredDishes.filter(d => d.nameEn.toLowerCase().includes(searchTerm.toLowerCase()))
    if (loading) {
        return <LoadingSpinner />
    }
    if (error) {
        return <Error error={error} />
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
                {filteredDishes.length === 0 ? (
                    <div className={styles.emptyState}>
                        <span className={styles.emptyIcon}>🍽️</span>
                        <p>No dishes match "{searchTerm}"{selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}.</p>
                        <button
                            className={styles.clearBtn}
                            onClick={() => {
                                setSearchTerm('')
                                setSelectedCategory('All')
                            }}
                        >
                            Show all dishes
                        </button>
                    </div>
                ) : filteredDishes.map((d) =>
                    <ErrorBoundary fallback={<div className={styles.cardError}>Couldn't load this dish.</div>}>
                        <MenuCard data={d} key={d.id} />
                    </ErrorBoundary>)}
            </div>
        </div>
    )
}

export default Menu