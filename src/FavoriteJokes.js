import React, { useState, useEffect } from "react";
import facade from "./apiFacade";

export function FavoriteJokes(){
const[jokeList,setJokeList] = useState([]);


function fetchJokes() {
    facade.fetchFavoriteJokes( setJokeList);
  }

  useEffect(fetchJokes,[]);

 

  const removeJoke = (id) => {
  facade.removeFavoriteJoke(id, setJokeList);
  

};

return (
    <div>
        <h1>My Favorite Jokes</h1>

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
                  <button onClick={() => removeJoke(joke.id)}>Remove</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
)



}