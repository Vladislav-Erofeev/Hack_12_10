import React, { useEffect, useState } from 'react'
import classes from './FieldCell.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setToolToField } from '../../../redux/slices/gameField'
import { selectSelectedToolInd, selectTools, setSelected, setTools } from '../../../redux/slices/tools'
import box from '../../Assets/box.png'
import puddle from '../../Assets/puddle.png'
import greenlight from '../../Assets/greenlight.png'
import yellowlight from '../../Assets/yellowlight.png'
import redlight from '../../Assets/redlight.png'

const FieldCell = ({value, coords, size}) => {

  const dispatch = useDispatch()
  const {x,y} = coords
  const toolInd = useSelector(selectSelectedToolInd)
  const tools = useSelector(selectTools)

  const [bg, setBg] = useState(null)

  const setToolToTile = () => {
    if (value !== 2 && toolInd !== -1) {
      switch (toolInd) {
        case 3:
          setBg(box)
          break
        case 4:
          setBg(puddle)
          break
        case 5:
          setBg(greenlight)
          break
        case 6:
          setBg(yellowlight)
          break
        case 7:
          setBg(redlight)
          break
        default:
          return
      }
      dispatch(setToolToField({x: x, y: y, toolInd: toolInd}))
      dispatch(setTools({toolInd: toolInd, value: tools[toolInd] - 1}))
      dispatch(setSelected(-1))
      setTimeout(() => {
        dispatch(setToolToField({x: x, y: y, toolInd: 0}))
        setBg(null)
      }, 15000)
    }
  }

  return (
    <div className={classes.cell} onClick={setToolToTile}
      style={{width: size, height: size, backgroundImage: `url(${bg})`}}
    ></div>
  )
}

export default FieldCell