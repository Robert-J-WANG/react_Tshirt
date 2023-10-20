import { TcartItem } from "../type/TcartItem";
import { formatCurrency } from "../utils/formatCurrency";

type TCartProps = {
  cartItems: TcartItem[];
};
export const Cart = ({ cartItems }: TCartProps) => {
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
          // height: "200px",
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
