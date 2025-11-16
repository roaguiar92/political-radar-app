import { Button } from './ui/button-component.js';
import { Input } from './ui/input-component.js';
import { injectSpinnerCss } from './ui/spinner-component.js';
import { createErrorDiv } from './utils/form-utils.js';
import { showToast } from './ui/toast-component.js';
import { FormGeneric } from './form/form-component.js';

const EMAIL_REQUIRED_MSG = 'Email de recuperação é obrigatório';
const SEND_DELAY_MS = 100;

function createLogo() {
    const logo = document.createElement('img');
    logo.src = 'assets/login/logo-radar.svg';
    logo.alt = 'Logo Radar';
    return logo;
}

function createBackSection(text, linkText, onClick) {
    const section = document.createElement('section');
    section.className = 'login_section-signup';
    section.innerHTML = `${text} <a href="#">${linkText}</a>`;
    section.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        onClick();
    });
    return section;
}

function renderSuccess(section) {
    section.innerHTML = '';
    section.appendChild(createLogo());

    const title = document.createElement('h2');
    title.textContent = 'Verifique seu e-mail!';
    title.style.textAlign = "center";
    section.appendChild(title);

    const msg = document.createElement('p');
    msg.textContent = 'Enviamos um link de redefinição para o seu endereço de e-mail. Se não o encontrar, verifique a pasta de spam.';
    msg.style.margin = '1.5rem 0';
    msg.style.textAlign = 'center';
    msg.style.fontSize = "16px";
    section.appendChild(msg);

    const backBtn = Button({
        text: 'Voltar para o login',
        className: 'login-separator_button-primary',
        type: 'button'
    });
    backBtn.style.marginTop = '2.5rem';
    backBtn.addEventListener('click', () => {
        window.location.hash = '/';
    });
    section.appendChild(backBtn);

    showToast('E-mail de recuperação enviado!', 'success');
}

function handleSubmit(emailInput, emailError, section) {
    return (e) => {
        e.preventDefault();
        const emailEl = emailInput.querySelector('input');
        if (!emailEl.value) {
            emailError.style.display = 'block';
            emailEl.classList.add('input-error');
            return;
        }
        emailError.style.display = 'none';
        emailEl.classList.remove('input-error');

        const submitBtn = e.target.querySelector('button[type="submit"]');
        submitBtn.innerHTML = `<span class="spinner"></span>Enviando...`;
        submitBtn.disabled = true;
        setTimeout(() => {
            renderSuccess(section);
        }, SEND_DELAY_MS);
    };
}

export function ForgotPasswordForm() {
    injectSpinnerCss();
    const section = document.createElement('section');
    section.className = 'card-section_login';

    function renderForm() {
        const emailInput = Input({
            id: 'forgot-email-input',
            type: 'email',
            placeholder: 'Digite seu email de recuperação',
            label: 'Email',
            iconLeft: 'mail',
            required: true
        });
        const emailError = createErrorDiv(EMAIL_REQUIRED_MSG);

        const fields = [
            { input: emailInput, errorDiv: emailError }
        ];

        const back = createBackSection('Lembrou a senha?', 'Voltar ao login', () => {
            window.location.hash = '/';
        });

        section.innerHTML = '';
        section.appendChild(FormGeneric({
            title: 'Recuperar senha',
            fields,
            onSubmit: handleSubmit(emailInput, emailError, section),
            submitText: 'Recuperar senha',
            extraContent: back,
            logo: createLogo()
        }));
    }

    renderForm();
    return section;
}