import React from 'react';
import {StatusBar, StyleSheet, SafeAreaView, Text, Image, View, Dimensions, TextInput, Platform, TouchableOpacity, Alert} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {validationTg} from '../../utils/validate';
import {me, confirmOtp, insertWithdraw} from '../../service/auth';
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
	containerHeight = 85;
}

function Withdraw(props) {
  // console.log(props);

  const [userTg, setUserTg] = React.useState();
  const [sendTg, setSendTg] = React.useState();
  const [identifyNumber, setIdentifyNumber] = React.useState();
  const [tgNumberYn, setTgNumberYn ] = React.useState(true);
  const [tgNumberYn1, setTgNumberYn1 ] = React.useState(true);
  const [tgMaxYn, setTgMaxYn ] = React.useState(true);
  const [walletAddr, setWalletAddr ] = React.useState();
  const [confirmCode, setConfirmCode] = React.useState();
  const [okAuth, setOkAuth] = React.useState(false);
  const [userName, setUserName] = React.useState();
  const [userId, setUserId] = React.useState();

  React.useEffect(() => {
		(async function anyNameFunction() {
      const res = await me();
      console.log(res);
      setUserTg(res.data.user.totalTg);
      setUserName(res.data.user.name);
      setIdentifyNumber(res.data.user.identifyNumber);
      setUserId(res.data.user.userId);
      
		})();
  }, []);


  const validTg = (text) => {
    console.log(text);
    // if(!text){
    //   setTgNullYn(false);
    //   setTgNumberYn(true);
    //   // Alert.alert(null, "이체할 TG를 입력해주세요.");
    //   return;
    // }else 
    if(!validationTg(text)){
      // Alert.alert(null, "숫자만 입력해주세요.");
      setTgNumberYn(false);
      setTgNumberYn1(false);
      return;
    }

    const maxTg = Number.parseFloat(text);
    const maxUserTg = Number.parseFloat(userTg);
    // console.log(maxTg);
    // console.log(maxUserTg);

    if(maxTg > maxUserTg ){
      setTgMaxYn(false);
      setTgNumberYn1(false);
      return;
    }
    //보낼 TG입력
    // setSendTg(text);
    
    

    setTgMaxYn(true);
    setTgNumberYn(true);
    setTgNumberYn1(true);
    
  };

  const confirmOtpCode = async () => {
    if(!confirmCode){
      Alert.alert('인증 숫자를 입력해주세요.');
      return false;
    }

    const res = await confirmOtp(confirmCode);
    console.log(res);
    if(res.data){
        
        setOkAuth(true);
        setConfirmCode('OTP 인증 완료');

    }else{
      Alert.alert('OTP 번호가 일치하지 않습니다.');
      return;
    }
    
};

const insertWithdrawInfo = async () => {

  const tg1 = Number.parseFloat(userTg);
  const tg2 = Number.parseFloat(sendTg);

  if(tg2 > tg1 ){
    Alert.alert(null,"잔액이 부족합니다.");
    return;
  }

  Alert.alert(null, userName+'님\n'+walletAddr+'지갑주소로\n'+sendTg+'TG를 이체하시겠습니까?\n(이체하실 지갑주소를 다시한번\n확인해주세요.)', [
    {
      text: '취소',
      style: 'cancel',
    },
    {
      text: '확인',
      onPress: () => startWithdraw(),
    },
  ]);
};

const startWithdraw = async () => {
  const bodyFormData = new FormData();
  bodyFormData.append("sendTg", sendTg);
  bodyFormData.append("walletAddr", walletAddr);
  bodyFormData.append("userId", userId);

  const res = await insertWithdraw(bodyFormData);

  console.log(res);
  if(res.success){
    Alert.alert(null, '이체가 완료되었습니다.', [
      {
        text: '확인',
        onPress: () => props.navigation.navigate('App', {}),
      },
    ]);
    
  }else{
    Alert.alert(null, '이체가 실패되었습니다.');
    return;
  }

}
 

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>

            <View style={{marginTop:15.5}}>
                <View style={styles.container6}>
                    <Text style={styles.findIdTitle}>TG이체</Text>           
                </View>
            </View>
            <View style={styles.lineStyle}></View>

         <View style={styles.container4}>

           <View style={styles.border}>
              <View style={styles.flexDirectionRow}>
                  <Text style={styles.haveTgText}>보유TG</Text>
                  <Text style={styles.coinZeusText}>코인제우스</Text>
                  <View style={{alignItems:'flex-end',flex:1, marginRight:19.6}}>
                    <Image
                        style={styles.coinZeusLogo}
                        source={require('../../assets/images/home/coinZeusLogoHorizontalWhiteBg.png')}
                        resizeMode="contain"
                    />
                  </View>                
              </View>

              <View style={{alignItems:'center',height:39,marginTop:20}}>
                <Text style={styles.tgText}>{userTg}TG</Text>
              </View>

              <Text style={styles.insertNumber}>입금번호</Text>

              <View style={styles.flexDirectionRow1}>
                <View style={styles.memberNumberArea}>
                  <TextInput
                      style={styles.memberNumberText}
                      value={identifyNumber}
                      allowFontScaling={false}
                      editable={false}
                      placeholderTextColor="rgb(43,43,43)"
                      // onChangeText={(text) => this.setState({text})}
                  />
                </View>
                  {/* <View style={styles.randomArea}>
                      <TouchableOpacity
                              // onPress={() => {
                              //     props.navigation.navigate('Login', {type: 'Login'});
                              // }}
                              >
                      
                          <Text style={styles.randomText}>입금난수</Text>               
                      </TouchableOpacity>
                  </View>                             */}
              </View>

           </View>
         </View>

         <View style={{height:16, justifyContent:'center', marginTop:20}}>
              <View style={styles.container5}>
                <Text style={styles.exchangeHistoryText}>이체할TG</Text>{ !tgNumberYn && tgMaxYn && (<Text style={styles.tgInvalidText}>숫자만 입력해주세요.</Text>)}{ !tgMaxYn && tgNumberYn && (<Text style={styles.tgInvalidText}>잔액이 부족합니다.</Text>)}
              </View>
         </View>

         <View style={styles.container2}>
                <TextInput
                    style={tgNumberYn1?styles.withdrawTgBox:styles.withdrawTgBox1}
                    placeholder="                                               TG"
                    allowFontScaling={false}
                    keyboardType='numbers-and-punctuation'
                    placeholderTextColor="rgb(108,108,108)"
                    value={sendTg}
                    onChangeText={(text) => {validTg(text); setSendTg(text);}}
                    />
         </View>

         <View style={{height:16, justifyContent:'center', marginTop:20}}>        
              <View style={styles.container5}>
                <Text style={styles.exchangeHistoryText}>지갑주소</Text>
              </View>
         </View>

         <View style={styles.container2}>
                <TextInput
                    style={{height: 46,width: 227,borderRadius:4,marginTop:6,borderWidth:1,borderColor:'rgb(214,213,212)', paddingLeft:10,color:'rgb(108,108,108)'}}
                    placeholder=" 지갑주소를 입력하세요."
                    allowFontScaling={false}
                    value={walletAddr}
                    placeholderTextColor="rgb(214,213,212)"
                    onChangeText={(text) => {setWalletAddr(text);}}
                    />
         </View>

         <View style={{height:16, alignItems:'center', marginTop:20, width:screenWidth-32, marginHorizontal:16, flexDirection:'row'}}>
          
              {/* <View style={styles.container5}> */}
                <Text style={styles.exchangeHistoryText1}>OTP 인증</Text>

                <TouchableOpacity
                            style={styles.buttonBox1}
                            onPress={() => {
                              props.navigation.navigate('SecondAuth', {});
                          }}
                            >
                                <Image
                                    source={require('../../assets/images/screen3/btnOtp.png')}
                                    resizeMode="contain">
                                    </Image>
                        </TouchableOpacity>


              {/* </View> */}
         </View>
         <View style={{marginTop:10.2, width:screenWidth-32, marginHorizontal:16}}>
                <Text style={styles.textStyle3}>구글 OTP에 생성된 6자리 인증 숫자를 입력해주세요.</Text>
        </View>

        <View style={!okAuth?styles.container6:styles.container3}>
                <TextInput
                    style={!okAuth? styles.inputOtpText:styles.confirmOtpText}
                    placeholder=" Verification Code"
                    allowFontScaling={false}
                    placeholderTextColor="rgb(214,213,212)"
                    value={confirmCode}
                    editable={!okAuth?true:false}
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
                {/* <View style={styles.findAddr}>
                    <TouchableOpacity
                            onPress={() => {confirmOtpCode();}}
                            >
                    
                        <Text style={styles.findAddrText}>인증하기</Text>               
                    </TouchableOpacity>
                </View> */}
            </View>
         
         

      </View>

      {/* <View style={styles.bottomBtnArea}>
            <TouchableOpacity
                    onPress={() => {
                        props.navigation.navigate('App', {type: 'App'});
                    }}
                    >
            <View style={styles.bottomBtnArea}>
                <Text style={styles.bottomCancelBtnText}>돌아가기</Text>               
            </View>
            </TouchableOpacity>                
        </View>         */}
        <View style={styles.bottomBtnArea}>
            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate('App', {type: 'App'});
                }}
                >
                <View style={styles.bottomLeftBtn}>
                    <Text style={styles.bottomCancelBtnText}>취소</Text>               
                </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        insertWithdrawInfo();
                        // props.navigation.navigate('App', {type: 'App'});
                    }}
                    disabled={!walletAddr||!tgMaxYn||!tgNumberYn||!tgNumberYn1||!okAuth?true:false}
                    >      
                <View style={!walletAddr||!tgMaxYn||!tgNumberYn||!tgNumberYn1||!okAuth?styles.bottomRightBtn:styles.bottomRightGoldBtn}>
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
    tinyLogo: {
      width: 119.2,
      height: 40,
    },
    container2: {
    //   justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      width: screenWidth - 32,
      marginHorizontal: 16,
    },
    container3: {
      flexDirection: 'row',
      width: screenWidth - 32,
      marginHorizontal: 16,
    },
    container4: {
      // flexDirection: 'row',
      width: screenWidth - 32,
      marginHorizontal: 16,
    },
    container5: {
      flexDirection: 'row',
      width: screenWidth - 32,
      marginHorizontal: 16,
      // justifyContent:'center',
      // alignItems:'center'
    },
    container6: {
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          width: screenWidth - 32,
          marginHorizontal: 16,
    },
    logoArea: {
	  justifyContent: 'center',
      alignItems: 'center',
      width: screenWidth - 72,
      marginTop:5
    },
    flexDirectionRow:{
      flexDirection:'row',
      alignItems:'center',
      // justifyContent:'flex-end',
      marginTop:25,
      marginLeft:20,
      height:24
    },
    flexDirectionRow1:{
      flexDirection:'row',
      alignItems:'center',
      // justifyContent:'flex-end',
      marginTop:5.8,
      marginLeft:20,
      height:20,
      width:screenWidth-72
    },
    alarmArea:{
      justifyContent:'center',
      alignItems:'flex-end',
      // width: screenWidth - 32,
      marginTop:5
    },
    alarmText:{
      // width:17,
      height:19.5
      // alignItems:'flex-end'
    },
    personArea:{
      marginTop:5,
      justifyContent:'center',
      alignItems:'flex-start',
    },
    personText:{
      // width:20,
      height:20
    },
    homeWelcomeText:{
      fontSize:12,
      textAlign:'left',
      lineHeight:14,
      letterSpacing:-0.12,
      color:'rgb(43,43,43)',
      marginTop:11.5,
    },
    border:{
      height:210,
      // borderWidth:1,
      borderRadius:10,
      backgroundColor:'rgb(255,255,255)',
      shadowColor:'#000',
      shadowOffset:{
        width:0,
        height:3
      },
      shadowRadius:5,
      shadowOpacity:0.2,
      elevation:2,
      marginTop:20
    },
    haveTgText:{
      fontSize:16,
      textAlign:'left',
      lineHeight:19,
      letterSpacing:-0.16,
      color:'rgb(43,43,43)',
      fontFamily:'NanumBarunGothicBold'
    },
    coinZeusText:{
      fontSize:10,
      textAlign:'left',
      lineHeight:12,
      letterSpacing:-0.1,
      color:'rgb(152,152,152)',
      marginLeft:7,
      fontFamily:'NanumBarunGothic'
    },
    coinZeusLogo:{
      flex:1,
      width:75.4,
      height:24,
      justifyContent:'flex-end'
    },
    tgText:{
      fontSize:30,
      lineHeight:39,
      letterSpacing:-0.3,
      color:'rgb(43,43,43)',
      fontFamily:'Roboto-Bold'
    },
    insertNumber:{
      fontSize:12,
      textAlign:'left',
      lineHeight:18,
      letterSpacing:-0.12,
      color:'rgb(152,152,152)',
      marginLeft:20,
      marginTop:25.2,
      fontFamily:'NanumBarunGothic'
    },
    randomText:{
      fontSize:12,
      textAlign:'center',
      lineHeight:14,
      letterSpacing:-0.12,
      color:'rgb(213,173,66)',
      fontFamily:'NanumBarunGothic'
    },
    memberNumberText:{
      fontSize:12,   
      color:'rgb(43,43,43)',
      lineHeight:14,
      letterSpacing:-0.12,
      paddingBottom:Platform.OS === 'android' ? 7:0,
      fontFamily:'NanumBarunGothic'
    },
    memberNumberArea:{
      height: 32,
      flex:1,
      justifyContent:'center',
      borderRadius:4,
      borderWidth:1,
      borderColor:'rgba(214,213,212,0.36)',
      marginTop:5.8, 
      paddingLeft:10,
    },
    randomArea:{
      height:32,
      flex:1, 
      borderWidth:1,
      borderColor:'rgba(214,213,212,0.36)', 
      borderRadius:4, 
      color:'rgb(255,255,255)',
      marginLeft:6,
      marginTop:5.8, 
      justifyContent:'center'
    },
    exchangeHistoryText:{
      fontSize:14,
      textAlign:'left',
      lineHeight:16,
      letterSpacing:-0.14,
      color:'rgb(43,43,43)',
      alignItems:'center',
      // flex:1,
      fontFamily:'NanumBarunGothicBold'
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
    bottomBtnArea:{
        flexDirection:'row',
        width: screenWidth, 
        height: 69.6, 
        // backgroundColor: 'rgb(213,173,66)', 
        justifyContent: 'center', 
        alignItems: 'center'
      //   marginTop:screenheight
    },
    infoText1:{
        fontSize:14,
        textAlign:'left',
        lineHeight:16,
        letterSpacing:-0.14,
        color:'rgb(43,43,43)'
    },
    infoText2:{
        fontSize:14,
        // fontFamily:'NanumBarunGothicBold',
        textAlign:'left',
        lineHeight:16,
        letterSpacing:-0.14,
        color:'rgb(43,43,43)'
    },
    infoText3:{
        height:16,
        fontSize:14,
        textAlign:'center',
        lineHeight:16,
        letterSpacing:-0.14,
        color:'rgb(43,43,43)',
        marginTop:7
    },
    infoText4:{
        fontSize:12,
        textAlign:'left',
        lineHeight:18,
        letterSpacing:-0.12,
        color:'rgb(108,108,108)',
        marginTop:7,
        marginLeft:15,
        height:14
    },
    infoText5:{
        fontSize:12,
        textAlign:'left',
        lineHeight:18,
        letterSpacing:-0.12,
        color:'rgb(152,152,152)'
    },
    border2:{
        height:32,
        width:238,
        borderWidth:1,
        // backgroundColor:'rgba(214,213,212,0.7)',
        // borderColor:'rgb(214,213,212)'
        backgroundColor:'rgba(214,213,212,0.7)',
        borderRadius:4,
        borderColor:'rgb(214,213,212)',
        marginLeft:20,
        marginTop:6
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
    lineStyle:{
        width:screenWidth,
        borderWidth: 0.5,
        borderColor:'rgb(214,213,212)',
        marginTop:9
    },
    findIdTitle:{
        width:138,
        height:26,
        fontSize:22,
        textAlign:'center',
        lineHeight:26,
        letterSpacing:-0.22,
        color:'rgba(0,0,0,0.87)',
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
    },
    buttonBox1:{
        width:83.3,
        height:20
    },
    tgInvalidText:{
      fontFamily:'NanumBarunGothic',
      fontSize:10,
      textAlign:'left',
      lineHeight:12,
      letterSpacing:-0.1,
      marginTop:2,
      marginLeft:10,
      color:'rgb(222,76,70)'
    },
    withdrawTgBox:{
      height: 46,
      width: 227,
      borderRadius:4,
      marginTop:6,
      borderWidth:1,
      borderColor:'rgb(214,213,212)', 
      paddingLeft:10,
      color:'rgb(108,108,108)'
    },
    withdrawTgBox1:{
      height: 46,
      width: 227,
      borderRadius:4,
      marginTop:6,
      borderWidth:1,
      borderColor:'rgb(222,76,70)', 
      paddingLeft:10,
      color:'rgb(108,108,108)'
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
    }
    
    


    
    
});

export default Withdraw;
