//костыль, чтобы не регулалось на __REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//в конфиге сделал custom type definitions
declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}