
function URLS(){

    function backendURL() {
        const URL = "https://cahits.dk/SYS-Gruppe3";
        return URL;
    }

    function externalApi() {
        const URL = "https://cahits.dk/SYS-Gruppe3/api/info/external";
        return URL;
    }

    function internalJokes(){
        const URL = "http://localhost:8080/startcode/api/joke/userjokes";
        return URL;
    }

    return {
        backendURL,
        externalApi,
        internalJokes
    }

}

const settingUrl = URLS();

export default settingUrl;