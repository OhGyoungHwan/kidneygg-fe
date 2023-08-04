import { useCallback } from "react";
import { DishDetail, Food, Nutrition } from "../interface";
import { useDeleteDishMutation } from "../redux/services/dishApi";

function FoodTable({
  foodList,
}: {
  foodList: { dishid: number; foodid: Food; weight: number }[];
}) {
  const sumNutrition = (key: keyof Nutrition) =>
    foodList
      .reduce((sum, food) => (sum += (food.foodid[key] * food.weight) / 100), 0)
      .toFixed(2);
  const sumWeight = () =>
    foodList.reduce((sum, food) => (sum += food.weight), 0);
  const tableList = foodList.map((food) => {
    return {
      name: food.foodid.name,
      categorie: food.foodid.categorie,
      energy: ((food.foodid.energy * food.weight) / 100).toFixed(2),
      moisture: ((food.foodid.moisture * food.weight) / 100).toFixed(2),
      protein: ((food.foodid.protein * food.weight) / 100).toFixed(2),
      phosphorus: ((food.foodid.phosphorus * food.weight) / 100).toFixed(2),
      potassium: ((food.foodid.potassium * food.weight) / 100).toFixed(2),
      natrium: ((food.foodid.natrium * food.weight) / 100).toFixed(2),
      weight: food.weight,
    };
  });
  return (
    <table>
      <thead>
        <tr>
          <th>이름</th>
          <th>상세 분류</th>
          <th>칼로리</th>
          <th>수분</th>
          <th>단백질</th>
          <th>인</th>
          <th>칼륨</th>
          <th>나트륨</th>
          <th>무게</th>
        </tr>
      </thead>
      {/* <tbody>
        {tableList.map((table) => (
          <tr>
            <td>{table.name}</td>
            <td>{table.categorie}</td>
            <td>{table.energy}</td>
            <td>{table.moisture}</td>
            <td>{table.protein}</td>
            <td>{table.phosphorus}</td>
            <td>{table.potassium}</td>
            <td>{table.natrium}</td>
            <td>{table.weight}</td>
          </tr>
        ))}
      </tbody> */}
      <tfoot>
        <tr>
          <th></th>
          <th></th>
          <th></th>
          <th>{sumNutrition("energy")}</th>
          <th>{sumNutrition("moisture")}</th>
          <th>{sumNutrition("protein")}</th>
          <th>{sumNutrition("phosphorus")}</th>
          <th>{sumNutrition("potassium")}</th>
          <th>{sumNutrition("natrium")}</th>
          <th>{sumWeight()}</th>
        </tr>
      </tfoot>
    </table>
  );
}

export default function DishFeed({ dishList }: { dishList: DishDetail[] }) {
  const [deleteDish, response] = useDeleteDishMutation();
  const onClickX = useCallback(
    (id: number) => {
      deleteDish({ dishid: id });
    },
    [dishList]
  );
  return (
    <>
      {dishList.map((dish) => (
        <div key={dish.dishid}>
          <p>
            {dish.dishid}
            {dish.title}
            <button onClick={(e) => onClickX(dish.dishid)}>X</button>
          </p>
          <p>{dish.detail}</p>
          <FoodTable foodList={dish.foodlist} />
        </div>
      ))}
    </>
  );
}
