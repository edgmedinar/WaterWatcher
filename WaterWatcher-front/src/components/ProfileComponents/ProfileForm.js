import React from "react";
import classes from "./ProfileForm.module.css";
import useInput from "../../hooks/use-input";
import { FaUserAlt } from "react-icons/fa";

export default function ProfileForm({ user, updateUser }) {
  const IsEmpty = (value) => {
    return value.length <= 0;
  };
  const nameHook = useInput(IsEmpty, user.name);
  const telephoneHook = useInput((value) => {
    return value.trim().length < 10 || value.trim().length > 10;
  }, user.telephone);
  const telegramHook = useInput(IsEmpty, user.discordUser);

  const submitHandler = (event) => {
    event.preventDefault();
    let userData = {
      name: nameHook.value.trim(),
      telephone: telephoneHook.value,
      discordUser: telegramHook.value,
    };
    updateUser(userData);
  };

  let formIsInvalid =
    nameHook.isInvalid || telephoneHook.isInvalid;

  const iconStyle = { color: "#262675", fontSize: 90 };

  return (
    <div className={classes.main}>
      <section className={classes.auth}>
        <div className={classes.logo}>
          <FaUserAlt style={iconStyle}></FaUserAlt>
        </div>
        <h1>Your Profile</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="name">Name</label>
            <input
              value={nameHook.value}
              onChange={nameHook.ChangeHandler}
              onBlur={nameHook.BlurHandler}
              type="text"
              id="name"
              required
            />
            {nameHook.isInvalid && (
              <p className={classes.errorText}>Name should not be empty**</p>
            )}
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Email</label>
            <input
              disabled
              type="email"
              id="name"
              required
              value={user.email}
            />
          </div>

          <div className={classes.control}>
            <label htmlFor="name">Telephone</label>
            <input
              value={telephoneHook.value}
              onChange={telephoneHook.ChangeHandler}
              onBlur={telephoneHook.BlurHandler}
              type="text"
              id="password"
              required
            />
            {telephoneHook.isInvalid && (
              <p className={classes.errorText}>
                Telephone should be 10 characters long**
              </p>
            )}
          </div>

          <div className={classes.control}>
            <label htmlFor="name">Telegram</label>
            <input
              value={telegramHook.value}
              onChange={telegramHook.ChangeHandler}
              onBlur={telegramHook.BlurHandler}
              type="text"
              id="password"
            />
          </div>
          <div className={classes.actions}>
            <div className={classes.formFlex}>
              <button disabled={formIsInvalid} className={classes.control}>
                Save
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
