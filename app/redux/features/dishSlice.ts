import { Food } from "@/app/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  userid: number;
  title: string;
  detail: string;
  foodList: Food[];
}

const initialState: InitialState = {
  userid: 1,
  title: "",
  detail: "",
  foodList: [],
};

export const dishSlice = createSlice({
  name: "dish",
  initialState,
  reducers: {
    addDishList: (state, action: PayloadAction<Food[]>) => {
      state.foodList = [...state.foodList, ...action.payload];
    },
    deleteDishList: (state, action: PayloadAction<number>) => {
      state.foodList = state.foodList.filter(
        (food, idx) => idx !== action.payload
      );
    },
  },
});

export const { addDishList, deleteDishList } = dishSlice.actions;

export default dishSlice.reducer;
