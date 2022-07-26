import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsers } from "@/api/service/user.service";
const initialState = {
  users: [],
};

export const fetchUsers = createAsyncThunk(
  "user/getUsers",
  async (sortOptions) => {
    try {
      const response = await getUsers(sortOptions);
      console.log("RESPONSE", response);
      return response;
    } catch (error) {
      console.error("Error occur while fetching tickets: ", error);
    }
  }
);

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      const users = action.payload;
      return { ...state, users };
    },
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.users= action.payload;
          console.log("HELLO USERS");
          console.log("USERS STATE:", state.users);
        });
        
    },
})

export const { setUsers } = usersSlice.actions;

export const selectUser = (state) => state.users;

//Selectors
export const selectUsers = (state) => state.users.users;

export default usersSlice.reducer;
