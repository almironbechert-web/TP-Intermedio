// Capturamos los elementos del DOM
const imagenMoto = document.getElementById('imagen-moto');
const radiosColor = document.querySelectorAll('input[name="color-moto"]');
const indicadores = document.querySelectorAll('.indicadores-carrusel span');

// Estado inicial del carrusel
let colorActual = 'naranja'; 
let indiceActual = 1;      

// Función principal para actualizar la imagen y mover el indicador naranja
function actualizarCarrusel() {
    
    // Genera la ruta dinámica de la imagen
    const rutaImagen = `./assets/img/moto_${colorActual}/${indiceActual}.png`;
    imagenMoto.src = rutaImagen;

    // Recorremos los indicadores para poner o quitar la clase activa
    indicadores.forEach((ind, index) => {
        if (index === (indiceActual - 1)) {
            ind.classList.add('indicador-activo');
        } else {
            ind.classList.remove('indicador-activo');
        }
    });
}

// 1. Escuchar los cambios en los botones de selección de color (Naranja / Negra)
radiosColor.forEach(radio => {
    radio.addEventListener('change', (e) => {
        colorActual = e.target.value; 
        indiceActual = 1;             
        actualizarCarrusel();
    });
});

// 2. Escuchar los clics en cada barrita indicadora del carrusel (del 1 al 6)
indicadores.forEach((ind, index) => {
    ind.addEventListener('click', () => {
        indiceActual = index + 1; // Cambia al número de imagen correspondiente
        actualizarCarrusel();
    });
});

// 3. Sincronizar el estado inicial al cargar la página por primera vez
actualizarCarrusel();