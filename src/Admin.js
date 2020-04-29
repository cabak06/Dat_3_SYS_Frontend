import React, { useState } from "react";
import settingUrl from "./settings";

export function Admin() {
  const [jokeList, setJokeList] = useState([]);


  const URL = settingUrl.internalApi();

  function fetchInternalJokes() {
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
    fetch(URL + "/userjokes", options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setJokeList(data.jokeList);
      });
      if (token) {
    options.headers["x-access-token"] = token;
  }
  }
  function deleteInternalJokes(event) {
    event.preventDefault();
    let id = event.target.value;
    const token = localStorage.getItem("jwtToken");
    let options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    if (token) {
      options.headers["x-access-token"] = token;
    }
    fetch(URL + "/" + id, options)
    .then(fetchInternalJokes);
      
  }

  return (
    <div>
      <h1>User Jokes</h1>
      <hr/>
      <button onClick={fetchInternalJokes}>Press to fetch from API's!</button>
      <table border="1" width="50%">
        <thead>
          <tr>
            <th>Jokes</th>
            <th width="150px">Created By</th>
            <th width="50px"></th>
          </tr>
        </thead>
        <tbody>
          {jokeList.map(joke => {return (
          <tr key={joke.id}>
            <td>{joke.jokeContent}</td>
            <td>{joke.createdBy}</td>
            <td align="center"><button onClick={deleteInternalJokes} value={joke.id}>DELETE</button></td>
          </tr>
          )})}
        </tbody>
      </table>
    </div>
  );
}
