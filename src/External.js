import React, { useState, useEffect } from "react";
import settingUrl from "./settings";
import facade from "./apiFacade";

export function External() {
  const [norris, setNorris] = useState(<br />);
  const [dad, setDad] = useState(<br />);
  const [joker, setJoker] = useState(<br />);
  const nsfwMsg =
    "This joke requires you to be logged in and have NSFW toggled ON";

  function jokeAllowed(joke) {
    return joke.jokeContent !== nsfwMsg;
  }

  const URL = settingUrl.externalApi();
  useEffect(() => {
    fetchExternalApi();
  }, []);

  function addToFavoriteExList(event) {
    event.preventDefault();
    let joke = getJokeList().filter(x => {
      return x.jokeType == event.target.value
    })[0];
    delete joke.jokeType;
    facade.addFavoriteExternalJoke(joke);
  }

  function makeJoke(joke, nsfw, url, type) {
    return {
      jokeContent: joke,
      jokeAddress: url,
      nsfw: nsfw,
      jokeType: type
    }
  }

  function getJokeList() {
    return [
      norris, dad, joker
    ]

  }

  function fetchExternalApi() {
    let options = facade.makeOptions("GET", false);
    fetch(URL, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDad(makeJoke(data.dadJoke, false, data.dadJokeID, "dad"));
        setNorris(makeJoke(data.chuckJoke, false, data.chuckJokeID, "chuck"));
        let jokeAllowed = !data.jokerNSFW || facade.getNsfw() == "true";
        jokeAllowed ? setJoker(makeJoke(data.jokerJoke, data.jokerNSFW == "true", data.jokerID, "joker")) : setJoker({jokeContent: nsfwMsg});
      });
  }
  return (
    <div>
      <h1>External API</h1>
      <hr />
      <button onClick={fetchExternalApi} id="btn">
        Press to fetch from API's!
      </button>
      <h2>Chuck Norris joke: </h2>
      <p>{norris.jokeContent}</p>
      {facade.loggedIn() && (
        <button onClick={addToFavoriteExList} value={norris.jokeType} id="btn">
          Favorite
        </button>
      )}
      <h2>Dad joke:</h2>
      <p>{dad.jokeContent}</p>
      {facade.loggedIn() && (
        <button onClick={addToFavoriteExList} value={dad.jokeType} id="btn">
          Favorite
        </button>
      )}
      <h2>Joker joke:</h2>
      <p style={{ color: jokeAllowed(joker) ? "black" : "red" }}>{joker.jokeContent}</p>
      {jokeAllowed(joker) && facade.loggedIn() && (
        <button onClick={addToFavoriteExList} value={joker.jokeType} id="btn">
          Favorite
        </button>
      )}
    </div>
  );
}
