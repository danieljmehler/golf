// Library imports
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export const Home = () => {
    return (
        <Container fluid>
            <Row>
                <Col md="3"></Col>
                <Col md="6"><h1 className='text-center'>Home</h1></Col>
                <Col md="3"></Col>
            </Row>
        </Container>
    );
};