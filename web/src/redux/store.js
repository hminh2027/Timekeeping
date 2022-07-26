import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./feature/user/userSlice";
import menuSlice from "./feature/layout/menuSlice";
import ticketSlice from "./feature/ticket/ticketSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    menu: menuSlice,
    ticket: ticketSlice,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: true }),
});
