//plantilla de detalle producto 

function detalleProducto(){

    const detallesProducto = `

    <div class="container mt-5">
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
        `;
 return detallesProducto;
}