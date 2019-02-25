import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { Dispatch } from 'redux';
import { ActivityIndicator } from '@ant-design/react-native';

interface Props {
  modal: boolean
}

class LoadingModal extends Component<Props> {

  componentDidMount() {
  }

  render() {
    return (
        <Modal 
          transparent={true}
          onRequestClose={() => {}}
          visible={this.props.modal}
          animationType={'fade'}
        >
        <StatusBar barStyle="dark-content" />
          <View style={{ backgroundColor: 'rgba(0,0,0,0.3)', width: '100%', height: '100%'}}>
            <View style={styles.container}>
              <ActivityIndicator size="large" color="white"></ActivityIndicator>
            </View>
          </View>
        </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    borderRadius: 5,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 30,
    marginRight: 30,
    padding: 20,
    minWidth: 300,
    elevation: 50
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  buttonContainer: { 
    marginLeft: 'auto',
    flexDirection: 'row'
  },
  button: {
    padding: 15,
  },
  buttonText: {
    fontSize: 13
  }
})

export default LoadingModal