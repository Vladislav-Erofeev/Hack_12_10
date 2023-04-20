import React from 'react'
import classes from './Button.module.css'

const Button = ({title, action, styles, color}) => {
  return (
    <button 
      className={styles==="pixel" ? classes.pixel : classes.vector} 
      onClick={() => action()}
      style={{backgroundColor: color}}
      >
        {title}
    </button>
  )
}

export default Button