
// Función para cambiar los estilos del switch dependiendo de su estado
function toggleSwitchColor(checkbox) {
    if (checkbox.checked) {
        checkbox.parentElement.classList.remove('switch-red');
        checkbox.parentElement.classList.add('switch-green');
        checkbox.nextElementSibling.textContent = 'Conectado';
    } else {
        checkbox.parentElement.classList.remove('switch-green');
        checkbox.parentElement.classList.add('switch-red');
        checkbox.nextElementSibling.textContent = 'Desconectado';
    }
}
