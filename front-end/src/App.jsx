import { Container } from 'react-bootstrap';
import './App.css';
import "./bootstrap.min.css";
import Footer from './component/Footer';
import Header from './component/Header';
import Home from './pages/Home';


function App() {

  return (
    <main>
      <Header />
      <Container className='my-5'>
        <Home />
      </Container>
      <Footer />
    </main>
  );
}

export default App
