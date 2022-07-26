import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./feature/user/userSlice";
import menuSlice from "./feature/layout/menuSlice";
import ticketSlice from "./feature/ticket/ticketSlice";
import ticketsSlice from "./feature/admin/tickets";
export const store = configureStore({
  reducer: {
    user: userSlice,
    menu: menuSlice,
    ticket: ticketSlice,
    adminTicket: ticketsSlice,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: true }),
});
