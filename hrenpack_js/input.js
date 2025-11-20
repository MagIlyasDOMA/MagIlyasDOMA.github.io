"use strict";
function getInputCursorPosition(input) {
    const start = input.selectionStart;
    if (start == null)
        throw new Error("Incorrect input type");
    return start - 1;
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
        .finally(() => {
        input.setAttribute('disabled', '');
    });
}
function clearInput_and_addLastSymbol(input) {
    input.value = input.value[getInputCursorPosition(input)] || '';
}
function getInputLabel(input) {
    const label = document.querySelector(`label[for="${input.id}"]`);
    if (!label)
        throw new Error("Label не найден. Возможно, вы не использовали атрибут for в нем");
    return label;
}
//# sourceMappingURL=input.js.map