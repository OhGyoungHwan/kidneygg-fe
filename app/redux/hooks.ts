//hooks파일 만들어서 Redux의 hook을 모아 쉽게 사용할 수 있도록 구조를 잡는다.
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

//TypedUseSelectorHook : RootState내부 구조를 알 수 있게 도와준다.
//useSelector : store의 상태값을 반환해준다.
//useDispatch : 액션을 생성해준다.

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
