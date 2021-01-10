//описываю состояние загрузки тэгов
export enum LoadingState {
    LOADED = 'LOADED',
    LOADING = 'LOADING',
    ERROR = 'ERROR',
    NEVER = 'NEVER',
};


export interface Tag {
    _id: string,
    name: string;
    count: number;
};


//этот интерфейс содержит items, который является массивом из Tag
export interface TagsState {
    items: Tag[],
    loadingState: LoadingState,
};


