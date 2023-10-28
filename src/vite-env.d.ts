/// <reference types="vite/client" />

type TcartItem = {
  id: string;
  imageURL: string;
  title: string;
  count: number;
  price: number;
  size: string;
};

interface SizeOptions {
  id: number;
  label: string;
}

type Ttshirt = {
  description: string;
  id: number;
  imageURL: string;
  price: number;
  sizeOptions: SizeOptions[];
  title: string;
};
