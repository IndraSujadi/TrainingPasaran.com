import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

type Props = {};

type State = {
  fav: Array<string>;
};

export default class Favorite extends Component<Props> {
  static contextTypes = {
    fav: PropTypes.array,
    unlike: PropTypes.func,
  };

  state = {
    fav: this.context.fav,
  };

  unlike = (unFavImg) => {
    let {fav} = this.state;

    fav.forEach((f, index) => {
      if (f === unFavImg) {
        fav.splice(index, 1);
      }
    });
    this.setState({fav: fav});
  };

  render() {
    let {fav} = this.state;
    console.log(fav);
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Favorite Image</Text>
        <ScrollView style={{borderWidth: 1, padding: 1}}>
          {fav.map((imgUrl, i) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => {
                  this.unlike(fav[i]);
                  this.context.unlike(fav[i]);
                }}
                key={i}
              >
                <View style={styles.imageContainer}>
                  <Image source={{uri: imgUrl}} style={styles.image} />
                  <View style={styles.favorite} />
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  title: {
    alignSelf: 'stretch',
    fontSize: 30,
    color: 'blue',
  },
  image: {
    width: 150,
    height: 150,
  },
  imageContainer: {
    width: 150,
    height: 150,
    margin: 2,
  },
  favorite: {
    width: 6,
    height: 6,
    borderRadius: 3,
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'red',
  },
});
