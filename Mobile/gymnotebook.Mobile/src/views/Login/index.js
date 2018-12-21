import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import Logo from '../../component/Logo'
import LoginForm from './LoginForm'
import { getTokens } from '../../utils/misc'
import { mapJwtToState } from '../../store/auth/actions'
import { connect } from 'react-redux'

class LoginScreen extends Component {

  state = {
    loading: true
  }

  onLoginSuccess = () => {
    this.props.navigation.navigate('HomeScreen')
  }

  onRegisterPressed = () => {
    this.props.navigation.navigate('RegisterScreen')
  }

  componentDidMount(){
    getTokens((value) => {
      console.log(value)
      if(value[0][1] === null){
        this.setState({loading:false})
      } 
      else {
        // TODO: shoud check if token is valid or login app immediately by checking expiry ?
        const expiry = Number(value.find(x => x[0] ==='@gymNotebook@expiryToken')[1])
        const now = new Date().getTime()
        if(expiry >= now){
          const token = value.find(x => x[0] ==='@gymNotebook@token')[1]
          const jwt = { token: token, expiry: expiry }
          this.props.mapJwtToState(jwt)
          this.setState({loading:false})
          this.onLoginSuccess()
          
        }
      }
      //this.setState({loading: false})
    })
  }

  render() {

    if(this.state.loading){
      return (
        <View style={styles.loading}>
          <ActivityIndicator size='large'/>
        </View>
      )
    } else {
      return(
        <View style={styles.container}>
            <Logo/>
            <LoginForm onLoginSuccess={() => this.onLoginSuccess()}/>
            <View style={styles.signupTextCont}>
                <Text style={styles.signupText}>Don't have an account? </Text>
                <TouchableOpacity onPress={this.onRegisterPressed}>
                    <Text style={styles.signupButton}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(34,34,34,1)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  signupTextCont: {
    // flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row'
  },
  signupText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16
  },
  signupButton: {
    color: '#ffffff',
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

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  mapJwtToState: (token) => mapJwtToState(token)(dispatch)
})


export default connect(null , mapDispatchToProps)(LoginScreen)