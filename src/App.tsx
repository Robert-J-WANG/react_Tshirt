import { Container } from "react-bootstrap";
import Store from "./pages/Store";
import NavBar from "./components/NavBar";
import { CartContextProvider } from "./context/UseCartContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import { TcartItem } from "./type/TcartItem";

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
  const [state, setState] = useState(initState);
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
  // 开关购物车的回调
  const openCart = () => {
    setState((prevState) => ({
      ...prevState,
      isOpen: !prevState.isOpen,
    }));
  };

  const selectSize = (id: number) => {
    const res = state.tshirt.sizeOptions.find((option) => option.id === id);
    if (res) {
      setState((prevState) => ({
        ...prevState,
        selectedSize: res.label!,
        active: res.label!,
      }));
    }
  };

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
    <CartContextProvider>
      <NavBar {...state} openCart={openCart} />
      <Container>
        <Store {...state} addToCart={addToCart} selectSize={selectSize} />
      </Container>
    </CartContextProvider>
  );
}

export default App;
