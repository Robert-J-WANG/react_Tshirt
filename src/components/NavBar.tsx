import React from "react";
import { Container, Navbar as NavBarBs } from "react-bootstrap";
import { Cart } from "./Cart";
import { useSharedState } from "../context/UseCartContainer";

export default function NavBar() {
  const [state, dispatch] = useSharedState();
  const { isOpen, totalCount } = state;
  return (
    <NavBarBs>
      <Container className="bg-light shadow-sm mb-5 d-flex justify-content-end align-items-center">
        <div
          style={{
            position: "relative",
            paddingRight: "50px",
          }}
        >
          <div
            style={{
              width: "118px",
              height: "30px",
              lineHeight: "30px",
              textAlign: "center",
              backgroundColor: isOpen ? "white" : "",
              border: isOpen ? "2px solid #ccc" : "",
              cursor: "pointer",
            }}
            onClick={() => {
              dispatch({ type: "OPEN_CART", payload: isOpen });
            }}
          >
            My Cart ( <span>{totalCount}</span> )
          </div>
          {isOpen ? <Cart /> : ""}
        </div>
        <p>{Math.random()}</p>
      </Container>
    </NavBarBs>
  );
}
