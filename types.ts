export interface RootState {
  products: ProductState;
  cart: CartState;
}
export interface Product {
  id: number;
  name: string;
  price: number;
}
interface ProductState {
  loading: boolean;
  data: Product[];
  error: string | null;
}

interface CartState {
  items: Product[];
}
