import { TcartItem } from "../type/TcartItem";
import { createContainer } from "react-tracked";
import { nanoid } from "nanoid";
import { Ttshirt } from "../type/Ttshirt";
import { ImmerReducer, useImmerReducer } from "use-immer";

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
const reducer: ImmerReducer<typeof initState, Taction> = (state, action) => {
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
        alert("Please choose your size.");
        break;
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
      state.cartItems = updatedCartItems;
      state.totalCount = updatedTotalCount;
      break;
    default:
      break;
  }
};

const useValue = () => {
  // 不使用本地存储
  return useImmerReducer(reducer, initState);
};

export const { Provider: SharedStateProvider, useTracked: useSharedState } =
  createContainer(useValue);
