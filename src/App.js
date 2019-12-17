import React, { Component } from "react";
import { Route, HashRouter } from "react-router-dom";
import Main from "./components/Main/Main";
import Serials from "./components/Serials/Serials";

class App extends Component {

  render () {  
    return (          
      <HashRouter basename='/'>       
        <Route exact path='/' component={Main} />       
        <Route exact path='/serials' component={Serials} />     
      </HashRouter>     
    );
  }
}

export default (App);
