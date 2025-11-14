function isAbsoluteUrl(url: string): boolean {
    try {
        new URL(url); // Попытка создать объект URL
        return true; // Если успешно, это абсолютный URL
    } catch (e) {
        return url[0] === '/' || url[0] === '\\'; // Если ошибка, это относительный URL
    }
}