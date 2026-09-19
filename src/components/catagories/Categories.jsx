import React from 'react'
import styles from './Categories.module.css'
function Categories({ categories, current, onSelect }) {
  return <div>
    {categories.map((c) =>
    
     
       <button key={c} onClick={() => onSelect(c)} className={c === current ?styles.active:''}>{c}</button>
    )}
  </div>
}

export default Categories