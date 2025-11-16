import { FormGeneric } from './form/form-component.js';
import { Button } from './ui/button-component.js';
import { Input } from './ui/input-component.js';
import { injectSpinnerCss } from './ui/spinner-component.js';
import { showToast } from './ui/toast-component.js';
import { createErrorDiv } from './utils/form-utils.js';

const EMAIL_REQUIRED_MSG = 'Email é obrigatório';
const PASSWORD_REQUIRED_MSG = 'Senha é obrigatória';
const LOGIN_SUCCESS_MSG = 'login realizado com sucesso';
const LOADING_TIME_MS = 100;

function createLogo() {
    const logo = document.createElement('img');
    logo.src = 'assets/login/logo-radar.svg';
    logo.alt = 'Logo Radar';
    return logo;
}

function setupPasswordToggle(passwordInput) {
    const passwordInputField = passwordInput.querySelector('input');
    const eyeBtn = passwordInput.querySelector('.icon-right');
    if (!eyeBtn) return;
    eyeBtn.addEventListener('click', () => {
        const isVisible = passwordInputField.type === 'text';
        passwordInputField.type = isVisible ? 'password' : 'text';
        eyeBtn.textContent = isVisible ? 'visibility_off' : 'visibility';
    });
}

function validateField(inputEl, errorDiv, errorMsg) {
    if (!inputEl.value) {
        errorDiv.style.display = 'block';
        inputEl.classList.add('input-error');
        errorDiv.textContent = errorMsg;
        return false;
    }
    errorDiv.style.display = 'none';
    inputEl.classList.remove('input-error');
    return true;
}

function handleLoginSubmit({ emailInput, passwordInput, emailError, passwordError }) {
    return (e) => {
        e.preventDefault();
        const emailEl = emailInput.querySelector('input');
        const passwordEl = passwordInput.querySelector('input');

        const isEmailValid = validateField(emailEl, emailError, EMAIL_REQUIRED_MSG);
        const isPasswordValid = validateField(passwordEl, passwordError, PASSWORD_REQUIRED_MSG);

        if (!isEmailValid || !isPasswordValid) return;

        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = `<span class="spinner"></span>Entrando...`;
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            showToast(LOGIN_SUCCESS_MSG, 'success');
        }, LOADING_TIME_MS);
    };
}

function createOptionsSection() {
    const options = document.createElement('section');
    options.className = 'card-section_options';
    options.innerHTML = `
        <label class="card_section_item">
            <input type="checkbox" name="lembrar" />
            Lembrar de mim
        </label>
    `;
    const forgotBtn = Button({ text: 'Esqueceu sua senha?', className: 'forgot-btn' });
    forgotBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = '/forgot-password';
    });
    options.appendChild(forgotBtn);
    return options;
}

function createSeparatorSection() {
    const separator = document.createElement('section');
    separator.className = 'login-separator';
    const divSeparator = document.createElement('div');
    divSeparator.className = 'separator';
    divSeparator.textContent = 'ou';
    separator.appendChild(divSeparator);
    separator.appendChild(Button({
        text: 'Continue com Google',
        className: 'login-separator_button-secondary',
        icon: { src: './assets/login/google-signin.svg', alt: 'Google', className: 'google-icon' }
    }));
    return separator;
}

function createSignupSection() {
    const signup = document.createElement('section');
    signup.className = 'login_section-signup';
    signup.innerHTML = 'Ainda não tem conta? <a href="#">Cadastre-se</a>';
    signup.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = '/cadastro';
    });
    return signup;
}

export function LoginForm() {
    injectSpinnerCss();

    const emailInput = Input({
        id: 'login-input',
        type: 'email',
        placeholder: 'Digite seu email',
        label: 'Email',
        iconLeft: 'mail',
        required: true
    });

    const passwordInput = Input({
        id: 'senha-input',
        type: 'password',
        placeholder: 'Digite sua senha',
        label: 'Senha',
        iconRight: 'visibility_off',
        required: true
    });

    setupPasswordToggle(passwordInput);

    const emailError = createErrorDiv(EMAIL_REQUIRED_MSG);
    const passwordError = createErrorDiv(PASSWORD_REQUIRED_MSG);

    const fields = [
        { input: emailInput, errorDiv: emailError },
        { input: passwordInput, errorDiv: passwordError }
    ];

    const extraContent = document.createElement('div');
    extraContent.appendChild(createOptionsSection());
    extraContent.appendChild(createSeparatorSection());
    extraContent.appendChild(createSignupSection());

    return FormGeneric({
        title: 'Fazer login',
        fields,
        onSubmit: handleLoginSubmit({
            emailInput,
            passwordInput,
            emailError,
            passwordError
        }),
        submitText: 'Entrar',
        extraContent,
        logo: createLogo()
    });
}