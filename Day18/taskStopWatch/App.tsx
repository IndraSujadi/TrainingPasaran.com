import React, { Component } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomButton from './CustomButton';

type Props = {};
type State = {
  startTime: number | null;
  currentTime: number;
  laps: Array<string>;
};

const INTERVAL = 40;

export default class App extends Component {
  state = {
    startTime: null,
    currentTime: Date.now(),
    laps: [],
  };
  _timeout: any = null;
  _timeElapsed: number = 0;
  _minuteCount: number = 0;

  render() {
    let { startTime, currentTime, laps } = this.state;
    if (startTime === null) {
      this._timeElapsed = 0;
      this._minuteCount = 0;
    } else {
      this._timeElapsed = (currentTime - startTime) / 1000;
    }

    let isStarted = startTime !== null;

    return (
      <View style={styles.container}>
        <Text style={styles.textLap}>StopWatch</Text>
        <Text style={styles.textTime}>
          {this._pad(this._minuteCount)}:{this._pad(this._timeElapsed.toFixed(2))}
        </Text>

        {/* <View style={styles.buttonRow}> */}

        {startTime === null && (
          <View style={styles.buttonRow}>
            <CustomButton title='start' onPress={this._start} background='green' disabled={false} />
            <CustomButton title='Lap' onPress={this._lap} background='#F6F5F5' disabled={true} />
          </View>
        )}
        {startTime !== null && (
          <View style={styles.buttonRow}>
            <CustomButton title='stop' onPress={this._stop} background='red' disabled={false} />
            <CustomButton title='Lap' onPress={this._lap} background='#F6F5F5' disabled={false} />
          </View>
        )}

        <ScrollView style={{ alignSelf: 'stretch', backgroundColor: '#353839', paddingHorizontal: 15 }}>
          {laps.map((lap, i) => {
            return (
              <View key={i} style={styles.lapContainer}>
                <Text style={styles.textLap}>Lap-{i + 1}</Text>
                <Text style={styles.textLap}>{lap}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }

  _updateCurrentTime = () => {
    if (this._timeElapsed >= 60) {
      this._minuteCount += 1;
      this.setState(currentState => ({
        startTime: Date.now(),
        currentTime: Date.now(),
      }));
      this._timeout = setTimeout(this._updateCurrentTime, INTERVAL);
    } else {
      this.setState(currentState => ({
        currentTime: Date.now(),
      }));
      this._timeout = setTimeout(this._updateCurrentTime, INTERVAL);
    }
  };

  _start = () => {
    let now = Date.now();
    this.setState(currentState => ({
      startTime: now,
      currentTime: now,
      laps: [],
    }));
    this._timeout = setTimeout(this._updateCurrentTime, INTERVAL);
  };

  _stop = () => {
    this.setState(currentState => ({
      startTime: null,
    }));
    clearTimeout(this._timeout);
  };

  _pad = n => (n < 10 ? '0' + n : n);

  _lap = () => {
    let { laps } = this.state;
    const lap = (this._pad(this._minuteCount) + ':' + this._pad(this._timeElapsed.toFixed(2))).toString();
    this.setState({ laps: [...laps, lap] });
  };

  _resetLap = () => {
    this.setState({ laps: [] });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    paddingTop: 115,
  },
  startStop: {
    borderRadius: 20,
    width: 30,
    height: 30,
  },
  textTime: {
    color: '#F5F6F6',
    fontSize: 48,
  },
  lapContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 15,
  },
  textLap: {
    color: '#F5F6F6',
    fontSize: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    marginTop: 80,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
});
