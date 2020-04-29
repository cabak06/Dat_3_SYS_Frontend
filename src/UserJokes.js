import React, { useState } from "react";
import settingUrl from "./settings";

export function UserJokes() {
  const URL = settingUrl.internalJokes();
  const [userJokes, setUserJokes] = useState([]);
  const token = localStorage.getItem("jwtToken");
  let options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  if (token) {
    options.headers["x-access-token"] = token;
  }

  function fetchInternalJokes() {
    console.log(URL);
    fetch(URL, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserJokes(data.jokeList);
      });
  }

  return (
    <div>
      <h1>UserJoke</h1>

      <button onClick={fetchInternalJokes}>Press to fetch from API's!</button>
      {userJokes.map((joke) => {
        return <p key={joke.id}>{joke.jokeContent}</p>
      })}
    </div>
  );
}
