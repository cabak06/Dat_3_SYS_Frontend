import React, { useState, useEffect } from "react";
import settingUrl from "./settings";
import facade from "./apiFacade";

export function UserMemes() {
  const URL = settingUrl.internalMemes();
  const [userMemes, setUserMemes] = useState([]);
  let options = facade.makeOptions("GET", true);

  useEffect(() => {
    fetchInternalMemes();
  }, []);

  function fetchInternalMemes() {
    facade.fetchInternalMemes("/api/meme/usermemes", setUserMemes);
  }

  return (
    <div>
      <h1>User-submitted Memes</h1>
      <hr/>
      <button onClick={fetchInternalMemes} id="btn">Press to fetch from API's!</button>

      {userMemes.map((meme) => {
        return (
          <>
            <div
              key={meme.id}
              style={{ width: "35%", margin: "0 auto", textAlign: "center" }}
            >
              <h2 style={{ textAlign: "left" }}>{meme.title}</h2>
              <img src={meme.picturePath} alt="new" style={{ width: "100%" }} />
              <p style={{ textAlign: "right", marginTop: "-2px" }}>
                <i>Created by: {meme.createdBy}</i>
              </p>
            </div>
            <br />
            <hr style={{ width: "40%", margin: "auto", align: "center" }} />
            <br />
            <br />
          </>
        );
      })}
    </div>
  );
}
