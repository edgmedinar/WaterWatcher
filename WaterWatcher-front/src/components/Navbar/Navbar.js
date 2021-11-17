import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./Navbar.module.css";
import { FaUserAlt } from "react-icons/fa";

export default function Navbar() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  };
  const iconStyle={color:"white", fontSize:30};
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            {/* <Link to="/"> */}
            <img
              src="http://www.crazyleafdesign.com/blog/wp-content/uploads/2016/10/eyecon_1x.png"
              alt="Paris"
            />
            {/* </Link> */}
          </li>
          {isLoggedIn && (
            <>
              {" "}
              <li>
                <Link to="/alerts">Alerts</Link>
              </li>
              <li>
                <Link to="/devices">Devices</Link>
              </li>{" "}
            </>
          )}
        </ul>
      </nav>
      {isLoggedIn && (
        <nav className={classes.logout}>
          <ul>
            <Link to="/profile">
            <li>
              <FaUserAlt style={iconStyle}></FaUserAlt>
            </li>
            </Link>
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
