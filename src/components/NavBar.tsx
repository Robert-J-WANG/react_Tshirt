import { Container, Navbar as NavBarBs } from "react-bootstrap";
import { TcartItem } from "../type/TcartItem";
import { Cart } from "./Cart";

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
  console.log(totalCount);
  return (
    <NavBarBs>
      <Container className="bg-light shadow-sm mb-5 d-flex justify-content-end align-items-center">
        <div
          onClick={openCart}
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
              boxSizing: "border-box",
              backgroundColor: isOpen ? "white" : "",
            }}
          >
            My Cart ( <span>{totalCount}</span> )
          </div>
          {isOpen ? <Cart cartItems={cartItems} /> : ""}
        </div>
      </Container>
    </NavBarBs>
  );
}
