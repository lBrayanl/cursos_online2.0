import Form from 'react-bootstrap/Form';
import BuscarCurso from '../pages/BuscarCurso';

function FiltroCursos() {
  return (
    <div className='row'>
        <div className="col-lg-4">
            <Form>
            <h6>Valoraciones</h6>
            {['checkbox'].map((type) => (
                <div key={`default-${type}`} className="mb-3">
                <Form.Check 
                    type={type}
                    id={`default-${type}`}
                    label={`4,5 o más (1000)`}
                />
                <Form.Check 
                    type={type}
                    id={`default-${type}`}
                    label={`4,5 o más (1000)`}
                />
                <Form.Check 
                    type={type}
                    id={`default-${type}`}
                    label={`4,5 o más (1000)`}
                />
                <h6>Duración del video</h6>
                <Form.Check 
                    type={type}
                    id={`default-${type}`}
                    label={`0-1 hora`}
                />
                <Form.Check 
                    type={type}
                    id={`default-${type}`}
                    label={`1-3 horas`}
                />
                <Form.Check 
                    type={type}
                    id={`default-${type}`}
                    label={`Entre 3 y 6 horas`}
                />
                </div>
            ))}
            </Form>
        </div>
        <div className="col-lg-8">
            <BuscarCurso/>
        </div>
    </div>
   
  );
}

export default FiltroCursos;