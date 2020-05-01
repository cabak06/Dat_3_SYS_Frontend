import React, { useState, useEffect } from "react";
import facade from "./apiFacade";

export function Admin() {
  const [jokeList, setJokeList] = useState([]);

  const URL = "/api/joke/userjokes";

  const deleteJoke = (id) => {
    facade.deleteInternalJokes(id, URL, setJokeList);
  };

  const fetchJokes = () => facade.fetchInternalJokes(URL, setJokeList);
  useEffect(fetchJokes, []);

  return (
    <div>
      <h1>User Jokes</h1>
      <hr />
      <button onClick={fetchJokes}>Press to fetch from API's!</button>
      <table border="1" width="50%">
        <thead>
          <tr>
            <th>Jokes</th>
            <th width="150px">Created By</th>
            <th width="50px"></th>
          </tr>
        </thead>
        <tbody>
          {jokeList.map((joke) => {
            return (
              <tr key={joke.id}>
                <td>{joke.jokeContent}</td>
                <td>{joke.createdBy}</td>
                <td align="center">
                  <button onClick={()=>deleteJoke(joke.id)}>DELETE</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
