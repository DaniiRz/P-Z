// Variable para contar los clics
var contadorClics = 0;
 
// Función para redireccionar al hacer clic en el botón
function redireccionar() {
    contadorClics++; // Incrementar el contador de clics
    
    if (contadorClics === 1) {
        mostrarPaginaCarga(); // Mostrar la página de carga
        
        // Simular un retraso de 1 segundo antes de redireccionar
        setTimeout(function() {
            window.location.href = "index.html"; // Redireccionar a la página principal
        }, 1000); // se mostrara durante un segundo 
    }
}
 
// Función para mostrar la página de carga
function mostrarPaginaCarga() {
    console.log("Mostrando página de carga...");
}
 
// Asociar la función redireccionar al evento clic del botón
document.getElementById("btn").addEventListener("click", redireccionar);