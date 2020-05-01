import React, { useState } from "react";
import facade from "./apiFacade";

export function MyJokes() {
  const [jokeList, setJokeList] = useState([]);

  const URL = "/api/joke/ownjokes";

  const deleteJoke = (id) => {
    facade.deleteInternalJokes(id, facade.fetchInternalJokes, URL, setJokeList);
  };

  const fetchJokes = () => facade.fetchInternalJokes(URL, setJokeList);

  const editJoke = () => console.log("ADD FUNCTION FOR EDIT");

  return (
    <div>
      <h1>My Jokes</h1>
      <hr />
      <button onClick={fetchJokes}>Press to fetch from API's!</button>
      <table border="1" width="50%">
        <thead>
          <tr>
            <th>Jokes</th>
            <th width="50px"></th>
            <th width="50px"></th>
          </tr>
        </thead>
        <tbody>
          {jokeList.map((joke) => {
            return (
              <tr key={joke.id}>
                <td>{joke.jokeContent}</td>
                <td align="center">
                  <button onClick={editJoke} value={joke.id}>
                    EDIT
                  </button>
                </td>
                <td align="center">
                  <button onClick={() => deleteJoke(joke.id)} value={joke.id}>
                    DELETE
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
