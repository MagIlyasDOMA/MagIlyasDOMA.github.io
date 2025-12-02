"use strict";
function input_type_fc(input) {
    return input.type !== 'hidden' && input.type !== 'reset' && input.type !== 'checkbox' && input.type !== 'radio';
}
function input_form_control(form) {
    const inputs = form.querySelectorAll('input');
    const selects = form.querySelectorAll('select');
    const areas = form.querySelectorAll('textarea');
    inputs.forEach(input => {
        if (input_type_fc(input))
            input.classList.add('form-control');
    });
    selects.forEach(select => {
        select.classList.add('form-control');
    });
    areas.forEach(textarea => {
        textarea.classList.add('form-control');
    });
}
function input_form_control_unline(form) {
    console.log(form.id);
    const inputs = form.querySelectorAll('input');
    const selects = form.querySelectorAll('select');
    const areas = form.querySelectorAll('textarea');
    inputs.forEach(input => {
        if (input_type_fc(input))
            input.classList.add('form-control-unline');
    });
    selects.forEach(select => {
        select.classList.add('form-control-unline');
    });
    areas.forEach(textarea => {
        textarea.classList.add('form-control-unline');
    });
}
function intToPixel(number = '0') {
    number = number.toString();
    if (parseInt(number) === 0)
        return '0';
    return !isNaN(parseInt(number)) ? number + 'px' : number;
}
//# sourceMappingURL=styles.js.map