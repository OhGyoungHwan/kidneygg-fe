"use client";
import { ChangeEvent, MouseEvent, useState } from "react";
import { Food } from "../interface";
import { Providers } from "../redux/provider";
import { useGetFoodsQuery } from "../redux/services/foodApi";
import { getKeys } from "../utile";
import { PAGINATION_SIZE, TABLE_ROW_SIZE, foodHeaderToKor } from "../constdata";
import { addFood, deleteFood } from "../redux/features/foodSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addDietList } from "../redux/features/dietSlice";

function Table() {
  const dispatch = useAppDispatch();
  const foodList = useAppSelector((state) => state.foodReducer.foodList);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [ordering, setOrdering] = useState("");
  const [paginationStart, setPaginationStart] = useState(0);

  const { data, isLoading } = useGetFoodsQuery({
    page: page,
    search: search,
    ordering: ordering,
  });
  const { count, results } = data ? data : { count: 0, results: [] as Food[] };

  const onClickPrev = (e: MouseEvent<HTMLButtonElement>) =>
    Math.ceil(count / TABLE_ROW_SIZE) > PAGINATION_SIZE &&
    paginationStart != 0 &&
    (setPage((num) => (Math.ceil(num / PAGINATION_SIZE) - 1) * PAGINATION_SIZE),
    setPaginationStart((num) => num - PAGINATION_SIZE));

  const onClickNext = (e: MouseEvent<HTMLButtonElement>) =>
    Math.ceil(count / TABLE_ROW_SIZE) > PAGINATION_SIZE &&
    paginationStart != Math.floor(count / TABLE_ROW_SIZE) &&
    (setPage((num) => Math.ceil(num / PAGINATION_SIZE) * PAGINATION_SIZE + 1),
    setPaginationStart((num) => num + PAGINATION_SIZE));

  const onClickStart = (e: MouseEvent<HTMLButtonElement>) =>
    Math.ceil(count / TABLE_ROW_SIZE) > PAGINATION_SIZE &&
    (setPage(1), setPaginationStart(0));

  const onClickEnd = (e: MouseEvent<HTMLButtonElement>) =>
    Math.ceil(count / TABLE_ROW_SIZE) > PAGINATION_SIZE &&
    (setPage(Math.ceil(count / TABLE_ROW_SIZE)),
    setPaginationStart(Math.floor(count / TABLE_ROW_SIZE)));

  const onClickNumber = (e: MouseEvent<HTMLButtonElement>) =>
    setPage(parseInt(e.currentTarget.value) + 1);

  const onChangeQuery = (e: ChangeEvent<HTMLInputElement>) =>
    setQuery(e.currentTarget.value);

  const keyUpEnterQuery = () => {
    setSearch(query);
  };

  const onClickSearch = () => setSearch(query);

  const onClickHeader = (header: string) => {
    switch (true) {
      case !ordering.includes(header):
        setOrdering("-" + header);
        break;
      case ordering == "-" + header:
        setOrdering(header);
        break;
      case ordering == header:
        setOrdering("");
        break;
    }
  };

  const onClickRow = (food: Food) => dispatch(addFood(food));

  const onClickLi = (food: Food) => dispatch(deleteFood(food));

  const onClickAddDiet = () => dispatch(addDietList(foodList));

  return isLoading ? (
    <div>스켈레톤</div>
  ) : (
    <div>
      <table>
        <thead>
          <tr>
            <td></td>
            {getKeys(results[0]).map((key) => (
              <td key={key} onClick={(e) => onClickHeader(key)}>
                {foodHeaderToKor[key]}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {results.map((food) => (
            <tr key={food.no}>
              <td>
                <button
                  onClick={(e) => {
                    onClickRow(food);
                  }}
                >
                  +
                </button>
              </td>
              {getKeys(results[0]).map((key) => (
                <td key={key + food.no}>{food[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={onClickStart}>{"<<"}</button>
        <button onClick={onClickPrev}>{"<"}</button>
        {[...Array(Math.ceil(count / TABLE_ROW_SIZE)).keys()]
          .map((idx) => (
            <button onClick={onClickNumber} key={idx} value={idx}>
              {idx}
            </button>
          ))
          .slice(paginationStart, paginationStart + PAGINATION_SIZE)}
        <button onClick={onClickNext}>{">"}</button>
        <button onClick={onClickEnd}>{">>"}</button>
        <input
          className="text-gray-900"
          placeholder="식재료 검색"
          onChange={onChangeQuery}
          onKeyUp={(e) => {
            e.key === "Enter" && keyUpEnterQuery();
          }}
        />
        <button onClick={onClickSearch}>검색</button>
      </div>
      <div>
        <ul>
          {foodList.map((food) => (
            <li key={food.no}>
              <button onClick={(e) => onClickLi(food)}>X</button>
              {food.name}
            </li>
          ))}
        </ul>
        <button onClick={onClickAddDiet}>식단에 추가</button>
        <button onClick={onClickAddDiet}>요리에 추가</button>
      </div>
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
