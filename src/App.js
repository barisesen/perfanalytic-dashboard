import React, { Component } from 'react';
import { Container, Navbar } from 'react-bootstrap'
import Charts from "./components/Charts";
import './App.css';

class App extends Component {
  render () {
    return (
      <Container fluid>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">PerfAnalytic</Navbar.Brand>
        </Navbar>
        <Container>
          <Charts />
        </Container>
      </Container>
    );
  }
  
}

export default App;
