import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentItem: "home",
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,

  reducers: {
    changeCurrentItem: (state, action) => {
      const { menuItem } = action.payload;
      return {
        ...state,
        currentItem: menuItem,
      };
    },
  },
});

export const { changeCurrentItem } = menuSlice.actions;

export const selectMenu = (state) => state.menu;

//Selectors
export const selectCurrentItem = (state) => state.menu.currentItem;

export default menuSlice.reducer;
