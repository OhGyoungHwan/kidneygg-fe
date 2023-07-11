import { useCallback, useEffect, useState } from "react";
import { Food, Nutrition } from "../interface";
import { useAppSelector } from "../redux/hooks";
export default function DietTable({}: {}) {
  const foodList = useAppSelector((state) => state.foodReducer.foodList);
  const [tableList, setTableList] = useState(
    foodList.map((food) => {
      return { ...food, weight: 100 };
    })
  );

  useEffect(() => {
    const tempTableList = foodList.map((food) => {
      return { ...food, weight: 100 };
    });
    setTableList(tempTableList);
  }, [foodList]);

  const sumNutrition = (key: keyof Nutrition) =>
    tableList
      .reduce((sum, food) => (sum += (food[key] * food.weight) / 100), 0)
      .toFixed(2);

  const onChangeWeight = useCallback(
    (idx: number, weight: number) => {
      let tempTableList = [...tableList];
      tempTableList[idx].weight = weight;
      setTableList(tempTableList);
    },
    [foodList, tableList]
  );
  return (
    <table>
      <thead>
        <tr>
          <th>번호</th>
          <th>이름</th>
          <th>상세 분류</th>
          <th>칼로리</th>
          <th>수분</th>
          <th>단백질</th>
          <th>인</th>
          <th>칼륨</th>
          <th>나트륨</th>
          <th>용량</th>
        </tr>
      </thead>
      <tbody>
        {tableList?.map((food, idx) => (
          <tr key={food.foodid}>
            <td>{food.foodid}</td>
            <td>{food.name}</td>
            <td>{food.categorie}</td>
            <td>{((food.energy * food.weight) / 100).toFixed(2)}</td>
            <td>{((food.moisture * food.weight) / 100).toFixed(2)}</td>
            <td>{((food.protein * food.weight) / 100).toFixed(2)}</td>
            <td>{((food.phosphorus * food.weight) / 100).toFixed(2)}</td>
            <td>{((food.potassium * food.weight) / 100).toFixed(2)}</td>
            <td>{((food.natrium * food.weight) / 100).toFixed(2)}</td>
            <td>
              <input
                defaultValue={food.weight}
                onChange={(e) => onChangeWeight(idx, parseInt(e.target.value))}
              />
            </td>
          </tr>
        ))}
      </tbody>
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
          <th></th>
        </tr>
      </tfoot>
    </table>
  );
}
