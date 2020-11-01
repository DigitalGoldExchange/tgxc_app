import React from 'react';
import {StatusBar, StyleSheet, SafeAreaView, Text, Image, View, Dimensions, TextInput, Platform, Alert, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import DeviceInfo from 'react-native-device-info';
import {me, updateUser, findPassword, apiUserInfo, confirmOtp} from '../../service/auth';
import Postcode from 'react-native-daum-postcode';
import {validationPassword} from  '../../utils/validate'
import RNPickerSelect from 'react-native-picker-select'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
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


function MemberInfo(props) {


  const [isModalVisible, setModalVisible] = React.useState(false);
  const [isModalVisible1, setModalVisible1] = React.useState(false);
  const [zipCode, setZipCode] = React.useState();
  const [emailId, setEmailId] = React.useState();
  const [userName, setUserName] = React.useState();
  const [address, setAddress] = React.useState();
  const [addressDetail, setAddressDetail] = React.useState();
  const [phoneNumber, setPhoneNumer] = React.useState();
  const [userId, setUserId] = React.useState();
  const [password, setPassword] = React.useState();
  const [currentPassword, setCurrentPassword] = React.useState();
  const [changePassword, setChangePassword] = React.useState();
  const [rePassword, setRePassword] = React.useState();
  const [koreanYn, setKoreanYn] = React.useState(true);
  const [identifyNumber, setIdentifyNumber] = React.useState();
  const [otpKey, setOtpKey] = React.useState();
  const [okAuth, setOkAuth] = React.useState(false);
  const [confirmCode, setConfirmCode] = React.useState();
  const [korean, setKorean] = React.useState(true);
  
  
  React.useEffect(() => {
		(async function anyNameFunction() {
      const res = await me();
      console.log(res);
      setUserName(res.data.user.name);
      setAddress(res.data.user.address);
      setAddressDetail(res.data.user.addressDetail);
      setPhoneNumer(res.data.user.phoneNumber);
      setEmailId(res.data.user.emailId);
      setUserId(res.data.user.userId);
      setKoreanYn(res.data.user.koreanYn == 'Y'? true:false);
      setIdentifyNumber(res.data.user.identifyNumber);
      setOtpKey(res.data.user.otpKey);

    

		})();
	}, []);
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const updatePassword = async () => {
    if(!currentPassword){
      Alert.alert(null,'현재 비밀번호를 입력해주세요.');
      return;
    }else if(!changePassword){
      Alert.alert(null,'변경할 비밀번호를 입력해주세요.');
      return;
    }else if(!rePassword){
      Alert.alert(null,'비밀번호 확인을 입력해주세요.');
      return;
    }

    const findPw = await findPassword(userId, currentPassword);

    if(!findPw.data.result){
      Alert.alert(null, '현재 비밀번호가 일치하지 않습니다.');
      return;
    }

    if(!validationPassword(changePassword.trim())){
      Alert.alert(null, '잘못된 비밀번호 형식입니다.');
      return;
    }

    if(changePassword !== rePassword){
      Alert.alert(null, '비밀번호가 일치하지 않습니다.');
      return;
    }

    const bodyFormData = new FormData();
    bodyFormData.append('userId', userId);
    bodyFormData.append('password', changePassword);
  
    const res = await updateUser(bodyFormData);

    if(res.success){
      // Alert.alert(null, '비밀번호 변경이 완료되었습니다.');
      
      // return;
      Alert.alert(null, '비밀번호 변경이 완료되었습니다.', [
        {
          text: '확인',
          onPress: () => setModalVisible(false),
        },
      ]);
      
    }else{
      Alert.alert(null, '비밀번호 변경이 실패되었습니다.');
      return;
    }

  };

  const onSearchAddress = () => {
    setModalVisible1(!isModalVisible1);
  };

  const handleComplete = (postCodeData) => {
    console.log(postCodeData);
    let fullAddress = postCodeData.address;
    let extraAddress = "";

    if (postCodeData.addressType === "R") {
      if (postCodeData.bname !== "") {
        extraAddress += postCodeData.bname;
      }
      if (postCodeData.buildingName !== "") {
        extraAddress +=
          extraAddress !== ""
            ? `, ${postCodeData.buildingName}`
            : postCodeData.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    console.log(fullAddress);

    setAddress(fullAddress);
    setZipCode(postCodeData.zonecode);

    // setInput({
    //   ...input,
    //   address: fullAddress,
    //   zipCode: postCodeData.zonecode,
    // });
    setModalVisible1(false);
  };


  const saveUserInfo = async () => {


    const bodyFormData = new FormData();
    bodyFormData.append("address", address);
    bodyFormData.append("addressDetail", addressDetail);
    bodyFormData.append("userId", userId);
    bodyFormData.append("phoneNumber", phoneNumber);
    bodyFormData.append("zipCode", zipCode);

    if(!address||!addressDetail||!!zipCode){
      Alert.alert(null,"주소를 입력하세요.");
      return;
    }

  
    const res = await updateUser(bodyFormData);
  
    console.log(res);
    if(res.success){
      Alert.alert(null, '회원정보 변경이 완료되었습니다.', [
        {
          text: '확인',
          onPress: () => props.navigation.navigate('App', {}),
        },
      ]);
      
    }else{
      Alert.alert(null, '회원정보 변경이 실패되었습니다.');
      return;
    }
  
  }

  const confirmOtpCode = async () => {
    if(!confirmCode){
      Alert.alert(null,'인증 숫자를 입력해주세요.');
      return false;
    }

    const res = await confirmOtp(confirmCode);
    console.log(res);
    if(res.data){
        
        setOkAuth(true);
        setConfirmCode('OTP 인증 완료');

    }else{
      Alert.alert(null,'OTP 번호가 일치하지 않습니다.');
      return;
    }
    
};

  const validPhoneNumber = async () => {
    
    Alert.alert(null, '본인인증이 필요합니다.');
      return;

    // const bodyFormData = new FormData();
    // bodyFormData.append("address", address);
    // bodyFormData.append("addressDetail", addressDetail);
    // bodyFormData.append("userId", userId);
    // bodyFormData.append("phoneNumber", phoneNumber);

  
    // const res = await updateUser(bodyFormData);
  
    // console.log(res);
    // if(res.success){
    //   Alert.alert(null, '회원정보 변경이 완료되었습니다.', [
    //     {
    //       text: '확인',
    //       onPress: () => props.navigation.navigate('App', {}),
    //     },
    //   ]);
      
    // }else{
    //   Alert.alert(null, '회원정보 변경이 실패되었습니다.');
    //   return;
    // }
  
  }

  
  // console.log(props);
  return (


    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor='#fff'/>
        <Modal isVisible={isModalVisible1} onBackdropPress={() => setModalVisible1(false)}>
            <View style={{justifyContent:'center', alignItems:'center'}}>
              <View style={{ width: "100%", height: 500 }}>
                  <Postcode
                  jsOptions={{ animated: true }}
                  onSelected={(data) => {handleComplete(data);}}
                  />
              </View>
            </View>
          </Modal>


        <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
          <View style={{justifyContent:'center', alignItems:'center'}}>
          <View style={styles.modalType}>

              <View style={{marginTop:20}}>
                <Text style={styles.modalTitleText}>비밀번호 변경</Text>
              </View>

              <View style={{marginTop:25}}>
                  <View style={styles.modalContailner}>
                    <View style={{width:85, alignItems:'center',justifyContent:'center'}}>
                      <Text style={styles.modalMenuText}>현재 비밀번호</Text>
                    </View>                   
                      <TextInput
                        style={styles.modalTextInputType}
                        allowFontScaling={false}
                        secureTextEntry={true}
                        placeholder=" 비밀번호 입력"
                        placeholderTextColor="rgb(214,213,212)"
                        value={currentPassword}
                        onChangeText={(text) => setCurrentPassword(text)}
                        />
                  </View>
              </View>

              <View style={{marginTop:16}}>
                  <View style={styles.modalContailner}>
                    <View style={{width:85, alignItems:'center',justifyContent:'center'}}>
                      <Text style={styles.modalMenuText}>비밀번호 변경</Text>
                    </View>
                  
                  <TextInput
                    style={styles.modalTextInputType}
                    allowFontScaling={false}
                    secureTextEntry={true}
                    placeholder=" 영어+숫자+특수문자8~20자"
                    placeholderTextColor="rgb(214,213,212)"
                    value={changePassword}
                    onChangeText={(text) => setChangePassword(text)}
                    />
                    </View>
              </View>

              <View style={{marginTop:16}}>
                  <View style={styles.modalContailner}>
                    <View style={{width:85, alignItems:'center',justifyContent:'center'}}>
                      <Text style={styles.modalMenuText}>비밀번호 확인</Text>
                    </View>
                  
                  <TextInput
                    style={styles.modalTextInputType}
                    allowFontScaling={false}
                    secureTextEntry={true}
                    placeholder=" 비밀번호 재입력"
                    value={rePassword}
                    placeholderTextColor="rgb(214,213,212)"
                    onChangeText={(text) => setRePassword(text)}
                    />
                    </View>
              </View>

              <View style={styles.lineStyle}></View>

            
              <View style={styles.modalBottomBtnArea}>
                <TouchableOpacity
                        onPress={toggleModal}
                        >
                        <View style={{width:344/2,height:43.5, justifyContent:'center', alignItems:'center', borderRightWidth:0.5, borderRightColor:'rgba(60,60,67,0.29)'}}>                     
                            <Text style={styles.bottomCancelBtnText}>취소</Text>                            
                        </View>
                </TouchableOpacity>
                <TouchableOpacity
                        onPress={updatePassword}
                        >
                <View style={{width:344/2,height:43.5, justifyContent:'center', alignItems:'center'}}>                 
                    <Text style={styles.bottomCancelBtnText}>확인</Text>                 
                </View>
                </TouchableOpacity>
            </View>

          
          </View>
          </View>
        </Modal>



        <View style={styles.container}>

          <View style={styles.container3}>          
            <View style={styles.logoArea}>
                <Image
                    style={styles.tinyLogo}
                    source={require('../../assets/images/tgxc-logo-horizontal-b.png')}
                    resizeMode="contain"
                />
            </View>
          </View>
          
          <View style={styles.container4}>
            <View style={{justifyContent:'center', alignItems:'center'}}>
            <TouchableOpacity
                      onPress={() => {
                          props.navigation.navigate('App', {type: 'App'});
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
                <Text style={styles.titleText}>회원정보</Text>
            </View> 
          </View>
          <KeyboardAwareScrollView>            
            <View style={{marginTop:28}}>
              <View style={styles.container5}>
                  <View style={{width:54}}>
                    <Text style={styles.textType}>이름</Text>
                  </View>
                  <View>
                  <TextInput
                      style={styles.textInputType}
                      allowFontScaling={false}
                      placeholderTextColor="rgb(214,213,212)"
                      value={userName}
                      editable={false}
                      // onChangeText={(text) => this.setState({text})}
                      />
                  </View>
              </View>
            </View> 

            <View style={{marginTop:20}}>
            <View style={styles.container5}>
                  <View style={{width:54}}>
                    <Text style={styles.textType}>이메일</Text>
                  </View>
                  <View>
                  <TextInput
                      style={styles.textInputType}
                      allowFontScaling={false}
                      value={emailId}
                      editable={false}
                      placeholderTextColor="rgb(214,213,212)"
                      // onChangeText={(text) => this.setState({text})}
                      />
                  </View>
              </View>
            </View>

            <View style={{marginTop:20}}>
              <View style={styles.container5}>
                <View style={{justifyContent:'center', marginRight:6}}>
                  <Text style={styles.textType}>비밀번호 변경</Text>
                </View>
                <View style={{flex:4, flexDirection:'row'}}>
                  <View style={{flex:3, justifyContent:'center', alignItems:'center'}}></View>
                      <TouchableOpacity
                        onPress={toggleModal}
                        >
                        <View style={styles.changeButton}><Text style={styles.changeText}>변경</Text></View>     
                      </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={{marginTop:20}}>
            <View style={styles.container5}>
                  <View style={{width:54}}>
                    <Text style={styles.textType}>주소</Text>
                  </View>
                {
                  koreanYn && (
                      <View style={{flexDirection:'row'}}>
                      <TextInput
                        style={styles.textInputType1}
                        allowFontScaling={false}
                        editable={false}
                        value={address}
                        placeholderTextColor="rgb(214,213,212)"
                        // onChangeText={(text) => this.setState({text})}
                        />
                      <TouchableOpacity
                          onPress={onSearchAddress}
                          >
                          <View style={styles.changeButton}><Text style={styles.changeText}>검색</Text></View>     
                        </TouchableOpacity> 
                      </View>
                  )
                }    
                {
                  !koreanYn && (
                    <View style={{flexDirection:'row'}}>
                    <View style={styles.foreignerFindAddr}>
                    <RNPickerSelect
                        value={address}
                        style={{
                            // inputIOS:styles.selectType,
                            inputAndroid:styles.andSelectType,
                            iconContainer:{
                                // left:84,
                                right:17,
                                top:Platform.OS == "ios" ? 5:14
                                // top:5
                            }
                            }}
                        placeholder={{
                            label:"Country", 
                            value:null
                            
                            }}
                            Icon={() => {
                                return <Image
                                    source={require('../../assets/images/screen3/icExpandMore24Px.png')}
                                />
                            }}
                        onValueChange={(value) => {setAddress(value);}}
                        items={[
                            { label: 'Republic of Korea', value: 'Republic of Korea' },
                            { label: 'Netherlands', value: 'Netherlands' },
                            { label: 'USA', value: 'USA' },
                        ]}
                    />
                    
                </View> 
                  <TextInput
                    style={{height: 46,width: (screenWidth - 128) / 5 * 3,borderRadius:4,borderWidth:1,borderColor:'rgb(214,213,212)',paddingLeft:10,color:'rgb(108,108,108)'}}
                    placeholder=" Postal Code"
                    allowFontScaling={false}
                    // keyboardType='default'
                    value={zipCode}
                    autoCapitalize='none'
                    placeholderTextColor="rgb(214,213,212)"
                    onChangeText={(text) => {setZipCode(text);}}
                    />
                </View> 
                  )
                }   
                  

              </View>
            </View>

            <View style={{marginTop:20}}>
            <View style={styles.container5}>
              
                  <View style={{width:54}}>
                    <Text style={styles.textType}></Text>
                  </View>
                  { koreanYn && (
                      <View>
                      <TextInput
                          style={styles.textInputType2}
                          allowFontScaling={false}
                          value={addressDetail}
                          placeholderTextColor="rgb(214,213,212)"
                          onChangeText={(text) => setAddressDetail(text)}
                          />
                      </View>
                    )
                  }
                  { !koreanYn && (
                      <View>
                      <TextInput
                          style={styles.textInputType2}
                          allowFontScaling={false}
                          value={addressDetail}
                          placeholder=" Full Address"
                          placeholderTextColor="rgb(214,213,212)"
                          onChangeText={(text) => setAddressDetail(text)}
                          />
                      </View>
                    )
                  }
                  
              </View>
            </View>
            
            <View style={{marginTop:20}}>
            <View style={styles.container5}>
                  <View style={{width:54}}>
                    <Text style={styles.textType}>연락처</Text>
                  </View>

                  <View style={{flexDirection:'row'}}>
                    <TextInput
                      style={styles.textInputType1}
                      allowFontScaling={false}
                      value={phoneNumber}
                      editable={false}
                      placeholderTextColor="rgb(214,213,212)"
                      // onChangeText={(text) => this.setState({text})}
                      />
                    <TouchableOpacity
                        onPress={() => {
                          validPhoneNumber();
                        }}
                        >
                        <View style={styles.changeButton}><Text style={styles.changeText}>변경</Text></View>     
                      </TouchableOpacity> 

                    
                  </View>

              </View>
            </View>
              <View style={{height:16, alignItems:'center', marginTop:30, width:screenWidth-60, marginHorizontal:30, flexDirection:'row'}}>
                  {/* <View style={styles.container5}> */}
                    <Text style={styles.exchangeHistoryText1}>OTP 인증</Text>
                  {
                    !otpKey && (
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
                    )
                  }    
                    


                  {/* </View> */}
            </View>
              <View style={{marginTop:10.2, width:screenWidth-60, marginHorizontal:30}}>
                      <Text style={styles.textStyle3}>회원정보 변경을 위해 구글 OTP 인증 숫자를 입력해주세요.</Text>
              </View>

              <View style={!okAuth?styles.container6:styles.container7}>
                  <TextInput
                      style={!okAuth? styles.inputOtpText:styles.confirmOtpText}
                      placeholder=" Verification Code"
                      allowFontScaling={false}
                      placeholderTextColor="rgb(214,213,212)"
                      value={confirmCode}
                      editable={!okAuth?true:false}
                      keyboardType='number-pad'
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
        </KeyboardAwareScrollView>  


        </View>
        <TouchableOpacity
                onPress={() => {
                    saveUserInfo();
                    
                }}
                disabled={!okAuth?true:false}
                style={styles.textButtonBtn}>
                <View style={!okAuth?styles.bottomBtnArea:styles.bottomGoldBtnArea}>
                    <Text style={styles.bottomLoginBtnText}>저장</Text>             
                </View>
            </TouchableOpacity>   
          
    </SafeAreaView>
  );
}

var styles = StyleSheet.create({
  andSelectType:{
    paddingLeft:10,
  //   width:128,
    height:32,
    borderRadius:4,
    borderWidth:1,
    color:'rgb(43,43,43)',
    borderColor:'rgb(214,213,212)',
    backgroundColor:'rgb(255,255,255)'
  },
  foreignerFindAddr:{
    width:(screenWidth-128) / 5 *2,
    height:46,
    marginRight:7,
    borderRadius:4,
    borderWidth:1,
    borderColor:'rgb(214,213,212)',
    paddingLeft:12,
    justifyContent:'center'
  },
  container: {
    width: screenWidth,
    height:screenheight-containerHeight,
    flexDirection: 'column',
    backgroundColor:'rgb(255,255,255)'
  },
  container3: {
    flexDirection: 'row',
    width: screenWidth - 32,
    marginHorizontal: 16,
    justifyContent:'center'
  },
  container4: {
    flexDirection: 'row',
    width: screenWidth - 32,
    marginHorizontal: 16,
    height:41,
    marginTop:5
  },
  container5: {
    flexDirection: 'row',
    width: screenWidth - 60,
    marginHorizontal: 30,
    height:46,
    justifyContent:'space-between'
    // alignItems:'center',
    // justifyContent:'center'
  },
  modalContailner:{
    flexDirection: 'row',
    width: screenWidth - 32,
    marginHorizontal: 16
  },
  logoArea: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:5
  },
  tinyLogo: {
    width: 119.2,
    height: 40,
  },
  titleArea:{
      justifyContent:'center',
      alignItems:'center'
  },
  titleText:{
      fontSize:16,
      lineHeight:19,
      letterSpacing:-0.16,
      color:'rgb(43,43,43)',
      fontFamily:'NanumBarunGothicBold'
  },
  arrowLeft:{
    width:16,
    height:16
  },
  arrowLeftArea:{
    justifyContent:'center',
    alignItems:'flex-start',
    width:30,
    height:30
  },
  textType:{
    height:16,
    fontSize:14,
    textAlign:'left',
    paddingTop:10,
    lineHeight:20,
    letterSpacing:-0.14,
    color:'rgb(108,108,108)',
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    fontFamily:'NanumBarunGothic'
  },
  textInputType:{
    height:46,
    width:screenWidth-120,
    borderRadius:4,
    borderWidth:1,
    borderColor:'rgb(214,213,212)',
    backgroundColor:'rgb(240,240,240)',
    paddingLeft:10
  },
  textInputType1:{
    height:46,
    paddingLeft:10,
    width:(screenWidth-128)/4*3,
    borderRadius:4,
    borderWidth:1,
    borderColor:'rgb(214,213,212)',
    backgroundColor:'rgb(240,240,240)',
    marginRight:6
  },
  textInputType2:{
    height:46,
    paddingLeft:10,
    width:screenWidth-120,
    borderRadius:4,
    borderWidth:1,
    borderColor:'rgb(214,213,212)',
    backgroundColor:'rgb(255,255,255)'
  },
  modalTextInputType:{
    marginLeft:18,
    width:208,
    height:46,
    borderRadius:4,
    backgroundColor:'rgb(255,255,255)',
    borderColor:'rgb(214,213,212)',
    borderWidth:1,
    paddingLeft:10
  },  
  changeButton:{
    borderRadius:4,
    borderWidth:1,
    borderColor:'rgb(213,173,66)',
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    width:(screenWidth-120)/4,
  },
  changeText:{
    fontSize:14,
    textAlign:'center',
    lineHeight:16,
    letterSpacing:-0.14,
    color:'rgb(213,173,66)',
    fontFamily:'NanumBarunGothicBold'
  },
  modalType:{
    width:343,
    height:308,
    borderRadius:12,
    backgroundColor:'rgb(255,255,255)'
  },
  modalTitleText:{
    fontSize:16,
    textAlign:'center',
    lineHeight:19,
    letterSpacing:-0.16,
    color:'rgb(43,43,43)',
    fontFamily:'NanumBarunGothicBold'
  },
  modalMenuText:{
    fontSize:14,
    textAlign:'left',
    lineHeight:20,
    letterSpacing:-0.14,
    color:'rgb(108,108,108)',
    fontFamily:'NanumBarunGothic'
  },
  lineStyle:{
    marginTop:30,
    width:screenWidth,
    borderWidth: 0.5,
    borderColor:'rgba(60,60,67,0.29)'
  },
  modalBddottomBtnArea:{
    flexDirection:'row'
  },
  bottomCancelBtnText:{
    fontSize:17,
    textAlign:'center',
    lineHeight:22,
    letterSpacing:-0.41,
    color:'rgb(43,43,43)',
    fontFamily:'NanumBarunGothic'
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
  },
  bottomGoldBtnArea:{
    width: screenWidth, 
    height: 69.6, 
    backgroundColor: 'rgb(213,173,66)', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  bottomBtnArea:{
    width: screenWidth, 
    height: 69.6, 
    backgroundColor:'rgb(214,213,212)',
    justifyContent: 'center', 
    alignItems: 'center'
  },
  buttonBox1:{
    width:83.3,
    height:20
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
  container6: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: screenWidth - 60,
    marginHorizontal: 30,
  },  
  container7: {
    flexDirection: 'row',
    width: screenWidth - 60,
    marginHorizontal: 30,
  },
  inputOtpText:{
    height: 46,
    width: (screenWidth - 60) / 3 * 2,
    borderRadius:4,
    borderWidth:1,
    borderColor:'rgb(214,213,212)',
    marginTop:9.8, 
    paddingLeft:10,
    color:'rgb(108,108,108)'
  },
  confirmOtpText:{
      marginTop:9.8, 
      width: (screenWidth - 60) / 3 * 2,
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
    width:(screenWidth-60) / 3,
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

export default MemberInfo;
