export type Product = {
  id: string | number;
    title: string;
  price:string | number;
  toFixed?:  number| string;
  image: string;
    // images: string;
  description: string;
  quantity?: number;
    paymentLink?: string;

};
