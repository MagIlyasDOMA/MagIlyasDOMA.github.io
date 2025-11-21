"use strict";
const generator_div = document.querySelector('#generator-div');
const code_element = generator_div.querySelector('.language-html');
const inputs_div = generator_div.querySelector('#generator-inputs-div');
function generate() {
    files = [];
    text = '';
    inputs_div.querySelectorAll('input').forEach(input => {
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
    if (!arrayIsEmpty(files))
        paramsManager.set('files', files.toString());
    else
        paramsManager.delete('files');
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
document.addEventListener('DOMContentLoaded', () => {
    files = (paramsManager.get('files') || '').split(',');
    if (!arrayIsEmpty(files)) {
        files.forEach(file => {
            const input = inputs_div.querySelector(`input[name="${file}"]`);
            input.checked = true;
        });
    }
    generate();
});
//# sourceMappingURL=generator.js.map