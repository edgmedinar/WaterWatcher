import React from "react";
import classes from "./EditAlertForm.module.css";
import useInput from "../../../hooks/use-input";
import useDoubleInput from "../../../hooks/use-input-double";

export default function EditAlertForm({ alert, onCancel, onSave, user,devices }) {
  const alertType = alert.type.toUpperCase();
  const selectedDevice=devices.find(element=>element.idBoard===alert.idBoard);
  
  const currentUser = user;
 

  const IsEmpty = (value) => {
    return value.length <= 0;
  };

  const inRange999 = (value) => {
    return value > 999 || value <= 0;
  };

  let correctRange = (start, end) => {
    return start === end;
  };

  const biggerThanZero = (value) => {
    return value <= 0;
  };

  let startString = "";
  let endString = "";
  if (alert.type.toLowerCase() === "schedule") {
    startString = `${alert.range.start.hour}:${alert.range.start.minute}`;
    endString = `${alert.range.end.hour}:${alert.range.end.minute}`;
  }

  const limitHook = useInput(biggerThanZero, alert.limit);
  const contactChannelHook = useInput(IsEmpty, alert.contactChannel.type);
  const periodQuantityHook = useInput(inRange999, alert.periodQuantity);
  const periodTypeHook = useInput(IsEmpty, alert.periodType);
  const scheduleHook = useDoubleInput(correctRange, startString, endString);
  let userContact =
    contactChannelHook.value === "EMAIL"
      ? currentUser.email
      : contactChannelHook.value === "SMS"
      ? currentUser.telephone
      : currentUser.discordUser;

  let formIsInvalid = false;

  if (alertType === "SCHEDULE") {
    formIsInvalid =
      limitHook.isInvalid ||
      contactChannelHook.isInvalid ||
      scheduleHook.isInvalid;
  } else if (alertType === "VOLUME") {
    formIsInvalid =
      limitHook.isInvalid ||
      contactChannelHook.isInvalid ||
      periodQuantityHook.isInvalid ||
      periodTypeHook.isInvalid;
  } else {
    formIsInvalid =
      contactChannelHook.isInvalid ||
      periodTypeHook.isInvalid ||
      periodQuantityHook.isInvalid;
  }

  let VolumeAlert = {
    type: "VOLUME",
    idAlert: alert._id,
    limit: limitHook.value,
    periodQuantity: periodQuantityHook.value,
    periodType: periodTypeHook.value,
    contactChannel: { type: contactChannelHook.value, contact: userContact },
  };
  let ScheduleAlert = {
    type: "SCHEDULE",
    idAlert: alert._id,
    limit: limitHook.value,
    range: {
      start: {
        hour: scheduleHook.firstValue.split(":")[0],
        minute: scheduleHook.firstValue.split(":")[1],
      },
      end: {
        hour: scheduleHook.secondValue.split(":")[0],
        minute: scheduleHook.secondValue.split(":")[1],
      },
    },
    contactChannel: { type: contactChannelHook.value, contact: userContact },
  };

  let TimeAlert = {
    idAlert: alert._id,
    periodQuantity: periodQuantityHook.value,
    periodType: periodTypeHook.value,
    contactChannel: { type: contactChannelHook.value, contact: userContact },
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsInvalid) {
      onSave(
        alertType === "SCHEDULE"
          ? ScheduleAlert
          : alertType === "VOLUME"
          ? VolumeAlert
          : TimeAlert
      );
    }
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="cars">Alert Type:</label>
          <select disabled value={alert.type.toUpperCase()} name="cars">
            <option value="SCHEDULE">Schedule</option>
            <option value="VOLUME">Volume</option>
            <option value="TIME">Continuous flow</option>
          </select>
        </div>
        <div className={classes.formFlex}>
          <div className={classes.control}>
            <label htmlFor="name">Alert Name</label>
            <input value={alert.name} disabled />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Device</label>
            <select disabled  value={alert.idBoard}>
              <option value={selectedDevice.idBoard}>{selectedDevice.name}</option>
            </select>
          </div>
        </div>
        {alertType !== "SCHEDULE" && (
          <div className={classes.formFlex}>
            <div className={classes.control}>
              <label htmlFor="name">Period Quantity</label>
              <input
                value={periodQuantityHook.value}
                onChange={periodQuantityHook.ChangeHandler}
                onBlur={periodQuantityHook.BlurHandler}
                type="number"
                required
              />
              {periodQuantityHook.isInvalid && (
                <p className={classes.errorText}>Invalid Period Qty***</p>
              )}
            </div>
            <div className={classes.control}>
              <label htmlFor="name">Period Type</label>
              <select
                value={periodTypeHook.value}
                onChange={periodTypeHook.ChangeHandler}
                onBlur={periodTypeHook.BlurHandler}
                type="text"
                required
              >
                {alertType === "VOLUME" && (
                  <>
                    <option value="DAY">Day</option>
                    <option value="WEEK">Week</option>
                    <option value="MONTH">Month</option>
                  </>
                )}
                {alertType === "TIME" && (
                  <>
                    <option value="MINUTES">Minutes</option>
                    <option value="HOUR">Hours</option>
                  </>
                )}
              </select>
            </div>
          </div>
        )}
        {alertType === "SCHEDULE" && (
          <div className={classes.formFlex}>
            <div className={classes.control}>
              <label htmlFor="name">From</label>
              <input
                value={scheduleHook.firstValue}
                onChange={scheduleHook.FirstChangeHandler}
                onBlur={scheduleHook.FirstBlurHandler}
                type="time"
                required
              />
              {scheduleHook.isInvalid && (
                <p className={classes.errorText}>Invalid Range</p>
              )}
            </div>
            <div className={classes.control}>
              <label htmlFor="name">To</label>
              <input
                value={scheduleHook.secondValue}
                onChange={scheduleHook.SecondChangeHandler}
                onBlur={scheduleHook.SecondBlurHandler}
                type="time"
                required
              />
            </div>
          </div>
        )}
        {alertType !== "TIME" && (
          <div className={classes.control}>
            <label htmlFor="name">Limit</label>
            <input
              value={limitHook.value}
              onChange={limitHook.ChangeHandler}
              onBlur={limitHook.BlurHandler}
              type="number"
              id="number"
              required
            />
            {limitHook.isInvalid && (
              <p className={classes.errorText}>Invalid limit**</p>
            )}
          </div>
        )}
        <div className={classes.formFlex}>
          <div className={classes.control}>
            <label htmlFor="name">Contact Channel</label>
            <select
              value={contactChannelHook.value}
              onChange={contactChannelHook.ChangeHandler}
              onBlur={contactChannelHook.BlurHandler}
              type="text"
              required
            >
              {currentUser.email && <option value="EMAIL">Email</option>}
              {currentUser.telephone && (
                <option value="SMS">SMS</option>
              )}
              {currentUser.discordUser && <option value="TELEGRAM">Telegram</option>}
            </select>
          </div>
          <div className={classes.control}>
            <label htmlFor="name">.</label>
            <input disabled value={userContact}></input>
          </div>
        </div>
        <div className={classes.actions}>
          <div className={classes.formFlex}>
            <button className={classes.control} onClick={onCancel}>
              Cancel
            </button>
            <button disabled={formIsInvalid} className={classes.control}>
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
