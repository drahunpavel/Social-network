import { TweetsApi } from './../../../services/api/tweetsApi';
import { call, put, takeLatest } from "redux-saga/effects";
import { addTweet, setAddFormState, setTweets, setTweetsLoadingState } from "./actionCreators";
import { LoadingState, Tweet, AddFormState } from './contracts/state';
import { FetchAddTweetsActionInterface, RemoveTweetActionInterface, TweetsActionsType } from './contracts/actionTypes';

export function* fetchTweetsRequest() {
    try{
        const pathname = window.location.pathname;
        const userId = pathname.includes('/user') ? pathname.split('/').pop() : undefined;
        //получаю массив твитов
        const items: Tweet[] = yield call(TweetsApi.fetchTweets, userId);
        //добавляю их в редакс
        //yield put - это как dispath в редаксе
        yield put(setTweets(items));
    }catch(error){
        yield put(setTweetsLoadingState(LoadingState.ERROR));
    }

};

//создаю новый генератор
export function* fetchAddTweetRequest({payload}:FetchAddTweetsActionInterface) {
    try{
        const item: Tweet = yield call(TweetsApi.addTweet, payload);
        //добавляю их в редакс
        //yield put - это как dispath в редаксе
        yield put(addTweet(item));
    }catch(error){
        // yield put(setTweetsLoadingState(LoadingState.ERROR));
        //ошибка при добавлении поста, устанавливаю статус ошибки
        yield put(setAddFormState(AddFormState.ERROR));
    }
};

export function* fetchRemoveTweetRequrest({ payload }: RemoveTweetActionInterface) {
    try {
      yield call(TweetsApi.removeTweet, payload);
    } catch (error) {
      alert('Ошибка при удалении твита');
    }
  }
  

// export function* tweetsSaga() {
//     //takeLatest - последний экшен
//     yield takeEvery(
//         TweetsActionsType.FETCH_TWEETS, fetchTweetsRequest,
//         TweetsActionsType.FETCH_ADD_TWEET, addTweetRequest
//     );
// };
export function* tweetsSaga() {
    //takeLatest - последний экшен
    yield takeLatest(TweetsActionsType.FETCH_TWEETS, fetchTweetsRequest);
    yield takeLatest(TweetsActionsType.FETCH_ADD_TWEET, fetchAddTweetRequest);
    yield takeLatest(TweetsActionsType.REMOVE_TWEET, fetchRemoveTweetRequrest);
};