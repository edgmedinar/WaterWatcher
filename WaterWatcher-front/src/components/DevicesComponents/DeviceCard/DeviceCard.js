import React from "react";
import classes from "./DeviceCard.module.css";

export default function DeviceCard({device}) {
  
  const img_url =
    "https://cdn.iconscout.com/icon/free/png-256/water-drop-84-729052.png";
  return (
    <div className={classes.card_wrap}>
      <div className={classes.card}>
        <div className={classes.card_up}>
          <img alt={'broken'} src={img_url}></img>
        </div>
        <div className={classes.card_down}>
          <div className={classes.card_description}>
            <div className={classes.card_description_item}>
              <div className={classes.label}>
                Id
              </div>
              <div>
                {device.idBoard}
              </div>
            </div>
            <div className={classes.card_description_item}>
              <div className={classes.label}>
                Name
              </div>
              <div> {device.name ? device.name : 'Aqui va el Nombre'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

