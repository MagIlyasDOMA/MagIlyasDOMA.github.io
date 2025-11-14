"use strict";
function getInputCursorPosition(input) {
    return (input.selectionStart || 0) - 1;
}
function copyInputToClipboard(input) {
    // Временно снимаем атрибут disabled
    input.removeAttribute('disabled');
    // Выделяем текст в input
    input.select();
    input.setSelectionRange(0, 99999); // Для мобильных устройств
    // Копируем текст в буфер обмена
    navigator.clipboard.writeText(input.value)
        .then(() => {
        console.log('Текст успешно скопирован: ' + input.value);
    })
        .catch(err => {
        console.error('Не удалось скопировать текст: ', err);
    })
        .then(() => {
        // Возвращаем атрибут disabled (замена finally для совместимости)
        input.setAttribute('disabled', 'true');
    });
}
function clearInput_and_addLastSymbol(input) {
    const cursorPosition = getInputCursorPosition(input);
    input.value = input.value[cursorPosition] || '';
}
//# sourceMappingURL=input.js.map