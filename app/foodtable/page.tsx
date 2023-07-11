"use client";

import DietTable from "../component/DietTable";
import FoodTable from "../component/FoodTable";
import { useGetFoodsQuery } from "../redux/services/foodApi";

export default function Page() {
  const { isLoading, data, error } = useGetFoodsQuery(null);
  return (
    <main>
      <div>{data ? <FoodTable foodList={data} /> : <div>스켈레톤</div>}</div>
      <div>
        <DietTable />
      </div>
    </main>
  );
}
