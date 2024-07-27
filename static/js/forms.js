import {env} from "../env.js";

export function sendPost(url, data, success, error) {
    $.ajax({
        url: `${env.serverAddress}${url}`,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: success,
        error: function(xhr, status, error) {
            alert("Failed: " + error)
        }
    })
}