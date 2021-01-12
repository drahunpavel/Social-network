
import { Action } from 'redux';
import { LoadingState, Tweet, TweetsState } from './contracts/state';

export enum TweetsActionsType {
    SET_TWEETS = 'tweets/SET_TWEETS',
    FETCH_TWEETS = 'tweets/FETCH_TWEETS',
    SET_LOADING_STATE = 'tweets/SET_LOADING_STATE',
    FETCH_ADD_TWEET = 'tweets/FETCH_ADD_TWEET',
    ADD_TWEET = 'tweets/ADD_TWEET',
};
  
//interface SetTweetsActionInterface наследуется от редкакс Action
export interface SetTweetsActionInterface extends Action<TweetsActionsType> {
    type: TweetsActionsType.SET_TWEETS;
    payload: TweetsState['items'];
};

export interface FetchAddTweetsActionInterface extends Action<TweetsActionsType> {
    type: TweetsActionsType.FETCH_ADD_TWEET;
    // payload: Tweet;
    payload: string;
};

export interface AddTweetsActionInterface extends Action<TweetsActionsType> {
    type: TweetsActionsType.ADD_TWEET;
    // payload: Tweet;
    payload: Tweet;
};

export interface FetchTweetsActionInterface extends Action<TweetsActionsType> {
    type: TweetsActionsType.FETCH_TWEETS;
};

export interface SetTweetsLoadingStateActionInterface extends Action<TweetsActionsType> {
    type: TweetsActionsType.SET_LOADING_STATE;
    payload: LoadingState;
  }
  

export const setTweets = (payload: TweetsState['items']):SetTweetsActionInterface => ({
    type: TweetsActionsType.SET_TWEETS,
    payload
});

//экшен для отправки данных о твите на бэк
export const fetchAddTweet = (payload: string):FetchAddTweetsActionInterface => ({
    type: TweetsActionsType.FETCH_ADD_TWEET,
    payload
});

//экшен для работы с объектом на фроне
export const addTweet = (payload: Tweet):AddTweetsActionInterface => ({
    type: TweetsActionsType.ADD_TWEET,
    payload
});

export const setTweetsLoadingState = (
    payload: LoadingState,
  ): SetTweetsLoadingStateActionInterface => ({
    type: TweetsActionsType.SET_LOADING_STATE,
    payload,
  });
  

export const fetchTweets = (): FetchTweetsActionInterface => ({
    type: TweetsActionsType.FETCH_TWEETS,
});
  

export type TweetsActions = 
    SetTweetsActionInterface | 
    SetTweetsLoadingStateActionInterface | 
    FetchTweetsActionInterface |
    AddTweetsActionInterface |
    FetchAddTweetsActionInterface;