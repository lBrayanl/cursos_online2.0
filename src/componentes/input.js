import React from "react";
import {Label, GrupoInput, Input, IconoValidacion, LeyendaError} from "./formVista";
import { faCheckCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons'

const ComponenteInput = ({estado, cambiarEstado, tipo, label, placeholder, leyendaError, name, expresionRegular, funcion}) => {
    const onChange = (e) => {
        console.log(e.target.value);
        cambiarEstado({...estado, campo: e.target.value});
    }

    const validacion = () => {
        if(expresionRegular){
            if(expresionRegular.test(estado.campo)){
                cambiarEstado({...estado, valido: 'true'});
        } else {
                cambiarEstado({...estado, valido: 'false'});
        }
    }
        if(funcion){
            funcion();
        }
    }

    return(
        <div>
            <Label htmlFor={name} valido={estado.valido}>{label}</Label>
                <GrupoInput>
                    <Input 
                        type={tipo} 
                        placeholder={placeholder} 
                        id={name}
                        value={estado.campo}
                        onChange={onChange}
                        onKeyUp={validacion}
                        onBlur={validacion}
                        valido={estado.valido}
                    />
                        <IconoValidacion 
                        icon={estado.valido === 'true' ? faCheckCircle : faTimesCircle } 
                        valido={estado.valido}

                        />
                </GrupoInput>
          <LeyendaError valido={estado.valido}>{leyendaError}</LeyendaError>
        </div>
    );
}

export default ComponenteInput;