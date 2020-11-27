import React from 'react';
import {useIsFocused} from '@react-navigation/native';
import {StatusBar, StyleSheet, SafeAreaView, Text, Image, View, Dimensions, TextInput, Platform, TouchableOpacity, Alert} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {useTranslation} from 'react-i18next';
import {validationEmail} from '../../utils/validate';
import { ScrollView } from 'react-native-gesture-handler';
import {findPw, findEmail} from '../../service/auth';
import Spinner from 'react-native-loading-spinner-overlay';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenheight = Math.round(Dimensions.get('window').height);
let containerHeight = 155;
const formatNumber = (number) => `0${number}`.slice(-2);
const getRemaining = (time) => {
	const mins = Math.floor(time / 60);
	const secs = time - mins * 60;

	return {
		mins,
		secs,
	};
};
if (
	(Platform.OS == 'ios' &&
		(DeviceInfo.getModel() == 'iPhone 8' ||
			DeviceInfo.getModel() == 'iPhone 7' ||
			DeviceInfo.getModel() == 'iPhone 8 Plus' ||
      DeviceInfo.getModel() == 'iPhone SE' ||
      DeviceInfo.getModel() == 'iPhone SE(2nd generation)')) ||
	Platform.OS == 'android'
) {
	containerHeight = 89;
}

function PasswordAuthScreen(props) {
  // console.log(props);
  const [emailId, setEmailId] = React.useState();
  const [resultYn, setResultYn] = React.useState(false);
  const [niceName, setNiceName] = React.useState();
  const [nicePhone, setNicePhone] = React.useState();
  const [nicePhone1, setNicePhone1] = React.useState();
  const [niceBirthDate, setNiceBirthDate] = React.useState(); 
  const isFocused = useIsFocused();
  const {t, i18n} = useTranslation();
  const [spinner, setSpinner] = React.useState(false);
  const [remainingSecs, setRemainingSecs] = React.useState(180);
  const [isActive, setIsActive] = React.useState(false);
  const {mins, secs} = getRemaining(remainingSecs);  
  const [koreaYn, setKoreaYn] = React.useState(i18n.language=='ko'?true:false);
  const [okAuth, setOkAuth] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [code, setCode] = React.useState('');
  const [confirm, setConfirm] = React.useState(null);
  const [spinner1, setSpinner1] = React.useState(false);
  const [fbToken, setFbToken] = React.useState();
  
  
  React.useEffect(() => {   
    
    setNicePhone(props.route.params.nicePhone);
    setNiceName(props.route.params.niceName);
    setNiceBirthDate(props.route.params.niceBirthDate);

    setNicePhone1(props.route.params.nicePhone);

  },[props.route.params]);


  React.useEffect(() => {
    // setDupl(true);
    (async function anyNameFunction() {
        if(nicePhone !== undefined){
            const res = await findEmail(nicePhone);
            console.log(res);
            if(res.data.result){
                Alert.alert(null, '회원정보가 존재하지 않습니다.');
            }
           if(!res.data.result && res.data.resultMsg === '중복'){
               
                if(props.route.params.resultYn === 'success'){
                    setResultYn(true);
                }  
            
            }
    }
        
    
    })();

    return()=>{
        setNicePhone();
        // setDupl();
    }
    
  }, [isFocused]);

  React.useEffect(() => {
    let interval = null;
    setSpinner1(false);
    if (remainingSecs < 1) {
        // setRemainingSecs(600);

        setIsActive(false);
        clearInterval();
    }

    if (isActive) {
        interval = setInterval(() => {
            setRemainingSecs((remainingSecs) => remainingSecs - 1);
            setSpinner1(false);
        }, 1000);
    } else if (!isActive && remainingSecs !== 0) {
        clearInterval(interval);
        setSpinner1(false);
    }

    return () => clearInterval(interval);
}, [isActive, remainingSecs]);


  const findUserInfo = async () => {
    if(!emailId){
      Alert.alert(null,'이메일을 입력해주세요.');
      return;
    }else if(!validationEmail(emailId.trim())){
      Alert.alert(null,t('invalidEmailFormat'));
      return;
    }

    const bodyFormData = new FormData();
    bodyFormData.append("emailId", emailId.trim());
    bodyFormData.append("phoneNumber", nicePhone1);
    
    setSpinner(true);

    setTimeout(async () => {//ref토큰 한번 호출해서 200
        const res = await findPw(bodyFormData);

        if(res.data.result){
            Alert.alert(null, '이메일로 임시 비밀번호를\n전달해 드렸습니다.', [
                        {
                            text: '확인',
                            onPress: () => props.navigation.navigate('Login', {}),
                        },
                    ]);
        }else{
            Alert.alert(null, res.data.msg);
            
        }    
        setSpinner(false);
    }, 1000);



  };
  async function findForeUserInfo(){

    if(!validationEmail(emailId.trim())){
        Alert.alert(null,t('invalidEmailFormat'));
        return;
      }
  

      const bodyFormData = new FormData();
      bodyFormData.append("emailId", emailId.trim());
      bodyFormData.append("phoneNumber",phoneNumber);
      
      setSpinner(true);
  
      setTimeout(async () => {//ref토큰 한번 호출해서 200
          const res = await findPw(bodyFormData);
  
          if(res.data.result){
              Alert.alert(null, 'The temporary password is send to\nyour email.', [
                          {
                              text: '확인',
                              onPress: () => props.navigation.navigate('Login', {}),
                          },
                      ]);
          }else{
              Alert.alert(null, 'Member information does not exist.');
            //   return;
          }    
          setSpinner(false);
      }, 1000);   
  }

  async function validicationPhoneNumber(){
    setCode('');
    let confirmPhone = phoneNumber;

    if(!confirmPhone){
      Alert.alert("Please enter your phone number.");
      return false;
    }

    if(confirmPhone.indexOf('+') == -1){
      confirmPhone = '+' + confirmPhone;
    }
    try{
        const confirmation = await auth().signInWithPhoneNumber(confirmPhone);
        console.log(confirmation);
        setConfirm(confirmation);
        setRemainingSecs(180);
		setIsActive(true);
		setSpinner1(false);
    }catch(error){
        console.log(error);
        Alert.alert("Invalid phone number");
    }
    
  

  };
  
  async function confirmCode(){
    if (remainingSecs == 0) {
			// alert('인증코드 시간이 만료 되었습니다.');
			Alert.alert('The verification code has expired.');
			// return false;
			return false;
    }
    if(!code){
			Alert.alert('Please enter the verification code.');
			// return false;
			return false;
		}
    setSpinner1(true);
    try {
			confirm
				.confirm(code)
				.then((user) => {
					auth().onAuthStateChanged(function (user) {
						if (user) {
							user.getIdToken().then(function (data) {
                                setFbToken(data);
                                console.log(data);
								setOkAuth(true);
								setSpinner1(false);
							});
						}
                    });
                    
                    setCode('Verification success');
                    
				})
				.catch((error) => {
					// console.log('error start');
					// console.log('error::' + error);
					// if (!errorCount) {
					// errorCount = true;
					Alert.alert('Please check the verification code again.');
					// }

					// setSpinner(false);
                });
            

		} catch (error) {
			console.log(error);
        }
        
        

  };

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor='#f8f7f5'/>
      <Spinner visible={spinner}  />
      <View style={styles.container}>
            <View style={{marginTop:15.5}}>
                <View style={styles.container2}>
                    <Text style={styles.findIdTitle}>{t('findPw')}</Text>           
                </View>
            </View>
            <View style={styles.lineStyle}></View>
            <ScrollView>
            <View style={styles.container3}>
                <Text style={styles.textStyle}>{t('findPwComment')}</Text>
            </View>
            <View style={styles.container3}>
                <Text style={styles.emailText}>{t('findPwEmailId')}</Text>
            </View>
            <View style={styles.container2}>
            <TextInput
                    style={{height: 46,width: screenWidth - 32,borderWidth:1,borderRadius:4, borderColor:'rgb(214,213,212)',marginTop:6, paddingLeft:10,color:'rgb(108,108,108)'}}
                    placeholder={t('findPwEmailIdplaceholder')}
                    allowFontScaling={false}
                    placeholderTextColor="rgb(214,213,212)"
                    onChangeText={
                        (text) => {setEmailId(text);}
                    }
                    />
                    </View>
            {
                koreaYn && (
                    <View>
                        <View style={styles.container3}>
                        <   Text style={styles.mobileAuthText}>휴대폰 본인 인증</Text>
                        </View>
                        <View style={styles.container3}>
                            <Text style={styles.textStyle1}>타인의 개인정보를 도용하여 가입한 경우, 서비스 이용제한 및 법적 제재를 받으실 수 있습니다.</Text>
                        </View>
                        <View style={styles.container3}>
                            <TouchableOpacity
                                style={styles.buttonBox}
                                disabled={resultYn?true:false}
                                onPress={() => {
                                    props.navigation.navigate('PasswordNice', {});
                                }}
                                >
                                <Image
                                    style={styles.buttonImg}
                                    source={resultYn?require('../../assets/images/auth/invalidName3x.png'):require('../../assets/images/auth/btn13x.png')}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }  

            { !koreaYn && (
                <View>
                    <View style={styles.container3}>
                    <View style={{marginTop:35}}>
                        <Text style={styles.infoText}>SMS Verification</Text>        
                    </View>
                    </View>
                    <View style={styles.container3}>
                    <View style={{marginTop:6}}>
                        <Text style={styles.textStyle11}>If you sign up by stealing other people's personal</Text>
                        <Text style={styles.textStyle11}>information, you may be restricted from using the</Text>
                        <Text style={styles.textStyle11}>service and subject to legal sanctions.</Text>
                    </View>
                    </View>
                    <View style={styles.container3}>
                    <View style={{flexDirection:'row', marginTop:19.5}}>
                        <TextInput
                            style={{height: 46,width: (screenWidth - 32),borderRadius:4,borderWidth:1,borderColor:'rgb(214,213,212)',marginTop:6, paddingLeft:10,color:'rgb(108,108,108)'}}
                            placeholder=" Country Code + Phone Number"
                            allowFontScaling={false}
                            keyboardType='phone-pad'
                            placeholderTextColor="rgb(214,213,212)"
                            editable={!okAuth?true:false}
                            value={phoneNumber}
                            onChangeText={(text) => {setPhoneNumber(text);}}
                            />
                    </View>
                    </View>
                    <View style={styles.container3}>
                        <TouchableOpacity
                            style={{height: 46,width: (screenWidth - 39) / 3 * 2}}
                            disabled={okAuth?true:false}
                            onPress={() => {validicationPhoneNumber()}}
                            >       
                            <View style={styles.sendCode}>
                                <Text style={styles.sendCodeText}>{!confirm?'Send Verification Code':'Resend Verification Code'}</Text>               
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container3}>
                    <View style={{flexDirection:'row'}}>
                        <TextInput
                            style={okAuth?styles.confirmCodeCompleteText:styles.confirmCodeText}
                            placeholder=" Verification Code"
                            allowFontScaling={false}
                            value={code}
                            editable={!okAuth?true:false}
                            keyboardType='number-pad'
                            placeholderTextColor="rgb(214,213,212)"
                            onChangeText={(text) => setCode(text)}
                            />
                            {
                                okAuth && (
                                    <Image
                                        style={{position:'absolute',top:31, left:10}}
                                        source={require('../../assets/images/auth/iconWhiteCheckCircleRounded.png')}
                                        resizeMode="contain"
                                    />
                                )
                            }
                            {confirm && !okAuth && (
                                <Text style={{position:'absolute',top:34, right:Platform.OS == 'android'?30:20}}>{`${formatNumber(mins)}:${formatNumber(secs)}`}</Text>
                            )
                            }
                    </View>    
                        <TouchableOpacity
                                disabled={okAuth?true:false}
                                    onPress={() => confirmCode()}
                            >
                        <View style={styles.findAddr}>
                            <Text style={styles.findAddrText}>Confirm</Text>               
                        </View>
                        </TouchableOpacity>
                    </View>
                   
            </View>            
               )
            }      
            </ScrollView>
        </View>    
            <View style={styles.bottomBtnArea}>
                <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate('Login', {});
                        }}
                        >
                <View style={styles.bottomLeftBtn}>
                    <Text style={styles.bottomCancelBtnText}>{t('cancel')}</Text>               
                </View>
                </TouchableOpacity>
                { koreaYn && (
                    <TouchableOpacity
                    disabled={!emailId||!resultYn?true:false}
                    onPress={() => {findUserInfo();}}
                    >
                    <View style={!emailId||!resultYn?styles.bottomRightBtn:styles.bottomRightGoldBtn}>
                        <Text style={styles.bottomConfirmBtnText}>확인</Text>                    
                    </View>
                    </TouchableOpacity>
                )}
                { !koreaYn && (
                    <TouchableOpacity
                    disabled={!emailId||!okAuth?true:false}
                    onPress={() => {findForeUserInfo();}}
                    >
                    <View style={!emailId||!okAuth?styles.bottomRightBtn:styles.bottomRightGoldBtn}>
                        <Text style={styles.bottomConfirmBtnText}>{t('confirm')}</Text>                    
                    </View>
                    </TouchableOpacity>
                )}
                
            </View>
       
    </SafeAreaView>
  );
}

var styles = StyleSheet.create({
	container: {
        width: screenWidth,
        height:screenheight-containerHeight,
        flexDirection: 'column',
        backgroundColor:'#f8f7f5'
    },
    container2: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		width: screenWidth - 32,
        marginHorizontal: 16
    },
    container3: {
		// justifyContent: 'center',
		// alignItems: 'center',
		flexDirection: 'row',
		width: screenWidth - 32,
		marginHorizontal: 16,
    },
    findIdTitle:{
        // width:122,
        height:26,
        fontSize:22,
        textAlign:'center',
        lineHeight:26,
        letterSpacing:-0.22,
        color:'rgba(0,0,0,0.87)',
        fontFamily:'NanumBarunGothicBold'
    },
    lineStyle:{
        width:screenWidth,
        borderWidth: 0.5,
        borderColor:'rgb(214,213,212)',
        marginTop:9
    },
    textStyle:{
        // width:265,
        // height:36,
        fontSize:14,
        textAlign:'left',
        lineHeight:20,
        letterSpacing:-0.14,
        color:'rgba(0,0,0,0.6)',
        marginTop:24,
        fontFamily:'NanumBarunGothicLight' 
    },
    textStyle1:{
        width:343,
        height:40,
        fontSize:14,
        textAlign:'left',
        lineHeight:20,
        letterSpacing:-0.14,
        color:'rgba(0,0,0,0.6)',
        marginTop:6,
        fontFamily:'NanumBarunGothicLight' 
    },
    mobileAuthText:{
        width:120,
        height:19,
        fontSize:16,
        textAlign:'left',
        letterSpacing:-0.16,
        lineHeight:19,
        color:'rgb(43,43,43)',
        marginTop:35,
        fontFamily:'NanumBarunGothicBold' 
    },
    buttonBox:{
        width:227,
        height:50,
        marginTop:20.5
    },
    buttonImg:{
        width:227,
        height:50
    },
    bottomBtnArea:{
        flexDirection:'row'
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
    bottomConfirmBtnText:{
        fontSize:18,
        lineHeight:20,
        textAlign:'center',
        letterSpacing:-0.18,
        color:'rgb(255,255,255)',
        fontFamily:'NanumBarunGothic'
        // flexDirection:'row'
    },
    bottomCancelBtn:{
        width:screenWidth/2,
        marginTop:27
    },
    bottomConfirmBtn:{
        width:screenWidth/2,
        marginTop:27
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
        backgroundColor:'rgb(214,213,212)',
        alignItems:'center',
        justifyContent:'center'
    },
    emailText:{
        // width:57,
        height:18,
        fontSize:14,
        textAlign:'left',
        lineHeight:20,
        letterSpacing:-0.14,
        color:'rgb(108,108,108)',
        marginTop:24,
        fontFamily:'NanumBarunGothic'
    },
    bottomRightGoldBtn:{
        width:screenWidth/2,
        alignItems:'flex-end',
        height:69.6,
        backgroundColor:'rgb(213,173,66)',
        alignItems:'center',
        justifyContent:'center'
    },
    infoText:{
        height:19,
        fontSize:16,
        textAlign:'left',
        lineHeight:19,
        letterSpacing:-0.16,
        color:'rgb(43,43,43)',
        fontFamily:'NanumBarunGothicBold'
        // marginTop:25.5
    },
    textStyle11:{
        width:343,
        height:22,
        fontSize:14,
        textAlign:'left',
        lineHeight:20,
        letterSpacing:-0.14,
        color:'rgba(0,0,0,0.6)',
        fontFamily:'NanumBarunGothicLight'
        // marginTop:6
    },
    sendCode:{
        height: 46,
        width: (screenWidth - 39) / 3 * 2,
        borderRadius:4,
        borderWidth:1,
        borderColor:'rgb(213,173,66)',
        marginTop:6, 
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'rgb(255,255,255)'
    },
    sendCodeText:{
        fontSize:14,
        textAlign:'center',
        lineHeight:16,
        letterSpacing:-0.14,
        color:'rgb(213,173,66)',
        fontFamily:'NanumBarunGothicBold'
    },
    confirmCodeText:{
        height: 46,
        marginRight:6,
        width: (screenWidth - 39) / 3 * 2,
        borderRadius:4,
        borderWidth:1,
        borderColor:'rgb(214,213,212)',
        marginTop:20, 
        paddingLeft:10,
        color:'rgb(108,108,108)'
    },
    confirmCodeCompleteText:{
        height: 46,
        marginRight:6,
        width: (screenWidth - 39) / 3 * 2,
        borderRadius:4,
        borderWidth:1,
        borderColor:'rgb(213,173,66)',
        marginTop:20, 
        paddingLeft:40,
        backgroundColor:'rgb(213,173,66)',
        color:'rgb(255,255,255)',
        fontFamily:'NanumBarunGothicBold'
    } ,
    findAddr:{
        width:(screenWidth-39) / 3,
        height:46,
        borderRadius:4,
        borderWidth:1,
        borderColor:'rgb(213,173,66)',
        marginTop:20,
        justifyContent:'center'
    },
    findAddrText:{
        fontSize:14,
        textAlign:'center',
        lineHeight:16,
        letterSpacing:-0.14,
        color:'rgb(213,173,66)',
        fontFamily:'NanumBarunGothicBold'
    },
    infoText:{
        height:19,
        fontSize:16,
        textAlign:'left',
        lineHeight:19,
        letterSpacing:-0.16,
        color:'rgb(43,43,43)',
        fontFamily:'NanumBarunGothicBold'
        // marginTop:25.5
    },
    textStyle11:{
        width:343,
        height:22,
        fontSize:14,
        textAlign:'left',
        lineHeight:20,
        letterSpacing:-0.14,
        color:'rgba(0,0,0,0.6)',
        fontFamily:'NanumBarunGothicLight'
        // marginTop:6
    },
    sendCode:{
        height: 46,
        width: (screenWidth - 39) / 3 * 2,
        borderRadius:4,
        borderWidth:1,
        borderColor:'rgb(213,173,66)',
        marginTop:6, 
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'rgb(255,255,255)'
    },
    sendCodeText:{
        fontSize:14,
        textAlign:'center',
        lineHeight:16,
        letterSpacing:-0.14,
        color:'rgb(213,173,66)',
        fontFamily:'NanumBarunGothicBold'
    },
    confirmCodeText:{
        height: 46,
        marginRight:6,
        width: (screenWidth - 39) / 3 * 2,
        borderRadius:4,
        borderWidth:1,
        borderColor:'rgb(214,213,212)',
        marginTop:20, 
        paddingLeft:10,
        color:'rgb(108,108,108)'
    },
    confirmCodeCompleteText:{
        height: 46,
        marginRight:6,
        width: (screenWidth - 39) / 3 * 2,
        borderRadius:4,
        borderWidth:1,
        borderColor:'rgb(213,173,66)',
        marginTop:20, 
        paddingLeft:40,
        backgroundColor:'rgb(213,173,66)',
        color:'rgb(255,255,255)',
        fontFamily:'NanumBarunGothicBold'
    } 
    
});

export default PasswordAuthScreen;
