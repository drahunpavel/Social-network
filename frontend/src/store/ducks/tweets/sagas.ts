import { TweetsApi } from './../../../services/api/tweetsApi';
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { addTweet, setTweets, setTweetsLoadingState } from "./actionCreators";
import { LoadingState, Tweet } from './contracts/state';
import { FetchAddTweetsActionInterface, TweetsActionsType } from './contracts/actionTypes';

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

//создаю новый генератор
export function* fetchAddTweetRequest({payload}:FetchAddTweetsActionInterface) {
    const data: Tweet = {
        _id: Math.random().toString(36).substr(2),
        text: payload,
        user: {
          fullname: 'Brian Vaughn 🖤',
          username: 'brian_d_vaughn',
          avatarUrl: 'https://pbs.twimg.com/profile_images/1290320630521487362/UKVSbU2V_bigger.jpg',
        },
      };
  
    const items = yield call(TweetsApi.addTweet, data);
    try{
        //добавляю их в редакс
        //yield put - это как dispath в редаксе
        yield put(addTweet(items))
    }catch(error){
        yield put(setTweetsLoadingState(LoadingState.ERROR));
    }
};

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
};