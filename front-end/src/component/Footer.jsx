
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
    return (
      <footer>
        <Container>
          <Row>
            <Col className='text-center py-4 '>Copyright &copy; ProShop 2024</Col>
          </Row>
        </Container>
      </footer>
    );
};

export default Footer;