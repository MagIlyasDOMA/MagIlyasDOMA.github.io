"use strict";
const generator_div = document.querySelector('#generator-div');
const code_element = generator_div.querySelector('.language-html');
const inputs_div = generator_div.querySelector('#generator-inputs-div');
const selectAllInput = inputs_div.querySelector('#id_select_all');
function getAllInputs() {
    return inputs_div.querySelectorAll('input[data-filename]');
}
function getAllInputsNames() {
    const names = [];
    getAllInputs().forEach(input => { names.push(input.name); });
    return names;
}
function generate() {
    files = [];
    text = '';
    getAllInputs().forEach(input => {
        if (input.checked)
            files.push(input.name);
    });
    files.forEach(file => {
        text += `<script src="${domain}/hrenpack_js/${file}.js"></script>`;
        text += '\n';
    });
    code_element.textContent = text;
    Prism.highlightElement(code_element);
    clickToCopyLinks(code_element);
    if (arraysIsEqual(getAllInputsNames(), files, false))
        paramsManager.set('files', 'all');
    else if (!arrayIsEmpty(files))
        paramsManager.set('files', files.toString());
    else
        paramsManager.delete('files');
    selectAllInput.checked = paramsManager.get('files') === 'all';
    updateLink();
}
function copyButton() {
    const text = code_element.textContent;
    if (text) {
        copyTextToClipboard(text);
        notification.show("HTML-код скопирован");
    }
}
function downloadButton() {
    const text = code_element.textContent;
    if (text) {
        downloadTextAsFile(FILENAME, text);
    }
}
function selectAll(powerOn = true) {
    getAllInputs().forEach(input => { input.checked = powerOn; });
    generate();
}
document.addEventListener('DOMContentLoaded', () => {
    const rawFiles = paramsManager.get('files');
    if (rawFiles === 'all')
        files = getAllInputsNames();
    else
        files = (rawFiles || '').split(',');
    if (!arrayIsEmpty(files)) {
        files.forEach(file => {
            const input = inputs_div.querySelector(`input[name="${file}"]`);
            input.checked = true;
        });
    }
    generate();
});
//# sourceMappingURL=generator.js.map