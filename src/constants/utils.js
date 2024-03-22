
export function validateFields(username, email, phone, password) {
    if (!username || !email || !phone || !password) {
        throw new Error('Todos los campos son obligatorios');
    }

    const usernameRegex = /^[a-zA-Z0-9_]{7,255}$/;
    if (!usernameRegex.test(username)) {
        throw new Error('El nombre de usuario debe contener solo letras, números y guiones bajos, y tener entre 7 y 255 caracteres');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error('Ingrese un correo electrónico válido');
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
        throw new Error('Ingrese un número telefónico válido de 10 dígitos');
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
        throw new Error('La contraseña debe contener al menos 8 caracteres, incluyendo al menos una letra y un número');
    }

    return {
        user: username,
        email,
        phone,
        password,
    }
}

