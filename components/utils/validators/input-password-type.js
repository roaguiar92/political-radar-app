export function isStrongPassword(password) {
    // Pelo menos 8 caracteres, 1 maiúscula, 1 minúscula, 1 número, 1 especial
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%]).{8,}$/;
    return regex.test(password);
}