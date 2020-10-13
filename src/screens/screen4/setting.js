import React from 'react';
import {StatusBar, StyleSheet, SafeAreaView, Text, Image, View, Dimensions, TextInput, Platform, TouchableOpacity} from 'react-native';
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
      <StatusBar barStyle="light-content" />
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
            <View style={styles.arrowLeftArea}> 
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.navigate('Screen4', {type: 'Screen4'});
                    }}
                    >
                        <Image
                            style={styles.arrowLeft}
                            source={require('../../assets/images/screen4/icKeyboardArrowLeft24Px.png')}
                            resizeMode="contain"
                            >
                        </Image>               
                </TouchableOpacity>
            </View>
            <View style={{justifyContent:'center',alignItems:'center', width:screenWidth-46.8}}>
                <Text style={styles.titleText}>설정</Text>
            </View> 
          </View>

          <View style={styles.alarmTextArea}>
              <Text style={styles.alarmText}>알림 설정</Text>
          </View>



          

          
          


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
    height:41
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
      color:'rgb(43,43,43)'
  },
  arrowLeft:{
    width:7.4,
    height:12  
  },
  arrowLeftArea:{
    justifyContent:'center',
    alignItems:'flex-start'
  },
  alarmTextArea:{
    flexDirection: 'row',
    width: screenWidth - 52,
    marginHorizontal: 26,
    marginTop:16
  },
  alarmText:{
    fontSize:14,
    textAlign:'left',
    lineHeight:16,
    letterSpacing:-0.14,
    color:'rgb(43,43,43)'
  }



  
  
});

export default Setting;
