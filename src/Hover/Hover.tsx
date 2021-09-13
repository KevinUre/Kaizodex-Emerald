import React from 'react'


function Hover(props:any){
  const { setVisibility, getCursorPos, styles } = props.children.props;

  return(
    <div
      onMouseOver={() => setVisibility(true)}
      onMouseOut={() => setVisibility(false)}
      onMouseMove={(e) => getCursorPos(e, styles.height)}
      style={styles}
    >
      {props.children.props.children}
    </div>
  )
}

export default Hover;