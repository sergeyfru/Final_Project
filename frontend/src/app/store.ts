import { useDispatch,useSelector,TypedUseSelectorHook } from "react-redux";
import { configureStore, combineReducers, } from "@reduxjs/toolkit";
import userReducer from "../features/users/user_slice.ts";
import { StoreDispatchType,StoreStateType } from "../types/type.ts";

const combineReducersAPP = combineReducers({ userReducer })

const store = configureStore({
    reducer:combineReducersAPP
})



export const useAppDispatch: () => StoreDispatchType = useDispatch;

export const useAppSelector: TypedUseSelectorHook<StoreStateType> = useSelector



export default store