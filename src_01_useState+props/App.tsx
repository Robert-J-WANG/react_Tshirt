import { Container } from "react-bootstrap";
import Store from "./pages/Store";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import { TcartItem } from "./type/TcartItem";
import { useLocalStorage } from "./utils/useLocalStorage";
import React from "react";

const initState = {
  tshirt: {
    description: "",
    id: 0,
    imageURL: "",
    price: 0,
    sizeOptions: [{ id: 0, label: "" }],
    title: "",
  },

  cartItems: [] as TcartItem[], // 显式指定类型为 TcartItem[]的空数组
  // cartItems: [
  //   { id: "", imageURL: "", title: "", count: 0, price: 0, size: "" },
  // ], // 这样写的话，cartItems数组不是空数组，页面一加载，里面就有一个初始化的对象元素
  selectedSize: "",
  isOpen: false,
  active: "",
  totalCount: 0,
};

function App() {
  // 使用本地存储功能
  const [state, setState] = useLocalStorage("my-cartItems", initState);
  // 没有本地存储
  // const [state, setState] = useState(initState);
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

  // 封装存储到本地数据和读取本地数据为自定义钩子useLocalStorage

  /* ------------------ 存储状态数据到本地 ----------------- */
  /* ---------- 每次cartItems的变化，都触发useEffect函数的调用 ---------- */
  // useEffect(() => {
  //   const stateJSON = JSON.stringify(state || initState);
  //   localStorage.setItem("cartState", stateJSON);
  // }, [state]);

  /* ---------------------- 读取本地存储的回调 --------------------- */
  // const getLocalState = () => {
  //   const getcartState: string | null = localStorage.getItem("cartState");
  //   let localState = {};
  //   if (getcartState !== null) {
  //     localState = JSON.parse(getcartState);
  //     console.log(localState);
  //   } else {
  //     return;
  //   }
  //   return localState;
  // };

  /* ---------------------- 开关购物车的回调 ---------------------- */
  const openCart = () => {
    setState((prevState) => ({
      ...prevState,
      isOpen: !prevState.isOpen,
    }));
  };
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
            return { ...item, count: item.count + 1 };
          }
          return item;
        });

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
    <>
      <NavBar {...state} openCart={openCart} />
      <Container>
        <Store {...state} addToCart={addToCart} selectSize={selectSize} />
      </Container>
    </>
  );
}

export default App;
