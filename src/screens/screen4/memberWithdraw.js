import React from 'react';
import {StatusBar, StyleSheet, SafeAreaView, Text, Image, View, Dimensions, TextInput, Platform, TouchableOpacity, Alert} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Moment from 'moment';
import Modal from 'react-native-modal';
import {useIsFocused} from '@react-navigation/native';
import {me, confirmOtp, findPassword, deleteUser} from '../../service/auth';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-community/async-storage';
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
	containerHeight = 85;
}

function alarm(props) {
  // console.log(props);
  const {t, i18n} = useTranslation();
	const [content, setContent] = React.useState();
	const isFocused = useIsFocused();
	const [okAuth, setOkAuth] = React.useState(false);
	const [okPassword, setOkPassword] = React.useState(false);
	const [confirmCode, setConfirmCode] = React.useState();
	const [confirmPassword, setConfirmPassword] = React.useState();
  const [otpKey, setOtpKey] = React.useState();
  const [userId, setUserId] = React.useState();
  const [userTotalTg, setUserTotalTg] = React.useState();

  React.useEffect(() => {
		(async function anyNameFunction() {
      const res = await me();
      console.log(res.data.user.totalTg);
      setOtpKey(res.data.user.otpKey);
      setUserId(res.data.user.userId);
      setUserTotalTg(res.data.user.totalTg);
		})();
  }, [isFocused]);

	const confirmOtpCode = async () => {
		if(!confirmCode){
			Alert.alert(null,t('inputOtp'));
			return false;
		}

		const res = await confirmOtp(confirmCode);
		// console.log(res);
		if(res.data){
				
				setOkAuth(true);
				setConfirmCode(t('otpCompleted'));

		}else{
			Alert.alert(null,t('invalidOtp'));
			return;
		}
		
};

const confirmPasswordCode = async () => {
	if(!confirmPassword){
		Alert.alert(null,t('inputPassword'));
		return false;
	}

	const findPw = await findPassword(userId, confirmPassword);

  if(!findPw.data.result){
    Alert.alert(null, t('invalidPassword'));
    return;
  }else{
    setOkPassword(true);
    setConfirmPassword(t('passwordCompleted'));
  }

};

const memberWithdraw = () => {
  Alert.alert(
    null,
    t('quesWithdraw'),
    [
      {
        text: t('cancel'),
        style: 'cancel',
      },
      {
        text: t('confirm'),
        onPress: async () => {

          const tg = Number.parseFloat(userTotalTg);
          console.log(tg);
          if(tg > 0){
            Alert.alert(null,t('denyWithdraw'));
            return;
          }

          await AsyncStorage.removeItem('user');
          await AsyncStorage.removeItem('ACCESS_TOKEN');
          const bodyFormData = new FormData();
          bodyFormData.append('userId', userId);

          const res = await deleteUser(bodyFormData);
          console.log(res);
          if (res.success) {
            Alert.alert(null, t('withdrawCompleted'), [
              {
                text: t('confirm'),
                onPress: () =>  {
                  
        
                  props.navigation.navigate('Login', {});},

              },
            ]);  
            return;
          }else{
            Alert.alert(null,res.data.msg);
            return;
          }

        },
      },
    ],
  );


};

  return (
    <SafeAreaView>
      <StatusBar backgroundColor='#fff'/>
    
      <View style={styles.container}>

            <View style={{marginTop:15.5}}>
              <View style={styles.container6}>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                  <TouchableOpacity
                          onPress={() => {
                              props.navigation.navigate('Setting', {});
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
                    <Text style={styles.findIdTitle}>{t('memberWithdraw')}</Text>           
                </View>
              </View>
            </View>
            <View style={styles.lineStyle}></View>

						<View style={{marginTop:15}}>
							<View style={styles.container4}>
								<Text style={styles.textStyle}>{t('memberWithdrawAlert')}</Text>
							</View>
						</View>							

            <View style={{marginTop:15}}>
              <View style={styles.container2}>
								<Text style={styles.exchangeHistoryText1}>{t('OTPAuth')}</Text>
								<View style={{marginTop:10}}>
									<Text style={styles.textStyle3}>{t('authText')}</Text>
								</View>
								<View style={!okAuth?styles.container7:styles.container3}>
                		<TextInput
                    style={!okAuth? styles.inputOtpText:styles.confirmOtpText}
                    placeholder=" Verification Code"
                    allowFontScaling={false}
                    placeholderTextColor="rgb(214,213,212)"
                    editable={!okAuth?true:false}
                    value={confirmCode}
                    keyboardType='numbers-and-punctuation'
                    onChangeText={(text) => {setConfirmCode(text);}}
                    />
                    {
                            okAuth && (
                                <Image
                                    style={{position:'absolute',top:20, left:10}}
                                    source={require('../../assets/images/auth/iconWhiteCheckCircleRounded.png')}
                                    resizeMode="contain"
                                />
                            )
                    }
                    { !okAuth && (
                      <TouchableOpacity
                      onPress={() => {confirmOtpCode();}}
                      >
                        <View style={styles.findAddr}>
                                <Text style={styles.findAddrText}>{t('otpConfirm')}</Text>               
                    </View>
                    </TouchableOpacity>
                    )}                  
        				</View>
								

              </View>
            </View>

						<View style={{marginTop:25}}>					
						<View style={styles.container2}>
						<Text style={styles.exchangeHistoryText1}>{t('secretNumber')}</Text>
								<View style={{marginTop:10}}>
									<Text style={styles.textStyle3}>{t('inputPasswordForMemberWithdraw')}</Text>
								</View>
								<View style={!okPassword?styles.container7:styles.container3}>
                		<TextInput
                    style={!okPassword? styles.inputOtpText:styles.confirmOtpText}
                    placeholder={t('placeholderPassword')}
                    allowFontScaling={false}
                    placeholderTextColor="rgb(214,213,212)"
                    editable={!okPassword?true:false}
                    value={confirmPassword}
                    keyboardType='numbers-and-punctuation'
                    onChangeText={(text) => {setConfirmPassword(text);}}
                    />
                    {
											okPassword && (
													<Image
															style={{position:'absolute',top:20, left:10}}
															source={require('../../assets/images/auth/iconWhiteCheckCircleRounded.png')}
															resizeMode="contain"
													/>
											)
                    }
                    { !okPassword && (
                      <TouchableOpacity
                      onPress={() => {confirmPasswordCode();}}
                      >
                        <View style={styles.findAddr}>
                            
                            
                                <Text style={styles.findAddrText}>{t('confirm')}</Text>               
                            
                    </View>
                    </TouchableOpacity>
                    )}                  
        				</View>						
						</View>
						</View>

						

            
      </View>

      <View style={styles.bottomBtnArea}>
            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate('App', {});
                }}
                >
                <View style={styles.bottomLeftBtn}>
                    <Text style={styles.bottomCancelBtnText}>{t('cancel')}</Text>               
                </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {memberWithdraw();}}
                    disabled={okAuth||!okPassword?true:false}
                    >      
                <View style={!okAuth||!okPassword? styles.bottomRightBtn:styles.bottomRightGoldBtn}>
                    <Text style={styles.bottomConfirmBtnText}>{t('confirm')}</Text>                
                </View>
                </TouchableOpacity>
        </View>

      
    </SafeAreaView>
  );
}

var styles = StyleSheet.create({
    border1:{
      width:screenWidth-32,
        height:50,
        marginTop:24
    },
    noTradeText:{
      fontSize:12,
      textAlign:'center',
      lineHeight:18,
      letterSpacing:-0.12,
      color:'rgb(152,152,152)',
      fontFamily:'NanumBarunGothicLight' 
    },
	  container: {
      width: screenWidth,
      height:screenheight - containerHeight,
      flexDirection: 'column',
      backgroundColor:'#FFF'
    },
    container6: {
          // justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          width: screenWidth - 32,
          marginHorizontal: 16,
          height:50
		},
		container3:{
			flexDirection: 'row',
      // width: screenWidth - 32,
      // marginHorizontal: 16,
      justifyContent:'space-between'
		},
		container7:{
			justifyContent: 'center',
			alignItems: 'center',
			flexDirection: 'row'
			// width: screenWidth - 32,
			// marginHorizontal: 16,
		},
    container2: {
        // justifyContent: 'center',
        // alignItems: 'center',
        // flexDirection: 'row',
        width: screenWidth - 32,
        marginHorizontal: 16
        // height:50
		},
		container4:{
			 flexDirection: 'row',
			 width: screenWidth - 32,
			 marginHorizontal: 16
		},
    lineStyle:{
        width:screenWidth,
        borderWidth: 0.5,
        borderColor:'rgb(214,213,212)',
        marginTop:9
    },
    lineStyle1:{
      // marginTop:30,
      width:343,
      borderWidth: 0.5,
      borderColor:'rgba(60,60,67,0.29)'
    },
    bottomLineStyle:{
      width:screenWidth,
      borderWidth: 0.5,
      borderColor:'rgb(214,213,212)'
  },
    findIdTitle:{
        // width:138,
        height:26,
        fontSize:22,
        textAlign:'center',
        lineHeight:26,
        letterSpacing:-0.22,
        color:'rgba(0,0,0,0.87)',
        fontFamily:'NanumBarunGothicBold'
    },
    arrowLeftArea:{
      justifyContent:'center',
      alignItems:'flex-start',
      width:30,
      height:30
    },
    arrowLeft:{
      width:16,
      height:16
    },
    alarmListBox:{
      height:80,
      flexDirection:'row',
      width: screenWidth-32,
      marginHorizontal: 16,
      justifyContent:'space-between',
      alignItems:'center'
    },
    dayText:{
      fontSize:12,
      textAlign:'left',
      lineHeight:20,
      letterSpacing:-0.12,
      color:'rgb(108,108,108)',
      height:17,
      fontFamily:'NanumBarunGothicLight'
    },
    alarmText:{
      fontSize:16,
      // fontFamily:NanumBarunGothic,
      textAlign:'left',
      lineHeight:25,
      letterSpacing:-0.16,
      color:'rgb(43,43,43)',
      fontFamily:'NanumBarunGothic'
    },
    alarmBoldText:{
      fontSize:16,
      // fontFamily:NanumBarunGothicBold,
      textAlign:'left',
      lineHeight:19,
      letterSpacing:-0.16,
      color:'rgb(43,43,41)',
      fontFamily:'NanumBarunGothicBold'
    },
    modalType:{
      width:343,
      height:200,
      borderRadius:12,
      backgroundColor:'rgb(255,255,255)'
    },
    bottomCancelBtnText:{
      fontSize:18,
			lineHeight:20,
			textAlign:'center',
			textAlignVertical:'center',
			letterSpacing:-0.18,
			color:'rgb(255,255,255)',
			fontFamily:'NanumBarunGothic'
    },
    modalBottomBtnArea:{
      flexDirection:'row'
    },
    modalTitleText:{
      fontSize:16,
      textAlign:'left',
      lineHeight:30,
      letterSpacing:-0.16,
      color:'rgb(43,43,43)',
      fontFamily:'NanumBarunGothicBold',
      width:300,
      height:120
    },
    modalContailner:{
      flexDirection: 'row',
      width: screenWidth - 32,
      marginHorizontal: 16,
      marginTop:30
    },
    bottomBtnArea:{
			flexDirection:'row',
        width: screenWidth, 
        height: 69.6, 
        // backgroundColor: 'rgb(213,173,66)', 
        justifyContent: 'center', 
        alignItems: 'center'
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
    bottomConfirmBtnText:{
        fontSize:18,
        lineHeight:20,
        textAlign:'center',
        letterSpacing:-0.18,
        color:'rgb(255,255,255)',
        fontFamily:'NanumBarunGothic'
        // flexDirection:'row'
    },
    bottomRightGoldBtn:{
      width:screenWidth/2,
      alignItems:'flex-end',
      height:69.6,
      backgroundColor:'rgb(213,173,66)',
      alignItems:'center',
      justifyContent:'center'
		},
		exchangeHistoryText1:{
			fontSize:14,
			textAlign:'left',
			lineHeight:16,
			letterSpacing:-0.14,
			color:'rgb(43,43,43)',
			marginRight:11,
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
    textStyle:{
        // width:343,
        // height:40,
        fontSize:14,
        textAlign:'left',
        lineHeight:20,
        letterSpacing:-0.14,
        color:'rgba(0,0,0,0.6)',
        marginTop:6,
        fontFamily:'NanumBarunGothicLight' 
    },
    inputOtpText:{
        height: 46,
        width: (screenWidth - 39) / 3 * 2,
        borderRadius:4,
        borderWidth:1,
        borderColor:'rgb(214,213,212)',
        marginTop:9.8, 
        paddingLeft:10,
        color:'rgb(108,108,108)'
    },
    confirmOtpText:{
        marginTop:9.8, 
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
    findAddr:{
        width:(screenWidth-39) / 3,
        height:46,
        marginLeft:6,
        borderRadius:4,
        borderWidth:1,
        borderColor:'rgb(213,173,66)',
        marginTop:9.8,
        justifyContent:'center'
		},
    findAddrText:{
        fontSize:14,
        textAlign:'center',
        lineHeight:16,
        letterSpacing:-0.14,
        color:'rgb(213,173,66)',
        fontFamily:'NanumBarunGothicBold'
    }
		
    
    


    
    
});

export default alarm;
