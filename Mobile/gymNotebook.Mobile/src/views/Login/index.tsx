import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native'
import {Logo} from '../../component'
import LoginForm from './LoginForm'
import { setAuth } from '../../store/auth/actions'
import { connect } from 'react-redux'
import { STATUS_BAR_COLOR } from '../../styles/common'
import { NavigationScreenProp } from 'react-navigation';
import { Dispatch } from 'redux';
import { AppState } from '../../store';
import firebase from 'react-native-firebase';
import { fetchMyProfile } from '../../store/profile/actions';

interface Props extends ReturnType<typeof mapDispatchToProps>, ReturnType<typeof mapStateToProps> {
  navigation: NavigationScreenProp<LoginScreen>
}

class LoginScreen extends Component<Props> {

  _isMounted = false;

  state = {
    loading: true
  }
  
  componentDidMount(){
    this._isMounted = true;

    firebase.auth().onAuthStateChanged(user => {
      if(this._isMounted){
        if(user){
          this.props.setAuth(user)
          this.props.fetchMyProfile(user.uid)
          this.props.navigation.navigate('HomeScreen')
        } else {
          this.setState({loading: false})
        }
      }
    })
  }
  
  componentWillUnmount(){
    this._isMounted = false;
  }
  
  onLoginSuccess = () => {
    this.props.navigation.navigate('HomeScreen')
  }

  onRegisterPressed = () => {
    this.props.navigation.navigate('NameScreen')
  }

  render() {

    if(this.state.loading){
      return (
        <View style={styles.loading}>
          <StatusBar backgroundColor={STATUS_BAR_COLOR} />
          <ActivityIndicator size='large'/>
        </View>
      )
    } else {
      return(
        <View style={styles.container}>
          <StatusBar backgroundColor={STATUS_BAR_COLOR} />
          <Logo/>
          <LoginForm onLoginSuccess={this.onLoginSuccess}/>
          <View style={styles.signupTextCont}>
              <Text style={styles.signupText}>Nie masz konta? </Text>
              <TouchableOpacity onPress={this.onRegisterPressed}>
                  <Text style={styles.signupButton}>Zajerestruj się</Text>
              </TouchableOpacity>
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  signupTextCont: {
    height: 100,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row'
  },
  signupText: {
    color: 'rgba(0,0,0,0.7)',
    fontSize: 16
  },
  signupButton: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500'
  },
  loading: {
    flex: 1,
    backgroundColor:'rgba(34,34,34,1)',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const mapStateToProps = (state: AppState) => ({
  auth: state.Auth.auth
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setAuth: (user: any) => setAuth(user)(dispatch),
  fetchMyProfile: (uid: string) => fetchMyProfile(uid)(dispatch)
})

export default connect(mapStateToProps , mapDispatchToProps)(LoginScreen)