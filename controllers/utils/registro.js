document.getElementById('btnRegistrarme').addEventListener('click', function(event) {
    // Detener el envío del formulario por defecto
    event.preventDefault();

    // Obtener los valores de los campos de entrada
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var dui = document.getElementById('dui').value;
    var direccion = document.getElementById('direccion').value;
    var correo = document.getElementById('correo').value;
    var contrasena = document.getElementById('contrasena').value;

    // Validar campos requeridos
    if (nombre.trim() === '' || apellido.trim() === '' || dui.trim() === '' || direccion.trim() === '' || correo.trim() === '' || contrasena.trim() === '') {
        // Mostrar mensaje de error o realizar alguna acción
        alert('Por favor completa todos los campos.');
        return;
    }

    // Validar formato de DUI
    var duiPattern = /^[0-9]{8}-[0-9]{1}$/;
    if (!duiPattern.test(dui)) {
        // Mostrar mensaje de error o realizar alguna acción
        alert('Por favor ingresa un DUI válido (########-#).');
        return;
    }

    // Validar formato de correo electrónico
    var emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    if (!emailPattern.test(correo)) {
        // Mostrar mensaje de error o realizar alguna acción
        alert('Por favor ingresa un correo electrónico válido.');
        return;
    }

    // Validar longitud mínima de contraseña
    if (contrasena.length < 8) {
        // Mostrar mensaje de error o realizar alguna acción
        alert('La contraseña debe tener al menos 8 caracteres.');
        return;
    }

    // Si todas las validaciones pasan, enviar los datos
    document.getElementById('formulario1', 'formulario2').submit();
});