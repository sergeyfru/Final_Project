import { ReactNode } from "react";

export type BoardGame = {
    gameid: number;
    name: string;
    image: string;
    thumbnail: string;
    minplayers: number;
    maxplayers: number;
    minplaytime: number;
    maxplaytime: number;
    playingtime: number;
    yearpublished: number;
    wanttoplay: boolean;
    averagerating: number;
    description: string;
    boardgamecategory: string;
};
export type User = {
    u_id?: string | number | null | undefined;
    u_firstname?: string;
    u_lastname?: string;
    u_email?: string;
    p_password?: string;
};
export type InitialState = {
    user: User;

    u_token: string | null | undefined;
    refreshToken: string | null | undefined;
    status?: EnumRegisterStatus;
    isLoged: boolean;
};
export type FriendUser = {
    u_id: string | number;
    u_email: string;
    u_firstname: string;
    u_lastname: string;
    agreement: boolean;
    sent: boolean;
};
export type InitialStateFriends = {
    allUsers: User[];
    filteredUsers: User[];
    myFriends: FriendUser[];
    status: EnumLoadingStatus;
};
export type GamesInitialState = {
    allGames: BoardGame[];
    filter: BoardGame[];
    mygames: BoardGame[];
    collectionWithFriends: BoardGame[];
    status?: EnumRegisterStatus;
    randomGame?: BoardGame;
};
export type InitialStateSelector = {
    category: string[] | number[];
    inputSearch: string | number | null;
    inputcategory: string | null;
    inputminTime: string | null;
    inputmaxTime: string | null;
    inputmaxPlayerNumber: string | null;
    inputminPlayerNumber: string | null;
};

export type RegisterStatus = "Success" | "Failed" | "Loading";

const MethodType = Object.freeze({
    get: "get",
    post: "post",
    put: "put",
    delete: "delete",
});
export type MethodType = keyof typeof MethodType;
export enum EnumLoginStatus {
    Login,
    Logout,
}
export enum EnumRegisterStatus {
    Success,
    Failed,
    Loading,
}
export enum EnumLoadingStatus {
    Success,
    Failed,
    Loading,
}

export type LoginRegistrationProps = {
    page: string;
};

export type LocalStorage = {
    refresh?: string;
    u_token?: string;
    u_id?: string | number;
    firstname?: string;
    lastname?: string;
};

export type SearchingProps = {
    allgames?: BoardGame[];
    filter: BoardGame[];
    setFilter: (filter: BoardGame[]) => void;
};
export type DelMyGameProps = {
    gameid: string | number;
    // setCollection: (collection: BoardGame[]) => void
};
export type DelMyGameType = {
    gameid: string | number;
    u_id: string | null;
};

export type RandomGameProps = {
    collection: BoardGame[];

    setCollection?: (collection: BoardGame[]) => void;
};

export type InitialStatePayload = {
    refreshToken: string;
    u_token: string;
    user: {};
};

export type AuthContextType = {
    token: string | number | null;
    refreshToken: string | number | null;
    setToken: React.Dispatch<React.SetStateAction<string | number | null>>;
    setRefreshToken: React.Dispatch<
        React.SetStateAction<string | number | null>
    >;
};
export type ProviderProps = {
    children: ReactNode;
};

export type AddGameSliceType = {
    u_id: string | number | null;
    gameid: number | string | null;
};

export type SearchGamesType = {
    userInput: string | number | null | undefined;
    // setFilter: (filter: BoardGame[]) => void,
    allgames: BoardGame[];
};

export type FilteringGamesType = {
    inputSearch: string | number | null;
    inputCategory: string | null;
    inputMinTime: string | null;
    inputMaxTime: string | null;
    inputMaxPlayerNumber: string | null;
    inputMinPlayerNumber: string | null;
};
export type MyGames = {
    u_id: number | string | null;
};

export type RandomGame = {
    randindex: number;
};

export type AddFriend = {
    user_id_1: string | number | null;
    user_id_2: string | number | null | undefined;
};
// export type UserProved = {
//     u_id: string | number | null ,
//     u_firstname: string,
//     u_lastname: string,
//     u_email: string,
// }
export type AddFriendProps = {
    user_id_2: string | number | null | undefined;
};

export type JoinCollection = {
    u_id: string | number | null;
    user_id_1: string | number | null;
    user_id_2: string | number | null;
    user_id_3: string | number | null;
    user_id_4: string | number | null;
    user_id_5: string | number | null;
};

export type CallApiConfigType = {
    params?: object;
    data?: object;
    config?: object;
};
