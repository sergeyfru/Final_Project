import { useCallback } from "react";
import { useAppDispatch } from "../../app/store";
import { addFriend, allMyFrinds, confirmFriendship, deleteFriend, getAllUsers, searchUser } from "./friends_slice";
import { AddFriend, User } from "../../types/type";


export const useAddFriend = () => {
    const dispatch = useAppDispatch()
    return useCallback(({ user_id_1, user_id_2 }: AddFriend) => {
        dispatch(addFriend({ user_id_1, user_id_2 }))
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
export const useAllMyFrinds = () => {
    const dispatch = useAppDispatch()
    return useCallback(({u_id}:User) => {
        dispatch(allMyFrinds({u_id}))
    }, [dispatch])
}
export const useDeleteFriend = () => {
    const dispatch = useAppDispatch()
    return useCallback(({ user_id_1, user_id_2 }: AddFriend) => {
        dispatch(deleteFriend({ user_id_1, user_id_2 }))
    }, [dispatch])
}
export const useConfirmFriendship = () => {
    const dispatch = useAppDispatch()
    return useCallback(({ user_id_1, user_id_2 }: AddFriend) => {
        dispatch(confirmFriendship({ user_id_1, user_id_2 }))
    }, [dispatch])
}
