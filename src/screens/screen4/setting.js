import React from 'react';
import {StatusBar, StyleSheet, SafeAreaView, Text, Image, View, Dimensions, TextInput, Platform, TouchableOpacity} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput} from 'react-native-simple-radio-button';
import DeviceInfo from 'react-native-device-info';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenheight = Math.round(Dimensions.get('window').height);
let containerHeight = 170;
if (
	(Platform.OS == 'ios' &&
		(DeviceInfo.getModel() == 'iPhone 8' ||
			DeviceInfo.getModel() == 'iPhone 7' ||
			DeviceInfo.getModel() == 'iPhone 8 Plus' ||
      DeviceInfo.getModel() == 'iPhone SE' ||
      DeviceInfo.getModel() == 'iPhone SE(2nd generation)' ||
			DeviceInfo.getModel() == 'iPhone')) ||
	Platform.OS == 'android'
) {
	containerHeight = 89;
}


function Setting(props) {
  
  // console.log(props);
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
        <View style={styles.container}>

          <View style={styles.container3}>          
            <View style={styles.logoArea}>
                <Image
                    style={styles.tinyLogo}
                    source={require('../../assets/images/tgxc-logo-horizontal-b.png')}
                    resizeMode="contain"
                />
            </View>
          </View>
          
          <View style={styles.container4}>
          <View style={{justifyContent:'center', alignItems:'center'}}>
            <TouchableOpacity
                      onPress={() => {
                          props.navigation.navigate('App', {type: 'App'});
                      }}
                      >
              <View style={styles.arrowLeftArea}> 
                  
                          <Image
                              style={styles.arrowLeft}
                              source={require('../../assets/images/screen4/icKeyboardArrowLeft24Px3x.png')}
                              resizeMode="contain"
                              >
                          </Image>               
                  
              </View>
            </TouchableOpacity>
            </View>
            <View style={{justifyContent:'center',alignItems:'center', width:screenWidth-100}}>
                <Text style={styles.titleText}>설정</Text>
            </View> 
          </View>

          <View style={styles.alarmTextArea}>
              <Text style={styles.alarmText}>알림 설정</Text>
          </View>

          <View style={styles.subTextArea}>
            <View style={{marginBottom:18}}>
              <Text style={styles.subText}>모든 알람 수신</Text>
            </View>
            <View style={{marginBottom:18}}>
              <Text style={styles.subText}>주요 알람 수신</Text>
            </View>
            <View style={{marginBottom:20.5}}>
              <Text style={styles.subText}>모든 알람 거부</Text>
            </View>
          </View>

          <View style={styles.settingLine}></View>

          <View style={styles.langTextArea}>
              <Text style={styles.alarmText}>언어 설정(Language)</Text>
          </View>

          <View style={styles.subTextArea}>
            <View style={{marginBottom:18}}>
              <Text style={styles.subText}>한국어</Text>
            </View>
            <View style={{marginBottom:18}}>
              <Text style={styles.subText}>English</Text>
            </View>
          </View>

          <View style={styles.settingLine}></View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('LogOut', {type: 'LogOut'});
          }}
          >
            <View style={styles.langTextArea}>
                <Text style={styles.alarmText}>로그아웃</Text>
            </View>
          </TouchableOpacity>

        </View>
    </SafeAreaView>
  );
}

var styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height:screenheight,
    flexDirection: 'column',
    backgroundColor:'rgb(255,255,255)'
  },
  container3: {
    flexDirection: 'row',
    width: screenWidth - 32,
    marginHorizontal: 16,
    justifyContent:'center'
  },
  container4: {
    flexDirection: 'row',
    width: screenWidth - 32,
    marginHorizontal: 16,
    height:41,
    marginTop:5
  },
  logoArea: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:5
  },
  tinyLogo: {
    width: 119.2,
    height: 40,
  },
  titleArea:{
      justifyContent:'center',
      alignItems:'center'
  },
  titleText:{
      fontSize:16,
      lineHeight:19,
      letterSpacing:-0.16,
      color:'rgb(43,43,43)',
      fontFamily:'NanumBarunGothicBold'
  },
  arrowLeft:{
    width:16,
    height:16  
  },
  arrowLeftArea:{
    justifyContent:'center',
    alignItems:'flex-start',
    width:30,
    height:30
  },
  alarmTextArea:{
    flexDirection: 'row',
    width: screenWidth - 52,
    marginHorizontal: 26,
    marginTop:16,
    marginBottom:17
  },
  alarmText:{
    fontSize:14,
    textAlign:'left',
    lineHeight:16,
    letterSpacing:-0.14,
    color:'rgb(43,43,43)',
    fontFamily:'NanumBarunGothicBold'
  },
  subTextArea:{
    flexDirection: 'column',
    width: screenWidth - 52,
    marginHorizontal: 26
  },
  subText:{
    fontSize:14,
    textAlign:'left',
    lineHeight:20,
    letterSpacing:-0.14,
    color:'rgb(108,108,108)',
    fontFamily:'NanumBarunGothic'
  },
  settingLine:{
    width:screenWidth,
    borderWidth: 0.5,
    borderColor:'rgb(214,213,212)',
    marginBottom:24.5
  },
  langTextArea:{
    flexDirection: 'row',
    width: screenWidth - 52,
    marginHorizontal: 26,
    marginBottom:17
  }




  
  
});

export default Setting;
