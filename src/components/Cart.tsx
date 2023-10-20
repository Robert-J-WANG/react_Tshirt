import { TcartItem } from "../type/TcartItem";

type TCartProps = {
  cartItem: TcartItem;
};
export const Cart = ({ cartItem }: TCartProps) => {
  return (
    <div
      className="d-flex flex-column align-items-end"
      style={{
        position: "absolute",
        top: "0",
        right: "49px",
      }}
    >
      {/* 小凸起 */}
      <div
        style={{
          width: "120px",
          height: "30px",
          border: "2px solid #ccc",
          textAlign: "center",
        }}
      >
        {/* My Cart ( <span>11</span> ) */}
      </div>
      {/* 大盒子 */}
      <div
        style={{
          width: "400px",
          height: "200px",
          border: "2px solid #ccc",
          backgroundColor: "#fff",
        }}
      >
        12121
      </div>
      {/* 遮盖线 */}
      <span
        style={{
          position: "absolute",
          top: "28px",
          right: "2px",
          width: "116px",
          height: "1px",
          border: "3px solid white",
        }}
      ></span>
    </div>
  );
};
