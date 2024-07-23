DROP DATABASE if EXISTS pull_and_zara;
CREATE DATABASE pull_and_zara; 

USE pull_and_zara; 

DROP TABLE IF EXISTS `tb_admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_admins` (
  `id_admin` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_admin` varchar(255) NOT NULL,
  `apellido_admin` varchar(255) NOT NULL,
  `correo_admin` varchar(255) NOT NULL,
  `clave_admin` varchar(255) NOT NULL,
  PRIMARY KEY (`id_admin`),
  UNIQUE KEY `rest_correo_unico` (`correo_admin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_admins`
--

-- INSERT INTO pedido(direccion_pedido, id_cliente) VALUES((SELECT direccion_cliente FROM cliente WHERE id_cliente = ?), ?);
-- INSERT INTO tb_sub_categorias(nombre_subcategoria, imagen_subcategoria, id_categoria) VALUES((SELECT direccion_cliente FROM cliente WHERE id_cliente = ?), ?);

LOCK TABLES `tb_admins` WRITE;
/*!40000 ALTER TABLE `tb_admins` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_categorias`
--

DROP TABLE IF EXISTS `tb_categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_categorias` (
  `id_categoria` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_categoria` varchar(255) NOT NULL,
  `imagen_categoria` varchar(25) NOT NULL,
  PRIMARY KEY (`id_categoria`),
  UNIQUE KEY `unique_nombre_categoria` (`nombre_categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_categorias`
--

LOCK TABLES `tb_categorias` WRITE;
/*!40000 ALTER TABLE `tb_categorias` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_clientes`
--

DROP TABLE IF EXISTS `tb_clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_clientes` (
  `id_cliente` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_cliente` varchar(255) NOT NULL,
  `apellido_cliente` varchar(255) NOT NULL,
  `dui_client` varchar(255) NOT NULL,
  `telf_cliente` varchar(12) NOT NULL,
  `correo_cliente` varchar(255) NOT NULL,
  `clave_cliente` varchar(255) NOT NULL,
  `genero_cliente` ENUM('Femenino', 'Masculino') NOT NULL,
  `estado_cliente` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_cliente`),
  UNIQUE KEY `dui_client` (`dui_client`),
  UNIQUE KEY `telf_cliente` (`telf_cliente`),
  UNIQUE KEY `correo_cliente` (`correo_cliente`),
  UNIQUE KEY `rest_dui_cliente_unico` (`dui_client`),
  UNIQUE KEY `rest_telf_cliente_unico` (`telf_cliente`),
  UNIQUE KEY `rest_correo_cliente_unico` (`correo_cliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_clientes`
--

LOCK TABLES `tb_clientes` WRITE;
/*!40000 ALTER TABLE `tb_clientes` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_colores`
--

DROP TABLE IF EXISTS `tb_colores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_colores` (
  `id_color` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_color` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_color`),
  UNIQUE KEY `unique_nombre_color` (`nombre_color`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_colores`
--

LOCK TABLES `tb_colores` WRITE;
/*!40000 ALTER TABLE `tb_colores` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_colores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_productos`
--

DROP TABLE IF EXISTS `tb_productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_productos` (
  `id_producto` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_producto` varchar(255) NOT NULL,
  `desc_producto` varchar(255) NOT NULL,
  `fecha_registro_produc` datetime DEFAULT NULL,
  `id_categoria` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_producto`),
  UNIQUE KEY `unique_nombre_producto` (`nombre_producto`),
  KEY `fk_id_producto_id_categoria` (`id_categoria`),
  CONSTRAINT `fk_id_producto_id_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `tb_categorias` (`id_categoria`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_productos`
--

LOCK TABLES `tb_productos` WRITE;
/*!40000 ALTER TABLE `tb_productos` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_pedidos`
--

DROP TABLE IF EXISTS `tb_pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_pedidos` (
  `id_pedido` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_pedido` datetime DEFAULT NULL,
  `estado_pedido` ENUM ('Pendiente','Cancelado','Completado','Anulado') NOT NULL,
  `direccion_pedido` VARCHAR(125) DEFAULT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_pedido`),
  KEY `fk_id_cliente_id_pedido` (`id_cliente`),
  CONSTRAINT `fk_id_cliente_id_pedido` FOREIGN KEY (`id_cliente`) REFERENCES `tb_clientes` (`id_cliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `tb_pedidos`
--


LOCK TABLES `tb_pedidos` WRITE;
/*!40000 ALTER TABLE `tb_pedidos` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_tallas`
--

DROP TABLE IF EXISTS `tb_tallas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_tallas` (
  `id_talla` int(11) NOT NULL AUTO_INCREMENT,
  `numero_talla` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_talla`),
  UNIQUE KEY `unique_numero_talla` (`numero_talla`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_tallas`
--

LOCK TABLES `tb_tallas` WRITE;
/*!40000 ALTER TABLE `tb_tallas` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_tallas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_detalle_productos`
--

DROP TABLE IF EXISTS `tb_detalle_productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_detalle_productos` (
  `id_detalle_producto` int(11) NOT NULL AUTO_INCREMENT,
  `existencias` int(11) NOT NULL CHECK (`existencias` >= 0),
  `img_producto` varchar(255) NOT NULL,
  `id_color` int(11) DEFAULT NULL,
  `id_talla` int(11) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `precio_producto` DECIMAL(8,2) NOT NULL,
  PRIMARY KEY (`id_detalle_producto`),
  KEY `fk_id_color_id_detalle` (`id_color`),
  KEY `fk_id_talla_id_detalle` (`id_talla`),
  KEY `fk_id_producto_id_detalle` (`id_producto`),
  CONSTRAINT `fk_id_color_id_detalle` FOREIGN KEY (`id_color`) REFERENCES `tb_colores` (`id_color`),
  CONSTRAINT `fk_id_producto_id_detalle` FOREIGN KEY (`id_producto`) REFERENCES `tb_productos` (`id_producto`) ON DELETE CASCADE, 
  CONSTRAINT `fk_id_talla_id_detalle` FOREIGN KEY (`id_talla`) REFERENCES `tb_tallas` (`id_talla`),
  CONSTRAINT `rest_check_existencias` CHECK (`existencias`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_detalle_productos`
--

LOCK TABLES `tb_detalle_productos` WRITE;
/*!40000 ALTER TABLE `tb_detalle_productos` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_detalle_productos` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Table structure for table `tb_detalle_pedido`
--

DROP TABLE IF EXISTS `tb_detalle_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_detalle_pedido` (
  `id_detalle` int(11) NOT NULL AUTO_INCREMENT,
  `cantidad_producto` int(11) NOT NULL CHECK (`cantidad_producto` >= 0),
  `precio_producto` decimal(5,2) DEFAULT NULL,
  `id_pedido` int(11) DEFAULT NULL,
  `id_detalle_producto` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_detalle`),
  KEY `fk_id_pedido_id_detalle_pedido` (`id_pedido`),
  KEY `fk_id_detalle_producto_id_detalle_pedido` (`id_detalle_producto`),
  CONSTRAINT `fk_id_detalle_producto_id_detalle_pedido` FOREIGN KEY (`id_detalle_producto`) REFERENCES `tb_detalle_productos` (`id_detalle_producto`),
  CONSTRAINT `fk_id_pedido_id_detalle_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `tb_pedidos` (`id_pedido`),
  CONSTRAINT `rest_check_cantidad_producto` CHECK (`cantidad_producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;






--
-- Dumping data for table `tb_detalle_pedido`
--
LOCK TABLES `tb_detalle_pedido` WRITE;
/*!40000 ALTER TABLE `tb_detalle_pedido` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_detalle_pedido` ENABLE KEYS */;
UNLOCK TABLES;


-- Table structure for table `tb_valoracion`
--

DROP TABLE IF EXISTS `tb_valoracion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_valoracion` (
  `id_valoracion` int(11) NOT NULL AUTO_INCREMENT,
  `comentario_cliente` varchar(255) NOT NULL,
  `fecha_valoracion` datetime DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  `estado_valoracion` ENUM ('Activa','Inactiva') NOT NULL,
  PRIMARY KEY (`id_valoracion`),
  KEY `fk_id_producto_id_valo` (`id_producto`),
  KEY `fk_id_cliente_id_valo` (`id_cliente`),
  CONSTRAINT `fk_id_producto_id_valo` FOREIGN KEY (`id_producto`) REFERENCES `tb_productos` (`id_producto`),
  CONSTRAINT `fk_id_cliente_id_valo` FOREIGN KEY (`id_cliente`) REFERENCES `tb_clientes` (`id_cliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_valoracion`
--

LOCK TABLES `tb_valoracion` WRITE;

UNLOCK TABLES;

SELECT * FROM tb_admins;
SELECT * FROM tb_categorias;
SELECT * FROM tb_clientes;
SELECT * FROM tb_colores;
SELECT * FROM tb_detalle_pedido;
SELECT * FROM tb_detalle_productos;
SELECT * FROM tb_pedidos;
SELECT * FROM tb_productos;
SELECT * FROM tb_tallas;
SELECT * FROM tb_valoracion;