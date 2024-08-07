
document.getElementById('commentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    // Capturar los datos del formulario
    const correoUsuario = document.getElementById('correoUsuario').value;
    const comentarioUsuario = document.getElementById('comentarioUsuario').value;

    // Crear un nuevo comentario y agregarlo a la sección de comentarios
    addComment(correoUsuario, comentarioUsuario);

    // Limpiar el formulario
    document.getElementById('commentForm').reset();
});

function addComment(correo, comentario) {
    // Obtener la sección donde se mostrarán los comentarios
    const commentsSection = document.getElementById('commentsSection');

    // Crear un nuevo div para el comentario
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment mt-3';
    commentDiv.innerHTML = `
        <div class="comment-header">
            <strong>${correo}</strong> <em>${new Date().toLocaleString()}</em>
        </div>
        <div class="comment-body">
            <p>${comentario}</p>
        </div>
        <hr>
    `;

    // Agregar el nuevo comentario al final de la sección de comentarios
    commentsSection.appendChild(commentDiv);
}
