import { create } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { TcartItem } from "../type/TcartItem";
import { useTshirtStore } from "./tshirtStore";
import { nanoid } from "nanoid";

const initState = {
  isOpen: false,
  totalCount: 0,
  totalPrice: 0,
  cartItems: [] as TcartItem[],
};

export const useCartStore = create<typeof initState>()(
  immer(
    devtools(
      subscribeWithSelector(
        persist(() => initState, {
          name: "cartStore",
        })
      ),
      {
        name: "cartStore",
      }
    )
  )
);

export const openCart = (isOpen: boolean) => {
  useCartStore.setState((state) => {
    state.isOpen = !isOpen;
  });
};

export const addToCart = (selectedSize: string) => {
  const tshirt = useTshirtStore.getState().tshirt;
  if (selectedSize === "") {
    alert("Please select a size");
  }
  useCartStore.setState((state) => {
    const sizeIndex = state.cartItems.findIndex(
      (item) => item.size === selectedSize
    );
    if (sizeIndex === -1) {
      const updatedItem: TcartItem = {
        id: nanoid(),
        imageURL: tshirt.imageURL,
        title: tshirt.title,
        count: 1,
        price: tshirt.price,
        size: selectedSize,
      };
      state.cartItems.push(updatedItem);
    } else {
      state.cartItems[sizeIndex].count++;
    }
    state.totalCount = updateTotalCount(state.cartItems);
    state.totalPrice = updateTotalPrice(state.cartItems);
  });
};

export const increaseItem = (id: string) => {
  useCartStore.setState((state) => {
    state.cartItems.find((item) => item.id === id)!.count += 1;
    state.totalCount = updateTotalCount(state.cartItems);
    state.totalPrice = updateTotalPrice(state.cartItems);
  });
};

export const decreaseItem = (id: string) => {
  useCartStore.setState((state) => {
    const itemToDecrease = state.cartItems.find((item) => item.id === id);

    if (itemToDecrease!.count > 0) {
      itemToDecrease!.count -= 1;
    }
    state.totalCount = updateTotalCount(state.cartItems);
    state.totalPrice = updateTotalPrice(state.cartItems);
  });
};

export const removeItem = (id: string) => {
  useCartStore.setState((state) => {
    state.cartItems = state.cartItems.filter((item) => item.id !== id);
    state.totalCount = updateTotalCount(state.cartItems);
    state.totalPrice = updateTotalPrice(state.cartItems);
    // 删掉所有的item时，关闭购物车
    state.isOpen = state.cartItems.length === 0 ? false : true;
  });
};

const updateTotalCount = (cartItems: TcartItem[]) => {
  return cartItems.reduce((prevCount, item) => prevCount + item.count, 0);
};
const updateTotalPrice = (cartItems: TcartItem[]) => {
  return cartItems.reduce(
    (prevPrice, item) => prevPrice + item.count * item.price,
    0
  );
};
