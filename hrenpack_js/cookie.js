"use strict";
function getCookie(name) {
    const nameEQ = `${name}=`;
    const cookiesArray = document.cookie.split(';');
    cookiesArray.forEach(cookie => {
        cookie = cookie.trim();
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    });
    return null;
}
function setCookie(name, value, days = null, path = '/') {
    let expires;
    if (!days) {
        expires = '; expires=Fri, 31 Dec 9999 23:59:59 GMT';
    }
    else {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value || ''}${expires}; path=${path}`;
}
function hasCookie(name) {
    return getCookie(name) != null;
}
//# sourceMappingURL=cookie.js.map