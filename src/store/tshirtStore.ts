import { create } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const initState = {
  tshirt: {
    description: "",
    id: 0,
    imageURL: "",
    price: 0,
    sizeOptions: [{ id: 0, label: "" }],
    title: "",
  },
  selectedSize: "",
  isOpen: false,
  active: "",
  totalCount: 0,
  totalPrice: 0,
};

export const useTshirtStore = create<typeof initState>()(
  immer(
    devtools(
      subscribeWithSelector(
        persist(() => initState, {
          name: "TshirtStore",
        })
      ),
      {
        name: "TshirtStore",
      }
    )
  )
);

export const setTshirt = (newTshirt: typeof initState.tshirt) => {
  useTshirtStore.setState((state) => {
    state.tshirt = newTshirt;
  });
};

export const selectSize = (size: string) => {
  useTshirtStore.setState((state) => {
    state.selectedSize = size;
    state.active = size;
  });
};
