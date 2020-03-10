import React from 'react'

function StoryFrame(props) {
  return (
    <div onClick={props.setNextFrame} className="zoom-frame">
        <div className="text-box" style={{ fontFamily: props.font }}>
          {props.speaker ? <div className="speaker"> {props.speaker} </div> : null}
          <div className="text">{props.speaker ? `"${props.text}"` : props.text}</div>
        </div>
    </div>
  )
}

export default StoryFrame
