import React, { useState } from "react";
import settingUrl from "./settings";

export function Register() {
  let blankUser = { username: "", password: "" };
  const [user, setUser] = useState({ ...blankUser });
  const [error, setError] = useState("");

  function changeHandler(event) {
    const { id, value } = event.target;
    setUser({ ...user, [id]: value });
  }

  function submitHandler(event) {
    const URL = settingUrl.registerUser();
    console.log("Sending to: " + URL);
    console.log("Sending following user data:");
    console.log(user);
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    };
    fetch(URL, options)
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA:");
        console.log(data);
        if (data.error) {
          setError(data.error);
        } else {
          setError(data.msg);
          setUser(blankUser);
        }
      });
  }

  return (
    <>
      <h1>Register a new account</h1>
      <hr/>
        <input
          type="text"
          placeholder="Username"
          id="username"
          value={user.username}
          onChange={changeHandler}
        />
        <br/>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={user.password}
          onChange={changeHandler}
        /> 
        <br/>
      <button onClick={submitHandler} id="btn">Sign Up</button>
      {error && (
        <>
          <br />
          <i style={{ color: error.includes("User registered") ? "green" : "red" }}>{error}</i>
        </>
      )}
    </>
  );
}
