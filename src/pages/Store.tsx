import { Button, Col, Image, Row } from "react-bootstrap";
import { useCartContext } from "../context/UseCartContext";
import { formatCurrency } from "../utils/formatCurrency";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Store() {
  const { shirt } = useCartContext();
  return (
    <Row sm={1} md={2} className="mx-md-5">
      <Col className="px-md-5">
        <Image
          src={shirt.imageURL}
          width={"400px"}
          height={"600px"}
          className="object-fit-cover"
        />
      </Col>
      <Col className="d-flex flex-column gap-4 px-md-5">
        <h2>{shirt.title}</h2>
        <h4>{formatCurrency(shirt.price)}</h4>
        <p>{shirt.description}</p>
        <div>
          <h5>
            SIZE{" "}
            <span
              style={{
                color: "red",
              }}
            >
              *
            </span>
          </h5>
          <div className="d-flex justify-content-start align-items-center gap-2">
            {shirt.sizeOptions &&
              shirt.sizeOptions.map((size) => {
                return (
                  <span
                    key={size.id}
                    style={{
                      width: "3rem",
                      height: "3rem",
                      border: "1px solid #999",
                      color: "#999",
                    }}
                    className="d-flex justify-content-center align-items-center "
                  >
                    {size.label}
                  </span>
                );
              })}
          </div>
        </div>
        <Button variant="outline-dark" className="w-50">
          ADD TO CART
        </Button>
      </Col>
    </Row>
  );
}
