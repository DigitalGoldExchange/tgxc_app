import React from 'react';
import {StatusBar, StyleSheet, SafeAreaView, Text, Image, View, Dimensions, TextInput, Platform, TouchableOpacity} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';
import {me} from '../../service/auth';
import {useTranslation} from 'react-i18next';
import {useIsFocused} from '@react-navigation/native';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenheight = Math.round(Dimensions.get('window').height);
let containerHeight = 155;
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

function Deposit(props) {
  // console.log(props);
  const [userInfo, setUserInfo] = React.useState([]);
  const isFocused = useIsFocused();
  const [userName, setUserName] = React.useState();
  const [userId, setUserId] = React.useState();
  const [userTg, setUserTg] = React.useState();
  const [identifyNumber, setIdentifyNumber] = React.useState();
  const [alarmCnt, setAlarmCnt] = React.useState();
  const {t, i18n} = useTranslation();
  
  // console.log(props);
  React.useEffect(() => {
		(async function anyNameFunction() {
      const res = await me();
      console.log(res);
      setUserTg(res.data.user.totalTg);
      setUserName(res.data.user.name);
      setIdentifyNumber(res.data.user.identifyNumber);
      setUserId(res.data.user.userId);
      setAlarmCnt(res.data.unreadPushCount);
      

      // const user = await AsyncStorage.getItem('user');

      // console.log(user);
      // setUserInfo(JSON.parse(user));
		})();
  }, [isFocused]);

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor='#fff'/>
      <View style={styles.container}>

        <View style={styles.container3}> 

              <View style={styles.personArea}>
                <TouchableOpacity
                  onPress={() => {
                  props.navigation.navigate('MemberInfo', {type: 'MemberInfo'});
              }}
                >
                  <Image
                      style={styles.personText}
                      source={require('../../assets/images/home/icPersonPin24Px.png')}
                      resizeMode="contain"
                  />
                  </TouchableOpacity>
              </View>

              <View style={styles.logoArea}>
                  <Image
                      style={styles.tinyLogo}
                      source={require('../../assets/images/tgxc-logo-horizontal-b.png')}
                      resizeMode="contain"
                  />
              </View>
            
              <View style={styles.alarmArea}>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('Alarm', {type: 'Alarm'});
                }}
                >
                  { alarmCnt && (
                  <Image
                  style={styles.alarmText}
                  source={require('../../assets/images/home/alarmOn.png')}
                  resizeMode="contain"
                  />
              )}
              { !alarmCnt && (
                  <Image
                  style={styles.alarmText}
                  source={require('../../assets/images/home/icNotifications24Px.png')}
                  resizeMode="contain"
                  />
              )}
                </TouchableOpacity>
              </View>
        </View>


         <View style={{width:screenWidth,backgroundColor:'rgb(248,247,245)', height:36, marginTop:5}}>
          <View style={styles.container3}>        
          <Text style={styles.homeWelcomeText}>{t('sayHi')}</Text><Text style={styles.homeWelcomeText1}> {userName}</Text><Text style={styles.homeWelcomeText}>{t('nim')} {t('isTgxc')}</Text>
          </View>
         </View>

         <View style={styles.container4}>

           <View style={styles.border}>
              <View style={styles.flexDirectionRow}>
                  <Text style={styles.haveTgText}>{t('tgStatus')}</Text>
                  <Text style={styles.coinZeusText}>{t('coinZeus')}</Text>
                  <View style={{alignItems:'flex-end',flex:1, marginRight:19.6}}>
                    <Image
                        style={styles.coinZeusLogo}
                        source={require('../../assets/images/home/coinZeusLogoHorizontalWhiteBg.png')}
                        resizeMode="contain"
                    />
                  </View>                
              </View>

              <View style={{alignItems:'center',height:39,marginTop:20}}>
                <Text style={styles.tgText}>{userTg}TG</Text>
              </View>

              <Text style={styles.insertNumber}>{t('accountNumber')}</Text>

              <View style={styles.flexDirectionRow1}>
                <View style={styles.memberNumberArea}>
                  <TextInput
                      style={styles.memberNumberText}
                      value={identifyNumber}
                      editable={false}
                      allowFontScaling={false}
                      placeholderTextColor="rgb(43,43,43)"
                      // onChangeText={(text) => this.setState({text})}
                  />
                </View>
                  {/* <View style={styles.randomArea}>
                      <TouchableOpacity
                              // onPress={() => {
                              //     props.navigation.navigate('Login', {type: 'Login'});
                              // }}
                              >
                      
                          <Text style={styles.randomText}>입금난수</Text>               
                      </TouchableOpacity>
                  </View>                             */}
              </View>

           </View>
         </View>

         <View style={{height:41, justifyContent:'center', marginTop:20, borderBottomWidth:0.5, borderBottomColor:'rgb(214,213,212)'}}>
              <View style={styles.container5}>
                <Text style={styles.exchangeHistoryText}>{t('goWithdraw')}</Text>
              </View>
         </View>
         
         <View style={styles.container4}>
            <View style={{marginLeft:20, marginTop:22, height:16, flexDirection:'row',alignItems:'center'}}>
                <Text style={styles.infoText1}>{t('yourCurrent')}</Text><Text style={styles.infoText2}> {t('depositAddress')}</Text><Text style={styles.infoText1}>{t('sms')}</Text>
            </View>
            <View style={{flexDirection:'row', alignItems:'center', height:32}}>
                <View style={styles.border2}>
                    <Text style={styles.infoText4}>{identifyNumber}</Text>
                </View>
                <Text style={styles.infoText3}> {t('ipnida')}</Text>
            </View>
            
            <View style={{marginTop:10, marginLeft:20}}>
                <Text style={styles.infoText5}>{t('depositAccChange')}</Text>
                <Text style={styles.infoText5}>{t('depositAccChange1')}</Text>
            </View>
         </View>

      </View>

      {/* <View style={styles.bottomBtnArea}>
            <TouchableOpacity
                    onPress={() => {
                        props.navigation.navigate('App', {type: 'App'});
                    }}
                    >
            <View style={styles.bottomBtnArea}>
                <Text style={styles.bottomCancelBtnText}>돌아가기</Text>               
            </View>
            </TouchableOpacity>                
        </View>         */}
        <View style={styles.bottomBtnArea}>
            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate('App', {type: 'App'});
                }}
                >
                <View style={styles.bottomLeftBtn}>
                    <Text style={styles.bottomCancelBtnText}>{t('cancel')}</Text>               
                </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.navigate('App', {});
                    }}
                    >      
                <View style={styles.bottomRightBtn}>
                    <Text style={styles.bottomConfirmBtnText}>{t('confirm')}</Text>                
                </View>
                </TouchableOpacity>
            </View>

    </SafeAreaView>
  );
}

var styles = StyleSheet.create({
	  container: {
      width: screenWidth,
      height:screenheight-containerHeight,
      flexDirection: 'column',
      backgroundColor:'#FFF'
    },
    tinyLogo: {
      width: 119.2,
      height: 40,
    },
    container2: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      width: screenWidth - 32,
      marginHorizontal: 16,
    },
    container3: {
      flexDirection: 'row',
      width: screenWidth - 32,
      marginHorizontal: 16,
    },
    container4: {
      // flexDirection: 'row',
      width: screenWidth - 32,
      marginHorizontal: 16,
    },
    container5: {
      flexDirection: 'row',
      width: screenWidth - 32,
      marginHorizontal: 16,
      justifyContent:'center',
      alignItems:'center'
    },
    logoArea: {
		  justifyContent: 'center',
      alignItems: 'center',
      width: screenWidth - 72,
      marginTop:5
    },
    flexDirectionRow:{
      flexDirection:'row',
      alignItems:'center',
      // justifyContent:'flex-end',
      marginTop:25,
      marginLeft:20,
      height:24
    },
    flexDirectionRow1:{
      flexDirection:'row',
      alignItems:'center',
      // justifyContent:'flex-end',
      marginTop:5.8,
      marginLeft:20,
      height:20,
      width:screenWidth-72
    },
    alarmArea:{
      justifyContent:'center',
      alignItems:'flex-end',
      // width: screenWidth - 32,
      marginTop:5
    },
    alarmText:{
      // width:17,
      height:19.5
      // alignItems:'flex-end'
    },
    personArea:{
      marginTop:5,
      justifyContent:'center',
      alignItems:'flex-start',
    },
    personText:{
      // width:20,
      height:20
    },
    homeWelcomeText:{
      fontSize:12,
      textAlign:'left',
      lineHeight:14,
      letterSpacing:-0.12,
      color:'rgb(43,43,43)',
      marginTop:11.5,
    },
    homeWelcomeText1:{
      fontSize:12,
      textAlign:'left',
      lineHeight:14,
      letterSpacing:-0.12,
      color:'rgb(43,43,43)',
      marginTop:11.5,
      fontFamily:'NanumBarunGothicBold' 
    },
    border:{
      height:210,
      // borderWidth:1,
      borderRadius:10,
      backgroundColor:'rgb(255,255,255)',
      shadowColor:'#000',
      shadowOffset:{
        width:0,
        height:3
      },
      shadowRadius:5,
      shadowOpacity:0.2,
      elevation:2,
      marginTop:20
    },
    haveTgText:{
      fontSize:16,
      textAlign:'left',
      lineHeight:19,
      letterSpacing:-0.16,
      color:'rgb(43,43,43)',
      fontFamily:'NanumBarunGothicBold' 
    },
    coinZeusText:{
      fontSize:10,
      textAlign:'left',
      lineHeight:12,
      letterSpacing:-0.1,
      color:'rgb(152,152,152)',
      marginLeft:7,
      fontFamily:'NanumBarunGothic' 
    },
    coinZeusLogo:{
      flex:1,
      width:75.4,
      height:24,
      justifyContent:'flex-end'
    },
    tgText:{
      fontSize:30,
      lineHeight:39,
      letterSpacing:-0.3,
      color:'rgb(43,43,43)',
      fontFamily:'Roboto-Bold'
    },
    insertNumber:{
      fontSize:12,
      textAlign:'left',
      lineHeight:18,
      letterSpacing:-0.12,
      color:'rgb(152,152,152)',
      marginLeft:20,
      marginTop:25.2,
      fontFamily:'NanumBarunGothic' 
    },
    randomText:{
      fontSize:12,
      textAlign:'center',
      lineHeight:14,
      letterSpacing:-0.12,
      color:'rgb(213,173,66)',
      fontFamily:'NanumBarunGothic'
    },
    memberNumberText:{
      fontSize:12,   
      color:'rgb(43,43,43)',
      lineHeight:14,
      letterSpacing:-0.12,
      paddingBottom:Platform.OS === 'android' ? 7:0,
      fontFamily:'NanumBarunGothic'
    },
    memberNumberArea:{
      height: 32,
      flex:1,
      justifyContent:'center',
      borderRadius:4,
      borderWidth:1,
      borderColor:'rgba(214,213,212,0.36)',
      marginTop:5.8, 
      paddingLeft:10,
    },
    randomArea:{
      height:32,
      flex:1, 
      borderWidth:1,
      borderColor:'rgba(214,213,212,0.36)', 
      borderRadius:4, 
      color:'rgb(255,255,255)',
      marginLeft:6,
      marginTop:5.8, 
      justifyContent:'center'
    },
    exchangeHistoryText:{
      fontSize:14,
      textAlign:'left',
      lineHeight:16,
      letterSpacing:-0.14,
      color:'rgb(43,43,43)',
      alignItems:'center',
      flex:1,
      fontFamily:'NanumBarunGothicBold'
    },
    bottomCancelBtnText:{
        fontSize:18,
        lineHeight:20,
        textAlign:'center',
        textAlignVertical:'center',
        letterSpacing:-0.18,
        color:'rgb(255,255,255)',
        fontFamily:'NanumBarunGothic'
        // flexDirection:'row'
    },
    bottomBtnArea:{
        flexDirection:'row',
        width: screenWidth, 
        height: 69.6, 
        backgroundColor: 'rgb(213,173,66)', 
        justifyContent: 'center', 
        alignItems: 'center'
      //   marginTop:screenheight
    },
    infoText1:{
        fontSize:14,
        textAlign:'left',
        lineHeight:16,
        letterSpacing:-0.14,
        color:'rgb(43,43,43)',
        fontFamily:'NanumBarunGothic'
    },
    infoText2:{
        fontSize:14,
        fontFamily:'NanumBarunGothicBold',
        textAlign:'left',
        lineHeight:16,
        letterSpacing:-0.14,
        color:'rgb(43,43,43)'
    },
    infoText3:{
        height:16,
        fontSize:14,
        textAlign:'center',
        lineHeight:16,
        letterSpacing:-0.14,
        color:'rgb(43,43,43)',
        marginTop:7
    },
    infoText4:{
        fontSize:12,
        textAlign:'left',
        lineHeight:18,
        letterSpacing:-0.12,
        color:'rgb(108,108,108)',
        marginTop:7,
        marginLeft:15,
        height:15,
        // paddingBottom:Platform.OS === 'android' ? 0:0,
        fontFamily:'NanumBarunGothic'
    },
    infoText5:{
        fontSize:12,
        textAlign:'left',
        lineHeight:18,
        letterSpacing:-0.12,
        color:'rgb(152,152,152)',
        fontFamily:'NanumBarunGothic'
    },
    border2:{
        height:32,
        width:238,
        borderWidth:1,
        // backgroundColor:'rgba(214,213,212,0.7)',
        // borderColor:'rgb(214,213,212)'
        backgroundColor:'rgba(214,213,212,0.36)',
        borderRadius:4,
        borderColor:'rgb(214,213,212)',
        marginLeft:20,
        marginTop:6
    },
    bottomLeftBtn:{
        width:screenWidth/2,
        alignItems:'flex-start',
        height:69.6,
        backgroundColor:'rgb(43,43,43)',
        alignItems:'center',
        justifyContent:'center'
    },
    bottomRightBtn:{
        width:screenWidth/2,
        alignItems:'flex-end',
        height:69.6,
        backgroundColor:'rgb(213,173,66)',
        alignItems:'center',
        justifyContent:'center'
    },
    bottomConfirmBtnText:{
        fontSize:18,
        lineHeight:20,
        textAlign:'center',
        letterSpacing:-0.18,
        color:'rgb(255,255,255)',
        fontFamily:'NanumBarunGothic'
        // flexDirection:'row'
    },
    
    


    
    
});

export default Deposit;
