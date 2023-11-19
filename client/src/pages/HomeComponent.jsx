import React, { useState, useEffect } from "react";
import Header from "../components/HeaderComponent";
import { useDispatch, useSelector } from "react-redux";
import { getAllStocks } from "../redux/actions";

import { imgPlaceholder } from "../config";

import en from "../locale/en.json";

function HomeComponents() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.stocks.stocks);

  useEffect(() => {
    dispatch(getAllStocks());
  }, []);

  return (
    <>
      <Header />
      <div className="container mt-5 mb-5">
        <h1>{en["Popular Stocks"]}</h1>
        <div className="mt-4">
          <b>{en["COMPANY"]}</b>
          <b style={{ float: "right" }}>{en["MARKET PRICE"]}</b>
        </div>

        {!!state.length &&
          state.map((popularStock) => {
            return (
              <div className="row">
                <div className="col-md-12">
                  <div
                    className="mt-4 pb-3"
                    style={{ display: "flex", borderBottom: "solid 1px #ccc" }}
                  >
                    <img style={{ height: "3rem" }} src={imgPlaceholder} />
                    <span className="ml-3" src={imgPlaceholder} />
                    <span
                      className="ml-3"
                      style={{
                        fontSize: "25px",
                        padding: ".6%",
                        fontWeight: "100",
                      }}
                    >
                      {popularStock.name}
                    </span>
                    <div style={{ position: "absolute", right: "0" }}>
                      <b
                        style={{
                          fontSize: "20px",
                          textAlign: "right",
                          padding: "13.6%",
                        }}
                      >
                        ${popularStock.current_price}{" "}
                        <span style={{ fontSize: "16px", fontWeight: "100" }}>
                          {en["USD"]}
                        </span>{" "}
                      </b>
                      <p style={{ color: "#28AE60" }}>
                        {popularStock.change_today.charAt(0) === "-"
                          ? "-"
                          : "+"}
                        ${popularStock.lastday_price} {en["USD"]} (
                        {(popularStock.change_today * 100).toFixed(2)}%)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default HomeComponents;
