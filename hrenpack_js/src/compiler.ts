function downloadTextAsFile(filename: string, text: string): void {
    // Создаем Blob из текста
    const blob = new Blob([text], { type: 'text/plain' });

    // Создаем URL для Blob
    const url = URL.createObjectURL(blob);
    console.log(url)

    // Создаем элемент <a> для загрузки
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;

    // Программно вызываем клик по ссылке
    a.click();

    // Освобождаем URL
    URL.revokeObjectURL(url);
}
