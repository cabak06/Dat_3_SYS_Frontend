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

  return {
    backendURL,
    externalApi,
    externalMeme,
    internalJokes,
    internalMemes,
    internalApi,
    registerUser,
    changePassword,
  };
}
const settingUrl = URLS();

export default settingUrl;
