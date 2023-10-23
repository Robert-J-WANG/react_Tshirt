import { Button, Col, Image, Row } from "react-bootstrap";
import { formatCurrency } from "../utils/formatCurrency";
import { useCartContext } from "../context/UseCartContext";
import React from "react";

export default function Store() {
  const {
    state: { tshirt, active, selectedSize },
    selectSize,
    addToCart,
  } = useCartContext();
  return (
    <Row sm={1} md={2} className="mx-md-5">
      <Col className="px-md-5">
        <Image
          src={tshirt.imageURL}
          width={"400px"}
          height={"600px"}
          className="object-fit-cover"
        />
      </Col>
      <Col className="d-flex flex-column gap-4 px-md-5">
        <h2>{tshirt.title}</h2>
        <h4>{formatCurrency(tshirt.price)}</h4>
        <p>{tshirt.description}</p>
        {/* size part */}
        <div>
          <h5>
            SIZE{" "}
            <span
              style={{
                color: "red",
              }}
            >
              *
            </span>{" "}
            {selectedSize}
          </h5>
          <ul className="d-flex justify-content-start align-items-center gap-2 ">
            {tshirt.sizeOptions.map((size) => {
              return (
                <li
                  key={size.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "3rem",
                    height: "3rem",
                    border:
                      active === size.label
                        ? "2px solid #000"
                        : "1px solid #999",
                    color: active === size.label ? "#000" : "#999",
                    cursor: "pointer",
                  }}
                  onClick={() => selectSize(size.label)}
                >
                  {size.label}
                </li>
              );
            })}
          </ul>
        </div>
        <Button variant="outline-dark" className="w-50" onClick={addToCart}>
          ADD TO CART
        </Button>
      </Col>
    </Row>
  );
}
