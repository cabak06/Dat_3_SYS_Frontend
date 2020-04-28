import React, {useState} from "react";
import settingUrl from "./settings";


  
export function UserJokes() {
const URL = settingUrl.internalJokes();
const [userJokes, setUserJokes] = useState("");
  let options = {
    'method': 'GET',
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  function fetchInternalJokes(){
      console.log(URL);
    fetch(URL, options)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setUserJokes(data.UserJoke);
      

    });
  }

   
    return (
        <div>
          <h1>UserJoke</h1>
          
          <button onClick={fetchInternalJokes}>Press to fetch from API's!</button>
        <p>{userJokes}</p>
        </div>
        );

}


 

