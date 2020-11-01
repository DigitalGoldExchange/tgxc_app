import React,{useState, useRef} from 'react';
import {validationEmail, validationPassword} from '../../utils/validate';
import {StatusBar, StyleSheet, SafeAreaView, Text, Image, View, Dimensions, TextInput, Platform, TouchableOpacity, Alert, Button, KeyboardAvoidingView} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';
import {signup} from '../../service/auth';
import Postcode from 'react-native-daum-postcode';
import Modal from 'react-native-modal';
import {findUser} from '../../service/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-community/async-storage';
import '../language/i18n';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select'
import RBSheet from 'react-native-raw-bottom-sheet';
import Moment from 'moment';
import messaging from '@react-native-firebase/messaging';

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

function JoinStep3({navigation, route}) {


    React.useEffect(() => {
        // Get the device token
        messaging()
          .getToken()
          .then(token => {
            setToken(token);
          });
          
        // If using other push notification providers (ie Amazon SNS, etc)
        // you may need to get the APNs token instead for iOS:
        // if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); }
    
        // Listen to whether the token changes
        return messaging().onTokenRefresh(token => {
            setToken(token);
        });
      }, []);
  


  const {t, i18n} = useTranslation();

  const [emailId, setEmailId] = React.useState();
  const [userName, setUserName] = React.useState();
  const [password, setPassword] = React.useState();
  const [address, setAddress] = React.useState();
  const [birthDay, setBirthDay] = React.useState();
  const [addressDetail, setAddressDetail] = React.useState();
  const [zipCode, setZipCode] = React.useState();
  const [passwordCheck, setPasswordCheck] = React.useState();
  const [passwordValid, setPasswordValid] = React.useState(true);
  const [emailValid, setEmailValid] = React.useState(true);
  const [passwordCheckValid, setPasswordCheckValid] = React.useState(true);
  const [isModalVisible, setModalVisible] = React.useState(false);
  const {file, fullFile, type,phoneNumber, isKorea} = route.params;
  const [date, setDate] = useState();
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const refRBSheet = useRef();
  const [editDate, setEditDate] = useState(new Date());
  const [birthYear, setBirthYear] = useState();
  const [birthMonth, setBirthMonth] = useState();
  const [birthDate, setBirthDate] = useState();
  const [birthInputYn, setBirthInputYn] = useState(false);
  const [selectText, setSelectText] = React.useState([]);
  const [token, setToken] = React.useState([]);
  const [emailDuplication, setEmailDuplication] = useState(true);
 

  const insertUserInfo = async () => {
    if(!emailId){
      Alert.alert(null,t('이메일을 입력해주세요.'));
      return;
    }else if(!validationEmail(emailId.trim())){
      Alert.alert(null,t('invalidEmailFormat'));
      return;
    }else if(!password){
      Alert.alert(null,t('비밀번호를 입력해주세요.'));
      return;
    }else if(!passwordCheck){
      Alert.alert(null,t('비밀번호 확인을 입력해주세요.'));
      return;
    }

    if(!validationPassword(password.trim())){
      setPasswordValid(false);
      return;
    }

    if(password !== passwordCheck){
      setPasswordCheckValid(false);
      return;
    }

    setPasswordValid(true);
    setPasswordCheckValid(true);





    const bodyFormData = new FormData();

    if(i18n.language === 'en'){
        var profileImage = {
            uri:fullFile,
            type : type,
            name : file
        };

        bodyFormData.append('profileImage',profileImage);
        bodyFormData.append('koreanYn', 'N');
    }else{
        bodyFormData.append('koreanYn', 'Y');
    }
    
    // setUserName('홍길동');
    // setBirthDay('19831119');

    bodyFormData.append("emailId", emailId.trim());
    bodyFormData.append("password", password);
    bodyFormData.append("address", address);
    bodyFormData.append("addressDetail", addressDetail);
    bodyFormData.append("zipCode", zipCode);
    bodyFormData.append("phoneNumber", phoneNumber);
    
    bodyFormData.append('name', userName);
    bodyFormData.append('birthDay', birthDay);
    bodyFormData.append('deviceToken', token);
    bodyFormData.append('deviceType', Platform.OS);


    const res = await signup(bodyFormData);
    
    // console.log(res);
    if(res.data.code==='0001'){
        await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
        navigation.navigate('JoinStep5', {emailId:emailId, signKey:res.data.user.signKey});
    }else{
        Alert.alert(null,res.data.msg);
        return;
    }

  };

  const onSearchAddress = () => {
    setModalVisible(!isModalVisible);
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
    setModalVisible(false);
  };

//   const onSearchBirthDay = (date) => {
//     Alert.alert(date);
//   };

const onChange = async (event, selectedDate) => {
    console.log(selectedDate);
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setEditDate(currentDate);
    if (Platform.OS === 'android') {
        const body = {
            // birthday: Moment(currentDate).format('YYYY-MM-DD'),
            birthday: Moment(editDate).format('YYYYMMDD'),
            birthYear: Moment(editDate).format('yyyy'),
            birthMonth: Moment(editDate).format('MM'),
            birthDate: Moment(editDate).format('DD'),
        };

        setDate(editDate);
        setBirthInputYn(true);
        setBirthYear(body.birthYear);
        setBirthMonth(body.birthMonth);
        setBirthDate(body.birthDate);
        console.log(body.birthday);
        setBirthDay(body.birthday);

        refRBSheet.current.close();
    }
    // setDate(currentDate);
};

const onPressDate = async () => {
    
    setDate(editDate);
    const body = {
        birthday: Moment(editDate).format('YYYYMMDD'),
        birthYear: Moment(editDate).format('yyyy'),
        birthMonth: Moment(editDate).format('MM'),
        birthDate: Moment(editDate).format('DD'),
    };

    setDate(editDate);
    setBirthInputYn(true);

    setBirthYear(body.birthYear);
    setBirthMonth(body.birthMonth);
    setBirthDate(body.birthDate);
    console.log(body.birthday);
    setBirthDay(body.birthday);
    // console.log(body.birthYear);
    // console.log(body.birthMonth);
    // console.log(body.birthDate);

    refRBSheet.current.close();
};

const checkValidEmailId = async () => {
    if(emailId){

        const user =  await findUser(emailId);    
        console.log(user);  

        if(user.data.result){
            setEmailDuplication(false);
            setEmailValid(true);
            return;
        }
    
        if(!validationEmail(emailId) ){
            // Alert.alert(t('invalidEmailFormat'));
            setEmailValid(false);
            setEmailDuplication(true);
            return;
          }
        setEmailValid(true);
        setEmailDuplication(true);
    }
    
};

const checkValidPassword = () => {
    if(password){
        if(!validationPassword(password)){
            setPasswordValid(false);
            return;
          }
          setPasswordValid(true);
    }
    
};

const checkValidRePassword = () => {
    if(passwordCheck){
        if(password !== passwordCheck){
            setPasswordCheckValid(false);
            return;
          }
          setPasswordCheckValid(true);
    }
    
};


  
  return (
    <SafeAreaView>
      <StatusBar backgroundColor='#fff'/>

      <Modal isVisible={isModalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)} onBackdropPress={() => setModalVisible(false)}>
          <View style={{justifyContent:'center', alignItems:'center'}}>
            <View style={{ width: "100%", height: 500 }}>
                <Postcode
                jsOptions={{ animated: true }}
                onSelected={(data) => {handleComplete(data);}}
                />
            </View>
          </View>
        </Modal>

      
      <View style={styles.container}>
            <View style={{marginTop:15.5}}>
                <View style={styles.container2}>
                    <Text style={styles.findIdTitle}>{t('signUpTitle')}</Text>           
                </View>
            </View>
            <View style={styles.lineStyle}></View>
            
        <ScrollView>
        <KeyboardAwareScrollView contentInsetAdjustmentBehavior="automatic" >
            <View style={styles.container4}>
                <Text style={styles.infoText}>{t('registerInfo')}</Text>
                <Text style={styles.textStyle}>{t('inputBasicInfo')}</Text>
            </View>
            <View style={styles.container3}>
                <Text style={styles.emailText}>{t('email')}</Text>{!emailValid && emailDuplication && (<Text style={styles.emailInvalidText}>{t('invalidEmailFormat')}</Text>)}{!emailDuplication && emailValid &&(<Text style={styles.emailInvalidText}>{t('existEmail')}</Text>)}
            </View>
            <View style={styles.container2}>
                <TextInput
                    style={{height: 46,width: screenWidth - 32,borderRadius:4,borderWidth:1,borderColor:'rgb(214,213,212)',marginTop:6, paddingLeft:10,color:'rgb(108,108,108)'}}
                    placeholder={t('placeholderEmail')}
                    allowFontScaling={false}
                    keyboardType='email-address'
                    placeholderTextColor="rgb(214,213,212)"
                    value={emailId}
                    autoCapitalize='none'
                    onBlur={e => checkValidEmailId()}
                    // onFocus={e => checkValidEmailId()}
                    onChangeText={
                        (text) => {setEmailId(text);}
                    }
                    />
            </View>
            <View style={styles.container3}>
                <Text style={styles.passwordText}>{t('secretNumber')}</Text>{!passwordValid && (<Text style={styles.passwordInvalidText}>비밀번호를 확인해주세요.영어+숫자+특수문자8~20자</Text>)}
            </View>
            <View style={styles.container2}>
                <TextInput
                    style={passwordValid? styles.passwordType : styles.passwordInvalidType}
                    placeholder={t('placeholderPassword2')}
                    allowFontScaling={false}
                    value={password}
                    autoCapitalize='none'
                    secureTextEntry={true}
                    placeholderTextColor="rgb(214,213,212)"
                    onBlur={e => checkValidPassword()}
                    onChangeText={(text) => {setPassword(text);}}
                    />
            </View>
            <View style={styles.container3}>
                <Text style={styles.passwordText}>{t('ReSecretNumber')}</Text>{!passwordCheckValid && (<Text style={styles.passwordInvalidText}>비밀번호가 일치하지 않습니다.</Text>)}
            </View>
            <View style={styles.container2}>
                <TextInput
                    style={passwordCheckValid?styles.passwordCheckType:styles.passwordCheckInvalidType}
                    placeholder={t('placeholderRePassword')}
                    allowFontScaling={false}
                    autoCapitalize='none'
                    value={passwordCheck}
                    secureTextEntry={true}
                    placeholderTextColor="rgb(214,213,212)"
                    onBlur={e => checkValidRePassword()}
                    onChangeText={(text) => {setPasswordCheck(text);}}
                    />
            </View>
           
            <View style={styles.container3}>
               <Text style={styles.passwordText}>{t('name')}</Text>
            </View>
            <View style={styles.container2}>
                { isKorea && (
                    <TextInput
                        // style={styles.nameKoText}
                        style={styles.nameEnText}
                        value={userName}
                        // editable={false}
                        allowFontScaling={false}
                        placeholder="이름"
                        // placeholderTextColor="rgb(108,108,108)"
                        placeholderTextColor="rgb(214,213,212)"
                        onChangeText={(text) => {setUserName(text);}}
                    />
                    )
                }
                {
                    !isKorea &&(
                        <TextInput
                            style={styles.nameEnText}
                            value={userName}
                            allowFontScaling={false}
                            placeholder="Name"
                            placeholderTextColor="rgb(214,213,212)"
                            onChangeText={(text) => {setUserName(text);}}
                        />
                        )
                }           
              
            </View>

            <View style={styles.container3}>
                <Text style={styles.passwordText}>{t('dateOfBirth')}</Text>
            </View>
            <View style={styles.container2}>
                {
                    isKorea && (
                        <TouchableOpacity 
                        style={styles.birthYear1}
                        onPress={() => (Platform.OS === 'ios' ? refRBSheet.current.open() : setShow(true))}
                        >
                        { !birthInputYn && (
                            <Text style={styles.birthYear1Text}>생년</Text>
                            )
                        }
                        { birthInputYn && (
                            <Text style={styles.birthYear2Text}>{birthYear}</Text>
                            )
                        }        
                     </TouchableOpacity>
                        // <TextInput
                        //     style={styles.birthYear}
                        //     value=" 1983년"
                        //     allowFontScaling={false}
                        //     editable={false}
                        //     placeholderTextColor="rgb(108,108,108)"
                        //     // onChangeText={(text) => this.setState({text})}
                        //     />
                    )
                }
                {
                    !isKorea && (
                        <TouchableOpacity 
                            style={styles.birthYear1}
                            onPress={() => (Platform.OS === 'ios' ? refRBSheet.current.open() : setShow(true))}
                            >
                            { !birthInputYn && (
                                <Text style={styles.birthYear1Text}>Year</Text>
                                )
                            }
                            { birthInputYn && (
                                <Text style={styles.birthYear2Text}>{birthYear}</Text>
                                )
                            }        
                         </TouchableOpacity>
                    )
                }
                {
                    isKorea && (
                        // <TextInput
                        //     style={styles.birthMonth}
                        //     value=" 11월"
                        //     allowFontScaling={false}
                        //     editable={false}
                        //     placeholderTextColor="rgb(108,108,108)"
                        //     // onChangeText={(text) => this.setState({text})}
                        //     />
                        <TouchableOpacity
                            style={styles.birthMonth1}
                            onPress={() => (Platform.OS === 'ios' ? refRBSheet.current.open() : setShow(true))}
                            >
                            { !birthInputYn && (
                                <Text style={styles.birthYear1Text}>월</Text>  
                            )
                            }
                            { birthInputYn && (
                                <Text style={styles.birthYear2Text}>{birthMonth}</Text>
                                )
                            }   
                                  
                        </TouchableOpacity>
                    )
                }
                {
                    !isKorea && (
                        <TouchableOpacity
                            style={styles.birthMonth1}
                            onPress={() => (Platform.OS === 'ios' ? refRBSheet.current.open() : setShow(true))}
                            >
                            { !birthInputYn && (
                                <Text style={styles.birthYear1Text}>Month</Text>  
                            )
                            }
                            { birthInputYn && (
                                <Text style={styles.birthYear2Text}>{birthMonth}</Text>
                                )
                            }   
                                  
                        </TouchableOpacity>
                    )
                }
                {
                    isKorea && (
                        // <TextInput
                        //     style={styles.birthMonth}
                        //     value=" 19일"
                        //     allowFontScaling={false}
                        //     editable={false}
                        //     placeholderTextColor="rgb(108,108,108)"
                        //     // onChangeText={(text) => this.setState({text})}
                        //     />
                        <TouchableOpacity
                            style={styles.birthMonth1}
                            onPress={() => (Platform.OS === 'ios' ? refRBSheet.current.open() : setShow(true))}
                            >
                            { !birthInputYn && (
                                <Text style={styles.birthYear1Text}>일</Text>  
                                )
                            }
                            { birthInputYn && (
                                <Text style={styles.birthYear2Text}>{birthDate}</Text>
                                )
                            }       
                                    
                        </TouchableOpacity>
                    )
                }
                {
                    !isKorea && (
                        <TouchableOpacity
                            style={styles.birthMonth1}
                            onPress={() => (Platform.OS === 'ios' ? refRBSheet.current.open() : setShow(true))}
                            >
                            { !birthInputYn && (
                                <Text style={styles.birthYear1Text}>Date</Text>  
                                )
                            }
                            { birthInputYn && (
                                <Text style={styles.birthYear2Text}>{birthDate}</Text>
                                )
                            }       
                                    
                        </TouchableOpacity>
                    )
                }
                

            </View>

            <View style={styles.container3}>
                <Text style={styles.emailText}>{t('address')}</Text>
            </View>
            {
                isKorea && (
                    <View style={styles.container2}>

                        <TextInput
                            style={{height: 46,width: (screenWidth - 39) / 3 * 2,borderRadius:4,borderWidth:1,borderColor:'rgb(214,213,212)',marginTop:6, paddingLeft:10,color:'rgb(108,108,108)'}}
                            placeholder=" 주소 검색을 통해 입력해주세요."
                            allowFontScaling={false}
                            editable={false}
                            keyboardType='default'
                            value={address}
                            placeholderTextColor="rgb(214,213,212)"
                            // onChangeText={(text) => this.setState({text})}
                            />
                        <TouchableWithoutFeedback
                                onPress={onSearchAddress}
                                >
                            <View style={styles.findAddr}>
                                <Text style={styles.findAddrText}>주소검색</Text>               
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    
                    
                )
            }
            {
                isKorea && (
                    <View style={styles.container2}>
                        <TextInput
                            style={{height: 46,width: screenWidth - 32,borderWidth:1, borderRadius:4, borderColor:'rgb(214,213,212)',marginTop:6, paddingLeft:10,color:'rgb(108,108,108)'}}
                            placeholder=" 상세주소를 입력해주세요."
                            allowFontScaling={false}
                            placeholderTextColor="rgb(214,213,212)"
                            onChangeText={(text) => {setAddressDetail(text);}}
                            />
                    </View>
                )
            }
            {
                !isKorea && (
                    <View style={styles.container2}>
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
                            {/* <TouchableOpacity
                                    onPress={onSearchAddress}
                                    >
                            
                                <Text style={styles.findAddrText}>Country</Text>               
                            </TouchableOpacity> */}
                        </View>    
                        <TextInput
                            style={{height: 46,width: (screenWidth - 39) / 3 * 2,borderRadius:4,borderWidth:1,borderColor:'rgb(214,213,212)',marginTop:6, paddingLeft:10,color:'rgb(108,108,108)'}}
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
            {
                !isKorea && (
                    <View style={styles.container2}>
                        <TextInput
                            style={{height: 46,width: screenWidth - 32,borderWidth:1, borderRadius:4, borderColor:'rgb(214,213,212)',marginTop:6, paddingLeft:10,color:'rgb(108,108,108)'}}
                            placeholder=" Full Address"
                            allowFontScaling={false}
                            autoCapitalize='none'
                            value={addressDetail}
                            placeholderTextColor="rgb(214,213,212)"
                            onChangeText={(text) => {setAddressDetail(text);}}
                            />
                    </View>
                )
            }
        
                <View style={{height:30, width:screenWidth, backgroundColor:'#FFF'}}>

                </View>
            </KeyboardAwareScrollView>    
            </ScrollView>
            {Platform.OS === 'android' && show && (
				<DateTimePicker
					testID="dateTimePicker"
					value={editDate}
					mode={mode}
					is24Hour={true}
					display="default"
					onChange={onChange}
				/>
			)}

            <RBSheet
				ref={refRBSheet}
				closeOnDragDown={false}
				closeOnPressMask={false}
				animationType={Platform.OS === 'ios' ? 'fade' : 'none'}
				customStyles={{
					wrapper: {
						backgroundColor: Platform.OS === 'ios' ? '#00000066' : 'transparent',
					},
					container: {
						height: 407,
						backgroundColor: 'transparent',
					},
					draggableIcon: {
						backgroundColor: 'rgb(197,197,197)',
					},
				}}>
				<View
					style={{
						width: screenWidth - 36,
						marginHorizontal: 18,
						borderRadius: 20,
						backgroundColor: '#ffffff',
					}}>
					<DateTimePicker
						testID="dateTimePicker"
						value={editDate}
						mode={mode}
						is24Hour={true}
						display="default"
						onChange={onChange}
					/>
				</View>
				{Platform.OS === 'ios' && (
					<TouchableOpacity
						style={{
							flexDirection: 'column',
							marginTop: 7,
							width: screenWidth - 36,
							marginHorizontal: 18,
							borderRadius: 20,
							backgroundColor: '#ffffff',
							height: 66,
							justifyContent: 'center',
							alignItems: 'center',
						}}
						onPress={() => onPressDate()}>
						<Text
							style={{
								fontSize: 16,
								lineHeight: 23,
							}}>
							Confirm
						</Text>
					</TouchableOpacity>
				)}
				{Platform.OS === 'ios' && (
					<TouchableOpacity
						style={{
							flexDirection: 'column',
							marginTop: 7,
							width: screenWidth - 36,
							marginHorizontal: 18,
							borderRadius: 20,
							backgroundColor: '#ffffff',
							height: 66,
							justifyContent: 'center',
							alignItems: 'center',
						}}
						onPress={() => refRBSheet.current.close()}>
						<Text
							style={{
								fontSize: 16,
								lineHeight: 23,
							}}>
							Cancel
						</Text>
					</TouchableOpacity>
				)}
			</RBSheet>
             
            </View> 
            
            <View style={styles.bottomBtnArea}>
                <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Login', {type: 'Login'});
                        }}
                        >
                <View style={styles.bottomLeftBtn}>
                    <Text style={styles.bottomCancelBtnText}>{t('cancel')}</Text>               
                </View>
                </TouchableOpacity>
                <TouchableOpacity
                         onPress={() => {
                           insertUserInfo();
                            // navigation.navigate('JoinStep5', {});
                        }}
                        disabled={!emailId||!password||!passwordCheck||!address||!addressDetail?true:false}
                        >
                <View style={!emailId||!password||!passwordCheck||!address||!addressDetail?styles.bottomRightBtn:styles.bottomRightGoldBtn}>
                    <Text style={styles.bottomConfirmBtnText}>{t('confirm')}</Text>                    
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
        marginTop:6,
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
    bottomRightGoldBtn:{
        width:screenWidth/2,
        alignItems:'flex-end',
        height:69.6,
        backgroundColor:'rgb(213,173,66)',
        alignItems:'center',
        justifyContent:'center'
    },
    emailText:{
        width:70,
        height:18,
        fontSize:14,
        textAlign:'left',
        lineHeight:20,
        letterSpacing:-0.14,
        color:'rgb(108,108,108)',
        marginTop:24,
        fontFamily:'NanumBarunGothic'
    },
    passwordText:{
        width:130,
        height:18,
        fontSize:14,
        textAlign:'left',
        lineHeight:20,
        letterSpacing:-0.14,
        color:'rgb(108,108,108)',
        marginTop:19.5,
        fontFamily:'NanumBarunGothic'
    },
    passwordInvalidText:{
      fontFamily:'NanumBarunGothic',
      fontSize:10,
      textAlign:'left',
      lineHeight:12,
      letterSpacing:-0.1,
      marginTop:24,
      marginLeft:10,
      color:'rgb(222,76,70)'
    },
    emailInvalidText:{
      fontFamily:'NanumBarunGothic',
      fontSize:10,
      textAlign:'left',
      lineHeight:12,
      letterSpacing:-0.1,
      marginTop:27,
      marginLeft:10,
      color:'rgb(222,76,70)'
    },
    passwordType:{
      height: 46,
      width: screenWidth - 32,
      borderRadius:4,
      borderWidth:1,
      borderColor:'rgb(214,213,212)',
      marginTop:6, 
      paddingLeft:10,
      color:'rgb(108,108,108)'
    },
    passwordInvalidType:{
      height: 46,
      width: screenWidth - 32,
      borderRadius:4,
      borderWidth:1,
      borderColor:'rgb(222,76,70)',
      marginTop:6, 
      paddingLeft:10,
      color:'rgb(108,108,108)'
    },
    passwordCheckType:{
      height: 46,
      width: screenWidth - 32,
      borderRadius:4,
      borderWidth:1,
      borderColor:'rgb(214,213,212)',
      marginTop:6, 
      paddingLeft:10,
      color:'rgb(108,108,108)'
    },
    passwordCheckInvalidType:{
      height: 46,
      width: screenWidth - 32,
      borderRadius:4,
      borderWidth:1,
      borderColor:'rgb(222,76,70)',
      marginTop:6, 
      paddingLeft:10,
      color:'rgb(108,108,108)'
    },
    infoText:{
        width:150,
        height:19,
        fontSize:16,
        textAlign:'left',
        lineHeight:19,
        letterSpacing:-0.16,
        color:'rgb(43,43,43)',
        marginTop:25.5,
        fontFamily:'NanumBarunGothicBold' 
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
    birthYear1:{
        height: 46,
        width: (screenWidth-44) / 4 * 2,
        borderWidth:1,
        borderRadius:4, 
        borderColor:'rgb(214,213,212)',
        marginTop:6, 
        paddingLeft:10,
        backgroundColor:'rgb(255,255,255)',
        justifyContent:'center'
    },
    birthYear1Text:{
        width:130,
        height:18,
        fontSize:14,
        textAlign:'left',
        lineHeight:20,
        letterSpacing:-0.14,
        color:'rgb(214,213,212)',
        fontFamily:'NanumBarunGothic'
    },
    birthYear2Text:{
        width:130,
        height:18,
        fontSize:14,
        textAlign:'left',
        lineHeight:20,
        letterSpacing:-0.14,
        color:'rgb(108,108,108)',
        fontFamily:'NanumBarunGothic'
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
    birthMonth1:{
        height: 46,
        width: (screenWidth-44) / 4,
        borderWidth:1,
        borderRadius:4, 
        borderColor:'rgb(214,213,212)',
        marginTop:6,
        marginLeft:6, 
        paddingLeft:10,
        backgroundColor:'rgb(255,255,255)',
        justifyContent:'center'

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
    foreignerFindAddr:{
        width:(screenWidth-39) / 3,
        height:46,
        marginRight:6,
        borderRadius:4,
        borderWidth:1,
        borderColor:'rgb(214,213,212)',
        marginTop:6,
        paddingLeft:12,
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
    nameKoText:{
        height: 46,
        width: screenWidth - 32,
        borderWidth:1,
        borderRadius:4, 
        borderColor:'rgb(214,213,212)',
        marginTop:6, 
        paddingLeft:10,
        backgroundColor:'rgb(214,213,212)'
    },
    nameEnText:{
        height: 46,
        width: screenWidth - 32,
        borderWidth:1,
        borderRadius:4, 
        borderColor:'rgb(214,213,212)',
        marginTop:6, 
        paddingLeft:10,
        backgroundColor:'rgb(255,255,255)'
    },
    selectType:{
        height: 46,
        width: (screenWidth - 39) / 3 * 2,
        borderRadius:4,
        borderWidth:1,
        borderColor:'rgb(214,213,212)',
        marginTop:6, 
        paddingLeft:10,
        color:'rgb(108,108,108)'
    },
    andSelectType:{
        paddingLeft:10,
        //   width:128,
          height:32,
          borderRadius:4,
          borderWidth:1,
          color:'rgb(43,43,43)',
          borderColor:'rgb(214,213,212)',
          backgroundColor:'rgb(255,255,255)'
    }
    
});

export default JoinStep3;
