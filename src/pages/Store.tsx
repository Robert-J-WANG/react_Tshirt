import React from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { formatCurrency } from "../utils/formatCurrency";
import { useEffect } from "react";
import axios from "axios";
import { setTshirt, useTshirtStore, selectSize } from "../store/tshirtStore";
import { addToCart } from "../store/cartStore";

export default function Store() {
  const tshirt = useTshirtStore((state) => state.tshirt);
  const selectedSize = useTshirtStore((state) => state.selectedSize);
  const active = useTshirtStore((state) => state.active);

  useEffect(() => {
    const getTshirt = async () => {
      await axios
        .get(
          "https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product"
        )
        .then((response) => {
          setTshirt(response.data);
        });
    };
    getTshirt();
  }, []);

  return (
    <Row sm={1} md={2} className="mx-md-5">
      <Col className="px-md-5 ">
        <Image
          src={tshirt.imageURL}
          width={"400px"}
          height={"600px"}
          className="object-fit-cover rounded-4"
        />
      </Col>
      <Col className="tshirt">
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
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    selectSize(size.label);
                  }}
                >
                  {size.label}
                </li>
              );
            })}
          </ul>
        </div>
        <Button
          variant="outline-dark"
          className="w-50"
          onClick={() => {
            addToCart(selectedSize);
          }}
        >
          ADD TO CART
        </Button>
      </Col>
    </Row>
  );
}
