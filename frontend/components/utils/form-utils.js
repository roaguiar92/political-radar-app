const ERROR_STYLE = 'color:red;font-size:0.9em;display:none';
const DEFAULT_TRIM = true;

export function createErrorDiv(message) {
    const div = document.createElement('div');
    div.style.cssText = ERROR_STYLE;
    div.textContent = message;
    return div;
}

export function getInputValue(inputContainer, trim = DEFAULT_TRIM) {
    const input = inputContainer.querySelector('input');
    if (!input) return '';
    return trim ? input.value.trim() : input.value;
}

function isFieldValid({ input, errorDiv, required }) {
    const value = getInputValue(input);
    const valid = !required || Boolean(value);
    errorDiv.style.display = valid ? 'none' : 'block';
    if (input) {
        const inputEl = input.querySelector('input');
        if (inputEl) {
            inputEl.classList.toggle('input-error', !valid);
        }
    }
    return valid;
}

export function validateFields(fields) {
    return fields.map(isFieldValid).every(Boolean);
}

export function handleFormSubmit(fields, onSuccess) {
    return (event) => {
        event.preventDefault();
        if (!validateFields(fields)) return;
        try {
            onSuccess();
        } catch (error) {
            console.error(error);
        }
    };
}