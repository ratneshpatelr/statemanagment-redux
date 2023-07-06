import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { fetchproducts } from "./fakeApi";

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

const initialState: ProductState = {
  loading: false,
  data: [],
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProductsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess(state, action: PayloadAction<Product[]>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchProductsfailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsfailure,
} = productsSlice.actions;

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  } as CartState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      state.items.push(action.payload);
    },
    removeFromcart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToCart, removeFromcart } = cartSlice.actions;

export const fetchProductsAsync = (): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchProductsStart());
    const products = await fetchproducts();
    dispatch(fetchProductsSuccess(products as any));
  } catch (error) {
    // @ts-ignore
    dispatch(fetchProductsfailure(error.message));
  }
};

const rootReducer = {
  products: productsSlice.reducer,
  cart: cartSlice.reducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export type AppDisptach = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDisptach>();
// @ts-ignore
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
