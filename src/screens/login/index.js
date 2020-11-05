import React,{useState} from 'react';
import {StatusBar, StyleSheet, SafeAreaView, Text, Image, View, Dimensions, TextInput, Platform, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import '../language/i18n';
import {useTranslation} from 'react-i18next';
import {validationEmail} from '../../utils/validate';
import {signin} from '../../service/auth';
import AsyncStorage from '@react-native-community/async-storage';
import {CommonActions} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import Spinner from 'react-native-loading-spinner-overlay';
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



function Login(props) {
    const [spinner, setSpinner] = React.useState(false);
    React.useEffect(() => {
        // Get the device token
        messaging()
          .getToken()
          .then(token => {
            setToken(token);
          });
        setSpinner(true);
        setTimeout(async () => {
            const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
            if (accessToken !== null && accessToken !== undefined) {
                // props.navigation.navigate('App', {});
                const resetAction = CommonActions.reset({
                    index: 0,
                    routes: [
                    {
                        name: 'App',
                    },
                    ],
                });
                props.navigation.dispatch(resetAction);
                // }
                // console.log("login페이지호출");
            }

            setSpinner(false);
        }, 1000);
        // If using other push notification providers (ie Amazon SNS, etc)
        // you may need to get the APNs token instead for iOS:
        // if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); }
    
        // Listen to whether the token changes
        return messaging().onTokenRefresh(token => {
            setToken(token);
        });
      }, []);



  const {t, i18n} = useTranslation();
  const changeLanguageToKo = () => i18n.changeLanguage('ko');
  const changeLanguageToEn = () => i18n.changeLanguage('en');

  const [lanauage, setLanguage] = React.useState(i18n.language=='ko'?'KR':'EN');
  const [emailId, setEmailId] = React.useState();
  const [password, setPassword] = React.useState();
  const [token, setToken] = React.useState([]);
      
  const changeLanguage = () =>{
    if(lanauage === 'KR'){
        setLanguage('EN');
        changeLanguageToEn();
    }else{
        setLanguage('KR');
        changeLanguageToKo();   
    }
  };

  const emailLogin = async () => {
      if(!validationEmail(emailId.trim())){
          Alert.alert(null,t('invalidEmailFormat'));
          return;
      }

      const bodyFormData = new FormData();
      bodyFormData.append("emailId", emailId.trim());
      bodyFormData.append("password", password);
      bodyFormData.append('deviceToken', token);
      bodyFormData.append('deviceType', Platform.OS);

      const res = await signin(bodyFormData);
    //   console.log(res);
      
    // console.log(res.data.exchangeList);
      if(res.data.result){
        if(res.data.user.status === 0){
            Alert.alert(null,t('verificationEmail'));
            return;
        }
        if(res.data.user.status === 1){
          Alert.alert(null,t('inactiveAccount'));
          return;
         }

        if(res.data.user.status === 3){
            Alert.alert(null,t('deactivated'));
            return;
            
        }

        if(res.data.user.status === 4){
            Alert.alert(null,"Account is under KYC Process\nWe will send you completion email\nshortly");
            return;
        }
        
        await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
        await AsyncStorage.setItem('userId', JSON.stringify(res.data.user.userId));
        await AsyncStorage.setItem('tradeList', JSON.stringify(res.data.exchangeList));

        await AsyncStorage.setItem('ACCESS_TOKEN', JSON.stringify(res.data.token));
        
        // console.log(res.data.user.emailId);
			
				const resetAction = CommonActions.reset({
					index: 0,
					routes: [
						{
							name: 'App',
						},
					],
				});
				Keyboard.dismiss();
				props.navigation.dispatch(resetAction);
      

      }else{
        Alert.alert(null,t('invalidLoginId'));
        return;
      }
      
  };
    
  // console.log(props);
  return (
    <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss();}}>
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor='#f8f7f5'/>
      <Spinner visible={spinner}  />
      <View style={styles.container}>

          <View style={{marginTop:Platform.OS === 'android' ? 5:2}}>
            <View style={styles.container2}>
            
                <View style={styles.logoArea}>
                    <Image
                        style={styles.tinyLogo}
                        source={require('../../assets/images/tgxc-logo-horizontal-b.png')}
                        resizeMode="contain"
                    />
                </View>
               
                <TouchableOpacity
                    onPress={changeLanguage}
                    >
                    <View style={styles.languageRound}>
                        <Text style={styles.languageText}>{lanauage}</Text>
                    </View>
                </TouchableOpacity>               
               
            </View>
          </View>

            <View style={styles.container2}>
                <View style={styles.loginTextArea}>
                    {/* <Text style={styles.loginText}>로그인</Text> */}
                    <Text style={styles.loginText}>{t('loginTitle')}</Text>
                </View>
            </View>
            <View style={styles.container2}>
                <View style={styles.loginFormArea}>
                    <Text style={styles.loginFormText}>{t('email')}</Text>
                    <TextInput
                    style={{height: 46,width: screenWidth - 32,borderWidth:1, borderRadius:4, borderColor:'rgb(214,213,212)',color:'rgb(108,108,108)',marginTop:6, paddingLeft:10}}
                    placeholder={t('placeholderEmail')}
                    allowFontScaling={false}
                    autoCapitalize='none'
                    placeholderTextColor="rgb(214,213,212)"
                    value={emailId}
                    keyboardType="email-address"
                    onChangeText={(text) => {
                        setEmailId(text);
                    }}
                    />
                    <Text style={styles.loginFormText}>{t('password')}</Text>
                    <TextInput
                    style={{height: 46,width: screenWidth - 32,borderWidth:1,borderRadius:4, borderColor:'rgb(214,213,212)',color:'rgb(108,108,108)',marginTop:6, paddingLeft:10}}
                    placeholder={t('placeholderPassword')}
                    placeholderTextColor="rgb(214,213,212)"
                    allowFontScaling={false}
                    autoCapitalize='none'
                    value={password}
                    secureTextEntry={true}
                    onChangeText={(text) => {
                        setPassword(text);
                    }}
                    />
                </View>
            </View>
            <View style={styles.container2}>
                <View style={styles.findTextArea}>
                    <TouchableOpacity
                        style={styles.findText}
                        onPress={() => {
                            props.navigation.navigate('EmailAuthScreen', {type: 'findEmailId'});
                        }}>                     
                        <Text style={styles.findText}>{t('findEmail')}</Text>
                    </TouchableOpacity>
                    <View style={{marginLeft:5, marginRight:5,paddingBottom:2, alignItems:'center', justifyContent:'center'}}><Text>/</Text></View>
                    <TouchableOpacity
                        style={styles.findText}
                        onPress={() => {
                            props.navigation.navigate('PasswordAuthScreen', {type: 'findPassword'});
                        }}>
                        <Text style={styles.findText}>{t('findPassword')}</Text>
                    </TouchableOpacity>
                    {/* <Text style={styles.findText}>아이디 찾기 / 비밀번호 찾기</Text> */}
                </View>
                <View style={styles.joinTextArea}>
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate('SignUp', {type: 'joinMember'});
                        }}>
                        <Text style={styles.joinText}>{t('register')}</Text>                       
                    </TouchableOpacity>
                </View>
            </View>
           
            </View>    
            <TouchableOpacity
                disabled={!emailId || !password ? true : false}
                onPress={() => {
                    emailLogin();
                }}
                style={styles.textButtonBtn}>
                <View style={!emailId || !password ? styles.bottomBtnArea:styles.bottomGoldBtnArea}>
                    <Text style={styles.bottomLoginBtnText}>{t('loginBtnText')}</Text>             
                </View>
            </TouchableOpacity>
       
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

var styles = StyleSheet.create({
	container: {
        width: screenWidth,
        height:screenheight-containerHeight,
        flexDirection: 'column',
        backgroundColor:'#f8f7f5',
        marginTop:2
    },
    tinyLogo: {
		width: 138,
		height: 46,
    },
    container2: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		width: screenWidth - 32,
		marginHorizontal: 16,
    },
    logoArea: {
		justifyContent: 'center',
		alignItems: 'flex-start',
		width: screenWidth - 60,
		// paddingTop: 85,
    },
    loginTextArea:{
        justifyContent: 'center',
		alignItems: 'flex-start',
        width: screenWidth - 32,
        paddingTop: 40
    },
    loginFormArea:{
        justifyContent: 'center',
		alignItems: 'flex-start',
        width: screenWidth - 32,
        // paddingTop: 40,
    },
    loginText:{
        // fontFamily: 'NanumBarunGothic',
        fontSize:24,
        fontStyle:'normal',
        textAlign:'left',
        color:'rgb(43,43,43)',
        fontFamily:'NanumBarunGothicBold'    
    },
    languageRound:{
        width:30,
        height:30,
        borderWidth:1.5,
        borderColor:'#d5ad42',
        borderRadius:15,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    languageText:{
        // width: 17,
        // height: 11,
        fontFamily: 'GothamBold',
        fontSize: 12,
        // fontWeight: 'bold',
        // fontStretch: 'normal',
        // fontStyle: 'normal',
        lineHeight: 14,
        letterSpacing: -0.12,
        textAlign: 'left',
        color: 'rgb(213,173,66)'
    },
    loginFormText:{
        width:60,
        height:18,
        fontSize:14,
        textAlign:'left',
        lineHeight:20,
        letterSpacing:-0.14,
        color:'rgb(108,108,108)',
        marginTop:20,
        fontFamily:'NanumBarunGothic'
    },
    findText:{
        fontSize:14,
        textAlign:'center',
        lineHeight:16,
        letterSpacing:-0.14,
        color:'rgb(43,43,43)',
        fontFamily:'NanumBarunGothic'
    },
    findPasswordText:{
        fontSize:14,
        textAlign:'center',
        lineHeight:16,
        letterSpacing:-0.14,
        color:'rgb(43,43,43)',
        flexDirection:'row'
    },
    joinText:{
        fontSize:14,
        textAlign:'center',
        lineHeight:16,
        letterSpacing:-0.14,
        color:'rgb(213,173,66)',
        flexDirection:'row',
        fontFamily:'NanumBarunGothic'
    },
    findTextArea:{
        width:154,
        height:16,
        flexDirection:'row',
        // justifyContent:'flex-start',
        marginTop:25,
        marginRight:30
    },
    joinTextArea:{
        width:70,
        height:16,
        flexDirection:'row',
        justifyContent:'flex-end',
        marginTop:25,
        marginRight:30
    },
    bottomBtnArea:{
      width: screenWidth, 
      height: 69.6, 
      backgroundColor: 'rgb(214,213,212)', 
      justifyContent: 'center', 
      alignItems: 'center'
    //   marginTop:screenheight
    },
    bottomGoldBtnArea:{
        width: screenWidth, 
        height: 69.6, 
        backgroundColor: 'rgb(213,173,66)', 
        justifyContent: 'center', 
        alignItems: 'center'
      //   marginTop:screenheight
      },
    textButtonBtn:{
        textAlign:'center'
    },
    bottomLoginBtnText:{
        fontSize:18,
        lineHeight:20,
        letterSpacing:-0.18,
        color:'rgb(255,255,255)',
        fontFamily:'NanumBarunGothic'
        // flexDirection:'row'
    }
});

export default Login;
