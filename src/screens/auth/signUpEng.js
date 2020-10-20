import React from 'react';
import auth from '@react-native-firebase/auth';
import {StatusBar, StyleSheet, SafeAreaView, Text, Image, View, Dimensions, TextInput, Platform, TouchableOpacity, Alert} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { ScrollView } from 'react-native-gesture-handler';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenheight = Math.round(Dimensions.get('window').height);
let containerHeight = 170;
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
            DeviceInfo.getModel() == 'iPhone SE(2nd generation)' ||
			DeviceInfo.getModel() == 'iPhone')) ||
	Platform.OS == 'android'
) {
	containerHeight = 89;
}

function SignUpEng(props) {

  const [phoneNumber, setPhoneNumber] = React.useState();
  const [code, setCode] = React.useState('');
  const [confirm, setConfirm] = React.useState(null);
  const [fbToken, setFbToken] = React.useState();
  const [remainingSecs, setRemainingSecs] = React.useState(180);
	const [isActive, setIsActive] = React.useState(false);
  const {mins, secs} = getRemaining(remainingSecs);
  const [spinner, setSpinner] = React.useState(false);
  const [okAuth, setOkAuth] = React.useState(false);
  React.useEffect(() => {
		let interval = null;
		setSpinner(false);
		if (remainingSecs < 1) {
			// setRemainingSecs(600);

			setIsActive(false);
			clearInterval();
		}

		if (isActive) {
			interval = setInterval(() => {
				setRemainingSecs((remainingSecs) => remainingSecs - 1);
				setSpinner(false);
			}, 1000);
		} else if (!isActive && remainingSecs !== 0) {
			clearInterval(interval);
			setSpinner(false);
		}

		return () => clearInterval(interval);
	}, [isActive, remainingSecs]);

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

    const confirmation = await auth().signInWithPhoneNumber(confirmPhone);
  
    // console.log(confirmation);
    setConfirm(confirmation);
    setRemainingSecs(180);
		setIsActive(true);
		setSpinner(false);

  };

  function confirmCode(){
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
    setSpinner(true);
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
								setSpinner(false);
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
  }



  // console.log(props);
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
            <View style={{marginTop:15.5}}>
                <View style={styles.container2}>
                    <Text style={styles.findIdTitle}>Sign up</Text>           
                </View>
            </View>
            <View style={styles.lineStyle}></View>

            <ScrollView>
            <View style={styles.container4}>
                <View style={{marginTop:25.5}}>
                    <Text style={styles.infoText}>Passport Verification</Text>
                </View>
                <View style={{marginTop:6}}>
                    <Text style={styles.textStyle}>To proceed the registration, it need and SMS</Text>
                    <Text style={styles.textStyle}>Verification to check the valid user</Text>
                </View>
                
                <View style={{marginTop:35}}>
                    <Text style={styles.infoText}>SMS Verification</Text>        
                </View>
                <View style={{marginTop:6}}>
                    <Text style={styles.textStyle}>If you sign up by stealing other people's personal</Text>
                    <Text style={styles.textStyle}>information, you may be restricted from using the</Text>
                    <Text style={styles.textStyle}>service and subject to legal sanctions.</Text>
                </View>
                
                <View style={{flexDirection:'row', marginTop:19.5}}>
                    {/* <View style={styles.countryCodeBox}>
                        <TouchableOpacity
                                // onPress={() => {
                                //     props.navigation.navigate('Login', {type: 'Login'});
                                // }}
                                >
                        
                            <Text style={styles.countryCodeText}>Country Code</Text>               
                        </TouchableOpacity>
                    </View> */}
                    <TextInput
                        style={{height: 46,width: (screenWidth - 32),borderRadius:4,borderWidth:1,borderColor:'rgb(214,213,212)',marginTop:6, paddingLeft:10,color:'rgb(108,108,108)'}}
                        placeholder=" Country Code + Phone Number"
                        allowFontScaling={false}
                        keyboardType='phone-pad'
                        placeholderTextColor="rgb(214,213,212)"
                        value={phoneNumber}
                        onChangeText={(text) => {setPhoneNumber(text);}}
                        />
                </View>
                      
                <View style={styles.sendCode}>
                    <TouchableOpacity
                            onPress={() => {validicationPhoneNumber()}}
                            >
                    
                        <Text style={styles.sendCodeText}>{!confirm?'Send Verification Code':'Resend Verification Code'}</Text>               
                    </TouchableOpacity>
                </View>
                
                <View style={{flexDirection:'row'}}>
                  <View style={{flexDirection:'row'}}>
                    <TextInput
                        style={{height: 46,marginRight:6,width: (screenWidth - 39) / 3 * 2,borderRadius:4,borderWidth:1,borderColor:'rgb(214,213,212)',marginTop:20, paddingLeft:10,color:'rgb(108,108,108)'}}
                        placeholder=" Verification Code"
                        allowFontScaling={false}
                        value={code}
                        keyboardType='number-pad'
                        placeholderTextColor="rgb(214,213,212)"
                        onChangeText={(text) => setCode(text)}
                        />
                        {confirm && !okAuth && (
                            <Text style={{position:'absolute',top:34, left:200}}>{`${formatNumber(mins)}:${formatNumber(secs)}`}</Text>
                          )
                        }
                  </View>      
                    <View style={styles.findAddr}>
                        <TouchableOpacity
                                onPress={() => confirmCode()}
                                >
                        
                            <Text style={styles.findAddrText}>Confirm</Text>               
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={{marginTop:24.5}}>
                    <Text style={styles.smsText}>SMS Verification</Text>
                </View>

                <View style={{flexDirection:'row', marginTop:5.5, alignItems:'flex-end', height:171}}>
                    <View style={{height:171,marginRight:6,width: (screenWidth - 39) / 3 * 2, borderRadius:4,borderWidth:1,borderColor:'rgb(214,213,212)', backgroundColor:'rgb(240,240,240)'}}>
                        <Text style={styles.sampleImageText}>Image of You holding Passport</Text>
                        <View style={{width:113, height:131.8, marginTop:10, marginLeft:100}}>
                            <Image
                                source={require('../../assets/images/screen3/13.png')}
                                resizeMode="contain"
                            />
                        </View>    
                    </View>
                    <View style={styles.findAddr1}> 
                        <TouchableOpacity
                                // onPress={() => {
                                //     props.navigation.navigate('Login', {type: 'Login'});
                                // }}
                                >
                        <Text style={styles.findAddrText}>Upload</Text>               
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
            <View style={{height:30, width:screenWidth, backgroundColor:'#FFF'}}>

            </View>
            
           
            </ScrollView>
            
            </View>    
            <View style={styles.bottomBtnArea}>
                <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate('Login', {type: 'Login'});
                        }}
                        >
                <View style={styles.bottomLeftBtn}>
                    <Text style={styles.bottomCancelBtnText}>Cancel</Text>               
                </View>
                </TouchableOpacity>
                <TouchableOpacity
                         onPress={() => {
                            props.navigation.navigate('JoinStep3', {type: 'JoinStep3'});
                        }}
                        >
                <View style={styles.bottomRightBtn}>
                    <Text style={styles.bottomConfirmBtnText}>Confirm</Text>                    
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
    container2: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		width: screenWidth - 32,
		marginHorizontal: 16,
    },
    container3: {
		// justifyContent: 'center',
		// alignItems: 'center',
		flexDirection: 'row',
		width: screenWidth - 32,
		marginHorizontal: 16,
    },
    container4: {
		// justifyContent: 'center',
		// alignItems: 'center',
		flexDirection: 'column',
		width: screenWidth - 32,
        marginHorizontal: 16
    },
    findIdTitle:{
        width:122,
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
        width:37,
        height:16,
        fontSize:14,
        textAlign:'left',
        lineHeight:20,
        letterSpacing:-0.14,
        color:'rgb(108,108,108)',
        marginTop:24
    },
    infoText:{
        // width:57,
        height:19,
        fontSize:16,
        textAlign:'left',
        lineHeight:19,
        letterSpacing:-0.16,
        color:'rgb(43,43,43)',
        fontFamily:'NanumBarunGothicBold'
        // marginTop:25.5
    },
    findAddr:{
        width:(screenWidth-39) / 3,
        height:46,
        borderRadius:4,
        borderWidth:1,
        borderColor:'rgb(213,173,66)',
        marginTop:20,
        justifyContent:'center'
    },
    findAddr1:{
        width:(screenWidth-39) / 3,
        height:46,
        borderRadius:4,
        borderWidth:1,
        borderColor:'rgb(213,173,66)',
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
    countryCodeBox:{
        width:(screenWidth-39) / 3,
        height:46,
        marginRight:6,
        borderRadius:4,
        borderWidth:1,
        borderColor:'rgb(214,213,212)',
        marginTop:6,
        backgroundColor:'rgb(255,255,255)',
        justifyContent:'center'
    },
    countryCodeText:{
        fontSize:14,
        textAlign:'center',
        lineHeight:16,
        letterSpacing:-0.14,
        color:'rgb(108,108,108)',
        fontFamily:'NanumBarunGothic'
    },
    smsText:{
        fontSize:14,
        textAlign:'left',
        lineHeight:16,
        letterSpacing:-0.14,
        color:'rgb(108,108,108)',
        fontFamily:'NanumBarunGothic'
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
        backgroundColor:'rgb(255,255,255)'
    },
    sendCodeText:{
        fontSize:14,
        textAlign:'center',
        lineHeight:16,
        letterSpacing:-0.14,
        color:'rgb(213,173,66)',
        fontFamily:'NanumBarunGothicBold'
    },
    sampleImageText:{
        fontSize:12,
        textAlign:'left',
        lineHeight:16,
        letterSpacing:-0.12,
        color:'rgb(152,152,152)',
        marginLeft:10,
        marginTop:10.7,
        fontFamily:'Roboto-Regular'
    }
    
});

export default SignUpEng;
