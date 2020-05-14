import React, { useState, useEffect } from "react";
import facade from "./apiFacade";

export function Admin() {
  const [jokeList, setJokeList] = useState([]);
  const [userList, setUserList] = useState([]);

  const URL = "/api/joke/userjokes";

  const deleteJoke = (id) => {
    facade.deleteInternalJokes(id, URL, setJokeList);
  };

  const fetchJokes = () => facade.fetchInternalJokes(URL, setJokeList);
  useEffect(fetchJokes, []);

  const deleteUser = (username) => {
    facade.deleteNonAdmins('/api/user/' + username, setUserList);
  };
  const fetchUsers = () => facade.fetchNonAdmins('/api/user/allNonAdminUsers', setUserList);
  useEffect(fetchUsers, []);

  return (
    <div style={{}}>
      <div>
      <h1>User Jokes</h1>
      <button onClick={fetchJokes} id="btn">Press to reloade the table!</button>
      <table border="1" width="40%">
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
                  <button onClick={()=>deleteJoke(joke.id)} id="btn">DELETE</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
      <div style={{}}>
      <h1>Delete users</h1>
      <button onClick={fetchUsers}>Press to reloade the table!</button>
      <table border="1" width="40%" >
        <thead>
          <tr>
            <th>User Name</th>
            <th width="50px"></th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => {
            return (
              <tr key={user.username}>
                <td>{user.username}</td>
                <td align="center">
                  <button onClick={()=>deleteUser(user.username)}>DELETE</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </div>
  );
}
