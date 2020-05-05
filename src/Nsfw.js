import React, { useState } from "react";
import settingUrl from "./settings";
import facade from "./apiFacade";

export function NsfwToggle() {
  const URL = settingUrl.backendURL();
  const [toggle, setToggle] = useState(checkToggle());

  function checkToggle() {
    return facade.getNsfw() === "false";
  }

  function changeNsfwSetting() {
    console.log(toggle);
    let body = { nsfwIsActive: toggle };
    let options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-access-token": localStorage.getItem("jwtToken"),
      },
      body: JSON.stringify(body),
    };
    fetch(URL + "/api/user/nsfw", options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        facade.setNsfw(data.nsfwIsActive);
        setToggle(checkToggle());
      });
  }
  return (
    <>
      <label
        htmlFor="nsfwOnOff"
        style={{ color: "white", paddingRight: "8px" }}
      >
        NSFW:
      </label>
      <button
        id="nsfwOnOff"
        onClick={changeNsfwSetting}
        style={{
          backgroundColor: checkToggle() ? "#e34242" : "#4CAF50",
          border: "none",
          height: "25px",
          width: "40px",
          fontSize: "20px",
        }}
      >
        {checkToggle() ? "Off" : "On"}
      </button>
    </>
  );
}
