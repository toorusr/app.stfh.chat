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
import logo from './assets/logo.png';
import sendButton from './assets/sendButton.png';

export default props => {
  let [fontsLoaded] = useFonts({
    'montserrat-bold': require('./assets/fonts/montserrat-bold.ttf'),
    'montserrat-medium': require('./assets/fonts/montserrat-medium.ttf'),
    'montserrat-semibold': require('./assets/fonts/montserrat-semibold.ttf'),
  });
  const onPress = () => {
    console.log("Clicked");
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.textView}>
          <Image source={logo} style={{ width: 180, height: 75, marginBottom: 32 }} />
          <Text style={styles.smallText}>Stay the fuck home and</Text>
          <Text style={styles.smallText}>save the world with.</Text>
          <Text style={{color: "#6FD786",marginTop: 5, fontSize: 20, fontFamily: 'montserrat-medium'}}>Meet other heroes here.</Text>
        </View>
        <View style={styles.bottomView}>
          <TextInput style={styles.textField} placeholder={'Type your nickname...'}/>
          <TouchableOpacity onPress={onPress} style={{ width: '25%', top: 10, right: 10, bottom:10, left:5,height: '80%', alignItems: 'center' }}>
            <Image source={sendButton} style={{top: 10}} />
          </TouchableOpacity>
        </View>
        {Platform.OS != 'android' ? <KeyboardSpacer /> : null }
      </View>
    );
  }
}

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
  bottomView: {
    flexDirection: 'row',
    width: '100%',
    height: 100,
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
    color: 'rgba(255,255,255,0.8)',
    fontFamily: "montserrat-medium"
  }
});
