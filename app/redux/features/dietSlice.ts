import { Food } from "@/app/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  userid: number;
  yymmdd: string;
  threemeals: "breakfast" | "lunch" | "dinner";
  foodList: Food[];
  dishList: any[];
}

const initialState: InitialState = {
  userid: 1,
  yymmdd: "",
  threemeals: "breakfast",
  foodList: [],
  dishList: [],
};

export const dietSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    addDietList: (state, action: PayloadAction<Food[]>) => {
      state.foodList = [...state.foodList, ...action.payload];
    },
    deleteDietList: (state, action: PayloadAction<number>) => {
      state.foodList = state.foodList.filter(
        (food, idx) => idx !== action.payload
      );
    },
  },
});

export const { addDietList, deleteDietList } = dietSlice.actions;

export default dietSlice.reducer;
