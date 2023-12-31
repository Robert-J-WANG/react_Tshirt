import { Container } from "react-bootstrap";
import Store from "./pages/Store";
import NavBar from "./components/NavBar";
import React from "react";

function App() {
  return (
    <>
      <NavBar />
      <Container>
        <Store />
      </Container>
    </>
  );
}

export default App;
