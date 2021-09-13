  
import React, { useState } from 'react'
import Hover from './Hover'
import Trigger from './Trigger'
import useWindowDimensions from './WindowDimensions'

function renderItem(item:any, index:any) {
  if (item.type.name === 'Trigger' || item.props.type === 'trigger') {
    return <Trigger key={index}>{item}</Trigger>
  } else if (item.type.name === 'Hover' || item.props.type === 'hover') {
    return <Hover key={index}>{item}</Hover>
  }
}

function HoverMaster(props: any) {
  let [hoverComponentStyle, updateHoverComponentStyle] = useState({
    display: 'none',
    position: 'absolute',
  })
  const { height, width } = useWindowDimensions();

  const setVisibility = (flag:any) => {
    let updatedStyles = null
    if (flag) {
      updatedStyles = { ...hoverComponentStyle, display: 'block' }
    } else {
      updatedStyles = { ...hoverComponentStyle, display: 'none' }
    }
    updateHoverComponentStyle(updatedStyles)
  }

  const getCursorPos = (e:any, childHeight:any) => {
    console.log(JSON.stringify(Object.keys(e)))
    const cursorX = e.pageX
    const cursorY = e.pageY
    let {
      options: { followCursor, shiftX, shiftY },
    } = props
    if(e.pageY + 100 > height) {shiftY -= 500}
    let updatedStyles:any = null
    if (!followCursor) {
      return
    }
    if (isNaN(shiftX)) {
      shiftX = 0
    }
    if (isNaN(shiftY)) {
      shiftY = 0
    }
    updatedStyles = {
      ...hoverComponentStyle,
      top: cursorY + shiftY,
      left: cursorX + shiftX,
    }
    updateHoverComponentStyle(updatedStyles)
  }

  let childrenWithProps = []
  for (let child of props.children) {
    if (child.props) {
      if (child.type.name === 'Trigger' || child.props.type === 'trigger') {
        childrenWithProps.push(
          React.cloneElement(child, {
            setVisibility: setVisibility,
            getCursorPos: getCursorPos,
          }),
        )
      } else if (child.type.name === 'Hover' || child.props.type === 'hover') {
        childrenWithProps.push(
          React.cloneElement(child, {
            styles: hoverComponentStyle,
            setVisibility: setVisibility,
            getCursorPos: getCursorPos,
          }),
        )
      }
    }
  }

  return (
    <div>{childrenWithProps.map((item, index) => renderItem(item, index))}</div>
  )
}

export default HoverMaster;