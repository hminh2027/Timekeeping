import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getMyTickets,
  cancelMyTicket,
  addMyTicket,
} from "@/api/service/ticket.service";
const initialState = {
  tickets: [],
};

export const cancelTicket = createAsyncThunk(
  "ticket/cancelMyTicket",
  async (ticketID) => {
    try {
      console.log("ID:", ticketID);
      await cancelMyTicket(ticketID);
      const response = await getMyTickets();
      return response;
    } catch (error) {
      console.error("Error occur while cancelling ticket: ", error);
    }
  }
);

export const addTicket = createAsyncThunk(
  "ticket/addTicket",
  async (ticketContent) => {
    console.log("TICKET:", ticketContent);
    try {
      await addMyTicket(ticketContent);
      const response = await getMyTickets();
      return response;
    } catch (error) {
      console.error("Error occur while adding ticket: ", error);
    }
  }
);

export const fetchMyTickets = createAsyncThunk(
  "ticket/getMyTicket",
  async (sortOptions) => {
    try {
      const response = await getMyTickets(sortOptions);
      return response; // console.log("RES trong redux:", res);
      // return res;
    } catch (error) {
      console.error("Error occur while fetching tickets: ", error);
    }
  }
);


export const ticketSlice = createSlice({
  name: "ticket",
  initialState,

  reducers: {
    setTickets: (state, action) => {
      const tickets = action.payload;
      return { ...state, tickets };
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchMyTickets.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.tickets = action.payload;
    });
    builder.addCase(cancelTicket.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.tickets = action.payload;
    });
    builder.addCase(addTicket.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.tickets = action.payload;
    });
  },
});

export const { setTickets } = ticketSlice.actions;

export const selectTicket = (state) => state.ticket;

//Selectors
export const selectTickets = (state) => state.ticket.tickets;

export default ticketSlice.reducer;
