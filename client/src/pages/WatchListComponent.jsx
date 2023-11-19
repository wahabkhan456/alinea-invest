import React, { useState, useEffect } from "react";
import Autocomplete from "../components/AutoCompleteComponent";
import { auth } from "../config/firebase";
import Header from "../components/HeaderComponent";
import { Snackbar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getAllWatchList } from "../redux/actions";

import { allStocksApiUrl, imgPlaceholder } from "../config";

import en from "../locale/en.json";

export default function WatchListComponent() {
  const [stocks, setStocks] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [itemAddedFlag, setItemAddedFlag] = useState(false);

  const dispatch = useDispatch();
  const state = useSelector((state) => state.watchlist.watchlist);

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        dispatch(getAllWatchList());
      } else {
        setStocks([]);
      }
    });
  }, []);

  const deleteStock = async (symbol) => {
    await fetch(
      `${allStocksApiUrl}/deletestock?id=${auth.currentUser.uid}&symbol=${symbol}`
    );
    setOpenAlert(true);
    dispatch(getAllWatchList());
  };

  useEffect(() => {
    if (itemAddedFlag) {
      dispatch(getAllWatchList());
      setItemAddedFlag(false);
    }
  }, [itemAddedFlag]);

  return (
    <>
      <Header />
      <div className="container mt-2">
        <Autocomplete setItemAddedFlag={setItemAddedFlag} />

        <h1 className="mt-5">{en["WatchList"]}</h1>
        {!!state.length ? (
          <div className="mt-4">
            <div className="d-flex justify-content-between mr-5 pr-4">
              <b>{en["COMPANY"]}</b>
              <b>{en["MARKET PRICE"]}</b>
            </div>
          </div>
        ) : (
          <h1 className="mt-5 text-center" style={{ color: "#ccc" }}>
            {en["No Records"]}
          </h1>
        )}

        {!!state.length &&
          state.map((stock) => {
            return (
              <div
                className="row"
                style={{ borderBottom: "solid 1px #ccc", padding: "15px 0" }}
              >
                <div className="col-md-6 d-flex align-items-center">
                  <img style={{ height: "3rem" }} src={imgPlaceholder} />
                  <span
                    className="ml-3"
                    style={{
                      fontSize: "25px",
                      padding: ".6%",
                      fontWeight: "100",
                    }}
                  >
                    {stock.name}
                  </span>
                </div>
                <div className="col-md-6 d-flex justify-content-end align-items-center">
                  <div>
                    <b
                      style={{
                        fontSize: "20px",
                        textAlign: "right",
                        padding: "13.6%",
                      }}
                    >
                      ${stock.current_price}{" "}
                      <span style={{ fontSize: "16px", fontWeight: "100" }}>
                        {en["USD"]}
                      </span>{" "}
                    </b>
                    <p style={{ color: "#28AE60", margin: 0 }}>
                      {stock.change_today.charAt(0) === "-" ? "-" : "+"}$
                      {stock.lastday_price} {en["USD"]} (
                      {(stock.change_today * 100).toFixed(2)}%)
                    </p>
                  </div>
                  <div onClick={(_) => deleteStock(stock.symbol)}>
                    <button
                      style={{ background: "transparent", border: "none" }}
                    >
                      <i
                        style={{ color: "#666", transform: "rotate(45deg)" }}
                        className="material-icons"
                      >
                        add_circle_outline
                      </i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openAlert}
        autoHideDuration={3000}
        onClose={(_) => setOpenAlert(false)}
        message="Successfully Deleted"
        key="topright"
      />
    </>
  );
}
