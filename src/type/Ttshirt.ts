interface SizeOptions {
  id: number;
  label: string;
}

export type Ttshirt = {
  description: string;
  id: number;
  imageURL: string;
  price: number;
  sizeOptions: SizeOptions[];
  title: string;
};
