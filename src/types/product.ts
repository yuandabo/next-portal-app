export interface Product {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
}

export interface Category {
  slug: string;
  name: string;
  description?: string;
  products: Product[];
}
