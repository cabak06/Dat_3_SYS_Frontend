import React, { useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "./Header";
import { External } from "./External";
import { LoginAndOut } from "./LoginAndOut";
import { Admin } from "./Admin";
import { UserJokes } from "./UserJokes";
import { AddJoke } from "./AddJoke";
import { UserMemes } from "./UserMemes";
import { Register } from "./Register";
import { MyJokes } from "./MyJokes";
import { ExternalMeme } from "./ExternalMemes";
import { AddMeme } from "./AddMeme";

export default App;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const setLoginStatus = (status) => {
    setIsLoggedIn(status);
  };

  return (
    <Router>
      <div>
        <Header
          loginMsg={isLoggedIn ? "Logout" : "Login"}
          isLoggedIn={isLoggedIn}
        />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/external">
              <External />
            </Route>
            <Route path="/admin-page">
              <Admin />
            </Route>
            <Route path="/userJoke">
              <UserJokes />
            </Route>
            <Route path="/add-joke">
              <AddJoke />
            </Route>
            <Route path="/userMeme">
              <UserMemes />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/my-jokes">
              <MyJokes />
            </Route>
            <Route path="/external-meme">
              <ExternalMeme/>
            </Route>
            <Route path="/add-meme">
              <AddMeme/>
            </Route>
            <Route path="/login-out">
              <LoginAndOut
                loginMsg={isLoggedIn ? "Logout" : "Login"}
                isLoggedIn={isLoggedIn}
                setLoginStatus={setLoginStatus}
              />
            </Route>
            <Route>
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>Home is were the wifi connects automatically</p>
      <hr />
      <h3>This startcode was made by Gruppe3</h3>
      <a
        href="https://github.com/cabak06/Dat_3_SYS_Frontend"
        style={{ color: "blue" }}
      >
        To the FrontEnd
      </a>{" "}
      <br />
      <a
        href="https://github.com/cabak06/Dat_3_Sys_Backend"
        style={{ color: "blue" }}
      >
        To the BackEnd
      </a>{" "}
      <br />
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>How did you get here? You shouldn't be here..</h2>
    </div>
  );
}
