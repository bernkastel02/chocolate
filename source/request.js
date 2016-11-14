"use strict";


var rp = require("request-promise-any")

class HTTPHandler {
    sendRequest(url, method, endpoint, body, auth, isJSON) {
        var options = {
            method: method,
            uri: `${url}/${endpoint}`,
            body: body,
            headers: {
                'Authorization': auth
            },
            json: isJSON
        };
        return rp(options).then((data) => { return (data) })
    }
    
    rawGET(url) {
        var options = {
            method: "GET",
            uri: `${url}`
        };
        return rp(options).then((data) => { return (data) })
    }
    
    requestExample() {
        return "Example: sendRequest(url, method, endpoint, body, auth, isJSON)\nsendRequest(url, `GET`, endpoint, ``, ``, false)"
    }
}

module.exports = HTTPHandler;