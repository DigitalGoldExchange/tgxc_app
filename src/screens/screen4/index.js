import React from 'react';
import {StatusBar, StyleSheet, SafeAreaView, Text, Image, View, Dimensions, TextInput, Platform, TouchableOpacity, ScrollView, Alert} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {useTranslation} from 'react-i18next';
import {me} from '../../service/auth';
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

function Screen4(props) {
  
  const {t, i18n} = useTranslation();
  // const [identifyNumber, setIdentifyNumber] = React.useState();
  const [userName, setUserName] = React.useState();
  const [alarmCnt, setAlarmCnt] = React.useState();
  // const [lanauage, setLanguage] = React.useState(i18n.language=='ko'?true:false);
  // console.log(props);
  React.useEffect(() => {
		(async function anyNameFunction() {
      const res = await me();
      setUserName(res.data.user.name);
      setAlarmCnt(res.data.unreadPushCount);
      // console.log(user);
      
		})();
  }, []);
  
  return (
    
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor='#fff'/>
        <View style={styles.container}>

          <View style={styles.container3}>          
            <View style={styles.personArea}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('MemberInfo', {});
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
                    props.navigation.navigate('Alarm', {});
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

          <ScrollView>

          <View style={styles.buttonContainer}>
            <View style={{justifyContent:'flex-start', alignItems:'flex-start'}}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('MemberInfo', {});
                }}
              >
              <View style={styles.personInfoBtn}>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                  <Image
                    style={styles.personPinImg}
                    source={require('../../assets/images/screen4/icPersonPin24Px.png')}
                  >
                  </Image>
                  <Text style={styles.personPinText}>{t('pi')}</Text>
                </View>
              </View>
              </TouchableOpacity>
            </View>
            <View style={{flex:1, justifyContent:'flex-end', alignItems:'flex-end'}}>
              <TouchableOpacity
                  onPress={() => Alert.alert(null, t('customerAlert'), [
                    {
                      text: t('alertConfirmBtn'),
                    },
                  ])}
                >
              <View style={styles.personInfoBtn}>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                  <Image
                    style={styles.personPinImg}
                    source={require('../../assets/images/screen4/icSettings24Px.png')}
                  >
                  </Image>
                  <Text style={styles.personPinText}>{t('customerService')}</Text>
                </View>
              </View>
              </TouchableOpacity>
            </View>
          </View>
    
    
          <View style={styles.titleArea}>
            <Text style={styles.titleText}>{t('tgReqExchange')}</Text>
          </View>
          
          <View style={styles.subTitleArea}>
            <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('Exchange', {});
                }}
              >
              <View style={{marginTop:14}}>
                <Text style={styles.subTitleText}>{t('goReqEx')}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
               onPress={() => {
                props.navigation.navigate('Screen2', {selectValue:'교환신청'});
              }}
              >
              <View style={{marginTop:12}}>
                <Text style={styles.subTitleText}>{t('resultEx')}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.titleArea}>
            <Text style={styles.titleText}>{t('tgReqDeposit')}</Text>
          </View>

          <View style={styles.subTitleArea}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Deposit', {});
              }}
              >
              <View style={{marginTop:14}}>
                <Text style={styles.subTitleText}>{t('goReqDe')}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Screen2', {selectValue:'입금'});
              }}
              >
              <View style={{marginTop:12}}>
                <Text style={styles.subTitleText}>{t('resultDe')}</Text>
              </View>
            </TouchableOpacity>
          </View>        

          <View style={styles.titleArea}>
            <Text style={styles.titleText}>{t('tgReqWi')}</Text>
          </View>

          <View style={styles.subTitleArea}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Withdraw', {});
              }}
              >
              <View style={{marginTop:14}}>
                <Text style={styles.subTitleText}>{t('goReqWi')}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Screen2', {selectValue:'출금'});
              }}
              >
              <View style={{marginTop:12}}>
                <Text style={styles.subTitleText}>{t('resultWi')}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Screen2', {});
            }}
            >
          <View style={styles.titleArea}>
            <Text style={styles.titleText}>{t('transactionHistory')}</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Setting', {});
            }}
            >
            <View style={styles.settingTextArea}>
          <Text style={styles.titleText}>{t('settingTitle')}</Text>
            </View>
          </TouchableOpacity>

          <View style={{height:30, width:screenWidth, backgroundColor:'#FFF'}}>

            </View>

            </ScrollView>     

        </View>

        
    </SafeAreaView> 
    
    
  );
}

var styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height:screenheight-100,
    flexDirection: 'column',
    backgroundColor:'rgb(255,255,255)'
  },
  scrollContainer:{
    width: screenWidth,
    height:screenheight,
    flexDirection: 'column',
    backgroundColor:'rgb(255,255,255)'
  },
  container3: {
    flexDirection: 'row',
    width: screenWidth - 32,
    marginHorizontal: 16,
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
  logoArea: {
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth - 72,
    marginTop:5
  },
  tinyLogo: {
    width: 119.2,
    height: 40,
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
  buttonContainer:{
    flexDirection:'row',
    width: screenWidth - 52,
    marginHorizontal: 26,
    height:60,
    marginTop:20,
    marginBottom:20,
    justifyContent:'center'
  },
  personInfoBtn:{
    width:150,
    height:60,
    borderRadius:4,
    borderWidth:0.5,
    backgroundColor:'rgba(214,213,212,0.1)',
    borderColor:'rgb(214,213,212)',
    justifyContent:'center',
    alignItems:'center'
  },
  personPinImg:{
    width:24,
    height:24,
    marginRight:8.6
  },
  personPinText:{
    fontSize:14,
    textAlign:'center',
    lineHeight:16,
    letterSpacing:-0.14,
    color:'rgb(108,108,108)',
    fontFamily:'NanumBarunGothic'
  },
  titleArea:{
    width:screenWidth,
    height:41,
    backgroundColor:'rgba(214,213,212,0.3)',
    justifyContent:'center',
    alignItems:'center'
  },
  settingTextArea:{
    width:screenWidth,
    height:41,
    backgroundColor:'rgba(214,213,212,0.3)',
    justifyContent:'center',
    alignItems:'center',
    borderTopWidth:0.5,
    borderTopColor:'rgb(214,213,212)'
  },
  titleText:{
    fontSize:16,
    textAlign:'left',
    lineHeight:19,
    letterSpacing:-0.16,
    color:'rgb(43,43,43)',
    width: screenWidth - 52,
    marginHorizontal: 26,
    fontFamily:'NanumBarunGothicBold'
  },
  subTitleText:{
    fontSize:14,
    textAlign:'left',
    lineHeight:20,
    letterSpacing:-0.14,
    color:'rgb(152,152,152)',
    fontFamily:'NanumBarunGothic'
  },
  subTitleArea:{
    height:75,
    width:screenWidth-52,
    marginHorizontal:26
  },



  
  
});

export default Screen4;
