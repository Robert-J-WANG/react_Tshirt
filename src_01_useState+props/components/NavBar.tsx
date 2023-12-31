import { Container, Navbar as NavBarBs } from "react-bootstrap";
import { TcartItem } from "../type/TcartItem";
import { Cart } from "./Cart";
import React from "react";

type NavBarProps = {
  cartItems: TcartItem[];
  isOpen: boolean;
  openCart: () => void;
  totalCount: number;
};

export default function NavBar({
  cartItems,
  isOpen,
  openCart,
  totalCount,
}: NavBarProps) {
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
            onClick={openCart}
          >
            My Cart ( <span>{totalCount}</span> )
          </div>
          {isOpen ? <Cart cartItems={cartItems} /> : ""}
        </div>
      </Container>
    </NavBarBs>
  );
}
