import { ResponseFood, queryFood } from "@/app/interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const foodApi = createApi({
  reducerPath: "foodApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/food/",
  }),
  endpoints: (builder) => ({
    getFoods: builder.query<ResponseFood, queryFood>({
      query: ({ page, search, ordering }) =>
        `?page=${page}&search=${search}&ordering=${ordering}`,
    }),
  }),
});

export const { useGetFoodsQuery } = foodApi;
