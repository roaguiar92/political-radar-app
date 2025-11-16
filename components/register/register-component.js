import { FormGeneric } from '../form/form-component.js';
import { Input } from '../ui/input-component.js';
import { injectSpinnerCss } from '../ui/spinner-component.js';
import { createErrorDiv } from '../utils/form-utils.js';
import { isStrongPassword } from '../utils/validators/input-password-type.js';
import { showToast } from '../ui/toast-component.js';
import { register } from '../../api/services/auth/auth-service.js';
import { RegisterSuccess } from './confirm-register.js';

const LOGIN_REQUIRED_MSG = 'Login é obrigatório';
const PASSWORD_REQUIRED_MSG = 'Senha é obrigatória';
const CONFIRM_PASSWORD_REQUIRED_MSG = 'Confirme sua senha';
const PASSWORDS_NOT_MATCH_MSG = 'As senhas não coincidem';
const PASSWORD_WEAK_MSG = 'A senha deve ter pelo menos 8 caracteres, uma maiúscula, um número e um caractere especial (!@#$%).';

function createLogo() {
    const logo = document.createElement('img');
    logo.src = 'assets/login/logo-radar.svg';
    logo.alt = 'Logo Radar';
    return logo;
}

function createBackToLoginSection() {
    const section = document.createElement('section');
    section.className = 'login_section-signup';
    section.innerHTML = 'Já tem conta? <a href="#">Voltar ao login</a>';
    section.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = '/';
    });
    return section;
}

function setupPasswordToggle(inputContainer) {
    const inputField = inputContainer.querySelector('input');
    const eyeBtn = inputContainer.querySelector('.icon-right');
    if (!eyeBtn) return;
    eyeBtn.addEventListener('click', () => {
        const isVisible = inputField.type === 'text';
        inputField.type = isVisible ? 'password' : 'text';
        eyeBtn.textContent = isVisible ? 'visibility_off' : 'visibility';
    });
}

function validateLogin(loginEl, loginError) {
    if (!loginEl.value) {
        loginError.style.display = 'block';
        loginEl.classList.add('input-error');
        return false;
    }
    loginError.style.display = 'none';
    loginEl.classList.remove('input-error');
    return true;
}

function validatePassword(passwordEl, passwordError, passwordWeakError) {
    if (!passwordEl.value) {
        passwordError.style.display = 'block';
        passwordEl.classList.add('input-error');
        passwordWeakError.style.display = 'none';
        return false;
    }
    passwordError.style.display = 'none';
    passwordEl.classList.remove('input-error');
    if (!isStrongPassword(passwordEl.value)) {
        passwordWeakError.style.display = 'block';
        passwordEl.classList.add('input-error');
        return false;
    }
    passwordWeakError.style.display = 'none';
    passwordEl.classList.remove('input-error');
    return true;
}

function validateConfirmPassword(passwordEl, confirmPasswordEl, confirmPasswordError, passwordsNotMatchError) {
    if (!confirmPasswordEl.value) {
        confirmPasswordError.style.display = 'block';
        confirmPasswordEl.classList.add('input-error');
        passwordsNotMatchError.style.display = 'none';
        return false;
    }
    confirmPasswordError.style.display = 'none';
    confirmPasswordEl.classList.remove('input-error');
    if (passwordEl.value !== confirmPasswordEl.value) {
        passwordsNotMatchError.style.display = 'block';
        confirmPasswordEl.classList.add('input-error');
        return false;
    }
    passwordsNotMatchError.style.display = 'none';
    confirmPasswordEl.classList.remove('input-error');
    return true;
}

function handleSubmit({
    loginInput,
    passwordInput,
    confirmPasswordInput,
    loginError,
    passwordError,
    confirmPasswordError,
    passwordWeakError,
    passwordsNotMatchError
}) {
    return async (e) => {
        e.preventDefault();

        const loginEl = loginInput.querySelector('input');
        const passwordEl = passwordInput.querySelector('input');
        const confirmPasswordEl = confirmPasswordInput.querySelector('input');

        const isLoginValid = validateLogin(loginEl, loginError);
        const isPasswordValid = validatePassword(passwordEl, passwordError, passwordWeakError);
        const isConfirmPasswordValid = validateConfirmPassword(passwordEl, confirmPasswordEl, confirmPasswordError, passwordsNotMatchError);

        if (!isLoginValid || !isPasswordValid || !isConfirmPasswordValid) return;

        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = `<span class="spinner"></span>Cadastrando...`;
        submitBtn.disabled = true;

        try {
            await register(loginEl.value, passwordEl.value);
            const contentDiv = document.getElementById('content');
            contentDiv.innerHTML = '';
            contentDiv.appendChild(RegisterSuccess(loginEl.value));
        } catch (error) {
            showToast(error.message || 'Erro ao cadastrar', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }

    };
}

export function RegisterForm() {
    injectSpinnerCss();

    const loginInput = Input({
        id: 'register-login-input',
        type: 'text',
        placeholder: 'Digite seu login',
        label: 'Login',
        iconLeft: 'person',
        required: true
    });

    const passwordInput = Input({
        id: 'register-password-input',
        type: 'password',
        placeholder: 'Digite sua senha',
        label: 'Senha',
        iconRight: 'visibility_off',
        required: true
    });

    const confirmPasswordInput = Input({
        id: 'register-confirm-password-input',
        type: 'password',
        placeholder: 'Confirme sua senha',
        label: 'Confirmar senha',
        iconRight: 'visibility_off',
        required: true
    });

    setupPasswordToggle(passwordInput);
    setupPasswordToggle(confirmPasswordInput);

    const loginError = createErrorDiv(LOGIN_REQUIRED_MSG);
    const passwordError = createErrorDiv(PASSWORD_REQUIRED_MSG);
    const confirmPasswordError = createErrorDiv(CONFIRM_PASSWORD_REQUIRED_MSG);
    const passwordsNotMatchError = createErrorDiv(PASSWORDS_NOT_MATCH_MSG);
    const passwordWeakError = createErrorDiv(PASSWORD_WEAK_MSG);

    const fields = [
        { input: loginInput, errorDiv: loginError, required: true },
        { input: passwordInput, errorDiv: passwordError, extraErrorDiv: passwordWeakError, required: true },
        { input: confirmPasswordInput, errorDiv: confirmPasswordError, extraErrorDiv: passwordsNotMatchError, required: true }
    ];

    const back = createBackToLoginSection();
    const logo = createLogo();

    return FormGeneric({
        title: 'Criar nova conta',
        fields,
        onSubmit: handleSubmit({
            loginInput,
            passwordInput,
            confirmPasswordInput,
            loginError,
            passwordError,
            confirmPasswordError,
            passwordWeakError,
            passwordsNotMatchError
        }),
        submitText: 'Cadastrar',
        extraContent: back,
        logo
    });
}