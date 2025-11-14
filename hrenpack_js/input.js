function getInputCursorPosition(input) {
    return input.selectionStart - 1
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
            // Возвращаем атрибут disabled
            input.setAttribute('disabled', true);
          });
}


function clearInput_and_addLastSymbol(input) {
    input.value = input.value[getInputCursorPosition(input)];
}
