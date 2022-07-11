import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./feature/user/userSlice";
import menuSlice from "./feature/layout/menuSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    menu: menuSlice,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: true }),
});
