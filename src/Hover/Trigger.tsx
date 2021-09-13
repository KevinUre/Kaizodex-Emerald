import React, { useState, useEffect, useRef } from 'react'
import ReactDom from 'react-dom'

function Trigger(props:any){
  const [styles, setStyles] = useState({});
  const { setVisibility, getCursorPos } = props.children.props;
  const triggerContainerRef = useRef(null)

  useEffect(() => {
    let childStyles = window.getComputedStyle(
      //@ts-ignore
      ReactDom.findDOMNode(triggerContainerRef.current.children[0]),
    )
    setStyles({
      width: childStyles.getPropertyValue('width'),
      height: childStyles.getPropertyValue('height'),
      margin: childStyles.getPropertyValue('margin')
    })
  }, [])

  return(
    <div
      onMouseOver={() => setVisibility(true)}
      onMouseOut={() => setVisibility(false)}
      //@ts-ignore
      onMouseMove={(e) => getCursorPos(e,styles.height)}
      onTouchStart={() => setVisibility(true)}
      onTouchEnd={() => setVisibility(false)}
      ref={triggerContainerRef}
      style={styles}
    >
      {props.children.props.children}
    </div>
  )
}

export default Trigger;