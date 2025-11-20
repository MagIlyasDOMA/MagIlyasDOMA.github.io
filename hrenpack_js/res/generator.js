"use strict";
const generator_div = document.querySelector('#generator-div');
const code_element = generator_div.querySelector('.language-html');
const inputs_div = generator_div.querySelector('#generator-inputs-div');
const SCRIPT_TEMPLATE = '<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><click-to-copy data-clf-generated="">https://localhost:8000/hrenpack_js/{}</click-to-copy><span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>';
let text = '';
function generate() {
    text = '';
    inputs_div.querySelectorAll('input').forEach(input => {
        if (input.checked) {
            text += SCRIPT_TEMPLATE.replace('{}', getInputLabel(input).textContent);
            text += '\n';
        }
    });
    code_element.innerHTML = text;
}
//# sourceMappingURL=generator.js.map