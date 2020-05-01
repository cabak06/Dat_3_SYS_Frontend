import React from "react";
import { NavLink } from "react-router-dom";
import facade from "./apiFacade";
import {NsfwToggle} from "./Nsfw";

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
            {facade.isUser() && (
              <>
                <li>
                  <NavLink activeClassName="active" to="/add-joke">
                    Add your own joke
                  </NavLink>
                </li>
                <li>
                  <NavLink activeClassName="active" to="/my-jokes">
                    My Jokes
                  </NavLink>
                </li>
                
                <div style={{float: "right", paddingRight: "10px", paddingTop: "8px"}}>
                  <NsfwToggle/>
                </div>
              </>
            )}
            {/*
              This following if-statement is technicly overkill, since we have this question nested in a login question, 
              and at the time of writting, these are the only two roles, meaning that if a user is logged in, 
              this nested boolean will always be true. We keep this, in case we later add more roles.
              */}
            {(facade.isUser() || facade.isAdmin()) && (
              <>
                <li>
                  <NavLink activeClassName="active" to="/userJoke">
                    User-Jokes
                  </NavLink>
                </li>
              </>
            )}
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
