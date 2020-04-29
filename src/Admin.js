import React, { useState } from "react";
import settingUrl from "./settings";

export function Admin() {
  const [jokeContent, setJokeContent] = useState(<br />);
  const [createdBy, setCreatedBy] = useState(<br />);
  const [jokeId, setJokeId] = useState(<br />);


  const URL = settingUrl.internalJokes();

  function fetchInternalJokes() {
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    fetch(URL, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setJokeContent(data.jokeList);
        setCreatedBy(data.createdBy);
        setJokeId(data.jokeId);
      });
  }
  function deleteInternalJokes() {
    let options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    fetch(URL, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        
      });
  }

  return (
    <div>
      <h1>User Jokes</h1>
      <button onClick={fetchInternalJokes}>Press to fetch from API's!</button>
      <p>{jokeContent}</p>
      <table border="1" width="50%">
        <thead>
          <tr>
            <th>Jokes</th>
            <th width="150px">Created By</th>
            <th width="50px"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{jokeContent}</td>
            <td>Smith</td>
            <td align="center"><button onClick={deleteInternalJokes}>DELETE</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
