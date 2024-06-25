// Este evento se dispara cuando el contenido HTML ha sido completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    
    // Obtiene el elemento con el ID "detallesProducto"
    const detalle = document.getElementById("detallesProducto");
    
    // Llama a la función detalleProducto() y coloca su resultado dentro del elemento detalle
    detalle.innerHTML = detalleProducto();
});