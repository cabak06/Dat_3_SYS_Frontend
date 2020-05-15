import React, { useState, useEffect } from "react";
import facade from "./apiFacade";

export function FavoriteExternalJoke() {
  const [jokeList, setJokeList] = useState([]);

  function fetchFavExJokes() {
    facade.fetchFavoriteExternalJokes(setJokeList);
  }

  useEffect(fetchFavExJokes, []);

  const removeFavExJoke = (id) => {
    facade.removeFavoriteExternalJoke(id, setJokeList);
  };

  return (
    <div>
      <h1>My Favorite  External Jokes</h1>
      <hr />
      <table border="1" width="50%">
        <thead>
          <tr>
            <th>Jokes</th>
            <th width="50px">Remove</th>
          </tr>
        </thead>
        <tbody>
          {jokeList.map((joke) => {
            return (
              <tr key={joke.id}>
                <td>{joke.jokeContent}</td>
                <td align="center">
                  <button onClick={() => removeFavExJoke(joke.id)} id="tableBtn">
                    Remove
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
