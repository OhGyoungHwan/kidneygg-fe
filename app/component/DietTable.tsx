"use client";
import { useAppSelector } from "../redux/hooks";
import { Providers } from "../redux/provider";

function Table() {
  const foodList = useAppSelector((state) => state.dietReducer.foodList);
  return (
    <div>
      <ul>
        {foodList.map((food) => (
          <li key={food.no}>{food.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default function FoodTable() {
  return (
    <Providers>
      <Table />
    </Providers>
  );
}
