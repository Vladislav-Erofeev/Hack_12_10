import React, { useEffect, useState } from 'react'
import classes from './ToolCell.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { selectSelectedToolInd, setSelected } from '../../../redux/slices/tools'
import box from '../../Assets/box.png'
import puddle from '../../Assets/puddle.png'
import greenlight from '../../Assets/greenlight.png'
import yellowlight from '../../Assets/yellowlight.png'
import redlight from '../../Assets/redlight.png'


const ToolCell = ({value, amount}) => {
    const dispatch = useDispatch()
    const selected = useSelector(selectSelectedToolInd)
    const [bg, setBg] = useState(null)
    useEffect(() => {
      switch (value) {
        case '3':
          setBg(box)
          break
        case '4':
          setBg(puddle)
          break
        case '5':
          setBg(greenlight)
          break
        case '6':
          setBg(yellowlight)
          break
        case '7':
          setBg(redlight)
          break
        default:
          return
      }
    }, [])
  return (
    <li className={selected === value ? [classes.tool,classes.sel].join(" ") : classes.tool}
      style={{backgroundImage: `url(${bg})`,
        filter: amount > 0 ? "" : "brightness(50%)"
      }}

      onClick={(amount > 0) ? () => dispatch(setSelected(Number(value))) : () => false}>{amount}</li>
  )
}

export default ToolCell