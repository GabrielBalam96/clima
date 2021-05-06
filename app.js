const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
})

function buscarClima(e) {
    e.preventDefault();

    console.log('Buscando el clima...');
    //validar 
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    console.log(ciudad);
    console.log(pais);

    if(ciudad === '' || pais === '') {
        //Hubo un error 
        mostrarError('Ambos campos son obligatorios');
        return;
    }

    //consultar API
    consultarApi(ciudad,pais);
}

function mostrarError(mensaje) {
    const alerta = document.querySelector('.bg-red-100');

    if(!alerta) {

        //crear una alerta
    const alerta = document.createElement('div');

    alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3','rounded','max-w-md','mx-auto','mt-6','text-center');

    alerta.innerHTML = `
    
    <strong class="font-bold">Error!</strong>
    <span class="block">${mensaje}</span>

    `;
    container.appendChild(alerta);
    
    //se elimina el mensaje despues de 5 seg

    setTimeout(() => {
        alerta.remove();
    }, 5000);

    }
    
}
//API 
function consultarApi(ciudad,pais) {
    const appId = '9d880be1be8ebad538133aec0223d7f1'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    spinner() // Muestra el Spinner de carga
    fetch(url)
        .then( respuesta => {
            return respuesta.json();
        })
        .then ( datos => {
            limpiarHtml();
            console.log(datos);
            if(datos.cod === "404") {
                mostrarError('Cuidad no encontrada');
                return;
            }

            // Imprime la respuesta en el HTML
            mostrarClima(datos);
        })
}

function mostrarClima(datos) {
    const { name, main: { temp, temp_max, temp_min }} = datos;

    const centigrados = kelvinACentigrados(temp);
    const min = kelvinACentigrados(temp_min);
    const max = kelvinACentigrados(temp_max);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl');

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451; `;
    actual.classList.add('font-bold', 'text-2xl');

    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Max: ${max} &#8451;`;
    tempMaxima.classList.add('text-xl');

    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `Min: ${min} &#8451;`;
    tempMinima.classList.add('text-xl');


    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-black');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);

    resultado.appendChild(resultadoDiv);
    
}
function kelvinACentigrados(grados) {
    return parseInt(grados - 273.15);
}

function limpiarHtml() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function spinner() {
    
    limpiarHtml();

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-circle');
    divSpinner.innerHTML = `
    
    <div class="sk-circle1 sk-child"></div>
    <div class="sk-circle2 sk-child"></div>
    <div class="sk-circle3 sk-child"></div>
    <div class="sk-circle4 sk-child"></div>
    <div class="sk-circle5 sk-child"></div>
    <div class="sk-circle6 sk-child"></div>
    <div class="sk-circle7 sk-child"></div>
    <div class="sk-circle8 sk-child"></div>
    <div class="sk-circle9 sk-child"></div>
    <div class="sk-circle10 sk-child"></div>
    <div class="sk-circle11 sk-child"></div>
    <div class="sk-circle12 sk-child"></div>
    `;
    resultado.appendChild(divSpinner);
}

const fecha = new Date();
let year = fecha.getFullYear();

let copy = document.querySelector('#fecha'); 
copy.innerHTML = ` 
<style>footer h3 { color: #fff; text-align: center;font-size: 18px; margin-top:20px; } </style> 
 &copy;AltSoftware ${year}`;
