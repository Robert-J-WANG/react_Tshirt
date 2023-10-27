import React from "react";
import { formatCurrency } from "../utils/formatCurrency";
import {
  MdAddShoppingCart,
  MdDeleteSweep,
  MdRemoveShoppingCart,
} from "react-icons/md";
import {
  decreaseItem,
  increaseItem,
  removeItem,
  useCartStore,
} from "../store/cartStore";

export const Cart = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const totalPrice = useCartStore((state) => state.totalPrice);
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
            <li key={item.id} className="cart-item">
              <img
                src={item.imageURL}
                alt=""
                style={{
                  height: "150px",
                }}
              />
              <div className="d-flex flex-column justify-content-center">
                <p>{item.title}</p>
                <p>
                  {item.count} x{" "}
                  <span className="text-black fw-bold">
                    {formatCurrency(item.price)}
                  </span>
                </p>
                <p>size: {item.size}</p>
              </div>
              <div className="d-flex flex-column gap-2 justify-content-center align-items-center">
                <MdAddShoppingCart
                  style={{
                    width: "30px",
                    height: "30px",
                    color: "darkblue",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    increaseItem(item.id);
                  }}
                />
                <MdRemoveShoppingCart
                  style={{
                    width: "30px",
                    height: "30px",
                    color: "darkgoldenrod",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    decreaseItem(item.id);
                  }}
                />
                <MdDeleteSweep
                  style={{
                    width: "30px",
                    height: "30px",
                    color: "darkred",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    removeItem(item.id);
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
        <p className="d-flex justify-content-between align-items-center mx-2">
          <span>Total Price:</span>
          <span className="fw-bolder">{formatCurrency(totalPrice)}</span>
        </p>
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
