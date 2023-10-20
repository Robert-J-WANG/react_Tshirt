import { Container, Navbar as NavBarBs } from "react-bootstrap";
import { TcartItem } from "../type/TcartItem";
import { Ttshirt } from "../type/Ttshirt";
import { Cart } from "./Cart";

type NavBarProps = {
  tshirt: Ttshirt;
  cartItem: TcartItem;
  isOpen: boolean;
  openCart: () => void;
};

export default function NavBar({
  tshirt,
  cartItem,
  isOpen,
  openCart,
}: NavBarProps) {
  // console.log(isOpen);
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
            My Cart ( <span>10</span> )
          </div>
          {isOpen ? <Cart cartItem={cartItem} /> : ""}
        </div>
      </Container>
    </NavBarBs>
  );
}
