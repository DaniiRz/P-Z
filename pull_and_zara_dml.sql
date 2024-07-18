INSERT INTO tb_categorias (nombre_categoria, imagen_categoria) VALUES
('Ropa para hombres', '665f88d3950dd.png'),
('Ropa para mujeres', '665f88d3950dd.png'),
('Ropa para niños', '665f88d3950dd.png'),
('Calzado para hombres', '665f88d3950dd.png'),
('Calzado para mujeres', '665f88d3950dd.png'),
('Calzado para niños', '665f88d3950dd.png'),
('Accesorios para hombres', '665f88d3950dd.png'),
('Accesorios para mujeres', '665f88d3950dd.png');

INSERT INTO tb_colores (nombre_color) VALUES
('Azul'),
('Blanco'),
('Gris'),
('Rojo'),
('Amarillo'),
('Verde'),
('Negro'),
('Rosa'),
('Beige'),
('Marrón');

INSERT INTO tb_tallas (numero_talla) VALUES
('S'),
('M'),
('L'),
('XS'),
('S'),
('M'),
('28'),
('30'),
('32'),
('7'),
('8'),
('9'),
('Única');

INSERT INTO tb_productos (nombre_producto, desc_producto, fecha_registro_produc, id_categoria) VALUES
('Camisa de manga corta', 'Camisa de manga corta de algodón con estampado de rayas', NOW(), 1),
('Vestido de verano', 'Vestido de verano de poliéster con estampado floral', NOW(), 2),
('Pantalón de mezclilla', 'Pantalón de mezclilla recto', NOW(), 1),
('Zapatos deportivos', 'Zapatos deportivos de cuero sintético estilo correr', NOW(), 2),
('Blusa de manga larga', 'Blusa de manga larga de algodón con estampado de lunares', NOW(), 1),
('Shorts de playa', 'Shorts de playa de poliéster con estampado', NOW(), 2),
('Gorra de béisbol', 'Gorra de béisbol de algodón ajustable', NOW(), 3),
('Bolso de mano', 'Bolso de mano de cuero sintético estilo tote', NOW(), 4);

INSERT INTO tb_detalle_productos (existencias, img_producto, id_color, id_talla, id_producto, precio_producto) VALUES
(10, '6694cfda8a7fc.jpg', 1, 1, 1, 29.99),
(15, '6694cfda8a7fc.jpg', 2, 2, 1, 29.99),
(20, '6694cfda8a7fc.jpg', 3, 3, 1, 29.99),
(8, '6694cfda8a7fc.jpg', 4, 4, 2, 49.99),
(12, '6694cfda8a7fc.jpg', 5, 5, 2, 49.99),
(18, '6694cfda8a7fc.jpg', 6, 6, 2, 49.99),
(5, '6694cfda8a7fc.jpg', 7, 7, 3, 39.99),
(10, '6694cfda8a7fc.jpg', 8, 8, 3, 39.99),
(15, '6694cfda8a7fc.jpg', 9, 9, 3, 39.99),
(20, '6694cfda8a7fc.jpg', 10, 10, 4, 59.99),
(25, '6694cfda8a7fc.jpg', 1, 11, 4, 59.99),
(30, '6694cfda8a7fc.jpg', 2, 12, 4, 59.99),
(10, '6694cfda8a7fc.jpg', 3, 13, 5, 24.99),
(15, '6694cfda8a7fc.jpg', 4, 12, 5, 24.99),
(20, '6694cfda8a7fc.jpg', 5, 11, 5, 24.99),
(8, '6694cfda8a7fc.jpg', 6, 10, 6, 19.99),
(12, '6694cfda8a7fc.jpg', 7, 9, 6, 19.99),
(18, '6694cfda8a7fc.jpg', 8, 8, 6, 19.99),
(5, '6694cfda8a7fc.jpg', 9, 7, 7, 14.99),
(10, '6694cfda8a7fc.jpg', 10, 6, 7, 14.99),
(15, '6694cfda8a7fc.jpg', 1, 5, 7, 14.99),
(20, '6694cfda8a7fc.jpg', 2, 4, 8, 39.99),
(25, '6694cfda8a7fc.jpg', 3, 3, 8, 39.99),
(30, '6694cfda8a7fc.jpg', 4, 2, 8, 39.99);

-- No se pueden insertar clientes por la constraseña


INSERT INTO tb_clientes (nombre_cliente, apellido_cliente, dui_client, telf_cliente, correo_cliente, clave_cliente, genero_cliente, estado_cliente) VALUES
('María', 'López', '001234567', '7777-1234', 'maria.lopez@email.com', 'clave123', 'Femenino', 1),
('Juan', 'Pérez', '001234568', '7777-5678', 'juan.perez@email.com', 'clave456', 'Masculino', 1),
('Ana', 'Gómez', '001234569', '7777-9101', 'ana.gomez@email.com', 'clave789', 'Femenino', 1),
('Pedro', 'Fernández', '001234570', '7777-1213', 'pedro.fernandez@email.com', 'clave012', 'Masculino', 1),
('Luis', 'Martínez', '001234571', '7777-1415', 'luis.martinez@email.com', 'clave345', 'Masculino', 1),
('Laura', 'García', '001234572', '7777-1617', 'laura.garcia@email.com', 'clave678', 'Femenino', 1),
('Carlos', 'Rodríguez', '001234573', '7777-1819', 'carlos.rodriguez@email.com', 'clave901', 'Masculino', 1),
('Sofía', 'Díaz', '001234574', '7777-2021', 'sofia.diaz@email.com', 'clave234', 'Femenino', 1),
('Javier', 'Hernández', '001234575', '7777-2223', 'javier.hernandez@email.com', 'clave567', 'Masculino', 1),
('Elena', 'Luna', '001234576', '7777-2425', 'elena.luna@email.com', 'clave890', 'Femenino', 1),
('Diego', 'Sánchez', '001234577', '7777-2627', 'diego.sanchez@email.com', 'clave123', 'Masculino', 1),
('Valeria', 'Torres', '001234578', '7777-2829', 'valeria.torres@email.com', 'clave456', 'Femenino', 1),
('Andrés', 'Ruiz', '001234579', '7777-3031', 'andres.ruiz@email.com', 'clave789', 'Masculino', 1),
('Marta', 'Flores', '001234580', '7777-3233', 'marta.flores@email.com', 'clave012', 'Femenino', 1),
('Gabriel', 'Ortiz', '001234581', '7777-3435', 'gabriel.ortiz@email.com', 'clave345', 'Masculino', 1);