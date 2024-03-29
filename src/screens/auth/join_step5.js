import React from 'react';
import {StatusBar, StyleSheet, SafeAreaView, Text, Image, View, Dimensions, TextInput, Platform, TouchableOpacity} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';
import {sendSignKey} from '../../service/auth';
import {useTranslation} from 'react-i18next';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenheight = Math.round(Dimensions.get('window').height);
let containerHeight = 155;
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

const JoinStep5 = ({navigation, route}) => {
    const [userInfo, setUserInfo] = React.useState([]);
    const {emailId, signKey, korea, name} = route.params;
    console.log(route.params);
    const {t, i18n} = useTranslation();

    React.useEffect(() => {
    (async function anyNameFunction() {
        const user = await AsyncStorage.getItem('user');
        // console.log(user);
        setUserInfo(JSON.parse(user));

        const bodyFormData = new FormData();
        bodyFormData.append("emailId", emailId);
        bodyFormData.append("signKey", signKey);
        bodyFormData.append("name", name);
        bodyFormData.append("isKorea", korea);

        const resultSendSignKey = await sendSignKey(bodyFormData);


            })();
    }, []);  

  // console.log(props);
  return (
    <SafeAreaView>
      <StatusBar backgroundColor='#fff'/>
      <View style={styles.container}>
            <View style={{marginTop:15.5}}>
                <View style={styles.container2}>
                    <Text style={styles.findIdTitle}>{t('joinComplete')}</Text>
                </View>
            </View>
            <View style={styles.lineStyle}></View>
            
            <View style={styles.container3}>
                <View style={styles.checkImgArea}>
                    <Image
                            style={styles.checkImg}
                            // source={require('../../assets/images/auth/check.gif')}
                            source={require('../../assets/images/auth/iconCheckCircleRounded3x.png')}
                            // resizeMode="contain"
                    />
                </View>
            </View>

            <View style={styles.container3}>
                <View style={styles.border1}>
                    <Text style={styles.welcomeText}>{t('welcome')}</Text>          
                    <Text style={styles.userNameText}>{userInfo.name}{t('nim')}</Text>          
                    <Text style={styles.welcomeText}>{t('joinThanks')}</Text>          
                    <Text style={styles.welcomeText}>{t('joinEmailInfo1')} {userInfo.emailId}{t('joinEmailInfo2')}</Text>          
                    <Text style={styles.welcomeText1}>{userInfo.emailId}</Text>          
                    <Text style={styles.welcomeText}>{t('joinEmailCheck')}</Text>      
                </View>
            </View>
      </View>

        <View style={styles.bottomBtnArea}>
            <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Login', {});
                        // const resetAction = CommonActions.reset({
                        //     index: 0,
                        //     routes: [
                        //         {
                        //             name: 'Login',
                        //         },
                        //     ],
                        // });
                        // Keyboard.dismiss();
                        // navigation.dispatch(resetAction);
                    }}
                    >
            <View style={styles.bottomBtnArea}>
                <Text style={styles.bottomCancelBtnText}>{t('confirm')}</Text>               
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
        marginTop:6
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
        width:57,
        height:19,
        fontSize:16,
        textAlign:'left',
        lineHeight:19,
        letterSpacing:-0.16,
        color:'rgb(43,43,43)',
        marginTop:25.5
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
    },
    bottomBtnArea:{
        width: screenWidth, 
        height: 69.6, 
        backgroundColor: 'rgb(213,173,66)', 
        justifyContent: 'center', 
        alignItems: 'center'
      //   marginTop:screenheight
    },
    checkImg:{
        width:76,
        height:76
    },
    checkImgArea:{
        width:screenWidth-32,
        marginTop:81.5,
        justifyContent:'center',
        alignItems:'center'
    },
    welcomeText:{
        fontSize:16,
        textAlign:'center',
        lineHeight:24,
        letterSpacing:-0.16,
        color:'rgba(0,0,0,0.6)',
        fontFamily:'NanumBarunGothic'
    },
    border1:{
        width:screenWidth-32,
        height:187,
        marginTop:40
    },
    welcomeText1:{
        fontSize:16,
        textAlign:'center',
        lineHeight:24,
        letterSpacing:-0.16,
        color:'rgba(0,0,0,0.6)',
        marginTop:20,
        fontFamily:'NanumBarunGothicBold'
    },
    userNameText:{
        fontSize:16,
        textAlign:'center',
        lineHeight:24,
        letterSpacing:-0.16,
        color:'rgba(0,0,0,0.6)',
        fontFamily:'NanumBarunGothicBold'
    }
    
});

export default JoinStep5;
