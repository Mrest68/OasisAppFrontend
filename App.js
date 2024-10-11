import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image} from 'react-native';
import LandingPage from './components/LandingPage.js';
import UserHome from './components/UserHomeComponents/UserHome.js';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AdminHome from './components/AdminHome.js'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import BottomBar from "./components/UserHomeComponents/BottomBar.js";
import UserHomeTabs from './components/UserHomeTabs.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
// const AdminStack = createNativeStackNavigator();
// const userStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();
const HomeTabs = createBottomTabNavigator();


export default function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [userRole, setUserRole] = useState(null);

  // useEffect(() => {
  //   const checkLoginStatus = async () =>{
  //     const token = await AsyncStorage.getItem('userToken');
  //     const role = await AsyncStorage.getItem('role');
  //     if(token){
  //       setIsAuthenticated(true);
  //       setUserRole(role)
  //     }
  //   };
  //   checkLoginStatus();
  // },[]);

  return (
    <NavigationContainer>
      {/* {isAuthenticated ?(
        userRole ==='admin' ?(
          <AdminStack.Navigator>
            <AdminStack.Screen name='AdminHome' component={AdminHome}/>
          </AdminStack.Navigator>
        ):(
          // <userStack.Navigator>
          //       <userStack.Screen name='RegularUser' component={UserHome}/>

          // </userStack.Navigator>
          <UserHomeTabs/>
          
        )
      ):( */}

        <Stack.Navigator>
          <Stack.Screen name='LandingPage' options={{ headerShown: false }} component={LandingPage}/>
            {/* {(props) => <Login {...props} setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />}
             */}
          <Stack.Screen name='UserHome' options={{headerShown: false }} component={UserHome}/>
        </Stack.Navigator>      
   


    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },

});
