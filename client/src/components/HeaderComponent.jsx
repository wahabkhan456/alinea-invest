import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, googleSignin } from "../config/firebase";

import { hamburgerIcon, googleIcon } from "../config";

import en from "../locale/en.json";

export default function Header() {
  const history = useHistory();
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        setUser({
          name: user.displayName,
          email: user.email,
          profile: user.photoURL,
          uid: user.uid,
        });
        localStorage.setItem("signId", user.uid);
      } else {
        setUser(null);
        history.push("/");
      }
    });
  }, []);

  const watchList = () => {
    if (user == null) {
      document.getElementById("signInModal").click();
    } else {
      history.push("/watchlist");
    }
  };

  return (
    <div className="container">
      <nav
        className="navbar navbar-expand-lg"
        style={{ borderBottom: "1px solid #ccc" }}
      >
        <a className="navbar-brand" href="#">
          <img style={{ width: "15rem" }} src="../../logo.jpeg" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span>
            {" "}
            <img style={{ height: "1rem" }} src={hamburgerIcon} />{" "}
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <div
            className={
              window.location.pathname == "/"
                ? "border-bottom-class navbar-nav"
                : "navbar-nav"
            }
          >
            <Link className="theme-color nav-link" to="/">
              {en["Home"]} <span className="sr-only">(current)</span>
            </Link>
            {/* {user && <Link className="theme-color nav-link" to="/watchlist">Watchlist</Link>} */}
          </div>
          <div
            className={
              window.location.pathname == "/watchlist"
                ? "border-bottom-class navbar-nav"
                : "navbar-nav"
            }
          >
            <Link className="theme-color nav-link" onClick={watchList}>
              {en["WatchList"]}
            </Link>
          </div>
        </div>
        <div className="form-inline my-2 my-lg-0">
          {user ? (
            <img
              src={user.profile}
              style={{ width: 50, borderRadius: "100%", cursor: "pointer" }}
              onClick={async (_) => await auth.signOut()}
            />
          ) : (
            <button
              className="theme-color btn-sm siginBtn my-2 my-sm-0"
              id="signInModal"
              data-toggle="modal"
              data-target="#exampleModal"
              type="button"
            >
              {" "}
              <img style={{ height: "1rem" }} src={googleIcon} />{" "}
              {en["Continue with Google"]}
            </button>
          )}
        </div>
      </nav>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div
              className="modal-header"
              style={{ borderBottom: "none", padding: 0 }}
            >
              <div
                className="w-50"
                style={{
                  background: "#AE43C9",
                  borderTopLeftRadius: 28,
                  padding: "2em",
                }}
              ></div>
              <button
                type="button"
                className="close w-50"
                style={{
                  color: "#AE43C9",
                  outline: "none",
                  margin: "inherit",
                  textAlign: "right",
                }}
                data-dismiss="modal"
                aria-label="Close"
              >
                <i
                  className="material-icons"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  clear
                </i>
              </button>
            </div>
            <div className="bgTheme w-50">
              <b className="modal-text">
                {en["Keep Track of"]} <br />
                {en["Your Stocks"]}
              </b>
              <b className="modal-heading">
                <img
                  style={{ width: "12rem", height: "2.3rem" }}
                  src="../../logo.jpeg"
                />
              </b>
              <br />
              <button
                onClick={googleSignin}
                className="theme-color btn-sm modal-btn my-2 my-sm-0"
                data-toggle="modal"
                data-target="#exampleModal"
                type="button"
              >
                {" "}
                <img style={{ height: "1rem" }} src={googleIcon} />{" "}
                {en["Continue with Google"]}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
