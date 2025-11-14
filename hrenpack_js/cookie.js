function getCookie(name) {
    const nameEQ = `${name}=`;
    const cookiesArray = document.cookie.split(';'); // разбиваем строку cookie на массив
    for (let i = 0; i < cookiesArray.length; i++) {
        let cookie = cookiesArray[i].trim(); // удаляем пробелы
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length); // возвращаем значение cookie
        }
    }
    return null; // если cookie не найден, возвращаем null
}


function setCookie(name, value, days= null, path = '/') {
    let expires = '';
    if (days === 'forever') {
        expires = '; expires=Fri, 31 Dec 9999 23:59:59 GMT'; // форматируем дату
    } else if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // преобразуем дни в миллисекунды
        expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value || ''}${expires}; path=${path}`; // установка cookie
}


function hasCookie(name) {
    return getCookie(name) == null;
}

