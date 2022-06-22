import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';

class App extends React.Component {
   renderRoutes = () => (
     <Switch>

       <Route path="/" component={ Home } />
       ;
     </Switch>
   );

   render() {
     return (
       <div>
         {this.renderRoutes()}
         <p>Opass</p>
       </div>
     );
   }
}

export default App;
