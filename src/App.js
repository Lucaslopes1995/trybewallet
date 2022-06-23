import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

class App extends React.Component {
   renderRoutes = () => (
     <Switch>

       <Route exact path="/trybewallet/" component={ Login } />
       <Route exact path="/trybewallet/carteira" component={ Wallet } />
       ;
     </Switch>
   );

   render() {
     return (
       <div>
         {this.renderRoutes()}
       </div>
     );
   }
}

export default App;
