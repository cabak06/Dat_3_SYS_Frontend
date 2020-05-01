import React, { useState, useEffect } from "react";
import facade from "./apiFacade";

export function MyJokes() {
  const [jokeList, setJokeList] = useState([]);
  const [editingJoke, setEditingJoke] = useState({});

  const URL = "/api/joke/ownjokes";

  useEffect(() => {
    !editingJoke.id && fetchJokes();
  }, [editingJoke]);

  const deleteJoke = (id) => {
    facade.deleteInternalJokes(id, URL, setJokeList);
  };

  function fetchJokes() {
    facade.fetchInternalJokes(URL, setJokeList);
  }

  const editJoke = (id) => {
    let joke = jokeList.filter((joke) => joke.id == id)[0];
    setEditingJoke(joke);
  };

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
                  <button onClick={() => editJoke(joke.id)}>EDIT</button>
                </td>
                <td align="center">
                  <button onClick={() => deleteJoke(joke.id)}>DELETE</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {editingJoke.id && (
        <EditJoke setEditingJoke={setEditingJoke} editingJoke={editingJoke} />
      )}
    </div>
  );
}

function EditJoke({ setEditingJoke, editingJoke }) {
  const [joke, setJoke] = useState(editingJoke);

  useEffect(() => {
    setJoke(editingJoke);
  }, [editingJoke]);

  function submitHandler(event) {
    event.preventDefault();
    facade.editOwnJoke(joke);
    setEditingJoke({});
  }

  function changeHandler(event) {
    let value = event.target.value;
    setJoke({ ...joke, jokeContent: value });
  }

  function changeHandlerNSFW(event) {
    let value = event.target.checked;
    setJoke({ ...joke, nsfw: value });
  }

  return (
    <>
      <br />
      <br />
      Joke ID: {editingJoke.id}
      <form onSubmit={submitHandler}>
        <textarea
          style={{ resize: "none" }}
          rows="10"
          cols="50"
          id="jokeText"
          value={joke.jokeContent}
          onChange={changeHandler}
        />
        <br />
        <input
          type="checkbox"
          id="nsfwCheck"
          style={{ width: "15px", height: "15px" }}
          onChange={changeHandlerNSFW}
          checked={joke.nsfw}
        />
        <label htmlFor="nsfwCheck">NSFW?</label>
        <br />
        <input type="submit" value="Submit Joke" />
      </form>
    </>
  );
}
