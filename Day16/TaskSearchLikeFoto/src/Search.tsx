// link setting eslint
// gist.github.com/sstur/b691f6189ed4a5bb5f364e5770e169b7
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
import {ImageContext} from './ImageContext';
import PropTypes from 'prop-types';

type Props = {};

type State = {
  query: string;
  images: Array<string>;
  fav: Array<string>;
};

export default class Search extends Component<Props, State> {
  state = {
    query: '',
    images: [],
    fav: this.context.fav,
  };
  //  ini untuk bilang type context yang diharapkan
  static contextTypes = {
    query: PropTypes.string,
    images: PropTypes.array,
    fav: PropTypes.array,
    like: PropTypes.func,
    unlike: PropTypes.func,
  };

  _fetchData = async () => {
    let url = `https://api.imgur.com/3/gallery/search/?q=${this.state.query}`;
    let response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application.json',
        Authorization: 'Client-ID 24b9bf1b56a95f7',
      },
    });

    let data = await response.json();
    let images = [];
    for (let item of data.data) {
      if (item.is_album == false) {
        images.push(item.link);
      }
    }
    this.setState({
      images: images,
    });
  };

  componentDidMount() {
    this.onPress();
  }

  onPress = () => {
    console.log(this.context);
    // this.context.onPress();
    this._fetchData();
  };

  like = (newFav) => {
    let {fav} = this.state;
    this.setState((currentState) => ({fav: [...fav, newFav]}));
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
    let {query, images, fav} = this.state;
    let onChange = (text) => {
      this.setState({query: text});
    };

    return (
      <View style={styles.container}>
        <TextInput style={styles.Input} value={query} onChangeText={onChange} />
        <Text style={styles.introText}>{query || 'Input Some Text'}</Text>
        <TouchableWithoutFeedback onPress={this.onPress}>
          <View style={styles.Button}>
            <Text>Search</Text>
          </View>
        </TouchableWithoutFeedback>
        <ScrollView style={{borderWidth: 1, padding: 1}}>
          {images.map((imgUrl, i) => {
            if (imgUrl === fav[i]) {
              return (
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.unlike(images[i]);
                    this.context.unlike(images[i]);
                  }}
                  key={i}
                >
                  <View style={styles.imageContainer}>
                    <Image source={{uri: imgUrl}} style={styles.image} />
                    <View style={styles.favorite} />
                  </View>
                </TouchableWithoutFeedback>
              );
            } else {
              return (
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.like(images[i]);
                    this.context.like(images[i]);
                  }}
                  key={i}
                >
                  <View key={i} style={styles.imageContainer}>
                    <Image source={{uri: imgUrl}} style={styles.image} />
                    {/* <View style={styles.favorite} /> */}
                  </View>
                </TouchableWithoutFeedback>
              );
            }
          })}
        </ScrollView>
      </View>
    );
  }
}

// Search.contextType = ImageContext;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 25,
    paddingHorizontal: 10,
  },
  introText: {
    color: 'blue',
  },
  Input: {
    borderWidth: 1,
    borderColor: '#333',
    height: 32,
    paddingHorizontal: 4,
    alignSelf: 'stretch',
  },
  Button: {
    borderWidth: 1,
    borderColor: '#333',
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
