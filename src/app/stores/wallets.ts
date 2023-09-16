import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface WalletState {
  wallet: any;
  account: any;
}

const initialState: WalletState = {
  wallet: null,
  account: { default: 0 },
};

export const WalletSlice = createSlice({
  name: "WalletSlice",
  initialState,
  reducers: {
    updatewallet: (state, action: PayloadAction) => {
      state.wallet = action.payload;
    },
    updateaccount: (state, action: PayloadAction<any>) => {
      state.account = action.payload;
    },
    reset: (state) => {
      state = initialState;
    },
  },
});

export const { reset, updateaccount, updatewallet } = WalletSlice.actions;
const WalletSlicereducer = WalletSlice.reducer;
export default WalletSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";

export const WalletStore = configureStore({
  reducer: {
    wallet: WalletSlicereducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof WalletStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof WalletStore.dispatch;
