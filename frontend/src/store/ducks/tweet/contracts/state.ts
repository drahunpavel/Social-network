import { Tweet } from './../../tweets/contracts/state';

//описываю состояние загрузки тэгов
export enum LoadingState {
    LOADED = 'LOADED',
    LOADING = 'LOADING',
    ERROR = 'ERROR',
    NEVER = 'NEVER',
};

//интерфейс для конкретного твита
export interface TweetState {
    data?: Tweet,
    loadingState: LoadingState,
};


