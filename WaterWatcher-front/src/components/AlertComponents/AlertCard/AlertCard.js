import React from "react";
import classes from "./AlertCard.module.css";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

export default function AlertCard({ alert, onEdit, onDelete }) {
  const editHandler = () => {
    onEdit(alert);
  };
  const deleteHandler = () => {
    onDelete(alert._id);
  };

  const img_url =
    alert.type.toLowerCase() === "schedule"
      ? "https://clipartpngfree.com/save/animals/black_clock_bits_icon_rim.png"
      : alert.type.toLowerCase() === "volume"
      ? "https://pixsector.com/cache/9e5b1f54/av206d445c95daddcc4ad.png"
      : "https://static.thenounproject.com/png/80254-200.png";
  return (
    <div className={classes.card_wrap}>
      <div className={classes.card}>
        <div className={classes.card_up}>
          <div className={classes.card_mainData}>
            <div className={classes.card_image}>
              <img alt="broken" src={img_url}></img>
            </div>
            <div className={classes.card_title}>
              <p id={classes.name}>{alert.name} </p>
            </div>
            <div className={classes.actions}>
              <button className={classes.edit} onClick={editHandler}>
                <FaEdit></FaEdit>
              </button>
              <button className={classes.delete} onClick={deleteHandler}>
                <FaRegTrashAlt></FaRegTrashAlt>
              </button>
            </div>
          </div>
          <div className={classes.card_description}>
            <ul>
              <div>
                {" "}
                <p className={classes.label}>Type:</p>{" "}
                {alert.type.toLowerCase()==='time'? 'continuous flow':alert.type.toLowerCase()}
              </div>

              {alert.type.toLowerCase() !== "schedule" ? (
                <div>
                  <p className={classes.label}>Period: </p>
                  {alert.periodQuantity} {alert.periodType.toLowerCase()}
                  {alert.periodQuantity > 1 && "s"}
                </div>
              ) : (
                <div className={classes.timeLabels}>
                  {" "}
                  <div>
                    <p className={classes.label}>From: </p>
                    {/* {alert.range.start.hour < 10 && '0'} */}
                    {alert.range.start.hour}:
                    {/* {alert.range.start.minute < 10 && '0'} */}
                    {alert.range.start.minute}
                  </div>
                  <div>
                    <p className={classes.label}>To: </p>
                    {/* {alert.range.end.hour < 10 && '0'} */}
                    {alert.range.end.hour}:
                    {/* {alert.range.end.minute < 10 && '0'} */}
                    {alert.range.end.minute}
                  </div>
                </div>
              )}
              {alert.type.toLowerCase() !== "time" &&<li>
                <p className={classes.label}>Limit: </p>
                {alert.limit}
              </li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
