import { Container } from "react-bootstrap";
import Store from "./pages/Store";
import NavBar from "./components/NavBar";
import { CartContextProvider } from "./context/UseCartContext";

function App() {
  return (
    <CartContextProvider>
      <NavBar />
      <Container>
        <Store />
      </Container>
    </CartContextProvider>
  );
}

export default App;
