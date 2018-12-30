import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import CalendarModal from './CalendarModal'
import { handleCalendarModal, createProgress } from '../../store/progress/actions';
import { connect } from 'react-redux';
import { capFirst } from '../../utils/string'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

class AddProgressScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Dodaj ',
      headerRight: (
        <TouchableOpacity style={{padding: 10}} onPress={navigation.getParam('onProgressAdd')}>
          <MaterialIcons name="check" size={25} color='white' /> 
        </TouchableOpacity>
      )
    }
  }

  state = {
    number: this.props.lastProgress
  }

  componentDidMount() {
    this.props.navigation.setParams({ onProgressAdd: this._onProgressAdd})
  }

  _onProgressAdd = () => {
    const { selectedDate, selectedProgress } = this.props
    const progress = { 
      createdAt: selectedDate,
      [selectedProgress]: this.state.number.toString()
    }
    this.props.createProgress(progress)
  }

  handleInput = (text) => {
    let newText = '';
    let numbers = '0123456789.';

    for (var i=0; i < text.length; i++) {
        if(numbers.indexOf(text[i]) > -1 ) {
            newText = newText + text[i];
            if(text[i]=="."){
              numbers = '0123456789'
            }
        }
        else {
            // your call back function
            alert("please enter numbers only");
        }
    }
    this.setState({ number: newText })
  }

  render() {
    return (
      <View>
        <CalendarModal ref="modal"/>
        <View style={styles.item}>
          <Text style={styles.text}>{capFirst(this.props.selectedProgress)}</Text>
          <TextInput 
            style={styles.input} 
            keyboardType={'numeric'}
            onChangeText={(value) => this.handleInput(value)}
            autoFocus={true}
            defaultValue={this.state.number.toString()}
            value={this.state.number.toString()}
            
            maxLength={6}
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.text}>Data</Text>
          <TouchableOpacity style={styles.input} onPress={() => this.props.handleCalendarModal()}>
            <Text>{this.props.selectedDate}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderBottomWidth: 1, 
    borderBottomColor: 'rgba(0,0,0,0.2)',
    height: 60
  },
  text: { 
    paddingLeft: 10 
  },
  input: { 
    paddingRight: 10, 
    marginLeft: 'auto'
  }
})

const mapStateToProps = ({progress}) => ({
  selectedDate: progress.selectedDate,
  selectedProgress: progress.selectedProgress,
  lastProgress: progress.lastProgress
})

const mapDispatchToProps = (dispatch) => ({
  handleCalendarModal: () => handleCalendarModal()(dispatch),
  createProgress: (progress) => createProgress(progress)(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AddProgressScreen)