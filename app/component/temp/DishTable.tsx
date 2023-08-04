import { useCallback, useEffect, useReducer, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useAddDishMutation } from "../redux/services/dishApi";
import { Nutrition, PostDish } from "../interface";
import { deleteDishList } from "../redux/features/dishSlice";

export default function DishTable({}: {}) {
  const foodList = useAppSelector((state) => state.dishReducer.foodList);
  const dispatch = useAppDispatch();
  const [addNewDish, response] = useAddDishMutation();
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [tableList, setTableList] = useState(
    foodList.map((food) => {
      return { ...food, weight: 100 };
    })
  );
  const [postData, setPostData] = useReducer<(pre: any, next: any) => PostDish>(
    (pre: any, next: any) => ({ ...pre, ...next }),
    {
      userid: 1,
      title: "",
      detail: "",
      foodList: [],
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
    (idx: number) => {
      dispatch(deleteDishList(idx));
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
    const tempFoodList = tableList.map((food) => {
      return { foodid: food.foodid, weight: food.weight };
    });
    setPostData({
      userid: 1,
      title: title,
      detail: detail,
      foodList: tempFoodList,
    });
  }, [tableList, title, detail]);

  return (
    <>
      <div>
        <input
          placeholder="요리명"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <input placeholder="내용" onChange={(e) => setDetail(e.target.value)} />
      </div>
      <div>
        <button onClick={(e) => addNewDish(postData)}>요리 저장</button>
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
            <tr key={`${food.foodid}:${idx}`}>
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
                <button onClick={(e) => onClickX(idx)}>X</button>
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
