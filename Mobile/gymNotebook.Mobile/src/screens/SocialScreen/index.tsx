import React, { Component } from 'react'
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, TouchableWithoutFeedback, Image, ScrollView, RefreshControl, Dimensions, TextInput} from 'react-native'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import LinearGradient from 'react-native-linear-gradient';
import { NavigationScreenProp, NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import PostImage from 'react-native-scalable-image';
import ImagePicker from 'react-native-image-crop-picker';
import { Dispatch } from 'redux';

import { fetchPosts } from '../../redux/post/actions'
import { AppState } from '../../redux';
import { Post } from '../../redux/post/types';
import { fetchMyProfile } from '../../redux/profile/actions';
import { Colors } from '../../styles/colors';

interface Props extends ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps> {
  navigation: NavigationScreenProp<SocialScreen>
}

class SocialScreen extends Component<Props> {

  state = {
    refreshing: false,
    win: {
      width: 0,
      height: 0,
      scale: 0,
      fontScale: 0
    }
  }

  static navigationOptions = ({ navigation }: NavigationScreenProps) => {
    return {
      headerLeft: (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={{marginLeft: 11}} onPress={navigation.getParam('onOpenCamera')}>
            <FontAwesome name="camera" size={20} color='black' /> 
          </TouchableOpacity>
        </View>
      ),
      headerRight: (
        <>
          <TouchableOpacity style={styles.icon} onPress={navigation.getParam('onPostAdd')}>
            <MaterialIcons name="add-a-photo" size={28} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon} onPress={navigation.getParam('onMessagesClick')}>
          <FontAwesome name="send-o" size={25} color="black" />
          </TouchableOpacity>
        </>
      )
    }
  }
  
  componentDidMount() {
    this.setState({ win: Dimensions.get("window") });
    this.props.navigation.setParams({ onPostAdd: this._onPostAdd, onMessagesClick: this._onMessagesClick })
  }

  _onMessagesClick = () => {
    this.props.navigation.navigate('ChatsScreen')
  }

  _onPostAdd = () => {
    ImagePicker.openPicker({
      width: 2000,
      height: 2000,
      compressImageMaxHeight: 1500,
      compressImageMaxWidth: 1500,
      compressImageQuality: 0.3,
      multiple: false,
      cropping: true,
      freeStyleCropEnabled: true
    }).then((image) => {
      this.props.navigation.navigate('NewPostScreen', {
        pickedImage: { ...image}
      })
    });
  }

  onCommentShowPressed = (id: string) => {
    this.props.navigation.navigate('CommentsScreen',{
      postId: id
    })
  }

  onRefresh = () => {
    this.setState({refreshing: true});
    this.props.fetchPosts(20, undefined, () => {
      this.setState({refreshing: false});
    })
  }

  onRelationClick = () => {
    this.props.navigation.navigate('VideoRelations')
  }

  renderPosts(posts?: Post[]) {
    if(posts !== undefined){
      return posts.map((post: Post, i: number) => {
        return (
        <View key={i}>
          <View style={{ height: 45, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <TouchableOpacity>
                <Image style={{ width: 30, height: 30, borderRadius: 45, marginTop: 'auto', marginBottom: 'auto', marginLeft: 8, marginRight: 8}} 
                source={require('../../images/profile2.jpg')}/>
              </TouchableOpacity>
              <View>
                <TouchableOpacity style={{padding: 0, margin: 0, top: 0, bottom: 0}}>
                  <Text style={{marginBottom: -5}}>{`${post.firstName} ${post.lastName}`}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{}}>
                  <Text style={{fontSize: 12}}>Gdynia</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View >
              <TouchableOpacity>
                <SimpleLineIcons name="options-vertical" size={15} style={{marginRight: 8}} color="gray" />
              </TouchableOpacity>
            </View>

          </View>

          <TouchableWithoutFeedback style={{}}>
              <PostImage width={this.state.win.width} source={{uri: post.imageURL}}/>
          </TouchableWithoutFeedback>

          <View style={{padding: 10}}>
            <View style={{flexDirection: 'row', display: 'flex'}}>
              <View style={{flexDirection: 'row', display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                <TouchableOpacity style={{...styles.icon}}>
                  <FontAwesome name="heart" size={25} color="black"/>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.icon}} onPress={() => this.onCommentShowPressed(post.id)}>
                  <FontAwesome name="comment" size={25} color="black" style={{marginTop: -3}}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon}>
                  <Ionicons name="ios-send" size={30} color="black" style={{marginTop: -3}}/>
                </TouchableOpacity>
              </View>
              <View>

                <TouchableOpacity style={styles.icon}>

                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Text>Polubione przez <Text style={{fontWeight: '600'}}>Dart1123</Text></Text>
            </View>
            <View>
              <Text><Text style={{fontWeight: '600'}}>Arkadiusz Chrabąszczewski </Text>
              {post.description}
              </Text>
              {post.commentCount > 0 ? 
              <Text style={{color: 'gray'}}>{`Zobacz wszystkie komentarze: ${post.commentCount}`}</Text>
              : null}
              <Text><Text style={{fontWeight: '600'}}>Damian Hejda</Text> Fajny was pomys u was mmmm.</Text>
            </View>
          </View>
        </View>
        )
      })
    } else {
      return null
    }

  }

  renderVideoRelationsBar() {
    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{borderBottomColor: 'rgba(0,0,0,0.1)', borderBottomWidth: 0.2}}>
      <View style={{display: 'flex', margin: 10, marginBottom: 6, justifyContent: 'center', alignItems: 'center'}}>
        <View>
          <Image style={{ width: 57, height: 57, borderRadius: 45}} source={require('../../images/profile3.jpg')}/>
        </View>
        <Text style={{fontSize: 12}}>damian</Text>
      </View>
      <View style={{display: 'flex', margin: 10, marginBottom: 6, justifyContent: 'center', alignItems: 'center'}}>
        <Image style={{ width: 57, height: 57, borderRadius: 45}} source={require('../../images/profile2.jpg')}/>
        <Text style={{fontSize: 12}}>aras</Text>
      </View>
      <View style={{display: 'flex', margin: 10, marginBottom: 6, justifyContent: 'center', alignItems: 'center'}}>
        <LinearGradient colors={['rgb(194,23,137)', 'rgb(236,170,84)']} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 61, height: 61, borderRadius: 45, transform: [{ rotate: '45deg'}]}}>
          <Image style={{ width: 57, height: 57, borderRadius: 45, borderWidth: 2, borderColor: 'white', transform: [{ rotate: '-45deg'}]}} source={require('../../images/profile.jpg')}/>
        </LinearGradient>
        <Text style={{fontSize: 12}}>patrycja</Text>
      </View>
      <TouchableOpacity onPress={() => this.onRelationClick()} style={{display: 'flex', margin: 10, marginBottom: 6, justifyContent: 'center', alignItems: 'center'}}>
      <LinearGradient colors={['rgb(194,23,137)', 'rgb(236,170,84)']} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 61, height: 61, borderRadius: 45, transform: [{ rotate: '45deg'}]}}>
        <Image style={{ width: 57, height: 57, borderRadius: 45, borderWidth: 2, borderColor: 'white',  transform: [{ rotate: '-45deg'}]}} source={require('../../images/profile4.jpg')}/>
        </LinearGradient>
        <Text style={{fontSize: 12}}>damian</Text>
      </TouchableOpacity>
      <View style={{display: 'flex', margin: 10, marginBottom: 6, justifyContent: 'center', alignItems: 'center'}}>
        <Image style={{ width: 57, height: 57, borderRadius: 45}} source={require('../../images/profile5.jpg')}/>
        <Text style={{fontSize: 12}}>easy123</Text>
      </View>
      <View style={{display: 'flex', margin: 10, marginBottom: 6, justifyContent: 'center', alignItems: 'center'}}>
        <Image style={{ width: 57, height: 57, borderRadius: 45}} source={require('../../images/profile6.jpg')}/>
        <Text style={{fontSize: 12}}>brad</Text>
      </View>
      <View style={{display: 'flex', margin: 10, marginBottom: 6, justifyContent: 'center', alignItems: 'center'}}>
        <Image style={{ width: 57, height: 57, borderRadius: 45}} source={require('../../images/profile7.jpg')}/>
        <Text style={{fontSize: 12}}>leoś</Text>
      </View>
    </ScrollView>
    )
  }

  renderPost() {
    return (
      <>
        <View style={{ height: 45, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>

          <View style={{display: 'flex', flexDirection: 'row'}}>
            <TouchableOpacity>
              <Image style={{ width: 30, height: 30, borderRadius: 45, marginTop: 'auto', marginBottom: 'auto', marginLeft: 8, marginRight: 8}} 
              source={require('../../images/profile2.jpg')}/>
            </TouchableOpacity>
            <View>
              <TouchableOpacity style={{padding: 0, margin: 0, top: 0, bottom: 0}}>
                <Text style={{marginBottom: -5}}>Arkadiusz Chrabąszczewski</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{}}>
                <Text style={{fontSize: 12}}>Gdynia</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <TouchableOpacity>
              <SimpleLineIcons name="options-vertical" size={15} style={{marginRight: 8}} color="gray" />
            </TouchableOpacity>
          </View>

        </View>

        <TouchableWithoutFeedback style={{}}>
            <Image style={{width: this.state.win.width, height: 300 }} source={require("../../images/post1.jpg")}/>
        </TouchableWithoutFeedback>

        <View style={{padding: 10}}>
          <View style={{flexDirection: 'row', display: 'flex'}}>
            <View style={{flexDirection: 'row', display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
              <TouchableOpacity style={{...styles.icon}}>
                <FontAwesome name="heart" size={25} color="black"/>
              </TouchableOpacity>
              <TouchableOpacity style={{...styles.icon}} >
                <FontAwesome name="comment" size={25} color="black" style={{marginTop: -3}}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.icon}>
                <Ionicons name="ios-send" size={30} color="black" style={{marginTop: -3}}/>
              </TouchableOpacity>
            </View>
            <View>

              <TouchableOpacity style={styles.icon}>

              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text>Polubione przez <Text style={{fontWeight: '600'}}>Dart1123</Text></Text>
          </View>
          <View>
            <Text><Text style={{fontWeight: '600'}}>Arkadiusz Chrabąszczewski </Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            </Text>
            <Text style={{color: 'gray'}}>Zobacz wszystkie komentarze: 2043</Text>
            <Text><Text style={{fontWeight: '600'}}>Damian Hejda</Text> Fajny was pomys u was mmmm.</Text>
          </View>
        </View>
      </>
    )
  }

  render() {

    const { posts } = this.props;

    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor={Colors.primaryDark} />
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh}/>}>
          {this.renderVideoRelationsBar()}
          {this.renderPosts(posts)}
          {this.renderPost()}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {

  },
  icon: {
    paddingRight: 10
  }
})

const mapStateToProps = (state: AppState) => ({
  posts: state.Posts.posts,
  loading: state.Posts.loading,
  auth: state.Auth.auth
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchPosts: (quantity: number, startDate?: string, cb?: CallableFunction) => fetchPosts(quantity, startDate, cb)(dispatch),
  fetchMyProfile: (profileId: string) => fetchMyProfile(profileId)(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SocialScreen)