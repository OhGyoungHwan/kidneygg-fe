import { PostDiet } from "@/app/interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dietApi = createApi({
  reducerPath: "dietApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/diet/",
  }),
  endpoints: (builder) => ({
    addDiet: builder.mutation<PostDiet, PostDiet>({
      query: (body) => ({
        url: ``,
        method: "POST",
        body,
        invalidatesTags: ["PostDiet"],
      }),
    }),
  }),
});

export const { useAddDietMutation } = dietApi;
