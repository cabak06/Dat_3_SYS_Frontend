import settingUrl from "./settings";

const URL = settingUrl.backendURL(); //Change this to your own URL

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

function apiFacade() {
  /* Insert utility-methods from a latter step (d) here (REMEMBER to uncomment in the returned object when you do)*/

  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };

  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };

  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("loginRoles");
    localStorage.removeItem("nsfwIsActive");
  };

  const setRoles = (roles) => {
    localStorage.setItem("loginRoles", roles);
  };

  const getRoles = () => {
    return localStorage.getItem("loginRoles");
  };

  const isAdmin = () => {
    const isAdmin = String(getRoles()).includes("admin");
    return isAdmin;
  };
  const isUser = () => {
    const isAdmin = String(getRoles()).includes("user");
    return isAdmin;
  };

  const setNsfw = (nsfw) => {
    localStorage.setItem("nsfwIsActive", nsfw);
  };

  const getNsfw = () => {
    return localStorage.getItem("nsfwIsActive");
  };

  const login = (user, password) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: password,
    });

    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
        console.log(res);
        setRoles(res.roles);
        setNsfw(res.nsfwIsActive);
      });
  };

  const fetchUserData = () => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/user/user", options).then(handleHttpErrors);
  };

  const fetchAdminData = () => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/user/admin", options).then(handleHttpErrors);
  };

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };

    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }

    if (body) {
      opts.body = JSON.stringify(body);
    }

    return opts;
  };

  const fetchInternalJokes = (fetchURL, setJokeList) => {
    let options = makeOptions("GET", true);
    fetch(URL + fetchURL, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        data.jokeList ?  setJokeList(data.jokeList) : setJokeList([]);
      });
  };

  const fetchInternalMemes = (fetchURL, setMemeList) => {
    let options = makeOptions("GET", true);
    fetch(URL + fetchURL, options)
      .then(handleHttpErrors)
      .then((data) => {
        data.memeList.sort((a,b)=>b.id-a.id)
        console.log(data);
        setMemeList(data.memeList);
      });
  };

  //Needs to be corrected when backend is made
  const fetchNonAdmins = (fetchURL, setUserList) => {
    let options = makeOptions("GET", true);
    fetch(URL + fetchURL, options)
      .then(handleHttpErrors)
      .then((data) => {
        data.userList.sort((a,b)=>b.id-a.id)
        console.log(data);
        setUserList(data.userList);
      });
  };

  const deleteInternalJokes = (id, fetchURL, setJokeList) => {
    let deleteURL = isAdmin() ? "/api/joke/" : "/api/joke/userdelete/";
    let options = facade.makeOptions("DELETE", true);
    fetch(URL + deleteURL + id, options)
      .then(console.log("Delete done on joke ID: " + id))
      .then(setTimeout(() => fetchInternalJokes(fetchURL, setJokeList), 75));
  };


  const deleteNonAdmins = (fetchURL, setUserList) => {
    let options = facade.makeOptions("DELETE", true);
    fetch(URL + fetchURL, options)
      .then(setTimeout(() => fetchNonAdmins("/api/user/allNonAdminUsers", setUserList), 75));
  };

  const editOwnJoke = (body) => {
    let options = facade.makeOptions("PUT", true, body);
    fetch(URL + "/api/joke/editjoke", options)
      .then(handleHttpErrors)
      .then((data) => {
        console.log(data);
      });
  };

  const addFavoriteJoke = (id) => {
    let option = facade.makeOptions("PUT",true);
    fetch(settingUrl.addFavoriteJoke() + "/"+ id,option)
    .then(handleHttpErrors)
    .then((data) => {
      console.log(data);
    });
  }


  const removeFavoriteJoke = (id,setJokeList) => {
    let option = facade.makeOptions("PUT",true);
    fetch(settingUrl.removeFavoriteJoke() + "/"+ id,option)
    .then(handleHttpErrors)
    .then(setTimeout(() => fetchFavoriteJokes(setJokeList), 75));
  }


  const fetchFavoriteJokes = (setJokeList) => {
    let options = makeOptions("GET", true);
    fetch(settingUrl.getFavoriteJokes(), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        data.jokeList ?  setJokeList(data.jokeList) : setJokeList([]);
      });
  };

  const addFavoriteExternalJoke = (joke) => {
    let option = facade.makeOptions("PUT",true, joke);
    fetch(settingUrl.addFavoriteExternalJoke(), option)
    .then(handleHttpErrors)
    .then((data) => {
      console.log(data);
    });
  }

  const removeFavoriteExternalJoke = (id,setJokeList) => {
    let option = facade.makeOptions("PUT",true);
    fetch(settingUrl.removeFavoriteExternalJoke() + "/"+ id,option)
    .then(handleHttpErrors)
    .then(setTimeout(() => fetchFavoriteExternalJokes(setJokeList), 75));
  }


  const fetchFavoriteExternalJokes = (setJokeList) => {
    let options = makeOptions("GET", true);
    fetch(settingUrl.getFavoriteExternalJokes(), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        data.ExternalJokeList ?  setJokeList(data.ExternalJokeList) : setJokeList([]);
      });
  };


  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchUserData,
    fetchAdminData,
    isAdmin,
    isUser,
    getNsfw,
    setNsfw,
    fetchInternalJokes,
    fetchInternalMemes,
    deleteInternalJokes,
    editOwnJoke,
    deleteNonAdmins,
    fetchNonAdmins,
    addFavoriteJoke,
    fetchFavoriteJokes,
    removeFavoriteJoke,
    addFavoriteExternalJoke,
    removeFavoriteExternalJoke,
    fetchFavoriteExternalJokes,
  };
}
const facade = apiFacade();
export default facade;
