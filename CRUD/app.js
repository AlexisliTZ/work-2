let listaAlumnos = [];

const objAlumno = {
    id: '',
    nombre: '',
    apellido: ''
}

let editando = false;

const formulario = document.querySelector('#formulario');
const nombreImput = document.querySelector('#nombre');
const apellidoImput = document.querySelector('#apellido');
const btnAgregar = document.querySelector('btnAgregar');

formulario.addEventListener('submit' , validarFomulario);

function validarFomulario(e) {
    e.preventDefault();

    if(nombreImput.value === '' || puestoImput.value === '') {
        alert('Todos los campos son obligatorios');
        return;
    }

    if(editando) {
        editarAlumno();
        editando = false;

    } else {
        objAlumno.id = Date.now();
        objAlumno.nombre = nombreImput.value;
        objAlumno.apellido = apellidoImput.value;

        agregarAlumno();
    }
}

function agregarAlumno() {
    listaAlumnos.push({...objAlumno});

    mostarAlumnos();

    formulario.reset();

    limpiarObjeto();
}

function limpiarObjeto() {
    objAlumno.id = '';
    objAlumno.nombre = '';
    objAlumno.apellido = '';
}

function mostarAlumnos() {

    limpiarHTML();
    const divAlumnos = document.querySelector('.div-alumnos');

    listaAlumnos.forEach(alumno => {
        const {id, nombre, apellido} = alumno;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre} - ${apellido} - `;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarAlumno(alumno);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarAlumno(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divAlumnos.appendChild(parrafo);
        divAlumnos.appendChild(hr);
    });
}

function cargarAlumno(alumno) {
    const {id, nombre, apellido} = alumno;
    nombreImput.value = nombre;
    apellidoImput.value = apellido;

    objAlumno.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';

    editando = true;
}

function editarAlumno() {

    objAlumno.nombre = nombreImput.value;
    objAlumno.apellido = apellidoImput.value;

    listaAlumnos.map( alumno => {

        if(alumno.id === objAlumno.id) {
            alumno.id = objAlumno.id;
            alumno.nombre = objAlumno.nombre;
            alumno.apellido = objAlumno.apellido;
        }
    });

    limpiarHTML();
    mostarAlumnos();

    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';

    editando = false;
}

function eliminarAlumno(id) {

    listaAlumnos = listaAlumnos.filter(alumno => alumno.id !== id);

    limpiarHTML();
    mostarAlumnos();
}

function  limpiarHTML() {
    const divAlumnos = document.querySelector('div-alumnos');
    while(divAlumnos.firstChild) {
        divAlumnos.removeChild(divAlumnos.firstChild);
    }
}