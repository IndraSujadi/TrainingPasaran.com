import React, {Component} from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

type Props = {
  navigation: any;
};

class Home extends Component<Props> {
  onPressSearch = () => {
    this.props.navigation.navigate('Search');
  };

  onPressFav = () => {
    this.props.navigation.navigate('Favorite');
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.appName}>Image Hunter</Text>
        <TouchableWithoutFeedback onPress={this.onPressSearch}>
          <View style={styles.buttonSearch}>
            <Text style={styles.textstyle}>Search</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.onPressFav}>
          <View style={styles.buttonFav}>
            <Text style={styles.textstyle}>Favorite</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  appName: {
    alignSelf: 'stretch',
    fontSize: 30,
    color: 'blue',
  },
  buttonSearch: {
    width: 150,
    marginVertical: 2,
    borderRadius: 3,
    borderWidth: 1,
    backgroundColor: 'grey',
  },
  buttonFav: {
    width: 150,
    marginVertical: 2,
    borderRadius: 3,
    borderWidth: 1,
    backgroundColor: 'salmon',
  },
  textstyle: {
    alignContent: 'center',
  },
});

export default Home;
