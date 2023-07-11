import { Food } from "@/app/interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const foodApi = createApi({
  reducerPath: "foodApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/kidney/food",
  }),
  endpoints: (builder) => ({
    getFoods: builder.query<Food[], null>({
      query: () => "",
    }),
    getFoodByName: builder.query<Food[], { name: string }>({
      query: ({ name }) => `?name=${name}`,
    }),
  }),
});

export const { useGetFoodsQuery, useGetFoodByNameQuery } = foodApi;
