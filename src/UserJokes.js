import React, { useState, useEffect } from "react";
import settingUrl from "./settings";
import facade from "./apiFacade";

export function UserJokes() {
  const URL = settingUrl.internalJokes();
  const [userJokes, setUserJokes] = useState([]);
  let options = facade.makeOptions("GET", true);

  useEffect(() => {
    fetchInternalJokes();
  }, []);

  function fetchInternalJokes() {
    facade.fetchInternalJokes("/api/joke/userjokes", setUserJokes);
  }

  return (
    <div>
      <h1>UserJoke</h1>
      <button onClick={fetchInternalJokes}>Press to fetch from API's!</button>
      <table border="1" width="50%">
        <thead>
          <tr>
            <th>Jokes</th>
            <th width="150px">Created By</th>
          </tr>
        </thead>
        <tbody>
          {userJokes.map((joke) => {
            return (
              <tr key={joke.id}>
                <td>{joke.jokeContent}</td>
                <td>{joke.createdBy}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
