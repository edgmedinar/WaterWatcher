import React from "react";
import classes from "./AlertForm.module.css";
import useInput from "../../../hooks/use-input";
import useDoubleInput from "../../../hooks/use-input-double";

export default function AlertForm(props) {
  const currentUser = props.user;
  const IsEmpty = (value) => {
    return value.length <= 0;
  };

  let correctRange = (start, end) => {
    return start === end;
  };

  const biggerThanZero = (value) => {
    return value <= 0;
  };

  const inRange999 = (value) => {
    return value > 999 || value <= 0;
  };

  const typeHook = useInput(IsEmpty, "SCHEDULE");
  const nameHook = useInput(IsEmpty);
  const limitHook = useInput(biggerThanZero);
  const contactChannelHook = useInput(IsEmpty, "EMAIL");
  const periodQuantityHook = useInput(inRange999);
  const periodTypeHook = useInput(IsEmpty, "DAY");
  const deviceHook = useInput(IsEmpty, props.devices ? props.devices[0] : "");
  const scheduleHook = useDoubleInput(correctRange);
  const alertType = typeHook.value;
  const timePeriodTypeHook = useInput(IsEmpty, "MINUTES");

  let formIsInvalid = false;

  if (alertType === "SCHEDULE") {
    formIsInvalid =
      typeHook.isInvalid ||
      nameHook.isInvalid ||
      deviceHook.isInvalid ||
      contactChannelHook.isInvalid ||
      limitHook.isInvalid ||
      scheduleHook.isInvalid;
  } else if (alertType === "VOLUME") {
    formIsInvalid =
      typeHook.isInvalid ||
      nameHook.isInvalid ||
      deviceHook.isInvalid ||
      contactChannelHook.isInvalid ||
      limitHook.isInvalid ||
      periodTypeHook.isInvalid ||
      periodQuantityHook.isInvalid;
  } else {
    formIsInvalid =
      typeHook.isInvalid ||
      nameHook.isInvalid ||
      deviceHook.isInvalid ||
      contactChannelHook.isInvalid ||
      limitHook.isInvalid ||
      timePeriodTypeHook.isInvalid ||
      periodQuantityHook.isInvalid;
  }

  let userContact =
    contactChannelHook.value === "EMAIL"
      ? currentUser.email
      : contactChannelHook.value === "SMS"
      ? currentUser.telephone
      : currentUser.discordUser;
  let VolumeAlert = {
    idBoard: deviceHook.value.idBoard,
    name: nameHook.value,
    type: "volume",
    limit: limitHook.value,
    periodQuantity: periodQuantityHook.value,
    periodType: periodTypeHook.value,
    contactChannel: { type: contactChannelHook.value, contact: userContact },
  };
  let ScheduleAlert = {
    idBoard: deviceHook.value.idBoard,
    name: nameHook.value,
    type: "schedule",
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
    idBoard: deviceHook.value.idBoard,
    name: nameHook.value,
    type: "time",
    periodQuantity: periodQuantityHook.value,
    periodType: timePeriodTypeHook.value,
    contactChannel: { type: contactChannelHook.value, contact: userContact },
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsInvalid) {
      props.onSave(
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
      {props.devices.length === 0 && <h2>Please add a device first</h2>}
      {props.devices.length > 0 && (
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="cars">Alert Type:</label>
            <select
              onChange={typeHook.ChangeHandler}
              onBlur={typeHook.BlurHandler}
              name="cars"
              required
            >
              <option value="SCHEDULE">Schedule</option>
              <option value="VOLUME">Volume</option>
              <option value="TIME">Continuous Flow</option>
            </select>
            {typeHook.isInvalid && (
              <p className={classes.errorText}>Please select a type</p>
            )}
          </div>
          <div className={classes.formFlex}>
            <div className={classes.control}>
              <label htmlFor="name">Alert Name</label>
              <input
                value={nameHook.value}
                onChange={nameHook.ChangeHandler}
                onBlur={nameHook.BlurHandler}
                type="text"
                required
              />
              {nameHook.isInvalid && (
                <p className={classes.errorText}>Name should not be empty**</p>
              )}
            </div>
            <div className={classes.control}>
              <label htmlFor="name">Device</label>
              <select
                value={deviceHook.value}
                onChange={deviceHook.ChangeHandler}
                onBlur={deviceHook.BlurHandler}
                type="text"
                required
              >
                {props.devices &&
                  props.devices.map((device) => (
                    <option key={device.idBoard} value={device.idBoard}>
                      {device.name ? device.name : "Device"}
                    </option>
                  ))}
              </select>
              {deviceHook.isInvalid && (
                <p className={classes.errorText}>Please select a device**</p>
              )}
            </div>
          </div>
          {alertType !== "SCHEDULE" && (
            <div className={classes.formFlex}>
              <div className={classes.control}>
                <label htmlFor="name">Period Qty</label>
                <input
                  value={periodQuantityHook.value}
                  onChange={periodQuantityHook.ChangeHandler}
                  onBlur={periodQuantityHook.BlurHandler}
                  max="999"
                  type="number"
                  required
                />
                {periodQuantityHook.isInvalid && (
                  <p className={classes.errorText}>
                    Value must be between 1 and 999
                  </p>
                )}
              </div>
              {alertType === "VOLUME" && (
                <div className={classes.control}>
                  <label htmlFor="name">Period Type</label>
                  <select
                    value={periodTypeHook.value}
                    onChange={periodTypeHook.ChangeHandler}
                    onBlur={periodTypeHook.BlurHandler}
                    type="text"
                    required
                  >
                    <option value="DAY">Day</option>
                    <option value="WEEK">Week</option>
                    <option value="MONTH">Month</option>
                  </select>
                  {periodTypeHook.isInvalid && (
                    <p className={classes.errorText}>Please select one type</p>
                  )}
                </div>
              )}
              {alertType === "TIME" && (
                <div className={classes.control}>
                  <label htmlFor="name">Period Type</label>
                  <select
                    value={timePeriodTypeHook.value}
                    onChange={timePeriodTypeHook.ChangeHandler}
                    onBlur={timePeriodTypeHook.BlurHandler}
                    type="text"
                    required
                  >
                    <option selected value="MINUTES">
                      Minutes
                    </option>
                    <option value="HOUR">Hours</option>
                  </select>
                  {timePeriodTypeHook.isInvalid && (
                    <p className={classes.errorText}>Please select one type</p>
                  )}
                </div>
              )}
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
                {currentUser.discordUser && (
                  <option value="TELEGRAM">Telegram</option>
                )}
              </select>
            </div>
            <div className={classes.control}>
              <label htmlFor="name">.</label>
              <input disabled value={userContact}></input>
            </div>
          </div>
          <div className={classes.actions}>
            <div className={classes.formFlex}>
              <button className={classes.control} onClick={props.onCancel}>
                Cancel
              </button>
              <button disabled={formIsInvalid} className={classes.control}>
                Save
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
