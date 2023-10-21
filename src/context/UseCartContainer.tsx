import { TcartItem } from "../type/TcartItem";
import { useLocalStorage } from "../utils/useLocalStorage";
import { createContainer } from "react-tracked";

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

const useValue = () => {
  return useLocalStorage("my-cartItems", initState);
};

export const { Provider: SharedStateProvider, useTracked: useSharedState } =
  createContainer(useValue);
