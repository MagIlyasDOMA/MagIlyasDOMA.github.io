"use strict";
const generator_div = document.querySelector('#generator-div');
const code_element = generator_div.querySelector('.language-html');
const inputs_div = generator_div.querySelector('#generator-inputs-div');
const domain = document.currentScript.dataset.domain || 'http://localhost:8080/';
const paramsManager = new GETParamsManager();
let text = '', files = [];
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
    paramsManager.set('files', files.toString());
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
        downloadTextAsFile('script.html', text);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    files = paramsManager.get('files').split(',');
    files.forEach(file => {
        const input = inputs_div.querySelector(`input[name="${file}"]`);
        input.checked = true;
    });
    generate();
});
//# sourceMappingURL=generator.js.map