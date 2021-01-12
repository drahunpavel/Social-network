import produce, { Draft } from 'immer';
import { TweetsActions } from './actionCreators';
import { TweetsActionsType } from './contracts/actionTypes';
import { LoadingState, TweetsState, AddFormState } from './contracts/state';


const initialTweetsState: TweetsState = {
    items: [],
    loadingState: LoadingState.NEVER,
    addFormState: AddFormState.NEVER,
};
  

//(draft, action) - это технология immera
//за счет produce нам здесь не нужно указывать return
export const tweetsReducer = produce((draft: Draft<TweetsState>, action: TweetsActions) => {
  switch (action.type) {
    case TweetsActionsType.SET_TWEETS:
      draft.items = action.payload;
      draft.loadingState = LoadingState.LOADED;
      break;

    case TweetsActionsType.FETCH_TWEETS:
      draft.items = [];
      draft.loadingState = LoadingState.LOADING;
      break;

    case TweetsActionsType.SET_LOADING_STATE:
      draft.loadingState = action.payload;
      break;

      case TweetsActionsType.SET_ADD_FORM_STATE:
        draft.addFormState = action.payload;
      break;

    case TweetsActionsType.FETCH_ADD_TWEET:
      draft.addFormState = AddFormState.LOADING;
      break;

    case TweetsActionsType.ADD_TWEET:
      draft.items.push(action.payload);

      //после того, как новый пост добавлен, в редакс залетает статус NEVER
      draft.addFormState = AddFormState.NEVER;
      break;

    default:
      break;
  }
}, initialTweetsState);
//выше initialTweetsState - это значение по умолчанию