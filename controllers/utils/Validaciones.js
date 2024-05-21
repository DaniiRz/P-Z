// Codigo de validacion campo telefonico
function formatPhoneNumber(input) {

    // Obtener el valor actual del campo de entrada
    let phoneNumber = input.value;

    // Eliminar cualquier guion existente
    phoneNumber = phoneNumber.replace(/-/g, '');

    // Validar que solo se permitan números y el formato XXXX-XXXX
    let regex = /^[0-9]{4}-?[0-9]{4}$/;
    if (!regex.test(phoneNumber)) {

        // Mostrar mensaje de error
        input.classList.add("is-invalid");
    }

    // En caso de pasar el test del formato
    else {
        input.setCustomValidity("");
        input.classList.remove("is-invalid");
    }

    // Agregar el guion después del cuarto dígito si no se ha agregado anteriormente
    if (phoneNumber.length >= 5 && phoneNumber.charAt(4) !== '-') {
        phoneNumber = phoneNumber.slice(0, 4) + '-' + phoneNumber.slice(4);
    }

    // Establecer el valor formateado en el campo de entrada
    input.value = phoneNumber;

    // Limitar la cantidad máxima de caracteres a 9
    if (phoneNumber.length >= 9) {
        input.value = phoneNumber.slice(0, 9);
        input.setAttribute("maxlength", "9");
    }

    else {
        input.removeAttribute("maxlength");
    }
}

// Codigo de validacion de campo email
function formatEmail(input) {

    // Obtener el valor actual del campo de entrada
    let Email = input.value;

    // Validar formato de correo electrónico ABC@gmail.com
    let emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    if (!emailPattern.test(Email)) {

        // Mostrar mensaje de error
        input.classList.add("is-invalid");
    }

    // En caso de pasar el test del formato
    else {
        input.setCustomValidity("");
        input.classList.remove("is-invalid");
    }

    // Establecer el valor formateado en el campo de entrada
    input.value = Email;
}

// Codigo de validacion de campo de contraseña
function formatPassword(input) {

    // Obtener el valor actual del campo de entrada
    let Contraseña = input.value;

    // Validar longitud mínima de contraseña
    if (Contraseña.length < 8) {

        // Mostrar mensaje de error
        input.classList.add("is-invalid");
    }

    // En caso de pasar el test del formato
    else {
        input.setCustomValidity("");
        input.classList.remove("is-invalid");
    }

    // Establecer el valor formateado en el campo de entrada
    input.value = Contraseña;
}

// Codigo de validacion de campo de Dui
function formatDui(input) {

    // Obtener el valor actual del campo de entrada
    let Dui = input.value;

    // Agregar el guion después del cuarto dígito si no se ha agregado anteriormente
    if (Dui.length >= 9 && Dui.charAt(8) !== '-') {
        Dui = Dui.slice(0, 8) + '-' + Dui.slice(8);
    }

    // Establecer el formato de tipo Dui
    let duiPattern = /^\d{8}-\d$/;
    if (!duiPattern.test(Dui)) {

        // Mostrar mensaje de error
        input.classList.add("is-invalid");
    }

    // En caso de pasar el test del formato
    else {
        input.setCustomValidity("");
        input.classList.remove("is-invalid");
    }

    // Establecer el valor formateado en el campo de entrada
    input.value = Dui;

    // Limitar la cantidad máxima de caracteres a 9
    if (Dui.length >= 10) {
        input.value = Dui.slice(0, 10);
        input.setAttribute("maxlength", "10");
    }

    else {
        input.removeAttribute("maxlength");
    }
}

// Codigo de validacion de campo alfabetico
function formatAlphabetic(input) {

    // Obtener el valor actual del campo de entrada
    let Text = input.value

    // Establecer el formato del texto
    let TextPattern = /^[a-zA-ZñÑáÁéÉíÍóÓúÚ\s]+$/;
    if (!TextPattern.test(Text)) {

        // Mostrar mensaje de error
        input.classList.add("is-invalid");
    }

    // En caso de pasar el test del formato
    else {
        input.setCustomValidity("");
        input.classList.remove("is-invalid");
    }

    // Establecer el valor formateado en el campo de entrada
    input.value = Text;
}

// Lógica para validar el formulario y habilitar el botón de submit
(() => {
    'use strict'

    // Obtener todos los formularios con la clase 'needs-validation'
    const forms = document.querySelectorAll('.needs-validation');

    // Iterar sobre cada formulario
    forms.forEach(form => {

        // Obtener el botón de submit dentro del formulario
        const submitButton = form.querySelector('button[type="submit"]');

        // Desactivar el botón de submit por defecto
        submitButton.disabled = true;

        // Agregar evento de 'input' a cada campo de entrada para verificar si el botón debe estar activo
        form.addEventListener('input', () => {

            // Obtener todos los campos de entrada dentro del formulario actual
            const inputs = form.querySelectorAll('input');

            // Variable para controlar si todos los campos están llenos y en un formato correcto
            let allFieldsValid = true;

            // Iterar sobre cada campo de entrada y verificar si está lleno y en un formato correcto
            inputs.forEach(input => {
                if (input.value.trim() === '' || input.classList.contains('is-invalid')) {
                    allFieldsValid = false;
                }
            });

            // Habilitar o deshabilitar el botón de submit según si todos los campos están llenos y en un formato correcto
            submitButton.disabled = !allFieldsValid;
        });

        // Agregar el evento de 'submit' a cada formulario
        form.addEventListener('submit', event => {
            // Detener el envío del formulario por defecto
            event.preventDefault();

            // Obtener todos los campos de entrada dentro del formulario actual
            const inputs = form.querySelectorAll('input');

            // Iterar sobre cada campo de entrada y realizar la validación
            inputs.forEach(input => {
                if (input.id === 'telefono') {
                    formatPhoneNumber(input);
                }

                else if (input.id === 'email') {
                    formatEmail(input);
                }

                else if (input.id === 'contraseña') {
                    formatPassword(input);
                }

                else if (input.id === 'dui') {
                    formatDui(input);
                }

                else if (input.id === 'nombre') {
                    formatAlphabetic(input);
                }

                else if (input.id === 'apellido') {
                    formatAlphabetic(input);
                }

                else if (input.id === 'direccion') {
                    formatAlphabetic(input);
                }

                else {

                    // Agregar la clase 'was-validated' al formulario
                    form.classList.add('was-validated');
                    form.submit();
                }
            });
        });
    });
})();