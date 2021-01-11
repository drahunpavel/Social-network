import produce, { Draft } from 'immer';
import { TweetActions, TweetActionsType } from './actionCreators';
import { LoadingState, TweetState } from './contracts/state';

const initialTagsState: TweetState = {
    data: undefined,
    loadingState: LoadingState.NEVER,
};
  

//(draft, action) - это технология immera
//за счет produce нам здесь не нужно указывать return
export const tweetReducer = produce((draft: Draft<TweetState>, action: TweetActions) => {
  switch (action.type) {
    case TweetActionsType.SET_TWEET_DATA:
      draft.data = action.payload;
      draft.loadingState = LoadingState.LOADED;
      break;

    case TweetActionsType.FETCH_TWEET_DATA:
      draft.data = undefined;
      draft.loadingState = LoadingState.LOADING;
      break;

    case TweetActionsType.SET_LOADING_STATE:
      draft.loadingState = action.payload;
      break;

    default:
      break;
  }
}, initialTagsState);
//выше initialTagsState - это значение по умолчанию