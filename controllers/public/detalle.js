function cambiarCantidad(cambio) {
    var cantidadElemento = document.getElementById('cantidad');
    var cantidadActual = parseInt(cantidadElemento.value);
    var nuevaCantidad = cantidadActual + cambio;

    if (nuevaCantidad >= 1) {
        cantidadElemento.value = nuevaCantidad;
    }
}