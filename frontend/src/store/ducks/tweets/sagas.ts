import { TweetsApi } from './../../../services/api/tweetsApi';
import { call, put, takeEvery } from "redux-saga/effects";
import { setTweets, setTweetsLoadingState, TweetsActionsType } from "./actionCreators";
import { LoadingState } from './contracts/state';

export function* fetchTweetsRequest() {
    //получаю массив твитов
    const items = yield call(TweetsApi.fetchTweets);
    //добавляю их в редакс
    try{
        //yield put - это как dispath в редаксе
        yield put(setTweets(items))
    }catch(error){
        yield put(setTweetsLoadingState(LoadingState.ERROR));
    }
};

export function* tweetsSaga() {
    //takeLatest - последний экшен
    yield takeEvery(TweetsActionsType.FETCH_TWEETS, fetchTweetsRequest);
};