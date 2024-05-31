import { useCallback } from "react";
// import { createSelector } from "@reduxjs/toolkit";
// import { useDispatch } from "react-redux";

import { register,login } from "./user_slice.ts";
import {  User } from "../../types/type.ts";
import { useAppDispatch, } from "../../app/store.ts";




export const useRegister = () => {
    const dispatch = useAppDispatch()

    return useCallback(({ u_firstname, u_lastname, u_email, p_password }:User) => {

        dispatch(register({ u_firstname, u_lastname, u_email, p_password }))

    }, [dispatch])
}

export const useLogin = () => {
    const dispatch = useAppDispatch()
    return useCallback(({ u_email, p_password }:User) => {

        dispatch(login({ u_email, p_password }))

    }, [dispatch])
}
