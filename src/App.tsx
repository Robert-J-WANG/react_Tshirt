import React from "react";
import { Container } from "react-bootstrap";
import Store from "./pages/Store";
import NavBar from "./components/NavBar";

export const App = () => {
  return (
    <>
      <NavBar />
      <Container>
        <Store />
      </Container>
    </>
  );
};
