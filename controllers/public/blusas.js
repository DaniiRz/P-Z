//constante con ruta de la api 
const PRODUCTO_API = 'services/public/blusas.php'; 

//constante tipo objeto para obtener parametros disponibles en URL 
const PARAMS = new URLSearchParams(location.search); 
const PRODUCTOS = document.getElementById('productos'); 

//metodo para manejar eventos para doc cargado 
document.addEventListener('DOMContentLoaded', async() => {
    //se define un onjeto con los datos de la categoria seleccionada 
    const DATA = await fetchData(PRODUCTO_API, 'readProductosCategoria')
})