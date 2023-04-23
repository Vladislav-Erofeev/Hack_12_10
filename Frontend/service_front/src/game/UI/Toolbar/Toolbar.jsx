import React from 'react'
import classes from './Toolbar.module.css'
import { useSelector } from 'react-redux'
import { selectTools } from '../../../redux/slices/tools'
import ToolCell from '../ToolCell/ToolCell'

const Toolbar = () => {
  
  const tools = useSelector(selectTools)
  const toollist = Object.keys(tools)
  console.log(toollist)
  return (
    <div className={classes.toolbar}>
        <h2>Tools:</h2>
        <ul>
          {toollist.map((tool, index) => <ToolCell key={index} value={tool} amount={tools[tool]}/>)}
        </ul>
    </div>
  )
}

export default Toolbar