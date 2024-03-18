//plantilla de detalle producto 

function detalleProducto() {

    const detallesProducto = `

    <div class="container mt-5 pt-5">
    <div class="row">
        <!-- Imagen del Producto (Lado Derecho) -->
        <div class="col-md-6">
            <img src="../../resources/img/image 41.png" class="rounded mx-auto d-block img-fluid"
                alt="Imagen del Producto">
        </div>

        <!-- Detalles del Producto (Lado Izquierdo) -->
        <div class="col-md-6">
            <h4>Pantalones Baggy</h4>
            <br>
            <p><strong>Colores Disponibles:</strong> Azul, Rojo, Verde</p>
            <p><strong>Tallas Disponibles:</strong> S, M, L, XL</p>
            <p><strong>Precio:</strong> $5.50</p>
            <button type="button" class="btn btn-outline-info" data-toggle="modal"
                data-target="#formularioModal">Agregar al carrito</button>
        </div>
    </div>
</div>

<section class="comments-section mt-4">
    <div class="container">
        <h2 class="section-title d-flex justify-content-center align-items-center">Comentarios de clientes</h2>
        <div class="row">
            <div class="col-md-6 offset-md-3 mt-5">
                <form>
                    <div class="form-group">
                        <label for="comment">Agrega un comentario:</label>
                        <textarea class="form-control mt-2" id="comment" rows="4"
                            placeholder="Escribe tu comentario aquí"></textarea>
                    </div>
                    <button class="button mt-3">
                        Enviar
                    </button>
                </form>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-md-6 offset-md-3">
                <div class="comment">
                    <div class="comment-user">
                        <img src="../../resources/img/user.png" alt="User Avatar" class="avatar">
                        <span class="username"> Karla Quintanilla</span>
                    </div>
                    <p class="comment-text mt-2">El producto cumplió con todas mis expectativas. Muy satisfecha con
                        mi compra.</p>
                </div>

                <!-- Agrega más comentarios aquí -->

            </div>
        </div>
    </div>
</section>

        `;
    return detallesProducto;
}