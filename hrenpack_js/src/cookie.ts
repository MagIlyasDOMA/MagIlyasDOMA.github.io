import { NullStr, NullNum } from "./types";

function getCookie(name: string): NullStr {
    const cookies = document.cookie;
    if (!cookies) return null;

    const cookiesArray = cookies.split(';');
    for (let i = 0; i < cookiesArray.length; i++) {
        const raw = cookiesArray[i];
        if (raw === undefined) continue; // <-- защита от undefined
        const cookie = raw.trim();
        if (cookie.indexOf(name + '=') === 0) {
            return decodeURIComponent(cookie.substring(name.length + 1));
        }
    }
    return null;
}


function setCookie(name: string, value: string, days: NullNum = null, path = '/'): void {
    let expires = '';
    if (days == null)
        expires = '; expires=Fri, 31 Dec 9999 23:59:59 GMT'; // форматируем дату
    else {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // преобразуем дни в миллисекунды
        expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value || ''}${expires}; path=${path}`; // установка cookie
}


function hasCookie(name: string): boolean {
    return getCookie(name) != null;
}

