import React from 'react'
import ReactCSSTransitionGroup from "react-addons-css-transition-group";;

function StoryFrame(props) {
    function bgTransitionTime(key) {
      return 2000;
    }
    function spriteTransitionTime(key) {
      if (
        props[key] === "move-left" ||
        props[key] === "move-left-far" ||
        props[key] === "move-right" ||
        props[key] === "move-right-far" ||
        props[key] === "from-left-leave-right" ||
        props[key] === "from-right-leave-left"
      ) {
        return 1200;
      } else if (props[key] === "shake") {
        return 700;
      } else if (props[key] === "bounce") {
        return 400;
      } else {
        return 250;
      }
    }

  return (
    <div onClick={props.setNextFrame} className="zoom-frame">
      <ReactCSSTransitionGroup
        transitionName={props.bgTransition || "scene-change"}
        transitionEnterTimeout={bgTransitionTime("bgTransition")}
        transitionLeaveTimeout={bgTransitionTime("bgTransition")}
      >
        <img draggable="false" key={props.bg} className="bg" src={props.bg} />
      <ReactCSSTransitionGroup
          className="sprite-center-parent"
          transitionName={props.spriteTransition || "sprite"}
          transitionEnterTimeout={spriteTransitionTime("spriteTransition")}
          transitionLeaveTimeout={spriteTransitionTime("spriteTransition")}
        >
          <img draggable="false" key={props.sprite} className={"sprite " + props.spriteEffect} src={props.sprite} />
        </ReactCSSTransitionGroup>
        </ReactCSSTransitionGroup>
        <div className="text-box" style={{ fontFamily: props.font }}>
          {props.speaker ? <div className="speaker"> {props.speaker} </div> : null}
          <div className="text">{props.speaker ? `"${props.text}"` : props.text}</div>
        </div>
    </div>
  )
}

export default StoryFrame
