import React from "react";
import classes from "./CardContainer.module.css";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function CardContainer(props) {
 


  return (
    
    <div className={classes.mainContainer}>
      {props.isLoading && <LoadingSpinner></LoadingSpinner>}

      {!props.isLoading &&<>
        <div className={classes.cardContainer}>
         {props.children}
        </div>
      </>}
    </div>
  );
}
