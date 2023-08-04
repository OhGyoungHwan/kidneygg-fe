import { Food } from "@/app/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  foodList: Food[];
}

const initialState: InitialState = {
  foodList: [],
};

export const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    addFood: (state, action: PayloadAction<Food>) => {
      !state.foodList.find((food) => food.no == action.payload.no) &&
        state.foodList.push(action.payload);
    },
    deleteFood: (state, action: PayloadAction<Food>) => {
      state.foodList = state.foodList.filter(
        (food) => food.no !== action.payload.no
      );
    },
  },
});

export const { addFood, deleteFood } = foodSlice.actions;

export default foodSlice.reducer;
