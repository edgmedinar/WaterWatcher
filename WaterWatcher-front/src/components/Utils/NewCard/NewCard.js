import React from "react";
import classes from "./NewCard.module.css";
import { FaPlusCircle } from "react-icons/fa";

export default function NewCard(props) {
  

  return (
    <>
    
      <div className={classes.card_wrap}>
        <div className={classes.card}>
          <div className={classes.card_up}>
            <button onClick={props.onClick}>
              <FaPlusCircle size={40}></FaPlusCircle>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
