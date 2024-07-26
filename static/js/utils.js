import { selectors } from "./selectors.js"

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
export let deviceId = getDeviceId()

export const isNumeric = n => !isNaN(n)
export function generateString(length) {
    let result = ''
    const charactersLength = characters.length
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }

    return result
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export function parseJwt (token) {
    var base64Url = token.split('.')[1]
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))

    return JSON.parse(jsonPayload)
}

export function getCookie(name) {
    let match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null
}

export function setCookie(name,val) {
    document.cookie = name + "=" + val + "; expires=Thu, 18 Dec 2050 12:00:00 UTC; path=/";
}

export function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}

function escape(s) {
    return s.replace(/([.*+?\^${}()|\[\]\/\\])/g, '\\$1')
}

function getDeviceId() {
    let deviceId = getCookie('deviceId')
    if (deviceId !== null) {
        return deviceId
    }
    deviceId = uuid()
    setCookie('deviceId', deviceId)
    return deviceId
}

function uuid() {
    return ('10000000-1000-4000-8000-100000000000').replace(/[018]/g, c => (
        c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
    )
}

function decreaseFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1)
}
