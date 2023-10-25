import { Container } from "react-bootstrap";
import Store from "./pages/Store";
import NavBar from "./components/NavBar";

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
