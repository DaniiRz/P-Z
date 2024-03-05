function validarInicio() {
    var correo = document.getElementById('floatingInput').value;
    var contraseña = document.getElementById('floatingPassword').value;
    var expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var expresionContraseña = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
    if (correo.trim() === '' || !expresionCorreo.test(correo)) {
        alert('Ingrese un correo electrónico válido');
        return false;
    }
    if (contraseña.trim() === '' || !expresionContraseña.test(contraseña)) {
        alert('La contraseña debe contener al menos 8 caracteres, incluyendo letras y números');
        return false;
    }
    // Aquí puedes redirigir a la siguiente página
    window.location.href = '../admin/index.html';
    return true; // Permitir el inicio de sesión
}