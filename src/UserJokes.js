import React, { useState, useEffect } from "react";
import settingUrl from "./settings";
import facade from "./apiFacade";

export function UserJokes() {
  const URL = settingUrl.internalJokes();
  const [userJokes, setUserJokes] = useState([]);
  const [update, setUpdate] = useState(false);
  const [favoriteJokes, setFavoriteJokes] = useState([]);
  let options = facade.makeOptions("GET", true);

  useEffect(() => {
    fetchInternalJokes();
  }, []);

  function fetchInternalJokes() {
    facade.fetchInternalJokes("/api/joke/userjokes", setUserJokes);
  }

  function sortNewest() {
    let sortedJokesByID = userJokes.sort((joke1, joke2) => {
      return joke2.id - joke1.id;
    });
    setUserJokes(sortedJokesByID);
    setUpdate(!update);
  }

  function sortByCreator() {
    let sortedJokes = userJokes.sort((joke1, joke2) => {
      return joke1.createdBy
        .toLowerCase()
        .localeCompare(joke2.createdBy.toLowerCase());
    });
    setUserJokes(sortedJokes);
    setUpdate(!update);
  }

  function sortOldest() {
    let sortedJokesByID = userJokes.sort((joke1, joke2) => {
      return joke1.id - joke2.id;
    });
    setUserJokes(sortedJokesByID);
    setUpdate(!update);
  }

  function addToFavoriteList(id) {
    let joke = userJokes.filter((joke) => joke.id === id)[0];
    facade.addFavoriteJoke(id);
  }

  return (
    <div>
      <h1>UserJoke</h1>
      <hr />
      <button onClick={fetchInternalJokes} id="btn">
        Press to fetch from API's!
      </button>
      <button onClick={sortNewest} id="btnSort">
        Sort by Newest
      </button>
      <button onClick={sortOldest} id="btnSort">
        Sort by Oldest
      </button>
      <button onClick={sortByCreator} id="btnSort">
        Sort by User
      </button>
      <br />
      <br />
      <table border="1" width="50%">
        <thead>
          <tr>
            <th>Jokes</th>
            <th width="150px">Created By</th>
            <th width="50px">Favorite-List</th>
          </tr>
        </thead>
        <tbody>
          {userJokes.map((joke) => {
            return (
              <tr key={joke.id}>
                <td>{joke.jokeContent}</td>
                <td>{joke.createdBy}</td>
                <td align="center">
                  <button
                    onClick={() => addToFavoriteList(joke.id)}
                    id="tableBtn"
                  >
                    Add Favorite
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
