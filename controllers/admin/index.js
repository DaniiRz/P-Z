// Valores definidos para realizar el inicio de sesión
var correoPredefinido = "admin@ricaldone.edu.sv";
var contrasenaPredefinida = "Rical_2024";

function validarInicios() {
    var correo = document.getElementById('correo').value;
    var contrasena = document.getElementById('contrasena').value;

    // Verificar que los campos no estén vacíos y si lo están, enviar una advertencia
    if (correo.trim() === '') {
        Swal.fire({
            icon: 'warning',
            text: 'Por favor, ingrese su correo electrónico.'
        });
        return;
    }
    if (contrasena.trim() === '') {
        Swal.fire({
            icon: 'warning',
            text: 'Por favor, ingrese su contraseña.'
        });
        return;
    }

    // Verificar que la sintaxis del correo sea correcta
    var correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoRegex.test(correo)) {
        Swal.fire({
            icon: 'error',
            text: 'Por favor, ingrese un correo electrónico válido.'
        });
        return;
    }

    // Verificar si el correo electrónico y la contraseña coinciden con los predefinidos
    if (correo !== correoPredefinido || contrasena !== contrasenaPredefinida) {
        Swal.fire({
            icon: 'error',
            text: 'Correo electrónico o contraseña incorrectos.'
        });
        return;
    }

    Swal.fire({
        icon: 'success',
        text: 'Inicio de sesión exitoso. ¡Bienvenido!'
    });

    // Redireccionar a otra página después de 2 segundos
    setTimeout(function() {
        window.location.href = "../admin/inicio_admin.html";
    }, 1000);
}
