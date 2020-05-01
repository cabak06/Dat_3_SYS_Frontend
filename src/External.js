import React, { useState, useEffect } from "react";
import settingUrl from "./settings";
import facade from "./apiFacade";

export function External() {
  const [norris, setNorris] = useState(<br />);
  const [dad, setDad] = useState(<br />);

  const URL = settingUrl.externalApi();
  useEffect(() => {
    fetchExternalApi();
  }, []);

  function fetchExternalApi() {
    let options = facade.makeOptions("GET", false);
    fetch(URL, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDad(data.dadJoke);
        setNorris(data.chuckJoke);
      });
  }
  return (
    <div>
      <h1>External API</h1>
      <button onClick={fetchExternalApi}>Press to fetch from API's!</button>
      <h2>Chuck Norris joke: </h2>
      <p>{norris}</p>
      <h2>Dad joke:</h2>
      <p>{dad}</p>
    </div>
  );
}
