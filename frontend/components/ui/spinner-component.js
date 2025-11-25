const SPINNER_CSS_PATH = 'components/ui/spinner.css';

function isSpinnerCssInjected() {
    return Boolean(document.querySelector(`link[href="${SPINNER_CSS_PATH}"]`));
}

function createSpinnerCssLink() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = SPINNER_CSS_PATH;
    return link;
}

export function injectSpinnerCss() {
    if (isSpinnerCssInjected()) return;
    document.head.appendChild(createSpinnerCssLink());
}