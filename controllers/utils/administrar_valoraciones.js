
// Función para cambiar los estilos del switch dependiendo de su estado
function toggleSwitchColorStatus(checkbox) {
    if (checkbox.checked) {
        checkbox.parentElement.classList.remove('switch-red');
        checkbox.parentElement.classList.add('switch-green');
        checkbox.nextElementSibling.textContent = 'Deshabilitar';
    } else {
        checkbox.parentElement.classList.remove('switch-green');
        checkbox.parentElement.classList.add('switch-red');
        checkbox.nextElementSibling.textContent = 'Habilitar';
    }
}
// Obtener el switch inicial y llamar a la función para establecer su estado y estilos