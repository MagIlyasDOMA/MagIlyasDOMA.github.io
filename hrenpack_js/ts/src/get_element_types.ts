function button_submit(parent: Element): HTMLButtonElement | null {
    const buttons = parent.querySelectorAll('button');
    let submit: HTMLButtonElement | null = null;

    buttons.forEach(button => {
        if (button.type === 'submit')
            submit = button as HTMLButtonElement;
    });
    return submit;
}