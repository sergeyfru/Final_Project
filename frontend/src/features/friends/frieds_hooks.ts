import { useCallback } from "react";
import { useAppDispatch } from "../../app/store";
import { addFriend, getAllUsers, searchUser } from "./friends_slice";
import { AddFriend, User } from "../../types/type";


export const useAddFriend = () => {
    const dispatch = useAppDispatch()
    return useCallback(({ user_id_1, u2_email }: AddFriend) => {
        dispatch(addFriend({ user_id_1, u2_email }))
    }, [dispatch])
}
export const useGetAllUsersWithoutThisUser = () => {
    const dispatch = useAppDispatch()
    return useCallback(({ u_id }:User) => {
        dispatch(getAllUsers({ u_id }))
    }, [dispatch])
}
export const useFilterForUsers = () => {
    const dispatch = useAppDispatch()
    return useCallback((searchUserInput:string) => {
        dispatch(searchUser(searchUserInput))
    }, [dispatch])
}
