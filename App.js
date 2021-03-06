import React, { useState } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    Dimensions,
    TouchableOpacity,
    Image,
    FlatList,
    StatusBar,
    TextInput
} from 'react-native';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import logo from './assets/logo.png';
import sendButton from './assets/sendButton.png';
import PhoneInput from 'react-native-phone-input'

function NicknameScreen({ navigation }) {
    const onPress = () => {
      const payload = {
        nickname: nickName,
      }
      console.log(payload)
      if (nickName.length > 1) {
        navigation.navigate('phone')
      }
    }
    return (
      <View style={styles.container}>
        <View style={styles.textView}>
          <Image source={logo} style={{ width: 180, height: 75, marginBottom: 32 }} />
          <Text style={styles.smallText}>Stay the fuck home and</Text>
          <Text style={styles.smallText}>save the world.</Text>
          <Text style={{color: "#6FD786",marginTop: 5, fontSize: 20, fontFamily: 'montserrat-medium'}}>Meet other heroes here.</Text>
        </View>
        <View style={styles.bottomView}>
          <TextInput onChangeText={(text) => nickName = text} style={styles.textField} placeholder={'Type your nickname...'}/>
          <TouchableOpacity onPress={onPress} style={{ width: '25%', top: 10, right: 10, bottom:10, left:5,height: '80%', alignItems: 'center' }}>
            <Image source={sendButton} style={{top: 10}} />
          </TouchableOpacity>
        </View>
        {Platform.OS != 'android' ? <KeyboardSpacer /> : null }
      </View>
    )
}

function PhoneScreen({ navigation }) {
    const _auth = (phoneNumber) => {
      console.log("starting auth");
      navigation.navigate('verify')
    }
    const onPress = () => {
      const validatePhoneNumber = (number) => {
        var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
        return regexp.test(number)
      }
      const payload = {
        phoneNumber: phoneNumber,
        valid: validatePhoneNumber(phoneNumber)
      }
      if (validatePhoneNumber(phoneNumber)) {
        _auth(phoneNumber)
      }
      console.log(payload)

    }

    return (
      <View style={styles.container}>
        <View style={styles.textView}>
          <Image source={logo} style={{ width: 180, height: 75, marginBottom: 32 }} />
          <Text style={styles.smallText}>Stay the fuck home and</Text>
          <Text style={styles.smallText}>save the world.</Text>
          <Text style={{color: "#6FD786",marginTop: 5, fontSize: 20, fontFamily: 'montserrat-medium'}}>Meet other heroes here.</Text>
        </View>
        <View style={styles.bottomViewContainer}>
          <Text style={styles.phoneScreen_title}>Enter your phonenumber </Text>
          <View style={styles.bottomView}>
            <TextInput keyboardType='numeric' onChangeText={(text) => phoneNumber = text} style={styles.textField} placeholder={'+491524567893'}/>
            <TouchableOpacity onPress={onPress} style={{ width: '25%', top: 10, right: 10, bottom:10, left:5,height: '80%', alignItems: 'center' }}>
              <Image source={sendButton} style={{top: 10}} />
            </TouchableOpacity>
          </View>
        </View>
        {Platform.OS != 'android' ? <KeyboardSpacer /> : null }
      </View>
    )
}

function VerifyScreen() {
    const _verify = (code) => {
      console.log("verification in progress with ", code);
    }
    const onPress = () => {
      const payload = {
        code: code,
      }
      console.log(payload)
      if (code.length == 6) {
        _verify(code)
      }

    }

    return (
      <View style={styles.container}>
        <View style={styles.textView}>
          <Image source={logo} style={{ width: 180, height: 75, marginBottom: 32 }} />
          <Text style={styles.smallText}>Stay the fuck home and</Text>
          <Text style={styles.smallText}>save the world.</Text>
          <Text style={{color: "#6FD786",marginTop: 5, fontSize: 20, fontFamily: 'montserrat-medium'}}>Meet other heroes here.</Text>
        </View>
        <View style={styles.bottomViewContainer}>
            <Text style={styles.phoneScreen_sub}>We just sent you a verification code via sms.</Text>
          <View style={styles.bottomView}>
            <TextInput keyboardType='numeric' onChangeText={(text) => code = text} style={styles.textField} placeholder={'123456'}/>
            <TouchableOpacity onPress={onPress} style={{ width: '25%', top: 10, right: 10, bottom:10, left:5,height: '80%', alignItems: 'center' }}>
              <Image source={sendButton} style={{top: 10}} />
            </TouchableOpacity>
          </View>
        </View>
        {Platform.OS != 'android' ? <KeyboardSpacer /> : null }
      </View>
    )
}

const Stack = createStackNavigator();

function App() {
  let [fontsLoaded] = useFonts({
    'montserrat-bold': require('./assets/fonts/montserrat-bold.ttf'),
    'montserrat-medium': require('./assets/fonts/montserrat-medium.ttf'),
    'montserrat-semibold': require('./assets/fonts/montserrat-semibold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="nickname" headerVisible="false">
          <Stack.Screen name="nickname" component={NicknameScreen} />
          <Stack.Screen name="phone" component={PhoneScreen} />
          <Stack.Screen name="verify" component={VerifyScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151515',
  },
  textView: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  smallText: {
    color: '#6FD786',
    fontSize: 20,
    fontFamily: 'montserrat-medium'
  },
  phoneScreen_title: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'montserrat-medium',
    position: 'absolute',
    top: 0,
    marginTop: 20,
    alignSelf: 'center'
  },
  bottomViewContainer: {
    width: '100%',
    height: 150,
    backgroundColor: '#6FD786',
    justifyContent: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    position: 'relative'
  },
  verify_bottomViewContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#6FD786',
    justifyContent: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    position: 'relative'
  },
  bottomView: {
    flexDirection: 'row',
    width: '100%',
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: '#6FD786',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  textField: {
    top: 5,
    left: 20,
    bottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    height: '60%',
    width: '75%',
    borderRadius: 30,
    fontSize: 15,
    padding: 20,
    color: 'rgba(255,255,255,1)',
    fontFamily: "montserrat-medium"
  },
  phoneScreen_sub: {
    color: 'rgba(0, 0, 0, 0.3)',
    fontSize: 18,
    fontFamily: 'montserrat-medium',
    position: 'absolute',
    top: 0,
    marginTop: 30,
    alignSelf: 'center'
  },
  phoneField: {
    fontSize: 15,
    color: 'rgba(255,255,255,1)',
    fontFamily: "montserrat-medium"
  }
});
