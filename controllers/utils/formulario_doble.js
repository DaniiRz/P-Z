document.getElementById('cambiarPestana').addEventListener('click', function () {

    // Cambiar la clase activa del botón
    document.getElementById('formulario2-tab').classList.add('active');
    document.getElementById('formulario1-tab').classList.remove('active');

    // Cambiar la clase activa del contenido de la pestaña
    document.getElementById('formulario2').classList.add('active');
    document.getElementById('formulario1').classList.remove('active');
});

document.getElementById('retrocederPestana').addEventListener('click', function () {
    
    // Cambiar la clase activa del botón
    document.getElementById('formulario1-tab').classList.add('active');
    document.getElementById('formulario2-tab').classList.remove('active');

    // Cambiar la clase activa del contenido de la pestaña
    document.getElementById('formulario1').classList.add('active');
    document.getElementById('formulario2').classList.remove('active');
});  