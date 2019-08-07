

import React, { Component } from 'react';
import { StyleSheet, Text, View ,FlatList,List, ActivityIndicator} from 'react-native';
import Fetchaction from "./fetchaction"
import { Provider } from 'react-redux';
import { store } from './redux/app-redux';




export  default class App extends Component {
 
  render() {
    return (
      <Provider store={store}>
       <View>
        <Fetchaction/>
        </View>
      </Provider>
    );
  }
}



