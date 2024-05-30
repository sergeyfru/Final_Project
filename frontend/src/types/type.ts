import store from "../app/store";

export type BoardGame = {
    gameId: number;
    name: string;
    image: string;
    thumbnail: string;
    minPlayers: number;
    maxPlayers: number;
    playingTime: number;
    isExpansion: boolean;
    yearPublished: number;
    bggRating: number;
    averageRating: number;
    rank: number;
    numPlays: number;
    rating: number;
    owned: boolean;
    preOrdered: boolean;
    forTrade: boolean;
    previousOwned: boolean;
    want: boolean;
    wantToPlay: boolean;
    wantToBuy: boolean;
    wishList: boolean;
    userComment: string;
};
export type User = {
    u_id?: string | number,
    u_firstname?: string,
    u_lastname?: string,
    u_email?: string,
    p_password?: string
}
export type InitialState = {
    user: User,

    u_token: string | null | undefined,
    refreshToken: string | null | undefined,
    status?: EnumRegisterStatus,
}

export type RegisterStatus = "Success"|"Failed"|"Loading"

export enum EnumRegisterStatus {
    Success,
    Failed,
    Loading
}

export type StoreStateType = ReturnType<typeof store.getState>
export type StoreDispatchType = typeof store.dispatch;

export type LoginRegistrationProps ={
    page:string
}