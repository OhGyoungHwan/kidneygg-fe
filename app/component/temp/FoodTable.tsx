import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { PAGE_SIZE, PAGINATION_MAX_SIZE, foodHeaderToKor } from "../constdata";
import { Food, Nutrition } from "../interface";
import { getKeys } from "../utile";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addFoodList } from "../redux/features/dietSlice";
import { addDishList } from "../redux/features/dishSlice";

function PagiNation({
  pagiNationLenght,
  setPageIdx,
  pageIdx,
}: {
  pagiNationLenght: number;
  setPageIdx: Dispatch<SetStateAction<number>>;
  pageIdx: number;
}) {
  let pagiNationStart = 0;
  const pagiNationSize =
    pagiNationLenght >= 10 ? PAGINATION_MAX_SIZE : pagiNationLenght;
  switch (true) {
    // idx가 맨앞 ~ pagiNationSize/2 -> 보여지는 page는 앞에서 부터 10개 고정
    case pageIdx - Math.floor(pagiNationSize / 2) < 0:
      pagiNationStart = 0;
      break;
    // idx가 맨뒤 ~ 맨뒤 - pagiNationSize/2 -> 보여지는 page는 뒤에서 부터 10개 고정
    case pageIdx - Math.floor(pagiNationSize / 2) >
      pagiNationLenght - pagiNationSize:
      pagiNationStart = pagiNationLenght - pagiNationSize;
      break;
    // 보통의 경우 idx앞뒤로 pagiNationSize/2 만큼 보여짐
    default:
      pagiNationStart = pageIdx - Math.floor(pagiNationSize / 2);
  }
  return (
    <div>
      <button key={`<<pagination`} onClick={(e) => setPageIdx(0)}>
        {"<<"}
      </button>
      {[...Array(pagiNationSize).keys()].map((idx) => (
        <button
          key={`${pagiNationStart + idx}pagination`}
          onClick={(e) => setPageIdx(pagiNationStart + idx)}
        >
          {pagiNationStart + idx + 1}
        </button>
      ))}
      <button
        key={`>>pagination`}
        onClick={(e) => setPageIdx(pagiNationLenght - 1)}
      >
        {">>"}
      </button>
    </div>
  );
}

export default function FoodTable({ foodList }: { foodList: Food[] }) {
  const [pageIdx, setPageIdx] = useState(0);
  const [tableList, setTableList] = useState(foodList);
  const [query, setQuery] = useState("");
  const [checkedList, setCheckedList] = useState<Food[]>([]);
  const [sortMode, setSortMode] = useState<{
    thName: keyof Nutrition | "foodid";
    mode: 1 | -1 | 0;
  }>({ thName: "foodid", mode: 1 });
  const dispatch = useAppDispatch();
  const onChecked = useCallback(
    (e: ChangeEvent<HTMLInputElement>, food: Food) => {
      e.target.checked
        ? setCheckedList((tempList) => [...tempList, food])
        : setCheckedList((tempList) =>
            [...tempList].filter((checkedFood) => checkedFood.no !== food.no)
          );
    },
    [foodList]
  );
  const addDiet = () => {
    dispatch(addFoodList(checkedList));
  };
  const addDish = () => {
    dispatch(addDishList(checkedList));
  };
  const onClickHead = useCallback(
    (thName: keyof Nutrition) => {
      let tempTableList = [...foodList];
      sortMode.thName === thName
        ? sortMode.mode === 1
          ? (tempTableList.sort(
              (pre, next) => pre[thName] * 100 - next[thName] * 100
            ),
            setSortMode({ thName: thName, mode: -1 }))
          : sortMode.mode === -1
          ? (tempTableList.sort(
              (pre, next) => next[thName] * 100 - pre[thName] * 100
            ),
            setSortMode({ thName: thName, mode: 0 }))
          : (tempTableList.sort((pre, next) => pre.no - next.no),
            setSortMode({ thName: thName, mode: 1 }))
        : (tempTableList.sort(
            (pre, next) => pre[thName] * 100 - next[thName] * 100
          ),
          setSortMode({ thName: thName, mode: -1 }));
      setTableList(tempTableList);
    },
    [tableList, foodList, sortMode]
  );
  useEffect(() => {
    query === ""
      ? setTableList([...foodList])
      : setTableList([
          ...foodList.filter((food) =>
            food.name
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(query.toLowerCase().replace(/\s+/g, ""))
          ),
        ]);
  }, [query]);

  return (
    <>
      <div>
        <input
          placeholder="검색"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <button onClick={addDiet}>식단 추가</button>
        <button onClick={addDish}>요리 추가</button>
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            {getKeys(foodList[0]).map((thName) =>
              thName === "no" || thName === "categorie" || thName === "name" ? (
                <th key={thName}>{foodHeaderToKor[thName]}</th>
              ) : (
                <th key={thName} onClick={(e) => onClickHead(thName)}>
                  {foodHeaderToKor[thName]}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {tableList
            .slice(pageIdx * PAGE_SIZE, pageIdx * PAGE_SIZE + PAGE_SIZE)
            .map((food) => (
              <tr key={food.no}>
                <td>
                  <input type="checkbox" onChange={(e) => onChecked(e, food)} />
                </td>
                <td>{food.no}</td>
                <td>{food.name}</td>
                <td>{food.categorie}</td>
                <td>{food.energy}</td>
                <td>{food.moisture}</td>
                <td>{food.protein}</td>
                <td>{food.phosphorus}</td>
                <td>{food.potassium}</td>
                <td>{food.natrium}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <PagiNation
        pagiNationLenght={Math.ceil(foodList.length / PAGE_SIZE)}
        setPageIdx={setPageIdx}
        pageIdx={pageIdx}
      />
    </>
  );
}
