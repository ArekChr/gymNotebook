import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { FONT_COLOR } from '../styles/common';
import { Fonts } from '../styles'

class TitleComponent extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.text, this.props.style]}>{this.props.children}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontFamily: Fonts.robotoMedium,
    color: FONT_COLOR,
    textAlignVertical: 'center',
    marginTop: 50,
    marginBottom: 15
  }
});

export default TitleComponent;
