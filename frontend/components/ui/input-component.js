export function Input({ id, type = "text", placeholder = "", label = "", iconLeft = null, iconRight = null, ...props }) {
    const container = document.createElement('div');
    container.className = 'input-icon-container';

    if (label) {
        const labelEl = document.createElement('label');
        labelEl.setAttribute('for', id);
        labelEl.textContent = label;
        container.appendChild(labelEl);
    }

    if (iconLeft) {
        const spanLeft = document.createElement('span');
        spanLeft.className = 'material-symbols-outlined icon-left';
        spanLeft.textContent = iconLeft;
        container.appendChild(spanLeft);
    }

    const input = document.createElement('input');
    input.id = id;
    input.type = type;
    input.placeholder = placeholder;
    Object.entries(props).forEach(([key, value]) => input.setAttribute(key, value));
    container.appendChild(input);

    if (iconRight) {
        const btnRight = document.createElement('button');
        btnRight.type = 'button';
        btnRight.className = 'material-symbols-outlined icon-right';
        btnRight.setAttribute('aria-label', 'Mostrar senha');
        btnRight.textContent = iconRight;
        container.appendChild(btnRight);
    }

    return container;
}