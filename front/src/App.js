import React from 'react';
import ListagemAnimal from './animais/TabelaAnimais';
import FormAnimal from './animais/FormAnimal';
import {store} from './store';
import { Provider } from 'react-redux'

import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom"; 


  const App = (props) => {

    return (<>
        <Provider store={store}>
            <Router>
                <Switch>
                  <Route path="/animais/novo"><FormAnimal /></Route>
                  <Route path="/animais/:id"><FormAnimal /></Route>
                  <Route path="/animais">
                  <ListagemAnimal /></Route>
                  <Route path="/">
                  
                    <ListagemAnimal /></Route>
                </Switch>
              
            </Router>
        </Provider>
    </>);
  }
  
  export default App;