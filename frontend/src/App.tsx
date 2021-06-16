import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useHistory } from 'react-router-dom';

import { Home } from './pages/Home';
import { SignIn, useStylesSignIn } from './pages/SignIn/SignIn';
import { UserPage } from './pages/User';
import { AuthApi } from './services/api/authApi';
import { fetchUserData, setUserData } from './store/ducks/user/actionCreators';
import { selectIsAuth, selectUserStatus } from './store/ducks/user/selectors';
import { LoadingStatus } from './store/types';

function App() {
  const history = useHistory();

  const classes = useStylesSignIn();

  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuth);
  const loadingStatus = useSelector(selectUserStatus);
  const isReady = loadingStatus !== LoadingStatus.NEVER && loadingStatus !== LoadingStatus.LOADING;

  React.useEffect(() => {
    dispatch(fetchUserData());
  }, []);


  //есть глобальный флаг isReady, который 
  React.useEffect(() => {
    if (isAuth) {
      history.push('/home');
    }
    if (!isAuth && isReady) {
      history.push('/SignIn');
    }
  }, [isAuth, isReady]);

  if (!isReady) {
    return (
      <div className={classes.centerRed}>
        <CircularProgress />
      </div>
    );
  };

  /*
  - реализовать нормальный переход из просмтра фул поста к обычному посту. Или прекратить считытьва бесконечные нажатия
  */

  return (
    <div className="App">
      <Switch>
        <Route path='/SignIn' component={SignIn} exact />
        <Route path='/home' component={Home} />
        <Route path="/user" component={UserPage} />
      </Switch>

    </div>
  );
}

export default App;
