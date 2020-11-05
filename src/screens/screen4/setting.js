import React from 'react';
import {StatusBar, StyleSheet, SafeAreaView, Text, Image, View, Dimensions, TextInput, Platform, TouchableOpacity} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import DeviceInfo from 'react-native-device-info';
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
      DeviceInfo.getModel() == 'iPhone SE(2nd generation)' ||
			DeviceInfo.getModel() == 'iPhone')) ||
	Platform.OS == 'android'
) {
	containerHeight = 89;
}


function Setting(props) {

  const {t, i18n} = useTranslation();
  // const changeLanguageToKo = () => i18n.changeLanguage('ko');
  // const changeLanguageToEn = () => i18n.changeLanguage('en');
  const [lanauage, setLanguage] = React.useState(i18n.language==='ko'?'KR':'EN');

  const changeLanguage = (obj) =>{
    // console.log(obj.value);
    if(obj.value === 'KR'){
        setLanguage('KR');
        // changeLanguageToKo();
        i18n.changeLanguage('ko')
    }else if(obj.value === 'EN'){
        setLanguage('EN');
        // changeLanguageToEn();   
        i18n.changeLanguage('en');
    }
  };

  const changeAlarm = (obj) =>{
    console.log(obj.value);
    // if(obj.value === 'KR'){
    //     setLanguage('KR');
    //     changeLanguageToKo();
    // }else if(obj.value === 'EN'){
    //     setLanguage('EN');
    //     changeLanguageToEn();   
    // }
  };

  

  var radio_props = [
    {label: t('languageKorean'), value: 'KR' },
    {label: 'English', value: 'EN' }
  ];

  var alarm_props = [
    {label: t('allNotificatiton'), value: 'all' },
    {label: t('importantNotificationOnly'), value: 'important' },
    {label: t('noNotification'), value: 'no' }
  ];

  // console.log(props);
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor='#fff'/>
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
                          props.navigation.navigate('App', {});
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
                <Text style={styles.titleText}>{t('settingTitle')}</Text>
            </View> 
          </View>

          <View style={styles.alarmTextArea}>
              <Text style={styles.alarmText}>{t('notificationSetting')}</Text>
          </View>
             
          <View style={styles.subTextArea}>
          <RadioForm
              formHorizontal={false}
              animation={true}         
            >
              {
                alarm_props.map((obj, i) => (
                  
                  <RadioButton labelHorizontal={true} key={i} >
                  <RadioButtonInput
                    obj={obj}
                    index={i}
                    isSelected={lanauage === obj.value}
                    onPress={() => changeAlarm(obj)}
                    buttonSize={10}
                    buttonInnerColor={lanauage === obj.value?'rgb(213,173,66)':''}
                    buttonOuterColor={lanauage === obj.value?'rgb(213,173,66)':'rgb(214,213,212)'}
                    buttonWrapStyle={{marginBottom:18,paddingTop:Platform.OS === 'android'?2:0}}
                    />
                  <RadioButtonLabel
                    obj={obj}
                    index={i}
                    labelHorizontal={true}
                    onPress={() => changeAlarm(obj)}
                    labelStyle={styles.subText}
                    labelWrapStyle={{marginBottom:18}}
                  >
                    
                  </RadioButtonLabel>
                  </RadioButton>
                )
                  
                )
              }
              
            </RadioForm>
            {/* <View style={{marginBottom:18}}>
              <Text style={styles.subText}>{t('allNotificatiton')}</Text>
            </View>
            <View style={{marginBottom:18}}>
              <Text style={styles.subText}>{t('importantNotificationOnly')}</Text>
            </View>
            <View style={{marginBottom:20.5}}>
              <Text style={styles.subText}>{t('noNotification')}</Text>
            </View> */}
          </View>

          <View style={styles.settingLine}></View>

          <View style={styles.langTextArea}>
              <Text style={styles.alarmText}>{t('languageSetting')}</Text>
          </View>

          <View style={styles.subTextArea}>
            <RadioForm
              formHorizontal={false}
              animation={true}         
            >
              {
                radio_props.map((obj, i) => (
                  
                  <RadioButton labelHorizontal={true} key={i} >
                  <RadioButtonInput
                    obj={obj}
                    index={i}
                    isSelected={lanauage === obj.value}
                    onPress={() => changeLanguage(obj)}
                    buttonSize={10}
                    buttonInnerColor={lanauage === obj.value?'rgb(213,173,66)':''}
                    buttonOuterColor={lanauage === obj.value?'rgb(213,173,66)':'rgb(214,213,212)'}
                    buttonWrapStyle={{marginBottom:18,paddingTop:Platform.OS === 'android'?2:0}}
                    />
                  <RadioButtonLabel
                    obj={obj}
                    index={i}
                    labelHorizontal={true}
                    onPress={() => changeLanguage(obj)}
                    labelStyle={styles.subText}
                    labelWrapStyle={{marginBottom:18}}
                  >
                    
                  </RadioButtonLabel>
                  </RadioButton>
                )
                  
                )
              }
              
            </RadioForm>
                   
          </View>

          <View style={styles.settingLine}></View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('LogOut', {});
          }}
          >
            <View style={styles.langTextArea}>
                <Text style={styles.alarmText}>{t('logOut')}</Text>
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
