import React from 'react';
import {StatusBar, StyleSheet, SafeAreaView, Text, Image, View, Dimensions, TextInput, Platform, TouchableOpacity, FlatList} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Moment from 'moment';
import Modal from 'react-native-modal';
import {useIsFocused} from '@react-navigation/native';
import {me, getAlarmList, updatePush} from '../../service/auth';
import {useTranslation} from 'react-i18next';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenheight = Math.round(Dimensions.get('window').height);
let containerHeight = 170;
if (
	(Platform.OS == 'ios' &&
		(DeviceInfo.getModel() == 'iPhone 8' ||
			DeviceInfo.getModel() == 'iPhone 7' ||
			DeviceInfo.getModel() == 'iPhone 8 Plus' ||
      DeviceInfo.getModel() == 'iPhone SE' ||
      DeviceInfo.getModel() == 'iPhone SE(2nd generation)')) ||
	Platform.OS == 'android'
) {
	containerHeight = 85;
}

function alarm(props) {
  // console.log(props);
  const {t, i18n} = useTranslation();
  const [content, setContent] = React.useState();
  

//   React.useEffect(() => {
// 		(async function anyNameFunction() {
//       const res = await me();
//       // console.log(res);
        
//       const alarmList = await getAlarmList();
//       console.log(alarmList.data.pushList);
//       // setTitle(alarmList.data.pushList[0].title);
//       // setContent(alarmList.data.pushList[0].contents);
//       setAlarm(alarmList.data.pushList);
// 		})();
//   }, [isFocused]);

React.useEffect(() => {   
    

    setContent(props.route.params.content);
    

  },[props.route.params]);


  return (
    <SafeAreaView>
      <StatusBar backgroundColor='#fff'/>
    
      <View style={styles.container}>

            <View style={{marginTop:15.5}}>
              <View style={styles.container6}>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                  <TouchableOpacity
                          onPress={() => {
                              props.navigation.navigate('Alarm', {});
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
                    <Text style={styles.findIdTitle}>{t('notice')}</Text>           
                </View>
              </View>
            </View>
            <View style={styles.lineStyle}></View>

            <View style={{marginTop:15}}>
              <View style={styles.container2}>
                <Text style={styles.alarmText}>{content}</Text>
              </View>
            </View>

            
      </View>

      
    </SafeAreaView>
  );
}

var styles = StyleSheet.create({
    border1:{
      width:screenWidth-32,
        height:50,
        marginTop:24
    },
    noTradeText:{
      fontSize:12,
      textAlign:'center',
      lineHeight:18,
      letterSpacing:-0.12,
      color:'rgb(152,152,152)',
      fontFamily:'NanumBarunGothicLight' 
    },
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
    container2: {
        // justifyContent: 'center',
        // alignItems: 'center',
        // flexDirection: 'row',
        width: screenWidth - 32,
        marginHorizontal: 16
        // height:50
  },
    lineStyle:{
        width:screenWidth,
        borderWidth: 0.5,
        borderColor:'rgb(214,213,212)',
        marginTop:9
    },
    lineStyle1:{
      // marginTop:30,
      width:343,
      borderWidth: 0.5,
      borderColor:'rgba(60,60,67,0.29)'
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
      alignItems:'flex-start',
      width:30,
      height:30
    },
    arrowLeft:{
      width:16,
      height:16
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
      lineHeight:25,
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
    },
    modalType:{
      width:343,
      height:200,
      borderRadius:12,
      backgroundColor:'rgb(255,255,255)'
    },
    bottomCancelBtnText:{
      fontSize:17,
      textAlign:'center',
      lineHeight:22,
      letterSpacing:-0.41,
      color:'rgb(43,43,43)',
      fontFamily:'NanumBarunGothic'
    },
    modalBottomBtnArea:{
      flexDirection:'row'
    },
    modalTitleText:{
      fontSize:16,
      textAlign:'left',
      lineHeight:30,
      letterSpacing:-0.16,
      color:'rgb(43,43,43)',
      fontFamily:'NanumBarunGothicBold',
      width:300,
      height:120
    },
    modalContailner:{
      flexDirection: 'row',
      width: screenWidth - 32,
      marginHorizontal: 16,
      marginTop:30
    }
    
    


    
    
});

export default alarm;