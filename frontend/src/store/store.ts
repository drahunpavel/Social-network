import { rootReducer } from './rootReducer';
import {compose, createStore} from 'redux';

//костыль, чтобы не регулалось на __REDUX_DEVTOOLS_EXTENSION_COMPOSE__
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


  export const store = createStore(rootReducer, composeEnhancers());