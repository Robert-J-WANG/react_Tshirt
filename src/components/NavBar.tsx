import React from "react";
import { Container, Navbar as NavBarBs } from "react-bootstrap";

export default function NavBar() {
  return (
    <NavBarBs>
      <Container className="bg-light shadow-sm mb-5 d-flex justify-content-end align-items-center">
        <div className="me-5">
          My Cart ( <span>9</span> )
        </div>
      </Container>
    </NavBarBs>
  );
}
