import React, { useState, useEffect } from "react";
import settingUrl from "./settings";
import facade from "./apiFacade";

export function External() {
  const [norris, setNorris] = useState(<br />);
  const [dad, setDad] = useState(<br />);
  const [joker, setJoker] = useState(<br />);
  const nsfwMsg = "This joke requires you to be logged in and have NSFW toggled ON";
  
  function jokeAllowed (joke){
    return joke !== nsfwMsg;
  }

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
        let jokeAllowed = (!data.jokerNSFW || facade.getNsfw() == "true");
        jokeAllowed ? setJoker(data.jokerJoke) : setJoker(nsfwMsg);
      });
  }
  return (
    <div>
      <h1>External API</h1>
      <hr/>
      <button onClick={fetchExternalApi} id="btn">Press to fetch from API's!</button>
      <h2>Chuck Norris joke: </h2>
      <p>{norris}</p>
      <h2>Dad joke:</h2>
      <p>{dad}</p>
      <h2>Joker joke:</h2>
      <p style={{color : jokeAllowed(joker) ? "black" : "red"}}>{joker}</p>
    </div>
  );
}
