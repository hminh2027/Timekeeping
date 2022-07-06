import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCheckInStatus } from "../../../api/service/auth.service";
const initialState = {
  name: "",
  checked_status: false,
  fetch_status: "idle",
  info: [],
};

export const fetchCheckInStatus = createAsyncThunk(
  "user/fetchCheckInStatus",
  async () => {
    const response = await getCheckInStatus({
      fromDate: new Date(Date.now()).toISOString().split("T")[0],
      toDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    });
    return response;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    changeCheckInStatus: (state, action) => {
      const { checked_status } = action.payload;
      return {
        ...state,
        checked_status,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCheckInStatus.fulfilled, (state, action) => {
      state.status = "succeeded";
      try {
        // Add any fetched posts to the array
        state.info = action.payload.data;
        // console.log(action.payload.data[0].checkinImage);
        if (action.payload.data[0].checkinImage) {
          state.checked_status = true;
        }
      } catch (err) {}
    });
  },
});

export const { changeCheckInStatus } = userSlice.actions;

export const selectUser = (state) => state.user;

//Selectors
export const selectUserName = (state) => state.user.name;
export const selectUserCheckInStatus = (state) => state.user.checked_status;
export const selectUserCheckInInfo = (state) => state.user.info;

export default userSlice.reducer;
