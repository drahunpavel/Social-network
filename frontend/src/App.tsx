import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useHistory } from 'react-router-dom';

import { Home } from './pages/Home';
import { SignIn } from './pages/SignIn/SignIn';
import { AuthApi } from './services/api/authApi';
import { setUserData } from './store/ducks/user/actionCreators';
import { selectIsAuth } from './store/ducks/user/selectors';

function App() {
  // TODO: Поправить через саги или как-нибудь по другому, это херня
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  // TODO: Чекать если юзер не авторизован, то очищать токен и редакс
  const checkAuth = async () => {
    try {
      const { data } = await AuthApi.getMe();
      dispatch(setUserData(data));
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    checkAuth();
  }, []);

  React.useEffect(() => {
    if (isAuth) {
      history.push('/home');
    }
  }, [isAuth]);



  return (
    <div className="App">
      <Switch>
        <Route path='/SignIn' component={SignIn} />
        <Route path='/' component={Home} />
      </Switch>
    </div>
  );
}

export default App;
