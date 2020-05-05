import React, { useState, useEffect } from "react";
import settingUrl from "./settings";
import facade from "./apiFacade";

export function UserMemes() {
  const URL = settingUrl.internalMemes();
  const [userMemes, setUserMemes] = useState([]);
  let options = facade.makeOptions("GET", true);

  useEffect(() => {
    fetchInternalMemes();
  }, []);

  function fetchInternalMemes() {
    facade.fetchInternalMemes("/api/meme/usermemes", setUserMemes);
  }

  return (
    <div>
      <h1>UserMeme</h1>
      <button onClick={fetchInternalMemes}>Press to fetch from API's!</button>
      <table border="1" width="50%">
        <thead>
          <tr>
            <th>Memes</th>
            <th width="150px">Created By</th>
          </tr>
        </thead>
        <tbody>
          {userMemes.map((meme) => {
            return (
              <tr key={meme.id}>
                <td>{meme.picturePath}</td>
                <td>{meme.createdBy}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
