function URLS() {
  function backendURL() {
    // const URL = "https://cahits.dk/SYS-Gruppe3";
    const URL = "http://localhost:8080/startcode";
    return URL;
  }

    function changePassword(){
      const URL = backendURL() + "/api/user/password"
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


    function addFavoriteJoke(){
      const URL = backendURL() + "/api/joke/favorite"
      return URL;
    }

    function getFavoriteJokes(){
      const URL = backendURL() + "/api/joke/favorites"
      return URL;
    }

    function removeFavoriteJoke(){
      const URL = backendURL() + "/api/joke/remove_favorite"
      return URL;
    }

  return {
    backendURL,
    externalApi,
    externalMeme,
    internalJokes,
    internalMemes,
    internalApi,
    registerUser,
    changePassword,
    addFavoriteJoke,
    getFavoriteJokes,
    removeFavoriteJoke,
  };
}
const settingUrl = URLS();

export default settingUrl;
