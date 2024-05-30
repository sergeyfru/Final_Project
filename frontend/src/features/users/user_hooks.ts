import { useCallback } from "react";
// import { createSelector } from "@reduxjs/toolkit";
// import { useDispatch } from "react-redux";

import { register } from "./user_slice";
import {  User } from "../../types/type";
import { useAppDispatch, } from "../../app/store";




export const useRegister = ({ u_firstname, u_lastname, u_email, p_password }: User) => {
    const dispatch = useAppDispatch()
    return useCallback(() => {

        dispatch(register({ u_firstname, u_lastname, u_email, p_password }))

    }, [dispatch])
}