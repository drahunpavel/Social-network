import { TweetsApi } from './../../../services/api/tweetsApi';
import { call, put, takeEvery } from "redux-saga/effects";
import { FetchTweetDataActionInterface, setTweetData, setTweetLoadingState, TweetActionsType } from "./actionCreators";
import { LoadingState } from './contracts/state';
import { Tweet } from '../tweets/contracts/state';

export function* fetchTweetRequest({ payload: tweetId }:FetchTweetDataActionInterface) {
    //получаю массив твитов
    const data: Tweet[] = yield call(TweetsApi.fetchTweetData, tweetId);
    //добавляю их в редакс
    try{
        //yield put - это как dispath в редаксе
        yield put(setTweetData(data[0]));
    }catch(error){
        yield put(setTweetLoadingState(LoadingState.ERROR));
    }
};

export function* tweetSaga() {
    //takeLatest - последний экшен
    //takeEvery - все экшены
    yield takeEvery(TweetActionsType.FETCH_TWEET_DATA, fetchTweetRequest);
};