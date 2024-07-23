INSERT INTO tb_categorias (id_categoria, nombre_categoria, imagen_categoria) VALUES
(1, 'Ropa para hombres', '665f88d3950dd.png'),
(2, 'Ropa para mujeres', '665f88d3950dd.png'),
(3, 'Ropa para niños', '665f88d3950dd.png'),
(4, 'Calzado para hombres', '665f88d3950dd.png'),
(5, 'Calzado para mujeres', '665f88d3950dd.png'),
(6, 'Calzado para niños', '665f88d3950dd.png'),
(7, 'Accesorios para hombres', '665f88d3950dd.png'),
(8, 'Accesorios para mujeres', '665f88d3950dd.png');

INSERT INTO tb_colores (id_color, nombre_color) VALUES
(1, 'Azul'),
(2, 'Blanco'),
(3, 'Gris'),
(4, 'Rojo'),
(5, 'Amarillo'),
(6, 'Verde'),
(7, 'Negro'),
(8, 'Rosa'),
(9, 'Beige'),
(10, 'Marrón');

INSERT INTO tb_tallas (id_talla, numero_talla) VALUES
(1, 'S'),
(2, 'L'),
(3, 'XS'),
(4, 'M'),
(5, '28'),
(6, '30'),
(7, '32'),
(8, '5'),
(9, '6'),
(10, '7'),
(11, '8'),
(12, '9'),
(13, 'Única');

INSERT INTO tb_productos (id_producto, nombre_producto, desc_producto, fecha_registro_produc, id_categoria) VALUES
(1, 'Camisa de manga corta', 'Camisa de manga corta de algodón con estampado de rayas', NOW(), 1),
(2, 'Vestido de verano', 'Vestido de verano de poliéster con estampado floral', NOW(), 2),
(3, 'Pantalón de mezclilla', 'Pantalón de mezclilla recto', NOW(), 1),
(4, 'Zapatos deportivos', 'Zapatos deportivos de cuero sintético estilo correr', NOW(), 2),
(5, 'Blusa de manga larga', 'Blusa de manga larga de algodón con estampado de lunares', NOW(), 1),
(6, 'Shorts de playa', 'Shorts de playa de poliéster con estampado', NOW(), 2),
(7, 'Gorra de béisbol', 'Gorra de béisbol de algodón ajustable', NOW(), 3),
(8, 'Bolso de mano', 'Bolso de mano de cuero sintético estilo tote', NOW(), 4);

INSERT INTO tb_detalle_productos (id_detalle_producto, existencias, img_producto, id_color, id_talla, id_producto, precio_producto) VALUES
(1, 10, '6694cfda8a7fc.jpg', 1, 1, 1, 29.99),
(2, 15, '6694cfda8a7fc.jpg', 2, 2, 1, 29.99),
(3, 20, '6694cfda8a7fc.jpg', 3, 3, 1, 29.99),
(4, 8, '6694cfda8a7fc.jpg', 4, 4, 2, 49.99),
(5, 12, '6694cfda8a7fc.jpg', 5, 5, 2, 49.99),
(6, 18, '6694cfda8a7fc.jpg', 6, 6, 2, 49.99),
(7, 5, '6694cfda8a7fc.jpg', 7, 7, 3, 39.99),
(8, 10, '6694cfda8a7fc.jpg', 8, 8, 3, 39.99),
(9, 15, '6694cfda8a7fc.jpg', 9, 9, 3, 39.99),
(10, 20, '6694cfda8a7fc.jpg', 10, 10, 4, 59.99),
(11, 25, '6694cfda8a7fc.jpg', 1, 11, 4, 59.99),
(12, 30, '6694cfda8a7fc.jpg', 2, 12, 4, 59.99),
(13, 10, '6694cfda8a7fc.jpg', 3, 13, 5, 24.99),
(14, 15, '6694cfda8a7fc.jpg', 4, 12, 5, 24.99),
(15, 20, '6694cfda8a7fc.jpg', 5, 11, 5, 24.99),
(16, 8, '6694cfda8a7fc.jpg', 6, 10, 6, 19.99),
(17, 12, '6694cfda8a7fc.jpg', 7, 9, 6, 19.99),
(18, 18, '6694cfda8a7fc.jpg', 8, 8, 6, 19.99),
(19, 5, '6694cfda8a7fc.jpg', 9, 7, 7, 14.99),
(20, 10, '6694cfda8a7fc.jpg', 10, 6, 7, 14.99),
(21, 15, '6694cfda8a7fc.jpg', 1, 5, 7, 14.99),
(22, 20, '6694cfda8a7fc.jpg', 2, 4, 8, 39.99),
(23, 25, '6694cfda8a7fc.jpg', 3, 3, 8, 39.99),
(24, 30, '6694cfda8a7fc.jpg', 4, 2, 8, 39.99);

INSERT INTO tb_clientes (id_cliente, nombre_cliente, apellido_cliente, dui_client, telf_cliente, correo_cliente, clave_cliente, genero_cliente, estado_cliente) VALUES
(1, 'María', 'López', '001234567', '7777-1234', 'maria.lopez@email.com', 'clave123', 'Femenino', 1),
(2, 'Juan', 'Pérez', '001234568', '7777-5678', 'juan.perez@email.com', 'clave456', 'Masculino', 1),
(3, 'Ana', 'Gómez', '001234569', '7777-9101', 'ana.gomez@email.com', 'clave789', 'Femenino', 1),
(4, 'Pedro', 'Fernández', '001234570', '7777-1213', 'pedro.fernandez@email.com', 'clave012', 'Masculino', 1),
(5, 'Luis', 'Martínez', '001234571', '7777-1415', 'luis.martinez@email.com', 'clave345', 'Masculino', 1),
(6, 'Laura', 'García', '001234572', '7777-1617', 'laura.garcia@email.com', 'clave678', 'Femenino', 1),
(7, 'Carlos', 'Rodríguez', '001234573', '7777-1819', 'carlos.rodriguez@email.com', 'clave901', 'Masculino', 1),
(8, 'Sofía', 'Díaz', '001234574', '7777-2021', 'sofia.diaz@email.com', 'clave234', 'Femenino', 1),
(9, 'Javier', 'Hernández', '001234575', '7777-2223', 'javier.hernandez@email.com', 'clave567', 'Masculino', 1),
(10, 'Elena', 'Luna', '001234576', '7777-2425', 'elena.luna@email.com', 'clave890', 'Femenino', 1),
(11, 'Diego', 'Sánchez', '001234577', '7777-2627', 'diego.sanchez@email.com', 'clave123', 'Masculino', 1),
(12, 'Valeria', 'Torres', '001234578', '7777-2829', 'valeria.torres@email.com', 'clave456', 'Femenino', 1),
(13, 'Andrés', 'Ruiz', '001234579', '7777-3031', 'andres.ruiz@email.com', 'clave789', 'Masculino', 1),
(14, 'Marta', 'Flores', '001234580', '7777-3233', 'marta.flores@email.com', 'clave012', 'Femenino', 1),
(15, 'Gabriel', 'Ortiz', '001234581', '7777-3435', 'gabriel.ortiz@email.com', 'clave345', 'Masculino', 1);

INSERT INTO tb_pedidos (id_pedido, fecha_pedido, estado_pedido, direccion_pedido, id_cliente) VALUES 
(1,'2024-07-23 01:49:00', 'Pendiente', 'Dirección de ejemplo 1', 1),
(2, '2024-07-23 01:49:00', 'Completado', 'Dirección de ejemplo 2', 2),
(3, '2024-07-23 01:49:00', 'Cancelado', 'Dirección de ejemplo 3', 3),
(4, '2024-07-23 01:49:00', 'Pendiente', 'Dirección de ejemplo 4', 4),
(5, '2024-07-23 01:49:00', 'Anulado', 'Dirección de ejemplo 5', 5),
(6, '2024-07-23 01:49:00', 'Completado', 'Dirección de ejemplo 6', 6),
(7, '2024-07-23 01:49:00', 'Pendiente', 'Dirección de ejemplo 7', 7),
(8, '2024-07-23 01:49:00', 'Completado', 'Dirección de ejemplo 8', 8),
(9, '2024-07-23 01:49:00', 'Pendiente', 'Dirección de ejemplo 9', 9),
(10, '2024-07-23 01:49:00', 'Cancelado', 'Dirección de ejemplo 10', 10);

INSERT INTO tb_detalle_pedido (id_detalle, cantidad_producto, precio_producto, id_pedido, id_detalle_producto) VALUES 
(1, 2, 25.00, 1, 1),
(2, 1, 30.00, 2, 2),
(3, 3, 15.00, 3, 3),
(4, 2, 20.00, 4, 4),
(5, 1, 50.00, 5, 5),
(6, 2, 35.00, 6, 6),
(7, 1, 40.00, 7, 7),
(8, 3, 22.00, 8, 8),
(9, 2, 28.00, 9, 9),
(10, 1, 45.00, 10, 10);