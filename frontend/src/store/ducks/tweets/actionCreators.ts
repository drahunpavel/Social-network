import { 
    AddTweetsActionInterface, 
    FetchAddTweetsActionInterface, 
    FetchTweetsActionInterface, 
    RemoveTweetActionInterface, 
    SetAddFormStateActionInterface, 
    SetTweetsActionInterface, 
    SetTweetsLoadingStateActionInterface, 
    TweetsActionsType 
} from './contracts/actionTypes';
import { LoadingState, Tweet, TweetsState, AddFormState } from './contracts/state';


export const setTweets = (payload: TweetsState['items']):SetTweetsActionInterface => ({
    type: TweetsActionsType.SET_TWEETS,
    payload
});

//экшен для отправки данных о твите на бэк
export const fetchAddTweet = (payload: {text: string, images: string[]}):FetchAddTweetsActionInterface => ({
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
  

export const setAddFormState = (payload: AddFormState): SetAddFormStateActionInterface => ({
  type: TweetsActionsType.SET_ADD_FORM_STATE,
  payload,  
});

export const removeTweet = (payload: string): RemoveTweetActionInterface => ({
    type: TweetsActionsType.REMOVE_TWEET,
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
    SetAddFormStateActionInterface |
    FetchAddTweetsActionInterface |
    RemoveTweetActionInterface |
    FetchTweetsActionInterface;