import { DishDetail, PostDish } from "@/app/interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dishApi = createApi({
  reducerPath: "dishApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/kidney/dish",
  }),
  endpoints: (builder) => ({
    getDishDetailList: builder.query<DishDetail[], null>({
      query: () => "",
    }),
    addDish: builder.mutation<PostDish, PostDish>({
      query: (body) => ({
        url: ``,
        method: "POST",
        body,
        invalidatesTags: ["DishDiet"],
      }),
    }),
    deleteDish: builder.mutation<string, { dishid: number }>({
      query: (body) => ({
        url: ``,
        method: "DELETE",
        body,
        invalidatesTags: ["DishDiet"],
      }),
    }),
  }),
});

export const {
  useGetDishDetailListQuery,
  useDeleteDishMutation,
  useAddDishMutation,
} = dishApi;
