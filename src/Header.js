import React from "react";
import { NavLink } from "react-router-dom";
import facade from "./apiFacade";
import { NsfwToggle } from "./Nsfw";

export function Header({ isLoggedIn, loginMsg }) {
  return (
    <div>
      <ul className="header">
        <li>
          <NavLink exact activeClassName="active" to="/">
            Home
          </NavLink>
        </li>
        {!facade.isAdmin() && (
          <li>
            <NavLink activeClassName="active" to="/external">
              External
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <>
            {facade.isAdmin() && (
              <>
                <li>
                  <NavLink activeClassName="active" to="/admin-page">
                    Admin Page
                  </NavLink>
                </li>
              </>
            )}
            <>
            {/*Dropdown menuer*/}
              <div className="dropdown">
                <button className="dropbtn">
                  Jokes &nbsp;▼
                  <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                  {(facade.isUser() || facade.isAdmin()) && (
                    <li>
                      <NavLink activeClassName="active" to="/userJoke">
                        User-Jokes
                      </NavLink>
                    </li>
                  )}
                  {facade.isUser() && (
                    <li>
                      <NavLink activeClassName="active" to="/add-joke">
                        Add your own joke
                      </NavLink>
                    </li>
                  )}
                  {facade.isUser() && (
                    <li>
                      <NavLink activeClassName="active" to="/my-jokes">
                        My Jokes
                      </NavLink>
                    </li>
                  )}
                </div>
              </div>
              <div className="dropdown">
                <button className="dropbtn">
                  Memes &nbsp;▼
                  <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                  {(facade.isUser() || facade.isAdmin()) && (
                    <li>
                      <NavLink activeClassName="active" to="/userMeme">
                        User-Memes
                      </NavLink>
                    </li>
                  )}
                  {facade.isUser() && (
                    <li>
                    <NavLink activeClassName="active" to="/add-meme">
                      Add your own meme
                    </NavLink>
                  </li>
                  )}
                  {facade.isUser() && (
                    <li>
                    <NavLink activeClassName="active" to="/external-meme">
                      Random Memes
                    </NavLink>
                  </li>
                  )}
                </div>
              </div>
              {/*Her til*/}
              <li>
                <NavLink activeClassName="active" to="/userSettings">
                  User-Settings
                </NavLink>
              </li>
              <div
                style={{
                  float: "right",
                  paddingRight: "10px",
                  paddingTop: "8px",
                }}
              >
                <NsfwToggle />
              </div>
            </>
          </>
        )}
        <li>
          <NavLink activeClassName="active" to="/login-out">
            {loginMsg}
          </NavLink>
        </li>
        {!isLoggedIn && (
          <li>
            <NavLink activeClassName="active" to="/register">
              Register
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
}
