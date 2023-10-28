import { createContainer } from "react-tracked";
import { ImmerReducer, useImmerReducer } from "use-immer";
import { Ttshirt } from "../type/Ttshirt";
import { TcartItem } from "../type/TcartItem";
import { nanoid } from "nanoid";

const initValue = {
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
  totalPrice: 0,
};
type Taction =
  | { type: "SET_TSHIRT"; payload: Ttshirt }
  | { type: "OPEN_CART"; payload: boolean }
  | { type: "SELECT_SIZE"; payload: string }
  | { type: "ADD_TO_CART" }
  | { type: "INCREASE_ITEM"; payload: string }
  | { type: "DECREASE_ITEM"; payload: string }
  | { type: "DELETE_ITEM"; payload: string };

const updateTotalCount = (cartItems: TcartItem[]) => {
  return cartItems.reduce((prevCount, item) => prevCount + item.count, 0);
};
const updateTotalPrice = (cartItems: TcartItem[]) => {
  return cartItems.reduce(
    (prevPrice, item) => prevPrice + item.count * item.price,
    0
  );
};

const reducer: ImmerReducer<typeof initValue, Taction> = (state, action) => {
  switch (action.type) {
    case "SET_TSHIRT":
      state.tshirt = action.payload;
      break;
    case "OPEN_CART":
      state.isOpen = !action.payload;
      break;
    case "SELECT_SIZE":
      state.selectedSize = action.payload;
      state.active = action.payload;
      break;
    case "ADD_TO_CART":
      if (state.selectedSize === "") {
        alert("please select a size");
        break;
      }
      const sizeIndex = state.cartItems.findIndex(
        (item) => item.size === state.selectedSize
      );
      if (sizeIndex !== -1) {
        state.cartItems[sizeIndex].count += 1;
      } else {
        state.cartItems.push({
          id: nanoid(),
          imageURL: state.tshirt.imageURL,
          title: state.tshirt.title,
          count: 1,
          price: state.tshirt.price,
          size: state.selectedSize,
        });
      }
      state.totalCount = updateTotalCount(state.cartItems);
      state.totalPrice = updateTotalPrice(state.cartItems);
      break;
    case "INCREASE_ITEM":
      state.cartItems.find((item) => item.id === action.payload)!.count += 1;
      state.totalCount = updateTotalCount(state.cartItems);
      state.totalPrice = updateTotalPrice(state.cartItems);
      break;
    case "DECREASE_ITEM":
      const itemToDecrease = state.cartItems.find(
        (item) => item.id === action.payload
      );

      if (itemToDecrease!.count > 0) {
        itemToDecrease!.count -= 1;
      }
      state.totalCount = updateTotalCount(state.cartItems);
      state.totalPrice = updateTotalPrice(state.cartItems);
      break;
    case "DELETE_ITEM":
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      state.totalCount = updateTotalCount(state.cartItems);
      state.totalPrice = updateTotalPrice(state.cartItems);
      // 删掉所有的item时，关闭购物车
      state.isOpen = state.cartItems.length === 0 ? false : true;
      break;
    default:
      break;
  }
  localStorage.setItem("my-shirt", JSON.stringify(state));
};

const initAction = () => {
  const res = localStorage.getItem("my-shirt");
  return res ? JSON.parse(res) : initValue;
};

const useValue = () => {
  return useImmerReducer(reducer, initValue, initAction);
};
const container = createContainer(useValue);
export const { Provider: SharedStateProvider, useTracked: useSharedState } =
  container;
