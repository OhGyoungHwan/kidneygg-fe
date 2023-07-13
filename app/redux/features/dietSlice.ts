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
    addFoodList: (state, action: PayloadAction<Food[]>) => {
      state.foodList = [...state.foodList, ...action.payload];
    },
    deleteFoodList: (state, action: PayloadAction<number>) => {
      state.foodList = state.foodList.filter(
        (food) => food.foodid !== action.payload
      );
    },
  },
});

export const { addFoodList, deleteFoodList } = dietSlice.actions;

export default dietSlice.reducer;
