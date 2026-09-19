import React from 'react'
import styles from "./Search.module.css"
import { FiSearch } from 'react-icons/fi'

function Search({searchTerm,setSearchTerm}) {
  return (
    <div className={styles.searchBox}>
        <FiSearch className={styles.searchEl}/>
        <input type="text"
        placeholder='Search dishes by name (e.g kitfo,doro...)'
        value={searchTerm} 
        onChange={(e)=>setSearchTerm(e.target.value)
        
        }
        />
    </div>
  )
}

export default Search