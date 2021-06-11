import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { SignIn } from './pages/SignIn/SignIn';

function App() {
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
