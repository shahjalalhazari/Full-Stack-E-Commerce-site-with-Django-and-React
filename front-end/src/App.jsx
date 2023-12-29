import { Container } from 'react-bootstrap';

import './App.css';
import "./bootstrap.min.css";

import Header from './component/Header';
import Footer from './component/Footer';
import { Outlet } from 'react-router-dom';


function App() {

  return (
    <>
      <Header />
      <main className="my-5">
        <Container>
          <Outlet/>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App
