import axios from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type CartContextProps = {
  shirt: ShirtProps;
};
type CartContextProviderProps = {
  children: ReactNode;
};
type SizeOptions = {
  id: number;
  label: string;
};
type ShirtProps = {
  id: number;
  description: string;
  imageURL: string;
  price: number;
  title: string;
  sizeOptions: SizeOptions[];
};
const cartContext = createContext({} as CartContextProps);

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [shirt, setShirt] = useState({} as ShirtProps);
  useEffect(() => {
    async function fetchData() {
      const response = await axios
        .get(
          "https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product"
        )
        .then((response) => {
          return response;
        });
      setShirt(response.data);
    }
    fetchData();
  }, []);

  return (
    <cartContext.Provider value={{ shirt }}>{children}</cartContext.Provider>
  );
}

export function useCartContext() {
  return useContext(cartContext);
}
