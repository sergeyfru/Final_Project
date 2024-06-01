import store from "../app/store";

export type BoardGame = {
    gameid: number;
    name: string;
    image: string;
    thumbnail: string;
    minplayers: number;
    maxplayers: number;
    minplaytime?: number;
    maxplaytime?: number;
    playingtime: number;
    yearpublished: number;
    wanttoplay: boolean;
    averagerating: number;
    description?: string;
    boardgamecategory?: string;
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

export type LocalStorage={
    refresh?:string,
    u_token?:string,
    u_id?:string|number,
    firstname?:string,
    lastname?:string

}


export type SearchingProps={
    allgames?:BoardGame[],
    filter?:BoardGame[],
    setFilter?: (filter:BoardGame[]) =>void
}