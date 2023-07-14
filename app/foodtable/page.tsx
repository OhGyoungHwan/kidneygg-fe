"use client";

import DietTable from "../component/DietTable";
import DishFeed from "../component/DishFeed";
import DishTable from "../component/DishTable";
import FoodTable from "../component/FoodTable";
import { useGetDishDetailListQuery } from "../redux/services/dishApi";
import { useGetFoodsQuery } from "../redux/services/foodApi";

export default function Page() {
  const responseFood = useGetFoodsQuery(null);
  const responseDish = useGetDishDetailListQuery(null);
  return (
    <main>
      <div>
        {responseFood.data ? (
          <FoodTable foodList={responseFood.data} />
        ) : (
          <div>스켈레톤</div>
        )}
      </div>
      <div>
        {responseDish.data ? (
          <DishFeed dishList={responseDish.data} />
        ) : (
          <div>스켈레톤</div>
        )}
      </div>
      <div>
        <DietTable />
        <DishTable />
      </div>
    </main>
  );
}
