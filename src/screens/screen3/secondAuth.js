import React from 'react';
import {getOtpCode, checkOtp, updateOtpKey} from '../../service/auth';
import {StatusBar, StyleSheet, SafeAreaView, Text, Alert, Image,View, Dimensions, TextInput, Platform, TouchableOpacity} from 'react-native';
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

function SecondAuth(props) {
    const [regCode, setRegCode] = React.useState();
    const [confirmCode, setConfirmCode] = React.useState();
    const [okAuth, setOkAuth] = React.useState(false);


    
    React.useEffect(() => {
		(async function anyNameFunction() {
            const otpCode = await getOtpCode();
            setRegCode(otpCode.data.encodedKey);
		})();
    }, []);

    const confirmOtpCode = async () => {
        if(!confirmCode){
			Alert.alert('인증 숫자를 입력해주세요.');
			return false;
		}
  
        const bodyFormData = new FormData();
        bodyFormData.append("userCode", confirmCode);
        bodyFormData.append("otpKey", regCode);
  
        const res = await checkOtp(bodyFormData);
        console.log(res);
        if(res.data){
            
            setOkAuth(true);
            setConfirmCode('OTP 인증 완료');
            const otpReg = await updateOtpKey(regCode);
        //   await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
        //   // console.log(res.data.user.emailId);
              
        //           const resetAction = CommonActions.reset({
        //               index: 0,
        //               routes: [
        //                   {
        //                       name: 'App',
        //                   },
        //               ],
        //           });
        //           Keyboard.dismiss();
        //           props.navigation.dispatch(resetAction);
        
  
        }else{
          Alert.alert('OTP 번호가 일치하지 않습니다.');
          return;
        }
        
    };
    
    
  // console.log(props);
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor='#fff'/>
      <View style={styles.container}>
            <View style={{marginTop:15.5}}>
                <View style={styles.container2}>
                    <Text style={styles.findIdTitle}>2단계 보안 연결</Text>           
                </View>
            </View>
            <View style={styles.lineStyle}></View>
            <View style={styles.container3}>
                <Text style={styles.textStyle}>보안을 위해 OTP등록을 진행해주세요.</Text>
            </View>

            <View style={styles.container3}>
                <Text style={styles.mobileAuthText}>OTP등록코드(16자리)</Text>
            </View>    

            <View style={styles.container4}>
                <Text style={styles.textStyle1}>구글 OTP어플리케이션을 실행하신 후, 아래 생성된</Text>
                <Text style={styles.textStyle1}>고유 개인 확인코드를 입력하여 OTP등록을 진행해주세요.</Text>
            </View>

            <View style={{width: screenWidth - 32, marginHorizontal:16, marginTop:25}}>
                    <TextInput
                        style={{height: 46,width: screenWidth - 32,borderWidth:1,borderRadius:4, borderColor:'rgb(214,213,212)',marginTop:6, paddingLeft:10,backgroundColor:'rgb(240,240,240)',fontFamily:'NanumBarunGothic' ,fontSize:14,color:'rgb(108,108,108)'}}
                        // placeholder={otpCode.en}
                        allowFontScaling={false}
                        editable={false}
                        placeholderTextColor="rgb(108,108,108)"
                        value={regCode}
                        // onChangeText={(text) => {setRegCode(text);}}
                    />
                    </View>

            <View style={{marginTop:24, width:screenWidth-32, marginHorizontal:16}}>
                <Text style={styles.textStyle2}>OTP인증</Text>
            </View>
            
            <View style={{marginTop:10.2, width:screenWidth-32, marginHorizontal:16}}>
                <Text style={styles.textStyle3}>구글 OTP에 생성된 6자리 인증 숫자를 입력해주세요.</Text>
            </View>

            <View style={!okAuth?styles.container2:styles.container3}>
                <TextInput
                    style={!okAuth? styles.inputOtpText:styles.confirmOtpText}
                    placeholder=" 6자리 인증 숫자 입력"
                    allowFontScaling={false}
                    editable={!okAuth?true:false}
                    value={confirmCode}
                    keyboardType='numbers-and-punctuation'
                    placeholderTextColor="rgb(214,213,212)"
                    onChangeText={(text) => {setConfirmCode(text);}}
                    />
                    {
                            okAuth && (
                                <Image
                                    style={{position:'absolute',top:17, left:10}}
                                    source={require('../../assets/images/auth/iconWhiteCheckCircleRounded.png')}
                                    resizeMode="contain"
                                />
                            )
                        }
                    {
                        !okAuth && (
                            <TouchableOpacity
                                onPress={() => {confirmOtpCode();}}
                                >
                                <View style={styles.findAddr}>
                                    <Text style={styles.findAddrText}>인증하기</Text>               
                                </View>
                            </TouchableOpacity>
                        )
                    }
                
            </View>
            


            </View>    
            <View style={styles.bottomBtnArea}>
                <TouchableOpacity
                         onPress={() => {
                            props.navigation.goBack();
                        }}
                        // onPress={() => {
                        //     props.navigation.navigate('App', {});
                        // }}
                        >
                <View style={styles.bottomLeftBtn}>
                    <Text style={styles.bottomCancelBtnText}>취소</Text>               
                </View>
                </TouchableOpacity>
                <TouchableOpacity
                        disabled={!okAuth?true:false}
                        // onPress={() => goBack()}
                        onPress={() => {
                            props.navigation.goBack();
                        }}
                        >
                <View style={!okAuth?styles.bottomRightBtn:styles.bottomRightGoldBtn}>
                    <Text style={styles.bottomConfirmBtnText}>확인</Text>                    
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
    container4: {
		// justifyContent: 'center',
		// alignItems: 'center',
		// flexDirection: 'column',
		width: screenWidth - 32,
        marginHorizontal: 16,
        height:20,
        marginTop:6
    },
    findIdTitle:{
        width:150,
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
        width:265,
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
        // height:40,
        fontSize:14,
        textAlign:'left',
        lineHeight:20,
        letterSpacing:-0.14,
        color:'rgba(0,0,0,0.6)',
        fontFamily:'NanumBarunGothicLight' 
        // marginTop:6
    },
    textStyle2:{
        fontSize:14,
        textAlign:'left',
        lineHeight:16,
        letterSpacing:-0.14,
        color:'rgb(43,43,43)',
        fontFamily:'NanumBarunGothicBold' 
    },
    textStyle3:{
        fontSize:12,
        textAlign:'left',
        lineHeight:18,
        letterSpacing:-0.12,
        color:'rgb(152,152,152)',
        fontFamily:'NanumBarunGothic' 
    },
    mobileAuthText:{
        // width:106,
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
        height:50
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
        width:37,
        height:16,
        fontSize:14,
        textAlign:'left',
        lineHeight:20,
        letterSpacing:-0.14,
        color:'rgb(108,108,108)',
        marginTop:24
    },
    findAddr:{
        width:(screenWidth-39) / 3,
        height:46,
        marginLeft:6,
        borderRadius:4,
        borderWidth:1,
        borderColor:'rgb(213,173,66)',
        marginTop:6,
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
    inputOtpText:{
        height: 46,
        width: (screenWidth - 39) / 3 * 2,
        borderRadius:4,
        borderWidth:1,
        borderColor:'rgb(214,213,212)',
        marginTop:6, 
        paddingLeft:10,
        color:'rgb(108,108,108)'
    },
    confirmOtpText:{
        marginTop:6, 
        width: (screenWidth - 39) / 3 * 2,
        height:46,
        backgroundColor:'rgb(213,173,66)',
        borderWidth:1,
        borderRadius:4,
        borderColor:'rgb(213,173,66)',
        fontSize:14,
        textAlign:'left',
        lineHeight:16,
        paddingLeft:40,
        letterSpacing:-0.14,
        color:'rgb(255,255,255)',
        fontFamily:'NanumBarunGothicBold'
    },
    bottomRightGoldBtn:{
        width:screenWidth/2,
        alignItems:'flex-end',
        height:69.6,
        backgroundColor:'rgb(213,173,66)',
        alignItems:'center',
        justifyContent:'center'
    }
    
});

export default SecondAuth;
