import React, {Fragment, useState} from 'react';
import Error from './Error';

const Pregunta = ({ guardarRestante, actualizarPregunta, guardarPresupuesto}) => {

    //definir el state
    const [cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] =useState(false);
    //funcion para leer el presupuesto

    const definirPresupuesto = (e) => {
        guardarCantidad(parseInt(e.target.value));
    }
     
    //submit para definir el presupuesto
    const agregarPresupuesto = (e)=>{
        e.preventDefault();
        //validar
        if(cantidad<1 || isNaN(cantidad)){
            guardarError(true);
            return;
        }
        //si pasa la validacion
        guardarError(false);
        guardarPresupuesto(cantidad);
        guardarRestante(cantidad);
        actualizarPregunta(false);

    }
      
    return ( 
        <Fragment>
            <h2>Coloca tu presupuesto</h2>
            {error ? <Error mensaje="Presupuesto incorrecto"/> : null}
            <form
                onSubmit={agregarPresupuesto}
            >
                <input
                    type="number"
                    className="u-full-width"
                    placeholder="Coloca tu presupuesto"               
                    onChange={definirPresupuesto}
                />

                <input
                    type="submit"
                    className="button-primary u-full-width"
                    value="Definir presupuesto"
                />
            </form>
        </Fragment>

     );
}
 
export default Pregunta;