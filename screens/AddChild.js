import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Platform,
    TextInput,
    KeyboardAvoidingView
  } from "react-native";
  import {Header,Icon,Card, Avatar} from 'react-native-elements';
  import * as ImagePicker from 'expo-image-picker';
  import firebase from 'firebase';
  import db from '../config';
import { ScrollView } from "react-native-gesture-handler";

  export default class AddChild extends Component{
      constructor(){
          super();
          this.state={
              FullName : '',
              gotData: [],
              userId: firebase.auth().currentUser.email,
              text: '',
              parentData: [],
              image: '',
              foundimage: ''
          }
      }

      selectPicture=async()=>{
          const {cancelled,uri} = await ImagePicker.launchCameraAsync({
              mediaTypes : ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              aspect: [4,3],
              quality: 1
          });

          if(!cancelled){
              this.uploadImage(uri,this.state.userId+this.state.FullName)
          }
      }

      uploadImage= async(uri,imageName)=>{
          var response = await fetch(uri);
          var blob = await response.blob();

          var ref = firebase.storage().ref().child('user_Images/' + imageName);

          return ref.put(blob).then(response=>{
              this.fetchImage(imageName)
          })
      }

      fetchImage = (imageName)=>{
          var storageRef = firebase.storage().ref().child('user_Images/' + imageName);

          storageRef.getDownloadURL().then(url=>{
              this.setState({image: url})
          })
          .catch(error=>{
              this.setState({image: ''})
          })
      }

      FoundFetch = async(imageName)=>{
        var storageRef = firebase.storage().ref().child('user_Images/' + imageName);

        storageRef.getDownloadURL().then(url=>{
            this.setState({foundimage: url})
        })
        .catch(error=>{
            this.setState({foundimage: ''})
        })
      }

      AddChild=()=>{
          db.collection('lostChildData').where('Name','==',this.state.FullName)
          .onSnapshot(snapshot=>{
              snapshot.forEach(doc=>{
                  this.setState({
                      gotData: doc.data()
                  })
              })
          })
          if(this.state.gotData.length === 0){
          db.collection('ChildFoundToAnyone').add({
              'Name': this.state.FullName,
              'email_id': this.state.userId,
          })
          this.setState({
              text: 'child Not Found'
          })
        }
        else{
            db.collection('Childrescued').add({
                'Child Name': this.state.FullName,
                'FoundBy': this.state.userId,
                'ChildOf': this.state.gotData.ChildOf
            })
            db.collection('users').where('email_id','==',this.state.gotData.ChildOf)
             .onSnapshot(snapshot=>{
                 snapshot.forEach(doc=>{
                     this.setState({
                         parentData: doc.data(),
                         text: 'Child Found'
                     })
                 })
             })
             this.FoundFetch(this.state.parentData.email_id + this.state.FullName)
        }
      }

    //   FoundFetch = async()=>{
    //     var storageRef = firebase.storage().ref().child('user_Images/' + imageName);

    //     storageRef.getDownloadURL().then(url=>{
    //         this.setState({foundimage: url})
    //     })
    //     .catch(error=>{
    //         this.setState({foundimage: ''})
    //     })
    //   }

      render(){
          return(
              <View style={{flex:1}}>
                  <Header
                    leftComponent={<Icon name='bars' type='font-awesome' color='#696969'  onPress={() => this.props.navigation.toggleDrawer()}/>}
                    centerComponent={{ text: 'Add Child', style: { color: '#000', fontSize:20,fontWeight:"bold", } }}
                    backgroundColor='#fff'
                  />

                   <ImageBackground source={require('../assets/HomeImg.jpg')} style={styles.image}>
                   <ScrollView style={{width:'100%'}}>
                   <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
                       <View style={styles.card}>
                           <Card containerStyle={{width: 700, height: 1150}} dividerStyle={{width:4,height:4}}>
                           <Card.Title style={styles.cardtitle}>Found A Lost Child? Add It</Card.Title>    

                           <Card.Divider/>

                    <View style={{margin:15}}>
                     <Text style={styles.subtitle}>Full Name :</Text>
                     <TextInput
                     style={styles.formTextInput}
                     placeholder={'Full Name'}
                     onChangeText={(text)=>{this.setState({FullName:text.toUpperCase()})}}
                     value={this.state.FullName}
                     />
                    </View> 

                    <Avatar
                    rounded
                    source={{
                        uri: this.state.image
                    }}
                    size='xlarge'
                    // onPress={()=>{this.selectPicture()}}
                    containerStyle={styles.imageContainer}
                    showEditButton
                    />

                    <TouchableOpacity style={styles.button} onPress={()=>{this.selectPicture()}}>
                        <Text style={styles.buttonText}> Add Child's Image </Text>
                    </TouchableOpacity>

                    <View style={{margin:15}}>
                        <TouchableOpacity style={styles.button} onPress={()=>{this.AddChild()}}>
                            <Text style={styles.buttonText}> Confirm </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.container}>
                        <Text style={styles.cardtitle}>{this.state.text}</Text>
                    </View>

                    <View style={styles.container}>
                        <Text style={styles.subtitle}> Parent's Contact :</Text>
                    </View>

                    <View style={styles.container}>
          <Text style={styles.subtitle}>{this.state.parentData.contact}</Text>
                    </View>


                    <View style={styles.container}>
                        <Text style={styles.subtitle}> Parent's Address :</Text>
                    </View>


                    <View style={styles.container}>
                         <Text style={styles.subtitle}>{this.state.parentData.address}</Text>
                    </View>

                     <View style={styles.container}>
                        <Text style={styles.subtitle}> child's Photo :</Text>
                    </View>                   

                    <Avatar
                    rounded
                    source={{
                        uri: this.state.foundimage
                    }}
                    size='xlarge'
                    // onPress={()=>{this.selectPicture()}}
                    containerStyle={styles.imageContainer}
                    showEditButton
                    />                    
                           </Card>
                       </View>
                       </KeyboardAvoidingView>
                       </ScrollView> 
                   </ImageBackground>                
              </View>
          )
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
    button1:{
        width:"85%",
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        backgroundColor:"#00ff00",
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
      imageContainer:{
        width: 500,
        height: 300,
        marginTop: 20,
        borderRadius: 5,
        alignSelf: 'center'
      },
})