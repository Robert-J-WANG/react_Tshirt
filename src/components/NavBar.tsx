import React from "react";
import { Container, Navbar as NavBarBs } from "react-bootstrap";
import { Cart } from "./Cart";
import { openCart, useCartStore } from "../store/cartStore";

export default function NavBar() {
  const isOpen = useCartStore((state) => state.isOpen);
  const totalCount = useCartStore((state) => state.totalCount);
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
              openCart(isOpen);
            }}
          >
            My Cart ( <span>{totalCount}</span> )
          </div>
          {isOpen ? <Cart /> : ""}
        </div>
      </Container>
    </NavBarBs>
  );
}
