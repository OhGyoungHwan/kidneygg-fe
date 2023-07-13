import { PostDish } from "@/app/interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dishApi = createApi({
  reducerPath: "dishApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/kidney/dish",
  }),
  endpoints: (builder) => ({
    addDish: builder.mutation<PostDish, PostDish>({
      query: (body) => ({
        url: ``,
        method: "POST",
        body,
        invalidatesTags: ["DishDiet"],
      }),
    }),
  }),
});

export const { useAddDishMutation } = dishApi;
