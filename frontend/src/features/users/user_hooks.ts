import { useCallback } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { register } from "./user_slice";
import { StoreDispatchType,User } from "../../types/type";
import { useAppDispatch,useAppSelector } from "../../app/store";

export const useRegister = ({ u_firstname, u_lastname, u_email, p_password }: User)=>{
    // const dispatch = useDispatch()
    return useCallback(()=>{

        useAppDispatch(register({ u_firstname, u_lastname, u_email, p_password } : User) )
    },[useAppDispatch])
    
}