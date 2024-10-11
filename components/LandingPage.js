import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, Dimensions } from 'react-native';
import CustomInput from './CustomInput.js';
import logo from '../assets/images/oasis_badge.png';
import CustomButton from './CustomButton.js';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserHome from './UserHomeComponents/UserHome.js';


const { width, height } = Dimensions.get('window');
//{ setIsAuthenticated, setUserRole }
const LandingPage = ({navigation}) => {

  const handleNav = ()=>{
    navigation.navigate('UserHome');

  };

  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [userToken, setUserToken] = useState('');
  // const [profilePic, setProfilePic] = useState(null);

  // const handleSubmit = async () => {
  //   try {
  //     const response = await axios.post("https://oasisapp-flask-bacb79846120.herokuapp.com/login", {
  //       email: username,
  //       password: password,
  //     });
  //     await AsyncStorage.setItem('email', username);
  //     const { success, token, role, profilePicture } = response.data;
  //     if (success) {
  //       setUserToken(token);
  //       setIsAuthenticated(true);
  //       setUserRole(role);

  //       await AsyncStorage.setItem('userToken', token);
  //       await AsyncStorage.setItem('role', role);
  //       console.log(AsyncStorage.getItem('userToken'))
  //       // Test for Warning Bugs when logging in with correct credentials
  //       // console.log(token,AsyncStorage.getItem('userToken'))
  //       // console.log(role, AsyncStorage.getItem('role'))
  //     }
  //   } catch (error) {
      
  //     console.log(username,password)

  //   }
  // };


  return (


    <View style={styles.root}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />

      {/* <CustomInput placeholder="Username" value={username} setValue={setUsername} />
      <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true} /> */}

      <CustomButton  text="Get Started" onPress={handleNav} />  
      <Text style={styles.footNote}> Powered by USYF</Text>
    </View>
  );
};
// onPress={handleSubmit} above for Custom Button
const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: width * 0.05,  // 5% of screen width for padding
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    paddingTop: height * 0.25,
  },
  logo: {
    // margin: height * 0.05,  // 5% of screen height for margin
    height: height * 0.2,   // 20% of screen height for logo size
    width: width * 0.4,     // 40% of screen width for logo size
    marginBottom: height * 0.07, // 3% of screen height for margin bottom
  },
  footNote: {
    color: 'grey',
    marginTop: height * 0.02,  // 2% of screen height for margin top
  }
});

export default LandingPage;
