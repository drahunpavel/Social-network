import { Action } from 'redux';
import { LoadingState, TweetsState } from './contracts/state';

export enum TweetsActionsType {
    SET_TWEETS = 'tweets/SET_TWEETS',
    FETCH_TWEETS = 'tweets/FETCH_TWEETS',
    SET_LOADING_STATE = 'tweets/SET_LOADING_STATE',
};
  
//interface SetTweetsActionInterface наследуется от редкакс Action
export interface SetTweetsActionInterface extends Action<TweetsActionsType> {
    type: TweetsActionsType.SET_TWEETS;
    payload: TweetsState['items'];
};
  

export const setTweets = (payload: TweetsState['items']):SetTweetsActionInterface => ({
    type: TweetsActionsType.SET_TWEETS,
    payload
});

export type TweetsActions = SetTweetsActionInterface;