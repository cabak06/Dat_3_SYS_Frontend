import React, { useState } from "react";
import settingUrl from "./settings";

export function AddJoke() {
  const URL = settingUrl.internalApi();
  const [joke, setJoke] = useState("");
  const [nsfw, setNsfw] = useState(false);

  function PostInternalApi(jokeInput) {
    
    let input = { jokeContent: jokeInput, nsfw:  nsfw};
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "x-access-token": localStorage.getItem("jwtToken"),
      },
      body: JSON.stringify(input),
    };
    fetch(URL, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNsfw(false);
      });

  }

  function submitHandler(event) {
    event.preventDefault();
    PostInternalApi(joke);
    setJoke("");
  }

  function changeHandler(event) {
    setJoke(event.target.value);
  }

  function changeHandlerNSFW(event) {
    console.log(event.target.checked);
    setNsfw(event.target.checked);
  }

  return (
    <div>
      <h1>Add your joke</h1>
      <form onSubmit={submitHandler}>
        <textarea
          style={{resize: "none"}}
          rows="10"
          cols="50"
          id="jokeText"
          value={joke}
          onChange={changeHandler}
        />
        <br />
        <input type="checkbox" 
        id="nsfwCheck" 
        style={{width: "15px", height: "15px"}} 
        onChange={changeHandlerNSFW} 
        checked={nsfw}
        />
        <label htmlFor="nsfwCheck">NSFW?</label>
        <br />
        <input type="submit" value="Submit Joke" />
      </form>
    </div>
  );
}
