import React, { Component } from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import {Login} from "./components/index";

import './custom.css'

const App = () => {
  return (
    <Layout>
      <Route path='/' component={Login} />
      <Route path='/home' component={Home} />
      <Route path='/counter' component={Counter} />
      <Route path='/fetch-data' component={FetchData} />
    </Layout>
  );
}

export default App;