
function URLS(){

    function backendURL() {
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

    return {
        backendURL,
        externalApi,
        internalApi
    }

}

const settingUrl = URLS();

export default settingUrl;