// link setting eslint
// gist.github.com/sstur/b691f6189ed4a5bb5f364e5770e169b7
import 'react-native-gesture-handler';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
// library untuk pindah halaman
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './Home';
import Search from './Search';
import Favorite from './Favorite';
import {ImageContext} from './ImageContext';
import {Value} from 'react-native-reanimated';
import {forVerticalIOS} from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators';

type Props = {};

type State = {
  query: string;
  images: Array<string>;
  // fav: Array<string>;
  fav: Map<string, string>;
};

const Stack = createStackNavigator();

export default class App extends Component<Props, State> {
  state = {
    query: '',
    images: [],
    // fav: [],
    fav: new Map(),
  };

  // ini untuk buat type untuk context
  static childContextTypes = {
    fav: PropTypes.object,
  };

  // ini untuk kirim context nya
  getChildContext() {
    let {fav} = this.state;
    return {
      fav: fav,
    };
  }

  render() {
    let {query, images, fav} = this.state;
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{title: 'Image Hunter App'}}
          />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Favorite" component={Favorite} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
