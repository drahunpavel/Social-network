import { Action } from "redux";
import { AddFormState, LoadingState, Tweet, TweetsState } from "./state";

export enum TweetsActionsType {
    SET_TWEETS = 'tweets/SET_TWEETS',
    FETCH_TWEETS = 'tweets/FETCH_TWEETS',
    SET_LOADING_STATE = 'tweets/SET_LOADING_STATE',
    FETCH_ADD_TWEET = 'tweets/FETCH_ADD_TWEET',
    ADD_TWEET = 'tweets/ADD_TWEET',
    SET_ADD_FORM_STATE = 'tweets/SET_ADD_FORM_STATE',
};
  
//interface SetTweetsActionInterface наследуется от редкакс Action
export interface SetTweetsActionInterface extends Action<TweetsActionsType> {
    type: TweetsActionsType.SET_TWEETS;
    payload: TweetsState['items'];
};

export interface FetchAddTweetsActionInterface extends Action<TweetsActionsType> {
    type: TweetsActionsType.FETCH_ADD_TWEET;
    // payload: Tweet;
    payload: {text: string, images: string[]};
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

export interface SetAddFormStateActionInterface extends Action<TweetsActionsType> {
    type: TweetsActionsType.SET_ADD_FORM_STATE;
    payload: AddFormState;
}