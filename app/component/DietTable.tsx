import { useCallback, useEffect, useReducer, useState } from "react";
import { Food, Nutrition, PostDiet } from "../interface";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useAddDietMutation } from "../redux/services/dietApi";
import { getYYMMDD } from "../utile";
import { deleteFoodList } from "../redux/features/dietSlice";

export default function DietTable({}: {}) {
  const foodList = useAppSelector((state) => state.dietReducer.foodList);
  const dispatch = useAppDispatch();
  const [addNewDiet, response] = useAddDietMutation();
  const [threeMeals, setThreeMeals] = useState("breakfast");
  const [tableList, setTableList] = useState(
    foodList.map((food) => {
      return { ...food, weight: 100 };
    })
  );
  const [postData, setPostData] = useReducer<(pre: any, next: any) => PostDiet>(
    (pre: any, next: any) => ({ ...pre, ...next }),
    {
      userid: 1,
      yymmdd: "230712",
      threemeals: "breakfast",
      foodList: [],
      dishList: [],
    }
  );

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

  const onClickX = useCallback(
    (foodid: number) => {
      dispatch(deleteFoodList(foodid));
    },
    [foodList]
  );

  useEffect(() => {
    const tempTableList = foodList.map((food) => {
      return { ...food, weight: 100 };
    });
    setTableList(tempTableList);
  }, [foodList]);

  useEffect(() => {
    const yymmdd = getYYMMDD();
    const tempFoodList = tableList.map((food) => {
      return { foodid: food.foodid, weight: food.weight };
    });
    setPostData({
      userid: 1,
      yymmdd: yymmdd,
      threemeals: threeMeals,
      foodList: tempFoodList,
      dishList: [],
    });
  }, [tableList]);

  return (
    <>
      <div>
        <select onChange={(e) => setThreeMeals(e.target.value)}>
          <option value={"breakfast"}>아침</option>
          <option value={"lunch"}>점심</option>
          <option value={"dinner"}>저녁</option>
        </select>
      </div>
      <div>
        <button onClick={(e) => addNewDiet(postData)}>식단 저장</button>
      </div>
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
            <th></th>
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
                  onChange={(e) =>
                    onChangeWeight(idx, parseInt(e.target.value))
                  }
                />
              </td>
              <td>
                <button onClick={(e) => onClickX(food.foodid)}>X</button>
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
    </>
  );
}
