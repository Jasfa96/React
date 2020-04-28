import React, { Fragment, useState } from 'react';
import { v4 as uuidv4 } from "uuid";


const Formulario = (props) => {


    //Crear State de Citas
    const [cita, actualizarCita] = useState({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
        //son los names del cuestionario
    });

    //Inicia en false
    const [error, actualizarError]= useState(false);

    //Función que se ejecuta cuando el usuario escribe en un input
    const actualizarState = (event) =>{
        //con event.target.value cogemos el valor del input, con .name cogemos el name del input
        actualizarCita({
            ...cita,
            [event.target.name]: event.target.value
        })
    }

    const { mascota, propietario, fecha, hora, sintomas} = cita; //es para no tener que poner cita.mascota, cita.propietario etc, con poner mascota es suficiente


    // Cuando el usuario pulsa agregar cita

    const submitCita = event => {
        event.preventDefault();

        //siempre que enviamos una cita debemos hacer: Validar cita, Asignar un ID, Crear la cita, Reiniciar el form

        //Validar cita

        if (mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '') {
            actualizarError(true);
            return;
        }
        
        actualizarError(false);

        //Asignar un ID (instalamos npm i uuid para generar ids, la debemos importar despues)
        cita.id = uuidv4 ();

        //Crear la cita
        props.crearCita(cita);

        //Reiniciar el form

        actualizarCita({
            mascota: "",
            propietario: "",
            fecha: "",
            hora: "",
            sintomas: ""
        });

    }

    return ( 
        <Fragment>
            <h2>Crear cita</h2>
            
            {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}

            <form
                onSubmit={submitCita}
            >
                <label>Nombre de mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre de la mascota"
                    onChange={actualizarState}
                    value={mascota}
                />
                <label>Propietario</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre del dueño de la mascota"
                    onChange={actualizarState}
                    value={propietario}
                />
                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"                   
                    onChange={actualizarState}
                    value={fecha}
                />
                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />
                <label>Síntomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={sintomas}
                />
                <button
                    type="submit"
                    className="u-full-width button-primary"
                >
                     Agregar Cita
                </button>
            </form>
        </Fragment>
     );
}
 

export default Formulario;

