import React, { useState } from "react";
import { Snackbar } from "@material-ui/core";
import { auth } from "../config/firebase";

import {
  hamburgerIcon,
  googleIcon,
  allStocksApiUrl,
  imgPlaceholder,
} from "../config";

import en from "../locale/en.json";

export default function Autocomplete({ setItemAddedFlag }) {
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [userInput, setUserInput] = useState("");

  const onInputChange = async (e) => {
    setUserInput(e.target.value);
    if (!!e.target.value) {
      const getStocksJSON = await fetch(
        `${allStocksApiUrl}/filterstocks?id=${
          auth.currentUser.uid
        }&search=${e.target.value.toLowerCase()}`
      );
      const getStocks = await getStocksJSON.json();
      setFilteredOptions(getStocks);
    } else {
      setFilteredOptions([]);
    }
  };

  const addData = async (data) => {
    try {
      await fetch(`${allStocksApiUrl}/addstock?id=${auth.currentUser.uid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setUserInput("");
      setFilteredOptions([]);
      setItemAddedFlag(true);
      setOpenAlert(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <div className="search">
        <input
          type="text"
          className="search-box"
          placeholder="Search stocks to add to watchlist"
          style={{ fontSize: 20, paddingRight: 50, background: "#f8f8f8" }}
          onInput={onInputChange}
          value={userInput}
        />
        <input type="submit" value="" className="search-btn" />
      </div>
      <ul className={!!userInput && "options"}>
        {!!filteredOptions.length ? (
          filteredOptions.map((option, index) => {
            return (
              <li key={index}>
                <div className="row">
                  <div className="col-md-12">
                    <div
                      className="pb-3"
                      style={{
                        display: "flex",
                        borderBottom: "solid 1px #ccc",
                      }}
                    >
                      <img style={{ height: "3rem" }} src={imgPlaceholder} />
                      <span
                        className="ml-3"
                        style={{ fontSize: "25px", fontWeight: "100" }}
                      >
                        {option.name.slice(0, 27)}...
                      </span>
                      <div style={{ position: "absolute", right: "100px" }}>
                        <b style={{ fontSize: "20px", textAlign: "center" }}>
                          ${option.current_price}{" "}
                          <span style={{ fontSize: "16px", fontWeight: "100" }}>
                            {en["USD"]}
                          </span>{" "}
                        </b>
                        <p style={{ color: "#F5ABAB" }}>
                          {option.change_today.charAt(0) === "-" ? "-" : "+"}$
                          {option.lastday_price} {en["USD"]} (
                          {(option.change_today * 100).toFixed(2)}%)
                        </p>
                      </div>
                      <div
                        onClick={(_) => addData(option)}
                        style={{
                          position: "absolute",
                          right: "50px",
                          top: "0.8rem",
                        }}
                      >
                        <button
                          style={{
                            background: "transparent",
                            width: "2rem",
                            border: "none",
                          }}
                        >
                          <i
                            style={{ color: "#AE43C9" }}
                            className="material-icons"
                          >
                            add_circle_outline
                          </i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })
        ) : !!userInput ? (
          <div className="no-options">
            <em>{en["No Option!"]}</em>
          </div>
        ) : (
          <></>
        )}
      </ul>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openAlert}
        autoHideDuration={3000}
        onClose={(_) => setOpenAlert(false)}
        message="Successfully Added"
        key="topright"
      />
    </React.Fragment>
  );
}
