import { User } from "../../user/contracts/state";

//описываю состояние загрузки твитов
export enum LoadingState {
    LOADED = 'LOADED',
    LOADING = 'LOADING',
    ERROR = 'ERROR',
    NEVER = 'NEVER',
};

//состояние отправки нового поста
export enum AddFormState {
    LOADING = 'LOADING',
    ERROR = 'ERROR',
    NEVER = 'NEVER',
};


export interface Tweet {
    _id: string,
    text: string;
    createdAt: string,
    images?: [],
    user: User;
};


//этот интерфейс содержит items, который является массивом из Tweet
export interface TweetsState {
    items: Tweet[];
    loadingState: LoadingState;
    addFormState: AddFormState;
};


