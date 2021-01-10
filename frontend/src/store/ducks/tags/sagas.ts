import { TagsApi } from './../../../services/api/tagsApi';
import { call, put, takeEvery } from "redux-saga/effects";
import { setTags, setTagsLoadingState, TagsActionsType } from "./actionCreators";
import { LoadingState } from './contracts/state';

export function* fetchTagsRequest() {
    //получаю массив твитов
    const items = yield call(TagsApi.fetchTags);
    //добавляю их в редакс
    try{
        //yield put - это как dispath в редаксе
        yield put(setTags(items))
    }catch(error){
        yield put(setTagsLoadingState(LoadingState.ERROR));
    }
};

export function* tagsSaga() {
    //takeLatest - последний экшен
    //takeEvery - все экшены
    yield takeEvery(TagsActionsType.FETCH_TAGS, fetchTagsRequest);
};