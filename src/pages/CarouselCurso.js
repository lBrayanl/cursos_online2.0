import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function CarouselCurso() {
  return (
   <div className="containerCarousel">
 <Carousel variant="dark">
      <Carousel.Item>
        <div className="row">
                <div className="col col-lg-8">
                <img
                    className="imgCarousel"
                    src="https://dummyimage.com/900x400/dee2e6/6c757d.jpg"
                    alt="First slide"
                    />
                </div>
            
                <div className="col col-lg-4">
                    <Carousel.Caption>
                        <br/>
                        <Card style={{color: 'black', width: 'auto' }}>
                            <Card.Body>
                                <Card.Title>Curso Angular</Card.Title>
                                <Card.Text>
                                Gabriel Moroni
                                </Card.Text>
                                <Card.Text>
                                <label for="radio1">★</label>
                                <label for="radio1">★</label>
                                </Card.Text>
                                <Card.Text>
                                Gratis
                                </Card.Text>
                                <Button variant="primary" hrf="./Curso">Inscribirse</Button>
                            </Card.Body>
                        </Card>
                    </Carousel.Caption>
             </div>
        </div>
      </Carousel.Item>

      <Carousel.Item>
      <div className="row">
            <div className="col-lg-8">
            <img
                className="imgCarousel"
                src="https://dummyimage.com/900x400/dee2e6/6c757d.jpg"
                alt="First slide"
                />
            </div>
    
        <div className="col-lg-4">
            <Carousel.Caption>
            <Card style={{ color: 'black', width: 'auto' }}>
                <Card.Body>
                    <Card.Title>Curso Angular</Card.Title>
                    <Card.Text>
                    Gabriel Moroni
                    </Card.Text>
                    <Card.Text>
                    <label for="radio1">★</label>
                    <label for="radio1">★</label>
                    </Card.Text>
                    <Card.Text>
                    Gratis
                    </Card.Text>
                    <Button variant="primary" hrf="./Curso">Inscribirse</Button>
                </Card.Body>
            </Card>
            </Carousel.Caption>
        </div>
        </div>
      </Carousel.Item>

      <Carousel.Item>
      <div className="row">
            <div className="col-lg-8">
            <img
               className="imgCarousel"
                src="https://dummyimage.com/900x400/dee2e6/6c757d.jpg"
                alt="First slide"
                />
            </div>
      
        <div className="col-lg-4">
            <Carousel.Caption>
            <Card style={{ color: 'black', width: 'auto'}}>
                <Card.Body>
                    <Card.Title>Curso Angular</Card.Title>
                    <Card.Text>
                    Gabriel Moroni
                    </Card.Text>
                    <Card.Text>
                    <label for="radio1">★</label>
                    <label for="radio1">★</label>
                    </Card.Text>
                    <Card.Text>
                    Gratis
                    </Card.Text>
                    <Button variant="primary" href="./Curso">Inscribirse</Button>
                </Card.Body>
            </Card>
            </Carousel.Caption>
        </div>
        </div>
      </Carousel.Item>
    </Carousel>
   </div>
   

  );
}

export default CarouselCurso;