"use strict";
function button_submit(parent) {
    const buttons = parent.querySelectorAll('button');
    let submit = null;
    buttons.forEach(button => {
        if (button.type === 'submit')
            submit = button;
    });
    return submit;
}
//# sourceMappingURL=get_element_types.js.map