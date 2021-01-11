import { rootReducer } from './rootReducer';
import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';
import { TweetsState } from './ducks/tweets/contracts/state';
import { TagsState } from './ducks/tags/contracts/state';
import { TweetState } from './ducks/tweet/contracts/state';

//костыль, чтобы не регулалось на __REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//в конфиге сделал custom type definitions
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  const sagaMiddleware = createSagaMiddleware();

  //сюда добавляю каждый интересующий параметр
  export interface RootState {
    tweets: TweetsState;
    tags: TagsState,
    tweet: TweetState,
  };
  

  export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

  sagaMiddleware.run(rootSaga);