import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { 
  getTickets,
  cancelTicket,
  approveTicket,
  rejectTicket,
} from "@/api/service/ticket.service";
const initialState = {
  tickets: [],
};

export const fetchTickets = createAsyncThunk(
    "ticket/getTicket",
    async (sortOptions) => {
        try {
          const response = await getTickets(sortOptions);
          console.log("RESPONSE", response)
          return response; 
        } catch (error) {
          console.error("Error occur while fetching tickets: ", error);
        }
    }
  );

        }
        catch (error) {
          console.error("Error occur while cancelling ticket: ", error);
        }
      }
)

export const cancelTickets = createAsyncThunk (
  "ticket/cancelTicket",
  async (ticketID) => {
    try{
      await cancelTicket(ticketID);
      const response = await getTickets();
      return response
    }
    catch (error) {
      console.error("Error occur while cancelling ticket: ", error);
    }
  }
)

export const approveTickets = createAsyncThunk (
  "ticket/approveTicket",
  async (ticketID) => {
    try{
      await approveTicket(ticketID);
      const response = await getTickets();
      return response
    }
    catch (error) {
      console.error("Error occur while cancelling ticket: ", error);
    }
  }
)

export const rejectTickets = createAsyncThunk (
  "ticket/rejectTicket",
  async (ticketID) => {
    try{
      await rejectTicket(ticketID);
      const response = await getTickets();
      return response
    }
    catch (error) {
      console.error("Error occur while cancelling ticket: ", error);
    }
  }
)

export const ticketsSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    setTickets: (state, action) => {
      const tickets = action.payload;
      return { ...state, tickets };
    },
    extraReducers(builder) {
        builder.addCase(fetchTickets.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.tickets = action.payload;
          console.log("TICKETS:", state.tickets)
        });
        builder.addCase(cancelTickets.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.tickets = action.payload;
        });
        builder.addCase(rejectTickets.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.tickets = action.payload;
        });
        builder.addCase(approveTickets.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.tickets = action.payload;
        });
    },
});

export const { setTickets } = ticketsSlice.actions;

export const selectTicket = (state) => state.tickets;

//Selectors
export const selectTickets = (state) => state.tickets.tickets;

export default ticketsSlice.reducer;
