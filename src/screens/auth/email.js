import React from 'react';

import {StatusBar, StyleSheet, SafeAreaView, Text, Image, View, Dimensions, Platform, TouchableOpacity} from 'react-native';
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

function EmailAuthScreen(props) {
  // console.log(props);
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
            <View style={styles.container2}>
                <Text style={styles.findIdTitle}>아이디 찾기</Text>           
            </View>
            <View style={styles.lineStyle}></View>
            <View style={styles.container3}>
                <Text style={styles.textStyle}>휴대폰 본인 인증을 통해 가입하신 아이디를 찾아드립니다.</Text>
            </View>
            <View style={styles.container3}>
                <Text style={styles.mobileAuthText}>휴대폰 본인 인증</Text>
            </View>
            <View style={styles.container3}>
                <Text style={styles.textStyle1}>타인의 개인정보를 도용하여 가입한 경우, 서비스 이용제한 및 법적 제재를 받으실 수 있습니다.</Text>
            </View>
            <View style={styles.container3}>
                <TouchableOpacity
                    style={styles.buttonBox}
                    // onPress={() => {
                    //     kakaoLogin();
                    // }}
                    >
                    <Image
                        style={styles.buttonImg}
                        source={require('../../assets/images/auth/btn1.png')}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            </View>    
            <View style={styles.bottomBtnArea}>
            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate('Login', {type: 'Login'});
                }}
                >
                <View style={styles.bottomLeftBtn}>
                    <Text style={styles.bottomCancelBtnText}>취소</Text>               
                </View>
                </TouchableOpacity>
                <TouchableOpacity
                    // onPress={() => setComment()}
                    >      
                <View style={styles.bottomRightBtn}>
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
        marginHorizontal: 16,
        marginTop:15.5
    },
    container3: {
		// justifyContent: 'center',
		// alignItems: 'center',
		flexDirection: 'row',
		width: screenWidth - 32,
		marginHorizontal: 16,
    },
    findIdTitle:{
        width:102,
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
        width:318,
        height:16,
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
        width:106,
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
        // width:screenWidth/2,
        // marginTop:27
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
    }
    
});

export default EmailAuthScreen;
