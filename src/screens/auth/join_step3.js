import React from 'react';

import {StatusBar, StyleSheet, SafeAreaView, Text, Image, View, Dimensions, TextInput, Platform, TouchableOpacity} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { ScrollView } from 'react-native-gesture-handler';
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

function JoinStep3(props) {
  // console.log(props);
  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
            <View style={{marginTop:15.5}}>
                <View style={styles.container2}>
                    <Text style={styles.findIdTitle}>회원가입</Text>           
                </View>
            </View>
            <View style={styles.lineStyle}></View>
            
        <ScrollView>
            <View style={styles.container4}>
                <Text style={styles.infoText}>정보입력</Text>
                <Text style={styles.textStyle}>회원 기본 정보를 입력해주세요.</Text>
            </View>
            <View style={styles.container3}>
                <Text style={styles.emailText}>이메일</Text>
            </View>
            <View style={styles.container2}>
                <TextInput
                    style={{height: 46,width: screenWidth - 32,borderRadius:4,borderWidth:1,borderColor:'rgb(214,213,212)',marginTop:6, paddingLeft:10,color:'rgb(255,255,255)'}}
                    placeholder=" 이메일 주소를 입력해주세요."
                    allowFontScaling={false}
                    placeholderTextColor="rgb(214,213,212)"
                    // onChangeText={(text) => this.setState({text})}
                    />
            </View>
            <View style={styles.container3}>
                <Text style={styles.passwordText}>비밀번호</Text>
            </View>
            <View style={styles.container2}>
                <TextInput
                    style={{height: 46,width: screenWidth - 32,borderRadius:4,borderWidth:1,borderColor:'rgb(214,213,212)',marginTop:6, paddingLeft:10,color:'rgb(255,255,255)'}}
                    placeholder=" 비밀번호를 입력해주세요. 영어+숫자+특수문자8~20자"
                    allowFontScaling={false}
                    placeholderTextColor="rgb(214,213,212)"
                    // onChangeText={(text) => this.setState({text})}
                    />
            </View>
            <View style={styles.container3}>
                <Text style={styles.passwordText}>비밀번호 확인</Text>
            </View>
            <View style={styles.container2}>
                <TextInput
                    style={{height: 46,width: screenWidth - 32,borderRadius:4,borderWidth:1,borderColor:'rgb(214,213,212)',marginTop:6, paddingLeft:10,color:'rgb(255,255,255)'}}
                    placeholder=" 비밀번호를 한 번 더 입력해주세요."
                    allowFontScaling={false}
                    placeholderTextColor="rgb(214,213,212)"
                    // onChangeText={(text) => this.setState({text})}
                    />
            </View>
            <View style={styles.container3}>
                <Text style={styles.passwordText}>이름</Text>
            </View>
            <View style={styles.container2}>
                <TextInput
                    style={{height: 46,width: screenWidth - 32,borderWidth:1,borderRadius:4, borderColor:'rgb(214,213,212)',marginTop:6, paddingLeft:10,backgroundColor:'rgb(214,213,212)'}}
                    placeholder=" 홍길동"
                    allowFontScaling={false}
                    placeholderTextColor="rgb(108,108,108)"
                    // onChangeText={(text) => this.setState({text})}
                    />
            </View>

            <View style={styles.container3}>
                <Text style={styles.passwordText}>생년월일</Text>
            </View>
            <View style={styles.container2}>
                <TextInput
                    style={styles.birthYear}
                    value=" 1983년"
                    allowFontScaling={false}
                    placeholderTextColor="rgb(108,108,108)"
                    // onChangeText={(text) => this.setState({text})}
                    />
                <TextInput
                    style={styles.birthMonth}
                    value=" 11월"
                    allowFontScaling={false}
                    placeholderTextColor="rgb(108,108,108)"
                    // onChangeText={(text) => this.setState({text})}
                    />
                <TextInput
                    style={styles.birthMonth}
                    value=" 19일"
                    allowFontScaling={false}
                    placeholderTextColor="rgb(108,108,108)"
                    // onChangeText={(text) => this.setState({text})}
                    />
            </View>

            <View style={styles.container3}>
                <Text style={styles.emailText}>주소</Text>
            </View>
            <View style={styles.container2}>
                <TextInput
                    style={{height: 46,width: (screenWidth - 39) / 3 * 2,borderRadius:4,borderWidth:1,borderColor:'rgb(214,213,212)',marginTop:6, paddingLeft:10,color:'rgb(255,255,255)'}}
                    placeholder=" 주소 검색을 통해 입력해주세요."
                    allowFontScaling={false}
                    placeholderTextColor="rgb(214,213,212)"
                    // onChangeText={(text) => this.setState({text})}
                    />
                <View style={styles.findAddr}>
                    <TouchableOpacity
                            // onPress={() => {
                            //     props.navigation.navigate('Login', {type: 'Login'});
                            // }}
                            >
                    
                        <Text style={styles.findAddrText}>주소검색</Text>               
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.container2}>
                <TextInput
                    style={{height: 46,width: screenWidth - 32,borderWidth:1, borderRadius:4, borderColor:'rgb(214,213,212)',marginTop:6, paddingLeft:10,color:'rgb(255,255,255)'}}
                    placeholder=" 상세주소를 입력해주세요."
                    allowFontScaling={false}
                    placeholderTextColor="rgb(214,213,212)"
                    // onChangeText={(text) => this.setState({text})}
                    />
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
                    <Text style={styles.bottomCancelBtnText}>취소</Text>               
                </View>
                </TouchableOpacity>
                <TouchableOpacity
                         onPress={() => {
                            props.navigation.navigate('JoinStep5', {type: 'JoinStep5'});
                        }}
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
        backgroundColor:'#FFF'
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
    },
    lineStyle:{
        width:screenWidth,
        borderWidth: 1,
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
        marginTop:6
    },
    textStyle1:{
        width:343,
        height:40,
        fontSize:14,
        textAlign:'left',
        lineHeight:20,
        letterSpacing:-0.14,
        color:'rgba(0,0,0,0.6)',
        marginTop:6
    },
    mobileAuthText:{
        width:106,
        height:19,
        fontSize:16,
        textAlign:'left',
        letterSpacing:-0.16,
        lineHeight:19,
        color:'rgb(43,43,43)',
        marginTop:35
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
        // flexDirection:'row'
    },
    bottomConfirmBtnText:{
        fontSize:18,
        lineHeight:20,
        textAlign:'center',
        letterSpacing:-0.18,
        color:'rgb(255,255,255)',
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
    passwordText:{
        width:80,
        height:17,
        fontSize:14,
        textAlign:'left',
        lineHeight:20,
        letterSpacing:-0.14,
        color:'rgb(108,108,108)',
        marginTop:19.5
    },
    infoText:{
        width:57,
        height:19,
        fontSize:16,
        textAlign:'left',
        lineHeight:19,
        letterSpacing:-0.16,
        color:'rgb(43,43,43)',
        marginTop:25.5
    },
    birthYear:{
        height: 46,
        width: (screenWidth-44) / 4 * 2,
        borderWidth:1,
        borderRadius:4, 
        borderColor:'rgb(214,213,212)',
        marginTop:6, 
        paddingLeft:10,
        backgroundColor:'rgb(214,213,212)'

    },
    birthMonth:{
        height: 46,
        width: (screenWidth-44) / 4,
        borderWidth:1,
        borderRadius:4, 
        borderColor:'rgb(214,213,212)',
        marginTop:6,
        marginLeft:6, 
        paddingLeft:10,
        backgroundColor:'rgb(214,213,212)'

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
        color:'rgb(213,173,66)'
    }
    
});

export default JoinStep3;
