import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Platform,
    TextInput,
    KeyboardAvoidingView,
  } from "react-native";
  import {Header,Icon,Card} from 'react-native-elements';
  import db from '../config';
  import firebase from 'firebase';
//   import MyHeader from './components/MyHeader';
//   import Headerk from './components/Headerk'

  export default class Login extends Component{
      constructor(){
          super();
          this.state={
              email : '',
              Password : ''
          }
      }

      userLogin = (emailId, password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId, password)
        .then(()=>{
          this.props.navigation.navigate('AddChild')
          this.setState({email: '', Password: ''})
        })
        .catch((error)=> {
          var errorCode = error.code;
          var errorMessage = error.message;
          return alert(errorMessage)
        })
      }

      // autologin=async()=>{
      //   var user = firebase.auth().currentUser;
      //   if(user){
      //     alert("user logged in")
      //     this.props.navigation.navigate('AddChild')
      //   }
      //   else{
      //     alert("user not found enter email and password to login")
      //   }
      // }

      // componentDidMount(){
      //   this.autologin()
      // }

      // componentDidUpdate(){
      //   this.autologin()
      // }

      render(){
          return(
              <View style={{flex: 1}}>
                 <Header
                //    leftComponent={<Icon name='bars' type='font-awesome' color='#000' onPress={() => this.props.navigation.toggleDrawer()}/>}
                   centerComponent={{ text: 'Login Screen', style: { color: '#000', fontSize:20,fontWeight:"bold", } }}
                   rightComponent={<Icon name='home' type='font-awesome' color='#000' onPress={() => this.props.navigation.navigate('Landing')}/>}
                   backgroundColor='#fff'
                 />
                   <ImageBackground source={require('../assets/loginbac.jpg')} style={styles.image}>                
                <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>                
                 <View style={styles.card} >
                 <Card containerStyle={{width: 400, height: 500}} dividerStyle={{width:4,height:4}}>
                     <Card.Title style={styles.cardtitle}>Login</Card.Title>

                     <Card.Divider/>

                     <View style={{margin:15}}>
                     <Text style={styles.subtitle}>Email-Id :</Text>
                     <TextInput
                     style={styles.formTextInput}
                     placeholder={'Email-Id'}
                     onChangeText={(text)=>{this.setState({email:text})}}
                     value={this.state.email}
                     />
                    </View> 

                    <View style={{margin:15}}>
                    <Text style={styles.subtitle}>Password :</Text>
                     <TextInput
                     style={styles.formTextInput}
                     placeholder={'Password'}
                     onChangeText={(text)=>{this.setState({Password:text})}}
                     value={this.state.Password}
                     secureTextEntry={true}
                     />
                     </View>

                     <View style={{margin:15}}>
                         <TouchableOpacity style={styles.button} onPress={()=>{this.userLogin(this.state.email,this.state.Password)}}>
                             <Text style={styles.buttonText}>Login</Text>
                         </TouchableOpacity>
                     </View>
                 </Card>
                 </View>
                 </KeyboardAvoidingView>
                 </ImageBackground>
              </View>
          );
      }
  }

  const styles = StyleSheet.create({
    container:{
     flex:1,
     alignItems: 'center',
     justifyContent: 'center'
   },
   card:{
    flex:1,
    alignItems: 'right',
    justifyContent: 'right'
  },
   formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#000',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10,
  },
  subtitle :{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  cardtitle :{
    flex:1,
    fontSize: 35,
    justifyContent:'center',
    alignItems:'center',
    fontStyle: 'Bold',
  },
  button:{
    width:"85%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    marginLeft: 15,
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop:20
    },
    buttonText:{
        fontSize:25,
        fontWeight:"bold",
        color:"#fff"
      },
      image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },
})