<<<<<<< HEAD
function URLS() {
  function backendURL() {
    // const URL = "https://cahits.dk/SYS-Gruppe3";
    const URL = "http://localhost:8080/startcode";
    return URL;
  }

  function externalApi() {
    const URL = backendURL() + "/api/externalJoke/random";
    return URL;
  }

  function internalApi() {
    const URL = backendURL() + "/api/joke";
    return URL;
  }

  function internalJokes() {
    const URL = backendURL() + "/api/joke/userjokes";
    return URL;
  }

  function internalMemes() {
    const URL = backendURL() + "/api/meme/usermemes";
    return URL;
  }

  function registerUser() {
    const URL = backendURL() + "/api/user/register";
    return URL;
  }

  return {
    backendURL,
    externalApi,
    internalJokes,
    internalMemes,
    internalApi,
    registerUser,
  };
=======

function URLS(){

    function backendURL() {
       // const URL = "https://cahits.dk/SYS-Gruppe3";
        const URL = "http://localhost:8080/startcode";
        return URL;
    }

    function externalApi() {
        const URL = backendURL() + "/api/externalJoke/random";
        return URL;
    }

    function externalMeme() {
        const URL = backendURL() + "/api/externalMeme/random";
        return URL;
    }

    function internalApi() {
        const URL = backendURL() + "/api/joke";
        return URL;
    }

    function internalJokes(){
        const URL = backendURL() + "/api/joke/userjokes";
        return URL;
    }   

    function registerUser(){
        const URL = backendURL() + "/api/user/register";
        return URL;
    } 

    return {
        backendURL,
        externalApi,
        internalJokes,
        internalApi,
        registerUser,
        externalMeme
    }

>>>>>>> 5f2e084f17d6b594d88d69c647b54bc6f27ce269
}

const settingUrl = URLS();

export default settingUrl;
