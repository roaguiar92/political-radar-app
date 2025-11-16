export function Button({ text, className = '', type = 'button', icon = null, ...props }) {
    const button = document.createElement('button');
    button.type = type;
    button.className = className;
    button.textContent = text;

    if (icon) {
        const img = document.createElement('img');
        img.src = icon.src;
        img.alt = icon.alt || '';
        img.className = icon.className || '';
        button.prepend(img);
    }

    Object.entries(props).forEach(([key, value]) => button.setAttribute(key, value));
    return button;
}