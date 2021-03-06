import React, { Component } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { SECONDARY_COLOR } from '../styles/common';
import { Fonts } from '../styles'

export default class ButtonNext extends Component<TouchableOpacityProps> {

  render() {
    return (
      <TouchableOpacity {...this.props} style={{padding: 2, marginTop: 30}}>
        <Text style={{ 
          width: '100%', 
          backgroundColor: SECONDARY_COLOR, 
          color: 'white', 
          fontFamily: Fonts.robotoMedium,
          textAlignVertical: "center",
          textAlign: 'center',
          height: 35,
          borderRadius: 4
        }}>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}