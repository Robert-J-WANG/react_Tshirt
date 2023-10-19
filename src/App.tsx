import { Container } from "react-bootstrap";
import Store from "./pages/Store";
import NavBar from "./components/NavBar";
import { CartContextProvider } from "./context/UseCartContext";
import { useEffect, useState } from "react";
import axios from "axios";

const initState = {
  tshirt: {
    description: "",
    id: 0,
    imageURL: "",
    price: 0,
    sizeOptions: [{ id: 0, label: "" }],
    title: "",
  },
  cartItems: [
    // {
    //   title: "",
    //   count: 0,
    //   price: 0,
    //   size: "",
    // },
  ],
  isOpen: false,
};

function App() {
  const [state, setState] = useState(initState);
  useEffect(() => {
    const getTshirt = async () => {
      await axios
        .get(
          "https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product"
        )
        .then((response) => {
          setState((prevState) => ({
            ...prevState,
            tshirt: response.data,
          }));
        });
    };
    getTshirt();
  }, []);
  const openCart = () => {
    setState((prevState) => ({
      ...prevState,
      isOpen: !prevState.isOpen,
    }));
  };
  return (
    <CartContextProvider>
      <NavBar {...state} openCart={openCart} />
      <Container>{/* <Store tshirt={state.tshirt} /> */}</Container>
    </CartContextProvider>
  );
}

export default App;
