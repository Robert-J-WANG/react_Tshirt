import axios from "axios";
import "../app.css";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type CartContextProps = {
  shirt: ShirtProps;
  handleChangeCursor: (event: React.MouseEvent) => void;
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

  const handleChangeCursor = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains("size")) {
      target.classList.add("sizeActive");
    }
  };

  return (
    <cartContext.Provider value={{ shirt, handleChangeCursor }}>
      {children}
    </cartContext.Provider>
  );
}

export function useCartContext() {
  return useContext(cartContext);
}
