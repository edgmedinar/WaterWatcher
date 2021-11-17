import React, { useState, useContext } from "react";
import classes from "./Auth.module.css";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router";
import useInput from "../../hooks/use-input";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [authError, setAuthError] = useState(false);
  const nameHook = useInput((value) => value.trim() === "");
  const emailHook = useInput((value) => !value.includes("@"));
  const passwordHook = useInput((value) => value.trim().length === 0);
  const telephoneHook = useInput((value) => {
    return value.trim().length < 10 || value.trim().length > 10;
  });

  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (isLogin) {
      LoginHandler();
    } else {
      RegisterHandler();
    }
  };

  const clearInputs = () => {
    nameHook.reset();
    passwordHook.reset();
    telephoneHook.reset();
    emailHook.reset();
  };

  let RegisterformIsInvalid =
    nameHook.isInvalid ||
    emailHook.isInvalid ||
    passwordHook.isInvalid ||
    telephoneHook.isInvalid;

  let LoginformIsInvalid = emailHook.isInvalid || passwordHook.isInvalid;

  const isBtnDisabled = isLogin
    ? LoginformIsInvalid
      ? true
      : false
    : RegisterformIsInvalid
    ? true
    : false;

  async function LoginHandler(){
    let credentials = {
      password: passwordHook.value,
      email: emailHook.value,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Could not get user");
      }
      authCtx.login(data.token);
      history.replace("/alerts");
     
    } catch {
      setAuthError(true);
      
    }

    
  };

  const RegisterHandler = () => {
    let credentials = {
      name: nameHook.value,
      password: passwordHook.value,
      email: emailHook.value,
      telephone: telephoneHook.value,
    };
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => response.json())
      .then((data) => {
        clearInputs();
        switchAuthModeHandler();
      });
  };
  return (
    <div className={classes.main}>
      {/* <img
        className={classes.logo}
        src="http://www.crazyleafdesign.com/blog/wp-content/uploads/2016/10/eyecon_1x.png"
        alt="Paris"
      /> */}
      <section className={classes.auth}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        {authError && <div className={classes.invalidCredentials}>Invalid Credentials</div>}
        <form onSubmit={submitHandler}>
          {!isLogin && (
            <div className={classes.control}>
              <label htmlFor="name">Your Name</label>
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
          )}
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input
              value={emailHook.value}
              onChange={emailHook.ChangeHandler}
              onBlur={emailHook.BlurHandler}
              type="email"
              id="email"
              required
            />
            {emailHook.isInvalid && (
              <p className={classes.errorText}>Please enter a valid email**</p>
            )}
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input
              value={passwordHook.value}
              onChange={passwordHook.ChangeHandler}
              onBlur={passwordHook.BlurHandler}
              type="password"
              id="password"
              required
            />
            {passwordHook.isInvalid && (
              <p className={classes.errorText}>
                Password should not be empty**
              </p>
            )}
          </div>
          {!isLogin && (
            <div className={classes.control}>
              <label htmlFor="telephone">Telephone</label>
              <input
                value={telephoneHook.value}
                onChange={telephoneHook.ChangeHandler}
                onBlur={telephoneHook.BlurHandler}
                type="telephone"
                id="telephone"
                required
              />
              {telephoneHook.isInvalid && (
                <p className={classes.errorText}>
                  Telephone should be 10 characters long**
                </p>
              )}
            </div>
          )}
          <div className={classes.actions}>
            <button disabled={isBtnDisabled}>
              {isLogin ? "Login" : "Create Account"}
            </button>
            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
