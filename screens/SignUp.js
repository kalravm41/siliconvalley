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
    ScrollView,
  } from "react-native";
  import {Header,Icon,Card} from 'react-native-elements';
  import db from '../config';
  import firebase from 'firebase';
//   import MyHeader from './components/MyHeader';
//   import Headerk from './components/Headerk'

  export default class SignUp extends Component{
      constructor(){
          super();
          this.state={
              email : '',
              Password : '',
              ConfirmPassword: '',
              FirstName: '',
              LastName: '',
              Address: '',
              Contact: ''
          }
      }

      userSignUp = (emailId, password,confirmPassword) =>{
        if(password !== confirmPassword){
            return alert("password doesn't match Check your password.")
        }else{
          firebase.auth().createUserWithEmailAndPassword(emailId, password)
          .then(()=>{
            db.collection('users').add({
              first_name:this.state.FirstName,
              last_name:this.state.LastName,
              contact:this.state.Contact,
              email_id:this.state.email,
              address:this.state.Address
            })
            alert("Successful SignUp")
            this.setState({email: '',Password: '',ConfirmPassword: '',FirstName: '',LastName: '',Address: '',Contact: ''})
            // return  alert(
            //      'User Added Successfully',
            //      '',
            //      [
            //        {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
            //      ]
            //  );
          })
          .catch((error)=> {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            return alert(errorMessage)
          });
        }
      }
     
      render(){
          return(
              <View style={{flex: 1}}>
                  <ImageBackground source={require('../assets/loginbac.jpg')} style={styles.image}>
                 <Header
                //    leftComponent={<Icon name='bars' type='font-awesome' color='#000' onPress={() => this.props.navigation.toggleDrawer()}/>}
                   centerComponent={{ text: 'Sign Up', style: { color: '#000', fontSize:20,fontWeight:"bold", } }}
                   rightComponent={<Icon name='home' type='font-awesome' color='#000' onPress={() => this.props.navigation.navigate('Landing')}/>}
                   backgroundColor='#fff'
                 />
                 <ScrollView style={{width:'100%'}}>
                     <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
                 <View style={styles.card} >
                 <Card containerStyle={{width: 400, height: 950}} dividerStyle={{width:4,height:4}}>
                     <Card.Title style={styles.cardtitle}>Sign Up</Card.Title>

                     <Card.Divider/>

                     <View style={{margin:15}}>
                     <Text style={styles.subtitle}>First Name :</Text>
                     <TextInput
                     style={styles.formTextInput}
                     placeholder={'First Name'}
                     onChangeText={(text)=>{this.setState({FirstName:text})}}
                     value={this.state.FirstName}
                     />
                    </View> 

                    <View style={{margin:15}}>
                     <Text style={styles.subtitle}>LastName :</Text>
                     <TextInput
                     style={styles.formTextInput}
                     placeholder={'LastName'}
                     onChangeText={(text)=>{this.setState({LastName:text})}}
                     value={this.state.LastName}
                     />
                    </View> 

                    <View style={{margin:15}}>
                     <Text style={styles.subtitle}>Address :</Text>
                     <TextInput
                     style={styles.formTextInput}
                     placeholder={'Address'}
                     onChangeText={(text)=>{this.setState({Address:text})}}
                     value={this.state.Address}
                     />
                    </View> 

                    <View style={{margin:15}}>
                     <Text style={styles.subtitle}>Contact Number :</Text>
                     <TextInput
                     style={styles.formTextInput}
                     placeholder={'Contact Number'}
                     keyboardType = 'numeric'
                     onChangeText={(text)=>{this.setState({Contact:text})}}
                     value={this.state.Contact}
                     />
                    </View> 

                     <View style={{margin:15}}>
                     <Text style={styles.subtitle}>Email-Id :</Text>
                     <TextInput
                     style={styles.formTextInput}
                     placeholder={'Email-Id'}
                     keyboardType = 'email-address'
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
                     secureTextEntry = {true}
                     />
                     </View>

                     <View style={{margin:15}}>
                    <Text style={styles.subtitle}>Confirm Password :</Text>
                     <TextInput
                     style={styles.formTextInput}
                     placeholder={'Password'}
                     onChangeText={(text)=>{this.setState({ConfirmPassword:text})}}
                     value={this.state.ConfirmPassword}
                     secureTextEntry = {true}
                     />
                     </View>

                     <View style={{margin:15}}>
                         <TouchableOpacity style={styles.button} onPress={()=>{this.userSignUp(this.state.email,this.state.Password,this.state.ConfirmPassword)}}>
                             <Text style={styles.buttonText}>Sign Up</Text>
                         </TouchableOpacity>
                     </View>
                 </Card>
                 
                 </View>
                 </KeyboardAvoidingView>
                 </ScrollView>
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
        justifyContent: "center",
      },
      KeyboardAvoidingView:{
        flex:1,
        justifyContent:'left',
        alignItems:'left'
      },
})