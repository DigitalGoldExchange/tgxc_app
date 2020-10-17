import React,{useState} from 'react';
import {StatusBar, StyleSheet, SafeAreaView, Text, Image, View, Dimensions, TextInput, Platform, TouchableOpacity} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import '../language/i18n';
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



function Login(props) {
  const {t, i18n} = useTranslation();
  const changeLanguageToKo = () => i18n.changeLanguage('ko');
  const changeLanguageToEn = () => i18n.changeLanguage('en');

  const [lanauage, setLanguage] = React.useState('KR');
  const [emailId, setEmailId] = React.useState();
  const [password, setPassword] = React.useState();

  const changeLanguage = () =>{
    if(lanauage === 'KR'){
        setLanguage('EN');
        changeLanguageToEn();
    }else{
        setLanguage('KR');
        changeLanguageToKo();   
    }
  };

  const joinStep = () => {
    if(lanauage === 'KR'){
        props.navigation.navigate('SignUp', {type: 'joinMember'});

    }else{
        props.navigation.navigate('SignUpEng', {type: 'SignUpEng'});

    }
  }  
    
  // console.log(props);
  return (
    <SafeAreaView>
      <StatusBar/>
      <View style={styles.container}>
          <View style={{marginTop:2}}>
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
                    <Text style={styles.loginFormText}>이메일</Text>
                    <TextInput
                    style={{height: 46,width: screenWidth - 32,borderWidth:1, borderRadius:4, borderColor:'rgb(214,213,212)',marginTop:6, paddingLeft:10}}
                    placeholder=" 이메일 주소를 입력해주세요."
                    allowFontScaling={false}
                    placeholderTextColor="rgb(214,213,212)"
                    value={emailId}
                    onChangeText={(text) => {
                        setEmailId(text);
                    }}
                    />
                    <Text style={styles.loginFormText}>비밀번호</Text>
                    <TextInput
                    style={{height: 46,width: screenWidth - 32,borderWidth:1,borderRadius:4, borderColor:'rgb(214,213,212)',marginTop:6, paddingLeft:10}}
                    placeholder=" 비밀번호를 입력해주세요."
                    placeholderTextColor="rgb(214,213,212)"
                    allowFontScaling={false}
                    value={password}
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
                        <Text style={styles.findText}>아이디 찾기</Text>
                    </TouchableOpacity>
                    <View style={{marginLeft:5, marginRight:5}}><Text>/</Text></View>
                    <TouchableOpacity
                        style={styles.findText}
                        onPress={() => {
                            props.navigation.navigate('PasswordAuthScreen', {type: 'findPassword'});
                        }}>
                        <Text style={styles.findText}>비밀번호 찾기</Text>
                    </TouchableOpacity>
                    {/* <Text style={styles.findText}>아이디 찾기 / 비밀번호 찾기</Text> */}
                </View>
                <View style={styles.joinTextArea}>
                    <TouchableOpacity
                        onPress={joinStep}>
                        <Text style={styles.joinText}>회원가입</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>    
            <TouchableOpacity
                disabled={!emailId || !password ? true : false}
            // onPress={() => setComment()}
                style={styles.textButtonBtn}>
                <View style={!emailId || !password ? styles.bottomBtnArea:styles.bottomGoldBtnArea}>
                    <Text style={styles.bottomLoginBtnText}>로그인</Text>             
                </View>
            </TouchableOpacity>
       
    </SafeAreaView>
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
        width:50,
        height:16,
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
        marginRight:50
    },
    joinTextArea:{
        width:50,
        height:16,
        flexDirection:'row',
        justifyContent:'flex-end',
        marginTop:25
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
