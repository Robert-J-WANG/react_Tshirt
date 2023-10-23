import React from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { formatCurrency } from "../utils/formatCurrency";
import { useSharedState } from "../context/UseCartContainer";
import { nanoid } from "nanoid";
import { TcartItem } from "../type/TcartItem";
import { useEffect } from "react";
import axios from "axios";

export default function Store() {
  /* ------------- //bug: 刷新页面后，本地存储的数据渲染到页面， ------------- */
  /* ------------ 选择size,点击add按钮，更新item的count。 ------------ */
  /* ----------- 但是此时，如果不选择size(默认的是上次选择的size)， ----------- */
  /* ----------------- 再次点击add按钮时，功能失效？？？ ----------------- */

  /* ------------------ //hack:找到了bug的原因： ----------------- */
  // 1. 使用本地存储的钩子里，useEffect里存储到本地的功能发生的条件是，当有key（存储数据的名字）或value（整个状态数据）发生变化时
  // 2. 当第二次点击添加按钮之前，没有选择size（默认的是上次的size），导致状态数据没有任何变化，所以，保存到本地的功能未触发
  // 3. 当第二次点击添加按钮是， 渲染到页面的数据是本地存储里的（第一次点击完成时生成的数据）相同的数据

  /* --------------------- //Rbt：解决方案 --------------------- */
  // 1. 如果不选择size的话，让其他数据发生变化，从而引起整个state的变化
  // 2. 更新count时，先让原状态里的count自增1（++count)
  // 3. 再将++count的值赋给count变量，并替换将原来的count
  // 4. 如果是count++的话，原来的状态还是没有变化，不会触发保存到本地的功能

  /*
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]); 

  */

  const [state, setState] = useSharedState();
  const { tshirt, selectedSize, active } = state;
  // 存在//bug的页面初始化:
  /* --------- 页面初次渲染，获取api数据，并存储到state的tshirt对象中 --------- */
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
  /* ----------------------- 选择型号的回调 ---------------------- */
  const selectSize = (label: string) => {
    setState((prevState) => ({
      ...prevState,
      selectedSize: label!,
      active: label!,
    }));
  };
  /* ---------------------- 添加到购物车的回调 --------------------- */
  const addToCart = () => {
    if (state.selectedSize === "") {
      alert("Please choose your size.");
    } else {
      const newItem = {
        id: nanoid(),
        imageURL: state.tshirt.imageURL,
        title: state.tshirt.title,
        count: 1,
        price: state.tshirt.price,
        size: state.selectedSize,
      };

      const itemIndex = state.cartItems.findIndex(
        (item: TcartItem) => item.size === state.selectedSize
      );

      if (itemIndex !== -1) {
        // If the selectedSize matches an existing item, increase the count
        const updatedItems = state.cartItems.map((item) => {
          if (item.size === state.selectedSize) {
            // console.log(item);
            // hack:这里解决了bug：item.count增1后，赋值给count
            return { ...item, count: ++item.count };
            // bug:如果写成这样，会有bug，count没有更新，应为原count一直没变
            // return { ...item, count: item.count + 1 };
          } else {
            return item;
          }
        });
        // console.log(updatedItems);

        setState((prevState) => ({
          ...prevState,
          cartItems: updatedItems,
        }));
      } else {
        // If the selectedSize is new, add it to the cartItems array
        setState((prevState) => ({
          ...prevState,
          cartItems: [...prevState.cartItems, newItem],
        }));
      }
    }

    // 更新商品总数
    setState((prevState) => ({
      ...prevState,
      // reduce就和
      totalCount: prevState.cartItems.reduce(
        (prev, item) => prev + item.count,
        0
      ),
    }));
  };

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
        <p>{Math.random()}</p>
      </Col>
    </Row>
  );
}
