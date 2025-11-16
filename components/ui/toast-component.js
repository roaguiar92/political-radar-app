const TOAST_CSS_PATH = 'components/ui/toast.css';
const TOAST_ID = 'global-toast';
const TOAST_DEFAULT_TYPE = 'success';
const TOAST_DEFAULT_DURATION = 3500;

function getOrCreateToastElement() {
    let toast = document.getElementById(TOAST_ID);
    if (toast) return toast;
    toast = document.createElement('div');
    toast.id = TOAST_ID;
    document.body.appendChild(toast);
    return toast;
}

function clearToastTimeout(timeoutId) {
    if (timeoutId) clearTimeout(timeoutId);
}

export function injectToastCss() {
    if (!document.querySelector(`link[href="${TOAST_CSS_PATH}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = TOAST_CSS_PATH;
        document.head.appendChild(link);
    }
}

let toastTimeoutId = null;

export function showToast(message, type = TOAST_DEFAULT_TYPE, duration = TOAST_DEFAULT_DURATION) {
    injectToastCss();
    if (!message) return;

    const toast = getOrCreateToastElement();
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <span class="toast-message">${message}</span>
        <button class="toast-close" aria-label="Fechar">&times;</button>
    `;
    toast.style.display = 'flex';

    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.onclick = () => {
        toast.style.display = 'none';
        clearToastTimeout(toastTimeoutId);
    };

    clearToastTimeout(toastTimeoutId);
    toastTimeoutId = setTimeout(() => {
        toast.style.display = 'none';
    }, duration);
}