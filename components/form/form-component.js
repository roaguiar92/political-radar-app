import { Button } from "../ui/button-component.js";

export function FormGeneric({ title, fields, onSubmit, submitText, extraContent, logo }) {
    const section = document.createElement('section');
    section.className = 'card-section_login';

    if (logo) {
        section.appendChild(logo);
    }

    if (title) {
        const h2 = document.createElement('h2');
        h2.textContent = title;
        section.appendChild(h2);
    }

    const form = document.createElement('form');
    form.noValidate = true;

    fields.forEach(({ input, errorDiv, extraErrorDiv }) => {
        form.appendChild(input);
        if (errorDiv) form.appendChild(errorDiv);
        if (extraErrorDiv) form.appendChild(extraErrorDiv);
    });

    const submitBtn = Button({ text: submitText, className: 'login-separator_button-primary', type: 'submit' });
    form.appendChild(submitBtn);

    form.addEventListener('submit', onSubmit);

    section.appendChild(form);

    if (extraContent) {
        section.appendChild(extraContent);
    }

    return section;
}