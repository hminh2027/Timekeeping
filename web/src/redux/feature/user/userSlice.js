import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Router } from "next/router";
import { getCheckInStatus, getMyInfo } from "@/api/service/auth.service";
import * as moment from "moment";
const initialState = {
  name: "",
  checkInStatus: false,
  checkOutStatus: false,
  fetch_status: "idle",
  checkInInfo: {},
  userInfo: {},
  role: [],
  permissions: [],
};

export const fetchCheckInStatus = createAsyncThunk(
  "user/fetchCheckInStatus",
  async () => {
    try {
      const response = await getCheckInStatus({
        fromDate: moment().format("YYYY-MM-DD"),
        toDate: moment().add(1, "d").format("YYYY-MM-DD"),
      });
      return response;
    } catch (error) {
      if (error.status === 401) {
        Router.replace("/account/login");
      }
    }
  }
);
export const fetchMe = createAsyncThunk("user/fetchMe", async () => {
  const response = await getMyInfo();
  return response;
});

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    changeCheckInStatus: (state, action) => {
      const { checkInStatus } = action.payload;
      return {
        ...state,
        checkInStatus,
      };
    },
    changeCheckOutStatus: (state, action) => {
      const { checkOutStatus } = action.payload;
      return {
        ...state,
        checkOutStatus,
      };
    },
    setUserInfo: (state, action) => {
      const { userInfo } = action.payload;
      return {
        ...state,
        userInfo,
      };
    },
    setUserPermissions: (state, action) => {
      const userPerms = action.payload;

      const perms = userPerms.flatMap((perm) =>
        Object.values(perm).map((temp) => temp)
      );
      return {
        ...state,
        permissions: perms,
      };
    },
    logOut: () => {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCheckInStatus.fulfilled, (state, action) => {
      state.status = "succeeded";
      try {
        state.checkInInfo = action.payload.data[0];
        if (action.payload.data[0].checkinImage) {
          state.checkInStatus = true;
        }
        if (action.payload.data[0].checkoutImage) {
          state.checkOutStatus = true;
        }
      } catch (err) {}
    });
    builder.addCase(fetchMe.fulfilled, (state, action) => {
      state.status = "succeeded";
      try {
        state.userInfo = action.payload.data;
      } catch (err) {}
    });
    builder.addCase(fetchMe.rejected, (state, action) => {
      state.status = "rejected";
      try {
        // Add userInfo
        localStorage.removeItem(process.env.AUTH_TOKEN);
      } catch (err) {}
    });
  },
});

export const {
  changeCheckInStatus,
  changeCheckOutStatus,
  setUserInfo,
  setUserPermissions,
  logOut,
} = userSlice.actions;

export const selectUser = (state) => state.user;
//Selectors
export const selectUserName = (state) => state.user.name;
export const selectUserCheckInStatus = (state) => state.user.checkInStatus;
export const selectUserCheckOutStatus = (state) => state.user.checkOutStatus;
export const selectUserCheckInInfo = (state) => state.user.checkInInfo;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserPermissions = (state) => state.user.permissions;
export default userSlice.reducer;
