import {env} from "../env.js";
import {getCookie} from "./utils.js";

export function sendPost(url, data, success, error) {
    if (data.xp && typeof data.xp === 'string') {
        data.xp = parseInt(data.xp, 10)
    }
    $.ajax({
        url: `${env.serverAddress}${url}`,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        xhrFields: {
            withCredentials: true
        },
        success: success,
        error: function(xhr, status, error) {
            alert("Failed: " + error)
        }
    })
}

export function sendDelete(url, data, success, error) {
    $.ajax({
        url: `${env.serverAddress}${url}`,
        type: "DELETE",
        contentType: "application/json",
        data: JSON.stringify(data),
        xhrFields: {
            withCredentials: true
        },
        success: success,
        error: function(xhr, status, error) {
            alert("Failed: " + error)
        }
    })
}

export function sendPut(url, data, success, error) {
    $.ajax({
        url: `${env.serverAddress}${url}`,
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(data),
        xhrFields: {
            withCredentials: true
        },
        success: success,
        error: function(xhr, status, error) {
            alert("Failed: " + error)
        }
    })
}

export function sendGet(url, success, error) {
    $.ajax({
        url: `${env.serverAddress}${url}`,
        type: "GET",
        contentType: "application/json",
        xhrFields: {
            withCredentials: true
        },
        success: success,
        error: function(xhr, status, error) {
            alert("Failed: " + error)
        }
    })
}