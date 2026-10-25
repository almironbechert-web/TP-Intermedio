// Capturamos los elementos del DOM
const imagenMoto = document.getElementById('imagen-moto');
const radiosColor = document.querySelectorAll('input[name="color-moto"]');
const indicadores = document.querySelectorAll('.indicadores-carrusel span');

let colorActual = 'naranja'; 
let indiceActual = 1;      

// Función principal adaptada para aceptar dirección ('izquierda' o 'derecha')
// Función principal con transición direccional real
function actualizarCarrusel(direccion = 'izquierda') {
    console.log(`[Actualizar] Color: ${colorActual}, Índice actual: ${indiceActual}, Dirección: ${direccion}`);
    
    // 1. Definimos la clase de salida según hacia dónde se mueve
    const salidaClass = direccion === 'izquierda' ? 'salida-izquierda' : 'salida-derecha';
    imagenMoto.classList.add(salidaClass);

    // 2. Esperamos que termine la salida (200ms) para cambiar la foto y traerla del lado opuesto
    setTimeout(() => {
        imagenMoto.src = `./assets/img/moto_${colorActual}/${indiceActual}.png`;
        
        // Quitamos la clase de salida
        imagenMoto.classList.remove(salidaClass);

        // 3. Preparamos la entrada desde el lado contrario
        // Si fuimos a la izquierda, la nueva imagen entra desde la derecha. Si fuimos a la derecha, entra desde la izquierda.
        const entradaClass = direccion === 'izquierda' ? 'entrada-desde-derecha' : 'entrada-desde-izquierda';
        imagenMoto.classList.add(entradaClass);

        // Forzamos un 'reflow' para que el navegador registre la posición inicial de forma instantánea
        void imagenMoto.offsetWidth;

        // 4. Quitamos la clase de entrada para que la moto deslice suavemente hacia el centro (translateX(0))
        imagenMoto.classList.remove(entradaClass);

    }, 200);

    // Actualizamos los indicadores visuales
    indicadores.forEach((ind, index) => {
        if (index === (indiceActual - 1)) {
            ind.classList.add('indicador-activo');
        } else {
            ind.classList.remove('indicador-activo');
        }
    });
}

// 1. Selector de color (por defecto entra hacia la izquierda)
radiosColor.forEach(radio => {
    radio.addEventListener('change', (e) => {
        colorActual = e.target.value; 
        indiceActual = 1;             
        actualizarCarrusel('izquierda');
    });
});

// 2. Clic en los indicadores (compara si el nuevo índice es mayor o menor para decidir el sentido)
indicadores.forEach((ind, index) => {
    ind.addEventListener('click', () => {
        const nuevoIndice = index + 1;
        const direccion = nuevoIndice > indiceActual ? 'izquierda' : 'derecha';
        
        indiceActual = nuevoIndice;
        actualizarCarrusel(direccion);
    });
});

// 3. Gestos táctiles (Swipe) actualizados con su respectiva dirección
let touchStartX = 0;
let touchEndX = 0;

imagenMoto.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

imagenMoto.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    procesarSwipe();
}, { passive: true });

function procesarSwipe() {
    const distanciaMinima = 50; 
    const diferencia = touchStartX - touchEndX;

    if (Math.abs(diferencia) > distanciaMinima) {
        if (diferencia > 0) {
            // Deslizamiento hacia la izquierda -> Siguiente foto
            if (indiceActual < 6) {
                indiceActual++;
                actualizarCarrusel('izquierda'); // La moto se desplaza a la izquierda
            }
        } else {
            // Deslizamiento hacia la derecha -> Foto anterior
            if (indiceActual > 1) {
                indiceActual--;
                actualizarCarrusel('derecha'); // La moto se desplaza a la derecha
            }
        }
    }
}

// Sincronización inicial al cargar la página
actualizarCarrusel('izquierda');