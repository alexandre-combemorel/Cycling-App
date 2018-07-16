import React from "react";
import Search from './components/Search';
import Content from './components/Content';
import ErrorDialog from './components/ErrorDialog';
// 

const App = () => {
  return (
  <div className="cycling">
    <div className="cycling__inner">
      <div className="cycling__header">
        <img src={require('./assets/logo.png')}/>
        <h2>CYCLING APP</h2>
      </div>
      <div className="cycling__error-dialog">
        <ErrorDialog/>
      </div>
      <div className="cycling__search">
        <Search/>
      </div>
      <div className="cycling__content">
        <Content/>
      </div>
    </div>
  </div>
)};
export default App;

import style from './App.scss';