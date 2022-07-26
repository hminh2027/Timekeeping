import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTickets } from "@/api/service/ticket.service";
const initialState = {
  tickets: [],
};

export const fetchTickets = createAsyncThunk(
  "ticket/getTicket",
  async (sortOptions) => {
    try {
      const response = await getTickets(sortOptions);
      return response;
    } catch (error) {
      console.error("Error occur while fetching tickets: ", error);
    }
  }
);

export const ticketsSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    setTickets: (state, action) => {
      const tickets = action.payload;
      return { ...state, tickets };
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchTickets.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.tickets = action.payload;
      console.log("TICKETS:", state.tickets);
    });
  },
});

export const { setTickets } = ticketsSlice.actions;

export const selectTicket = (state) => state.tickets;

//Selectors
export const selectTickets = (state) => state.tickets.tickets;

export default ticketsSlice.reducer;
