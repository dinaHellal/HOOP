export type Product = {
  id: string | number;
    title: string;
  price:string | number;
  toFixed?:  number| string;
  image: string;
  description: string;
  quantity?: number;
    paymentLink?: string;

};
