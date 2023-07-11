"use client";

import DietTable from "@/app/component/DietTable";
import FoodTable from "../../component/FoodTable";
import { useGetFoodByNameQuery } from "../../redux/services/foodApi";

export default function Page({ params }: { params: { name: string } }) {
  const { isLoading, data, error } = useGetFoodByNameQuery(params);
  return (
    <main>
      <div>{data ? <FoodTable foodList={data} /> : <div>스켈레톤</div>}</div>
      <div>
        <DietTable />
      </div>
    </main>
  );
}
