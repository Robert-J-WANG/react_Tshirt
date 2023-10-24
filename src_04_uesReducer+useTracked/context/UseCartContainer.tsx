import { TcartItem } from "../type/TcartItem";
import { createContainer } from "react-tracked";
import { nanoid } from "nanoid";
import { Reducer, useReducer } from "react";
import { Ttshirt } from "../type/Ttshirt";

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
type Taction =
  | { type: "SET_TSHIRT"; payload: Ttshirt }
  | { type: "OPEN_CART"; payload: boolean }
  | { type: "SELECT_SIZE"; payload: string }
  | { type: "ADD_TO_CART" };
const reducer: Reducer<typeof initState, Taction> = (state, action) => {
  switch (action.type) {
    case "SET_TSHIRT":
      return {
        ...state,
        tshirt: action.payload,
      };
    case "OPEN_CART":
      return {
        ...state,
        isOpen: !action.payload,
      };
    case "SELECT_SIZE":
      return {
        ...state,
        selectedSize: action.payload,
        active: action.payload,
      };
    case "ADD_TO_CART":
      if (state.selectedSize === "") {
        alert("Please choose your size.");
        return state;
      }

      const itemIndex = state.cartItems.findIndex(
        (item) => item.size === state.selectedSize
      );
      const updatedCartItems = [...state.cartItems];

      if (itemIndex !== -1) {
        updatedCartItems[itemIndex].count++;
      } else {
        updatedCartItems.push({
          id: nanoid(),
          imageURL: state.tshirt.imageURL,
          title: state.tshirt.title,
          count: 1,
          price: state.tshirt.price,
          size: state.selectedSize,
        });
      }

      const updatedTotalCount = updatedCartItems.reduce(
        (prev, item) => prev + item.count,
        0
      );

      return {
        ...state,
        cartItems: updatedCartItems,
        totalCount: updatedTotalCount,
      };

    default:
      return state;
  }
};

const useValue = () => {
  // 不使用本地存储
  return useReducer(reducer, initState);
};

export const { Provider: SharedStateProvider, useTracked: useSharedState } =
  createContainer(useValue);
