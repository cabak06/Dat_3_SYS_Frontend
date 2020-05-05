import React, { useState, useEffect } from "react";
import settingUrl from "./settings";
import facade from "./apiFacade";

export function ExternalMeme() {
  const [reddit, setreddit] = useState(<br />);
  const [dark, setDark] = useState(<br />);

  const URL = settingUrl.externalMeme();
  useEffect(() => {
    fetchExternalApi();
  }, []);

  function fetchExternalApi() {
    let options = facade.makeOptions("GET", false);
    fetch(URL, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDark(data.darkMeme);
        setreddit(data.redditMeme);
      });
  }
  return (
    <div>
      <h1>External Meme's</h1>
      <button onClick={fetchExternalApi}>Press to update meme's!</button>
      <h2>Reddit Meme: </h2>
      <img src={reddit} alt="new" style={{ width: "30%" }} />
      <hr />
      <h2>Dank Meme:</h2>
      <img src={dark} alt="new" style={{ width: "30%" }} />
    </div>
  );
}
