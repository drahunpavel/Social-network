//описываю состояние загрузки твитов
export enum LoadingState {
    LOADED = 'LOADED',
    LOADING = 'LOADING',
    ERROR = 'ERROR',
    NEVER = 'NEVER',
};


export interface Tweet {
    _id: string,
    text: string;
    user: {
      fullname: string;
      username: string;
      avatarUrl: string;
    };
};


//этот интерфейс содержит items, который является массивом из Tweet
export interface TweetsState {
    items: Tweet[],
    loadingState: LoadingState
};


