import { rootReducer } from './rootReducer';
import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';
import { TweetsState } from './ducks/tweets/contracts/state';


//костыль, чтобы не регулалось на __REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//в конфиге сделал custom type definitions
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  function reducer(state = 0, action: any):void {
    console.log('--', state, action)
  };

  const sagaMiddleware = createSagaMiddleware();

  export interface RootState {
    tweets: TweetsState;
  };
  

  export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

  sagaMiddleware.run(rootSaga);