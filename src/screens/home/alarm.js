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
	containerHeight = 85;
}

function alarm(props) {
  // console.log(props);

  return (
    <SafeAreaView>
      <StatusBar/>
      <View style={styles.container}>

            <View style={{marginTop:15.5}}>
              <View style={styles.container6}>
                <View style={styles.arrowLeftArea}> 
                  <TouchableOpacity
                      onPress={() => {
                          props.navigation.navigate('App', {type: 'App'});
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
                    <Text style={styles.findIdTitle}>알림</Text>           
                    </View>
                </View>
              </View>
            <View style={styles.lineStyle}></View>

            <View style={styles.alarmListBox}>
                <View>
                  <Text style={styles.dayText}>2020/01/01</Text>
                  <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop:5}}>
                    <Text style={styles.alarmText}>[알림]</Text><Text style={styles.alarmBoldText}> 입금</Text><Text style={styles.alarmText}>이 완료되었습니다.</Text>
                  </View>
                </View>
                <View>
                  <Image
                      // style={styles.arrowLeft}
                      source={require('../../assets/images/screen3/icExpandMore24Px.png')}
                      resizeMode="contain"
                      >
                  </Image>
                </View>
            </View>
            <View style={styles.bottomLineStyle}></View>

            <View style={styles.alarmListBox}>
                <View>
                  <Text style={styles.dayText}>2020/01/01</Text>
                  <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop:5}}>
                    <Text style={styles.alarmText}>[알림]</Text><Text style={styles.alarmBoldText}> 출금</Text><Text style={styles.alarmText}>이 완료되었습니다.</Text>
                  </View>
                </View>
                <View>
                  <Image
                      // style={styles.arrowLeft}
                      source={require('../../assets/images/screen3/icExpandMore24Px.png')}
                      resizeMode="contain"
                      >
                  </Image>
                </View>
            </View>
            <View style={styles.bottomLineStyle}></View>
         

      </View>

      

    </SafeAreaView>
  );
}

var styles = StyleSheet.create({
	  container: {
      width: screenWidth,
      height:screenheight,
      flexDirection: 'column',
      backgroundColor:'#FFF'
    },
    container6: {
          // justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          width: screenWidth - 32,
          marginHorizontal: 16,
          height:50
    },
    lineStyle:{
        width:screenWidth,
        borderWidth: 0.5,
        borderColor:'rgb(214,213,212)',
        marginTop:9
    },
    bottomLineStyle:{
      width:screenWidth,
      borderWidth: 0.5,
      borderColor:'rgb(214,213,212)'
  },
    findIdTitle:{
        // width:138,
        height:26,
        fontSize:22,
        textAlign:'center',
        lineHeight:26,
        letterSpacing:-0.22,
        color:'rgba(0,0,0,0.87)',
        fontFamily:'NanumBarunGothicBold'
    },
    arrowLeftArea:{
      justifyContent:'center',
      alignItems:'flex-start'
    },
    alarmListBox:{
      height:80,
      flexDirection:'row',
      width: screenWidth-32,
      marginHorizontal: 16,
      justifyContent:'space-between',
      alignItems:'center'
    },
    dayText:{
      fontSize:12,
      textAlign:'left',
      lineHeight:20,
      letterSpacing:-0.12,
      color:'rgb(108,108,108)',
      height:17,
      fontFamily:'NanumBarunGothicLight'
    },
    alarmText:{
      fontSize:16,
      // fontFamily:NanumBarunGothic,
      textAlign:'left',
      lineHeight:19,
      letterSpacing:-0.16,
      color:'rgb(43,43,43)',
      fontFamily:'NanumBarunGothic'
    },
    alarmBoldText:{
      fontSize:16,
      // fontFamily:NanumBarunGothicBold,
      textAlign:'left',
      lineHeight:19,
      letterSpacing:-0.16,
      color:'rgb(43,43,41)',
      fontFamily:'NanumBarunGothicBold'
    }
    
    


    
    
});

export default alarm;