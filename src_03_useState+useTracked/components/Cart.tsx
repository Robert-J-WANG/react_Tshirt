import React from "react";
import { useSharedState } from "../context/UseCartContainer";
import { formatCurrency } from "../utils/formatCurrency";

export const Cart = () => {
  const [state, setState] = useSharedState();
  const { cartItems } = state;
  return (
    <div
      className="d-flex flex-column align-items-end"
      style={{
        position: "absolute",
        top: "29px",
        right: "50px",
      }}
    >
      {/* 大盒子 */}
      <div
        style={{
          width: "400px",
          border: "2px solid #ccc",
          backgroundColor: "#fff",
          padding: "20px",
        }}
      >
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="d-flex gap-5 my-3">
              <img
                src={item.imageURL}
                alt=""
                style={{
                  height: "150px",
                }}
              />
              <div>
                <p>{item.title}</p>
                <p>
                  {item.count} x{" "}
                  <span className="text-black fw-bold">
                    {formatCurrency(item.price)}
                  </span>
                </p>
                <p>size: {item.size}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* 遮盖线 */}
      <span
        style={{
          position: "absolute",
          top: "-1px",
          right: "2px",
          width: "114px",
          height: "1px",
          border: "3px solid #fff",
        }}
      ></span>
    </div>
  );
};
