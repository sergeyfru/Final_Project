import { useDispatch,useSelector,TypedUseSelectorHook } from "react-redux";
import { configureStore, } from "@reduxjs/toolkit";
import userReducer from "../features/users/user_slice.ts";
import gamesReducer  from "../features/games/games_slice.ts";
import selectorReducer from "../features/selectors/selector_slice.ts";
import friendsReducer from "../features/friends/friends_slice.ts";
// import { StoreDispatchType, StoreStateType } from "../types/type.ts";


const store = configureStore({
    reducer:{
        userReducer,
        gamesReducer,
        selectorReducer,
        friendsReducer
    }
})

export type StoreStateType = ReturnType<typeof store.getState>
export type StoreDispatchType = typeof store.dispatch;

export const useAppDispatch: () => StoreDispatchType = useDispatch;

export const useAppSelector: TypedUseSelectorHook<StoreStateType> = useSelector



export default store