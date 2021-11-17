import React from "react";
import classes from "./Modal.module.css";

import reactDom from "react-dom";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onCancel}></div>;
};

const ModalOverlay = (props) => {


  return (
    <div className={`${classes.card} ${classes.modal}`} >
      <header className={classes.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={classes.content}>
       {props.children}
      </div>
    </div>
  );
};

export default function Modal(props) {
  return <div>
      {
          reactDom.createPortal(<Backdrop onCancel={props.onCancel}/>,document.getElementById('backdrop-root'))
      }
      {
          reactDom.createPortal(<ModalOverlay title={props.title} message={props.message} onConfirm={props.onConfirm} onCancel={props.onCancel}>{props.children}</ModalOverlay>,document.getElementById('overlay-root'))
      }
  </div>;
}
