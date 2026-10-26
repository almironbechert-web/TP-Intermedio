// ==========================================
// 1. LÓGICA DE LA MOTO PRINCIPAL (CARRUSEL & COLOR)
// ==========================================
const imagenMoto = document.getElementById('imagen-moto');
const radiosColor = document.querySelectorAll('input[name="color-moto"]');
const indicadores = document.querySelectorAll('#seccion-tarjeta .indicadores-carrusel span');

let colorActual = 'naranja'; 
let indiceActual = 1;      
let enAnimacionMoto = false; // Candado para evitar solapamientos rápidos

function actualizarCarrusel(direccion = 'izquierda') {
    // Si ya hay una transición en curso, bloqueamos nuevos clics/swipes momentáneamente
    if (enAnimacionMoto) return;
    enAnimacionMoto = true;
    
    const salidaClass = direccion === 'izquierda' ? 'salida-izquierda' : 'salida-derecha';
    imagenMoto.classList.add(salidaClass);

    setTimeout(() => {
        imagenMoto.src = `./assets/img/moto_${colorActual}/${indiceActual}.png`;
        imagenMoto.classList.remove(salidaClass);

        const entradaClass = direccion === 'izquierda' ? 'entrada-desde-derecha' : 'entrada-desde-izquierda';
        imagenMoto.classList.add(entradaClass);

        void imagenMoto.offsetWidth; // Reflow

        imagenMoto.classList.remove(entradaClass);

        // Liberamos el candado al terminar la animación
        enAnimacionMoto = false;
    }, 200);

    actualizarIndicadoresMoto();
}

function actualizarIndicadoresMoto() {
    indicadores.forEach((ind, index) => {
        if (index === (indiceActual - 1)) {
            ind.classList.add('indicador-activo');
        } else {
            ind.classList.remove('indicador-activo');
        }
    });
}

radiosColor.forEach(radio => {
    radio.addEventListener('change', (e) => {
        colorActual = e.target.value; 
        indiceActual = 1;             
        actualizarCarrusel('izquierda');
    });
});

indicadores.forEach((ind, index) => {
    ind.addEventListener('click', () => {
        // Evitamos acción si ya estamos en ese mismo índice o animando
        const nuevoIndice = index + 1;
        if (nuevoIndice === indiceActual || enAnimacionMoto) return;

        const direccion = nuevoIndice > indiceActual ? 'izquierda' : 'derecha';
        indiceActual = nuevoIndice;
        actualizarCarrusel(direccion);
    });
});

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
    if (enAnimacionMoto) return;

    const distanciaMinima = 50; 
    const diferencia = touchStartX - touchEndX;

    if (Math.abs(diferencia) > distanciaMinima) {
        if (diferencia > 0) {
            if (indiceActual < 6) {
                indiceActual++;
                actualizarCarrusel('izquierda');
            }
        } else {
            if (indiceActual > 1) {
                indiceActual--;
                actualizarCarrusel('derecha');
            }
        }
    }
}

actualizarIndicadoresMoto();


// ==========================================
// 2. LÓGICA EXCLUSIVA PARA KTM POWERPARTS
// ==========================================
const imagenPowerpart = document.getElementById('imagen-powerpart');
const tituloPowerpart = document.getElementById('titulo-powerpart');
const indicadoresPowerparts = document.querySelectorAll('#indicadores-powerparts span');

let indicePowerpart = 1;
let enAnimacionPowerpart = false; // Candado independiente para powerparts

const titulosPowerparts = [
    "REJILLA DE PROTECCIÓN DE RADIADOR",
    "SMARTPHONE BRACKET",
    "TECH PACK",
    "KIT DE PROTECTOR ANTICAÍDAS",
    "KIT DE HERRAMIENTAS",
    "HOJA DE ADHESIVOS",
    "CABALLETE CENTRAL",
    "APEX PRO 6746 SHOCK ABSORBER"
];

function actualizarPowerpart(direccion = 'izquierda') {
    if (enAnimacionPowerpart) return;
    enAnimacionPowerpart = true;

    const salidaClass = direccion === 'izquierda' ? 'salida-izquierda' : 'salida-derecha';
    imagenPowerpart.classList.add(salidaClass);

    setTimeout(() => {
        imagenPowerpart.src = `./assets/img/powerparts/${indicePowerpart}.png`;
        tituloPowerpart.textContent = titulosPowerparts[indicePowerpart - 1];
        
        imagenPowerpart.classList.remove(salidaClass);

        const entradaClass = direccion === 'izquierda' ? 'entrada-desde-derecha' : 'entrada-desde-izquierda';
        imagenPowerpart.classList.add(entradaClass);

        void imagenPowerpart.offsetWidth; // Reflow

        imagenPowerpart.classList.remove(entradaClass);

        enAnimacionPowerpart = false;
    }, 200);

    actualizarIndicadoresPowerparts();
}

function actualizarIndicadoresPowerparts() {
    indicadoresPowerparts.forEach((ind, index) => {
        if (index === (indicePowerpart - 1)) {
            ind.classList.add('indicador-activo');
        } else {
            ind.classList.remove('indicador-activo');
        }
    });
}

indicadoresPowerparts.forEach((ind, index) => {
    ind.addEventListener('click', () => {
        const nuevoIndice = index + 1;
        if (nuevoIndice === indicePowerpart || enAnimacionPowerpart) return;

        const direccion = nuevoIndice > indicePowerpart ? 'izquierda' : 'derecha';
        indicePowerpart = nuevoIndice;
        actualizarPowerpart(direccion);
    });
});

let touchStartXPowerpart = 0;
let touchEndXPowerpart = 0;

imagenPowerpart.addEventListener('touchstart', (e) => {
    touchStartXPowerpart = e.changedTouches[0].screenX;
}, { passive: true });

imagenPowerpart.addEventListener('touchend', (e) => {
    touchEndXPowerpart = e.changedTouches[0].screenX;
    procesarSwipePowerpart();
}, { passive: true });

function procesarSwipePowerpart() {
    if (enAnimacionPowerpart) return;

    const distanciaMinima = 50; 
    const diferencia = touchStartXPowerpart - touchEndXPowerpart;

    if (Math.abs(diferencia) > distanciaMinima) {
        if (diferencia > 0) {
            if (indicePowerpart < 8) {
                indicePowerpart++;
                actualizarPowerpart('izquierda');
            }
        } else {
            if (indicePowerpart > 1) {
                indicePowerpart--;
                actualizarPowerpart('derecha');
            }
        }
    }
}

tituloPowerpart.textContent = titulosPowerparts[0];
actualizarIndicadoresPowerparts();