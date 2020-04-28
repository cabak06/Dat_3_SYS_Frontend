
function URLS(){

    function backendURL() {
       // const URL = "https://cahits.dk/SYS-Gruppe3";
        const URL = "http://localhost:8080/startcode";
        return URL;
    }

    function externalApi() {
        const URL = backendURL() + "/api/info/external";
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

    return {
        backendURL,
        externalApi,
        internalJokes,
        internalApi
    }

}

const settingUrl = URLS();

export default settingUrl;