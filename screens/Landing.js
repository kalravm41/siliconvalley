import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Platform,
    TextInput,
  } from "react-native";
  import {Header,Icon,Card} from 'react-native-elements';
  import firebase from 'firebase';
//   import MyHeader from './components/MyHeader';
//   import Headerk from './components/Headerk'

  export default class Landing extends Component{
      constructor(){
          super();
          this.state={
              email : '',
              Password : '',

          }
      }

      autologin=async()=>{
        var user = firebase.auth().currentUser;
        if(user){
          alert("user logged in")
          this.props.navigation.navigate('AddChild')
        }
        else{
          alert("user not found enter email and password to login")
          this.props.navigation.navigate('Login')
        }
      }
      render(){
          return(
              <View style={{flex: 1}}>
                  <ImageBackground source={require('../assets/langg.jpg')} style={styles.image}>
                 <Header
                   leftComponent={<TouchableOpacity onPress={()=>{this.props.navigation.navigate('SignUp')}}><Text style={styles.attribute}>Sign Up</Text></TouchableOpacity>}
                   centerComponent={{ text: 'A Step Towards Life', style: { color: '#000', fontSize:20,fontWeight:"bold", } }}
                   rightComponent={
                   <TouchableOpacity onPress={()=>{this.autologin()}}><Text style={styles.attribute}>Login</Text></TouchableOpacity>
                }
                   backgroundColor='#fff'
                 />
                 <View style={styles.card} >
                 <Card containerStyle={{width: 400, height: 700}} dividerStyle={{width:4,height:4}}>
                     <Card.Title style={styles.cardtitle}>About Us</Card.Title>

                     <Card.Divider/>

                     <View style={{margin:15}}>
                     <Text style={styles.cardtitle}>App Intro :</Text>
                    </View> 

                    <View style={{marginBottom:15,marginLeft:25}}>
                     <Text style={styles.subtitle}> Human Trafficking Is The Biggest Threat In The World Nowadays. So To Resolve This Threat And To Help People To Find Lost Children/Adults Which Are Victims Of Human Trafficking This App Helps The People . </Text>
                    </View>                     

                    <View style={{margin:15}}>
                    <Text style={styles.subtitle}>Future Expansion Idea :</Text>
                     </View>

                     <View style={{marginBottom:15,marginLeft:25}}>
                     <Text style={styles.subtitle}> This App Is Currently Finding The Children/Adults by Matching There Full Names But We Intend To Expand It And Make It An App That Uses Facial Recognition To Find Children . </Text>
                    </View>                       
{/* 
                     <View style={{margin:15}}>
                         <TouchableOpacity style={styles.button}>
                             <Text style={styles.buttonText}>Login</Text>
                         </TouchableOpacity>
                     </View> */}
                 </Card>
                 </View>
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
    alignItems:'center',
    fontWeight: 'bold'
  },
  attribute :{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center',
    color: '#000'
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