import React, { useState } from "react";
import axios from "axios";
import { ReactNode, createContext, useContext, useEffect } from "react";
import { TcartItem } from "../type/TcartItem";
import { nanoid } from "nanoid";
// import { useLocalStorage } from "../utils/useLocalStorage";

type CartContextProviderProps = {
  children: ReactNode;
};

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
  selectedSize: "",
  isOpen: false,
  active: "",
  totalCount: 0,
};

type CreateContextPrpos = {
  state: typeof initState;
  openCart: () => void;
  selectSize: (label: string) => void;
  addToCart: () => void;
};
const cartContext = createContext({} as CreateContextPrpos);
export function CartContextProvider({ children }: CartContextProviderProps) {
  // 使用本地存储功能
  // const [state, setState] = useLocalStorage("my-cartItems", initState);

  // 没有本地存储
  const [state, setState] = useState(initState);
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
    <cartContext.Provider value={{ state, openCart, selectSize, addToCart }}>
      {children}
    </cartContext.Provider>
  );
}

export function useCartContext() {
  return useContext(cartContext);
}
