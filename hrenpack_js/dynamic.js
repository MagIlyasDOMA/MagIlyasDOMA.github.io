function togglePassword(passwordInput) {
    const passwordType = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', passwordType);
}