import React from 'react';
import {StatusBar, StyleSheet, SafeAreaView, Text, Image, View, Dimensions, TextInput, Platform, TouchableOpacity, ImageBackground, Alert} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { ScrollView } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select'
import {me, confirmOtp, insertExchange, getTgRate} from '../../service/auth';
import ImagePicker from 'react-native-image-picker';
import {validationTg, validationFloat, validationNumber} from '../../utils/validate';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTranslation} from 'react-i18next';
import {useIsFocused} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import uuid from 'react-native-uuid';
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



function Exchange(props) {
  const {t, i18n} = useTranslation();
  // console.log(props);
  const [selectText, setSelectText] = React.useState([]);
  const [selectType, setSelectType] = React.useState([]);
  const [reqAmount, setReqAmount] = React.useState();
  const [userName, setUserName] = React.useState();
  const [userId, setUserId] = React.useState();
  const [userTg, setUserTg] = React.useState();
  const [identifyNumber, setIdentifyNumber] = React.useState();
  const [tgNumberYn, setTgNumberYn ] = React.useState(true);
  const [tgNumberYn1, setTgNumberYn1 ] = React.useState(true);
  const [tgZeroYn, setTgZeroYn ] = React.useState(true);
  const [tgMaxYn, setTgMaxYn ] = React.useState(true);
  const [okAuth, setOkAuth] = React.useState(false);
  const [exchangeMethod, setExchangeMethod] = React.useState();
  const [imagePreview, setImagePreview] = React.useState();
  const [file, setFile] = React.useState('');
  const [type, setType] = React.useState('');
  const [okUpload, setOkUpload] = React.useState(false);
  const [okSelect, setOkSelect] = React.useState(false);
  const [lanauage, setLanguage] = React.useState(i18n.language=='ko'?true:false);
  const [imagePreview1, setImagePreview1] = React.useState();
  const [file1, setFile1] = React.useState('');
  const [type1, setType1] = React.useState('');
  const [okUpload1, setOkUpload1] = React.useState(false);
  const [otpKey, setOtpKey] = React.useState();
  const [tgRate, setTgRate] = React.useState();
  const [confirmCode, setConfirmCode] = React.useState();
  const [realAmount, setRealAmount] = React.useState('0');
  const [storeList, setStoreList] = React.useState([]);
  const [typeList, setTypeList] = React.useState([]);
  const [okSelectType, setOkSelectType] = React.useState(false);
  const isFocused = useIsFocused();  
  const [spinner, setSpinner] = React.useState(false);
  const [storeName, setStoreName] = React.useState();
  const [tgQty, setTgQty] = React.useState(1);
  const [tgValue, setTgValue] = React.useState();

  React.useEffect(() => {
    setExchangeMethod('방문수령');
    (async function anyNameFunction() {
        const res = await me();
        // console.log(res);
        setUserTg(res.data.user.totalTg);
        setUserName(res.data.user.name);
        setIdentifyNumber(res.data.user.identifyNumber);
        setUserId(res.data.user.userId);
        setOtpKey(res.data.user.otpKey);
    })();
    (async function anyNameFunction1() {
        const tg = await getTgRate();

        setStoreList(
			        tg.data.activeStoreList.map((item, index) => {
                // console.log(tg.data.activeStoreList);
                // console.log(item.exchangeStoreId);
                return {
                    label: tg.data.activeStoreList[index].storeName,
                    value: item.exchangeStoreId,
                };
            }),
          );

    })();

    (async function anyNameFunction2() {
      const tg = await getTgRate();
      // setTgRate(Number.parseFloat(tg.data.exchangeRate.exchangeRate));
      // console.log(tg.data.exchangeRate);
      setTypeList(
        tg.data.exchangeRate.map((item, index) =>{
          // console.log(item.exchangeRate);
          return {
            label: tg.data.exchangeRate[index].exchangeGram+" g",
            value: item.exchangeRate,
          };
        }),
      );

  })();

    
  }, []);

  React.useEffect(() => {
    setSpinner(true);
    setTimeout(async () => {
      const res = await me();
      setOtpKey(res.data.user.otpKey);

      setSpinner(false);
  }, 1000);
    // (async function anyNameFunction2() {
    //   const res = await me();
    //   // console.log(res);

    //   setOtpKey(res.data.user.otpKey);
    //   console.log(otpKey);
    // })();
    return () => setOtpKey('');
  }, [isFocused]);

  var radio_props = [
    {label: t('storePickUp'), value: '방문수령' },
    // {label: '우편수령', value: '우편수령' }
  ];

    const goSelectText = (text) => {
        // console.log(text);
        setSelectText(text);
        setOkSelect(true);
    };

    const validTg = (text) => {
        // console.log(text);
        // if(!text){
        //   setTgNullYn(false);
        //   setTgNumberYn(true);
        //   // Alert.alert(null, "이체할 TG를 입력해주세요.");
        //   return;
        // }else 
        if(!validationTg(text)){
          // Alert.alert(null, "숫자만 입력해주세요.");
          setTgNumberYn(false);
          setTgNumberYn1(true);
          setTgMaxYn(true);
          setTgZeroYn(true);
          return;
        }

        if(!validationNumber(text)){
          setTgMaxYn(true);
          setTgNumberYn1(false);
          setTgNumberYn(true);
          setTgZeroYn(true);
          return;
        }

        const maxQty = Number.parseInt(text);
        const maxTg = Number.parseFloat(tgValue);
        const maxUserTg = Number.parseFloat(userTg);
        // setRealAmount(maxTg * tgRate);
        // console.log("maxTg:"+maxTg);
        // console.log("realAmount:"+realAmount);
        // console.log(maxUserTg);
        const validTg = maxTg * maxQty;
        // console.log(validTg);
        if(validTg > maxUserTg ){
          setTgMaxYn(false);
          setTgNumberYn1(true);
          setTgNumberYn(true);
          setTgZeroYn(true);
          return;
        }

        if(validTg == 0 ){
          setTgMaxYn(true);
          setTgNumberYn1(true);
          setTgNumberYn(true);
          setTgZeroYn(false);
          return;
        }



        //보낼 TG입력
        // setSendTg(text);
        
        
    
        setTgMaxYn(true);
        setTgNumberYn(true);
        setTgNumberYn1(true);
        
      };

      const validTg1 = (text) => {
        
        const maxQty = Number.parseInt(tgQty);
        const maxTg = Number.parseFloat(text);
        const maxUserTg = Number.parseFloat(userTg);
      
        const validTg = maxTg * maxQty;
        // console.log(validTg);
        if(validTg > maxUserTg ){
          setTgMaxYn(false);
          setTgNumberYn1(true);
          setTgNumberYn(true);
          setTgZeroYn(true);
          return;
        }

        if(validTg == 0 ){
          setTgMaxYn(true);
          setTgNumberYn1(true);
          setTgNumberYn(true);
          setTgZeroYn(false);
          return;
        }



        //보낼 TG입력
        // setSendTg(text);
        
        
    
        setTgMaxYn(true);
        setTgNumberYn(true);
        setTgNumberYn1(true);
        
      };

      


      function selectPhotoTapped(){
        const options = {
                quality: 1.0,
                maxWidth: 500,
                maxHeight: 500,
                storageOptions: {
                    skipBackup: true,
                },
                takePhotoButtonTitle: 'Open Camera',
                chooseFromLibraryButtonTitle: 'Photo Library',
        };
        
        ImagePicker.showImagePicker(options, (response) => {
                // console.log('Response = ', response);
    
            if (response.didCancel) {
                // console.log('User cancelled photo picker');
            } else if (response.error) {
              Alert.alert('Image Error','File not found');
                // console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                // console.log(
                // 	'User tapped custom button: ',
                // 	response.customButton,
                // );
            } else {
                // console.log(response);
                // const source = {uri: response.uri};
                // // console.log(source);
                        
                // const arrayFileUri = response.uri.split('/');
                let arrayFileUri = response.uri.split('/');
                let key = arrayFileUri[arrayFileUri.length - 1];

                if (Platform.OS === 'android') {
                  arrayFileUri = response.path !== undefined ? response.path.split('/') : response.uri.split('/');
                  key = arrayFileUri[arrayFileUri.length - 1];
                  const extArray = key.split('.');
                  key = uuid.v1() + '.' + extArray[extArray.length - 1];
                  // if (
                  // 	key.indexOf('.jpg') == -1 &&
                  // 	key.indexOf('.mp4') == -1 &&
                  // 	key.indexOf('.png') == -1 &&
                  // 	key.indexOf('.mov') == -1 &&
                  // 	key.indexOf('.gif') == -1
                  // ) {
                  // 	if (response.fileName === undefined) {
                  // 		key = arrayFileUri[arrayFileUri.length - 1] + '.mp4';
                  // 	} else {
                  // 		key = arrayFileUri[arrayFileUri.length - 1] + '_' + response.fileName;
                  // 	}
                  // }
                }
                // console.log('key3', key);
                
                const body = {
                    mimetype: response.type,
                    key: key,
                };
                // console.log(body);
                // console.log(response.uri);
                
                setFile(body.key);
                setType(body.mimetype);
                setImagePreview(response.uri);
                setOkUpload(true);
    
        
    
               
            }
        });
    
      }

      function selectPhotoTapped1(){
        const options = {
                quality: 1.0,
                maxWidth: 500,
                maxHeight: 500,
                storageOptions: {
                    skipBackup: true,
                },
                takePhotoButtonTitle: 'Open Camera',
                chooseFromLibraryButtonTitle: 'Photo Library',
        };
        
        ImagePicker.showImagePicker(options, (response) => {
                // console.log('Response = ', response);
    
            if (response.didCancel) {
                // console.log('User cancelled photo picker');
            } else if (response.error) {
              Alert.alert('Image Error','File not found');
                // console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                // console.log(
                // 	'User tapped custom button: ',
                // 	response.customButton,
                // );
            } else {
                // console.log(response);
                let arrayFileUri = response.uri.split('/');
                let key = arrayFileUri[arrayFileUri.length - 1];

                if (Platform.OS === 'android') {
                  arrayFileUri = response.path !== undefined ? response.path.split('/') : response.uri.split('/');
                  key = arrayFileUri[arrayFileUri.length - 1];
                  const extArray = key.split('.');
                  key = uuid.v1() + '.' + extArray[extArray.length - 1];
                  // if (
                  // 	key.indexOf('.jpg') == -1 &&
                  // 	key.indexOf('.mp4') == -1 &&
                  // 	key.indexOf('.png') == -1 &&
                  // 	key.indexOf('.mov') == -1 &&
                  // 	key.indexOf('.gif') == -1
                  // ) {
                  // 	if (response.fileName === undefined) {
                  // 		key = arrayFileUri[arrayFileUri.length - 1] + '.mp4';
                  // 	} else {
                  // 		key = arrayFileUri[arrayFileUri.length - 1] + '_' + response.fileName;
                  // 	}
                  // }
                }
                // console.log('key3', key);
                
                const body = {
                    mimetype: response.type,
                    key: key,
                };
                // console.log(body);
                // console.log(response.uri);
                
                setFile1(body.key);
                setType1(body.mimetype);
                setImagePreview1(response.uri);
                setOkUpload1(true);
    
        
    
               
            }
        });
    
      }

      const confirmOtpCode = async () => {
        if(!confirmCode){
          Alert.alert(null,'인증 숫자를 입력해주세요.');
          return false;
        }
    
        const res = await confirmOtp(confirmCode);
        // console.log(res);
        if(res.data){
            
            setOkAuth(true);
            setConfirmCode('OTP 인증 완료');
    
        }else{
          Alert.alert(null,'OTP 번호가 일치하지 않습니다.');
          return;
        }
        
    };

    const insertExchangeInfo = async () => {

        const tg1 = Number.parseFloat(userTg);
        const tg2 = Number.parseFloat(realAmount);
      
      
        if(tg2 > tg1 ){
          Alert.alert(null,"잔액이 부족합니다.");
          return;
        }
      
        Alert.alert(null, userName+'님\n'+storeName+' 지점에서\n'+realAmount+'TG 교환 신청을 진행하시겠습니까?\n(신청접수 이후 신분증 사진,\n신분증을 들고 촬영하신 사진을 통해\n교환가능 여부를 확인합니다.)', [
          {
            text: '취소',
            onPress:() => Alert.alert(null, '신청이 취소되었습니다.'),
          },
          {
            text: '확인',
            onPress: () => startExchange(),
          },
        ]);
      };

      const startExchange = async () => {

        var profileImage = {
            uri:imagePreview,
            type : type,
            name : file
        };
        var profileImage1 = {
            uri:imagePreview1,
            type : type1,
            name : file1
        };

        // console.log(exchangeMethod);
        // console.log(selectText);
        // console.log(storeName);
        const bodyFormData = new FormData();
        bodyFormData.append("reqAmount", realAmount);
        bodyFormData.append("reqQty", tgQty);
        bodyFormData.append("exchangeMethod", exchangeMethod);
        bodyFormData.append("userId", userId);
        bodyFormData.append("exchangeStoreId", selectText);
        bodyFormData.append("reqType", selectType);
        bodyFormData.append("identifyCard", profileImage);
        bodyFormData.append("profileImage", profileImage1);
        // bodyFormData.append("exchangeStoreId", profileImage1);
      
        setSpinner(true);
        const res = await insertExchange(bodyFormData);
      
        if(res.success){
          Alert.alert(null, '신청이 완료되었습니다.', [
            {
              text: '확인',
              onPress: () => (setSpinner(false), props.navigation.navigate('App', {})),
            },
          ]);
          
        }else{
          Alert.alert(null, '신청이 실패되었습니다.');
          return;
        }
      
      }


      

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor='#fff'/>
      <Spinner visible={spinner}  />
      <View style={styles.container}>

            <View style={{marginTop:15.5}}>
                <View style={styles.container6}>
                    <Text style={styles.findIdTitle}>{t('tgEx')}</Text>           
                </View>
            </View>
            <View style={styles.lineStyle}></View>

    <KeyboardAwareScrollView>

         <View style={{height:16, justifyContent:'center', marginTop:20}}>
            <View style={styles.container5}>
            <Text style={styles.exchangeHistoryText}>{t('exchangeAmount')}</Text>{ !tgNumberYn && tgMaxYn && tgNumberYn1 && tgZeroYn && (<Text style={styles.tgInvalidText}>숫자만 입력해주세요.</Text>)}{ !tgMaxYn && tgNumberYn && tgNumberYn1 && tgZeroYn && (<Text style={styles.tgInvalidText}>잔액이 부족합니다.</Text>)}{ tgMaxYn && tgNumberYn && !tgNumberYn1 && tgZeroYn && (<View><Text style={styles.tgInvalidText}>1개 이상만 입력가능합니다.</Text></View>)}{ tgMaxYn && tgNumberYn && tgNumberYn1 && !tgZeroYn && (<View><Text style={styles.tgInvalidText}>1개 이상 입력하세요.</Text></View>)}
            
            </View>
         </View>

         <View style={styles.container3}>
           <View style={{marginTop:6,flex:1}}>
            <RNPickerSelect
                  // value={typeList}
                  useNativeAndroidPickerStyle={false}
                  style={{
                      inputIOS:styles.selectType1,
                      inputAndroid:styles.andSelectType,
                      iconContainer:{
                        //   right:
                          // left:Platform.OS == "ios"? 80:85,
                          right:10,
                          top:Platform.OS == "ios" ? 19:19
                        // top:19
                      }
                    }}
                  placeholder={{
                      // label:t('selectGram'), 
                      label:"g",
                      value:null
                      
                    }}
                    Icon={() => {
                        return <Image
                            source={require('../../assets/images/screen3/icExpandMore24Px.png')}
                        />
                    }}
                  onValueChange={(value,index) => {
                          validTg1(typeList && index > 0 && typeList[index-1].value);
                          setTgValue(typeList && index > 0 && typeList[index-1].value); 
                          setOkSelectType(true);
                          setSelectType(typeList && index > 0 && typeList[index-1].label);
                          setRealAmount(  Math.floor((Number.parseFloat(typeList && index > 0 && typeList[index-1].value)*tgQty) * 100000000) /  100000000 );
                          // goSelectText(value);
                        }}
                  items={typeList}
                    // items={[
                    //   { label: '3.75', value: '11' }
                      // { label: '부산-부산 매장', value: '부산-부산 매장' },
                      // { label: '광주-광주 매장', value: '광주-광주 매장' },
                  // ]}
                
              />
          </View>
            
            <View style={{flex:1, marginRight:10, marginLeft:10}}>
                <TextInput
                    style={tgNumberYn1||!tgZeroYn?styles.exchangeTgNoRedBox:styles.exchangeTgRedBox1}
                    // placeholder="                               g"
                    allowFontScaling={false}
                    value={tgQty}
                    defaultValue="1"
                    keyboardType='numbers-and-punctuation'
                    placeholderTextColor="rgb(108,108,108)"
                    maxLength={3}
                    // onChangeText={(text) => {validTg(text); setReqAmount(t2xt); setRealAmount( (Number.parseFloat(text?text:0)*tgRate) ); }}
                    onChangeText={(text) => {validTg(text); setTgQty(text);
                       setRealAmount(   Math.floor( (Number.parseInt(text?text:0) * Number.parseFloat(tgValue)) * 100000000) /  100000000   ); 
                    }}
                    />
                    <Text style={{position:'absolute',top:21, right:Platform.OS == 'android'?20:20}}>{t('qty')}</Text>
             </View>             



            <View>
                <TextInput
                    style={styles.exchangeTgBox}
                    // placeholder="                           TG"
                    allowFontScaling={false}
                    editable={false}
                    value={ realAmount && realAmount >0 ? realAmount.toString():'0'}
                    placeholderTextColor="rgb(108,108,108)"
                    
                    />
                    <Text style={{position:'absolute',top:21, right:Platform.OS == 'android'?15:20}}>TG</Text>
             </View> 


             {/* <View>
                <TextInput
                    style={{height: 46,width:147,flex:2,borderRadius:4,marginTop:6,borderWidth:1,paddingLeft:10,paddingRight:40,borderColor:'rgb(214,213,212)',color:'rgb(108,108,108)'}}
                    // placeholder="                               g"
                    allowFontScaling={false}
                    value={reqAmount}
                    keyboardType='numbers-and-punctuation'
                    placeholderTextColor="rgb(108,108,108)"
                    maxLength={15}
                    onChangeText={(text) => {validTg(text); setReqAmount(text); setRealAmount( (Number.parseFloat(text?text:0)*tgRate) ); }}
                    // onChangeText={(text) => {validTg(text); setReqAmount(text); setRealAmount(Number.parseInt(text?text:0)*tgRate); }}
                    />
                    <Text style={{position:'absolute',top:19, right:Platform.OS == 'android'?20:20}}>g</Text>
             </View> */}
             {/* <View style={{flex:1,alignItems:'center', justifyContent:'center', width:49, paddingLeft:16, paddingRight:15}}>
                 <Image
                    style={{width:18, height:14, marginTop:6}}
                    source={require('../../assets/images/screen3/icImportExport24Px.png')}
                    resizeMode="contain">
                 </Image>
             </View>    */}
             {/* <View>
                <TextInput
                    style={tgNumberYn1?styles.exchangeTgBox:styles.exchangeTgRedBox}
                    // placeholder="                           TG"
                    allowFontScaling={false}
                    editable={false}
                    value={tgNumberYn && realAmount.toString()}
                    placeholderTextColor="rgb(108,108,108)"
                    
                    />
                    <Text style={{position:'absolute',top:19, right:Platform.OS == 'android'?15:20}}>TG</Text>
             </View>  */}
              
         </View>
         <View style={styles.container4}>
           <View style={{marginTop:10, justifyContent:'flex-end', alignItems:'flex-end'}}>
            <Text style={{fontSize:12}}>부가세 10%, 수수료 5% 포함</Text>
           </View>
         </View>


         <View style={{height:16, justifyContent:'center', marginTop:10}}>
              <View style={styles.container5}>
                <Text style={styles.exchangeHistoryText}>{t('deliveryOption')}</Text>
              </View>
         </View>

         <View style={styles.container2}>
           <View style={{flexDirection:'row', marginTop:20}}>
                
                    <RadioForm
                        radio_props={radio_props}
                        initial={0}
                        formHorizontal={true}
                        // labelHorizontal={true}
                        animation={true}
                        buttonSize={10}
                        selectedButtonColor='rgb(213,173,66)'
                        buttonColor='rgb(214,213,212)'
                        onPress={(value) => setExchangeMethod(value)}
                        >
                        
                    </RadioForm>
                    {/* <Text style={styles.methodText}>방문수령</Text> */}
                {/* </View>
                <View style={{flex:1}}>
                    <Text style={styles.methodText}>우편수령</Text>
                </View> */}
            </View>
         </View>

         <View style={{height:16, justifyContent:'center', marginTop:30}}>
              <View style={styles.container5}>
                <Text style={styles.exchangeHistoryText}>{t('pickupLocacation')}</Text>
              </View>
         </View>  

         <View style={styles.container4}>
           <View style={{marginTop:6}}>
              <RNPickerSelect
                  // value={selectText}
                  useNativeAndroidPickerStyle={false}
                  style={{
                      inputIOS:styles.selectType,
                      inputAndroid:styles.andSelectType1,
                      iconContainer:{
                        //   right:
                          left:203,
                          top:Platform.OS == "ios" ? 19:19
                        // top:19
                      }
                    }}
                  placeholder={{
                      label:t('selectStore'), 
                      value:null
                      
                    }}
                    Icon={() => {
                        return <Image
                            source={require('../../assets/images/screen3/icExpandMore24Px.png')}
                        />
                    }}
                  onValueChange={(value,index) => {
                          setStoreName(storeList && index > 0 && storeList[index-1].label); 
                          // goSelectText(value);
                          setSelectText(value);
                          setOkSelect(true);
                        }}
                  items={storeList}
                //   items={[
                //       { label: '서울-종로3M매장', value: '서울-종로3M매장' },
                //       { label: '부산-부산 매장', value: '부산-부산 매장' },
                //       { label: '광주-광주 매장', value: '광주-광주 매장' },
                //   ]}
              />
           </View> 
         </View>

         <View style={{height:16, justifyContent:'center', marginTop:24}}>
              <View style={styles.container5}>
                <Text style={styles.exchangeHistoryText}>{t('passportImage')}</Text>
              </View>
         </View>
         <View style={{marginTop:6}}>
            <View style={{width:screenWidth-32, marginHorizontal:16}}>
                <Text style={styles.textStyle}>{t('hideLastDigits1')}</Text>
                { !lanauage && (
                  <Text style={styles.textStyle}>{t('hideLastDigits2')}</Text>
                )}
            </View>
          </View>

         <View style={styles.uploadContainer}> 
            <View style={{height:228,width: (screenWidth - 32), borderRadius:4,borderWidth:1,borderColor:'rgb(214,213,212)', backgroundColor:'rgb(240,240,240)'}}>
                {!okUpload && (     
                    <Text style={styles.sampleImageText}>Sample Image</Text>
                )}
                {!okUpload && (
                    <View style={{width:235.7, height:136.7, marginTop:20, marginLeft:70}}>
                        <Image
                            style={{width:235.7, height:136.7}}
                            source={ lanauage? require('../../assets/images/screen3/73xKo.png'):require('../../assets/images/screen3/passport3x.png')}
                            resizeMode="contain"
                        />
                    </View>    
                )}
                {okUpload && (
                    
                        <ImageBackground 
                            style={{width: (screenWidth - 32), height:228}}
                            source={{uri: imagePreview}}
                            // resizeMode='contain'
                            />
    
                    
                    )}
            </View>
         </View>
         <View style={styles.findAddr1}> 
                <TouchableOpacity
                        onPress={() => selectPhotoTapped()}
                        >
                    <Text style={styles.findAddrText}>{t('upload')}</Text>               
                </TouchableOpacity>
            </View>

         <View style={{height:16, justifyContent:'center', marginTop:24}}>
              <View style={styles.container5}>
                <Text style={styles.exchangeHistoryText}>{t('holdingPass')}</Text>
              </View>
         </View>
         <View style={{marginTop:6}}>
            <View style={{width:screenWidth-32, marginHorizontal:16}}>
                <Text style={styles.textStyle}>{t('uploadWithMemo1')}</Text>
                <Text style={styles.textStyle}>{t('uploadWithMemo2')}</Text>
                {!lanauage && (
                  <Text style={styles.textStyle}>{t('uploadWithMemo3')}</Text>
                )} 
            </View>
          </View>

         <View style={styles.uploadContainer}> 
            <View style={{height:228,width: (screenWidth - 32) , borderRadius:4,borderWidth:1,borderColor:'rgb(214,213,212)', backgroundColor:'rgb(240,240,240)'}}>
                {!okUpload1 && (        
                    <Text style={styles.sampleImageText}>Sample Image</Text>
                )}
                {!okUpload1 && (
                    <View style={{width:294.6, height:199.1, marginLeft:20}}>
                        <Image
                            style={{width:294.6, height:199.1}}
                            source={lanauage? require('../../assets/images/screen3/133xko.png'):require('../../assets/images/screen3/133xEn.png')}
                            resizeMode="contain"
                        />
                    </View>    
                )}
                {okUpload1 && (
                    
                    <ImageBackground 
                        style={{width: (screenWidth - 32), height:228}}
                        source={{uri: imagePreview1}}
                        // resizeMode='contain'
                        />

                
                )}


            </View>
            
         </View>
         <View style={styles.findAddr1}> 
                <TouchableOpacity
                        onPress={() => selectPhotoTapped1()}
                        >
                    <Text style={styles.findAddrText}>{t('upload')}</Text>               
                </TouchableOpacity>
            </View>

         <View style={{height:16, alignItems:'center', marginTop:23, width:screenWidth-32, marginHorizontal:16, flexDirection:'row'}}>
          
              {/* <View style={styles.container5}> */}
                <Text style={styles.exchangeHistoryText1}>{t('OTPAuth')}</Text>
               {
                   !otpKey && (
                    <TouchableOpacity
                        style={styles.buttonBox1}
                                onPress={() => {
                                    props.navigation.navigate('SecondAuth', {});
                                }}
                        >
                         {
                              lanauage && (
                                <Image
                                    style={{height:20, width:83.3}}
                                    source={require('../../assets/images/screen3/btnOtp3x.png')}
                                    resizeMode="contain">
                                    </Image>
                              )
                            }
                            {
                              !lanauage && (
                                <Image
                                    style={{height:20, width:83.3}}
                                    source={require('../../assets/images/screen3/btnOtpEn3x.png')}
                                    resizeMode="contain">
                                    </Image>
                              )
                            }
                    </TouchableOpacity>

                   )
               }     
                


              {/* </View> */}
         </View>
         <View style={{marginTop:10.2, width:screenWidth-32, marginHorizontal:16}}>
                <Text style={styles.textStyle3}>{t('authText')}</Text>
        </View>

        <View style={!okAuth?styles.container6:styles.container3}>
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
                        <View style={styles.findAddr}>
                            <TouchableOpacity
                                    onPress={() => {confirmOtpCode();}}
                                    >
                            
                                <Text style={styles.findAddrText}>{t('otpConfirm')}</Text>               
                            </TouchableOpacity>
                    </View>
                    )}
                    
        </View>

            <View style={{height:30, width:screenWidth, backgroundColor:'#FFF'}}>

            </View>


         
         </KeyboardAwareScrollView>        

         

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
                    disabled={!okAuth||!okUpload||!okUpload1||!tgMaxYn||!tgNumberYn||!selectType||!tgNumberYn1||!okSelectType||!okSelect||!selectText||!tgZeroYn?true:false}
                    onPress={() => {
                        insertExchangeInfo();
                        // props.navigation.navigate('SecondAuth', {type: 'SecondAuth'});
                    }}
                    >      
                <View style={!okAuth||!okUpload||!okUpload1||!tgMaxYn||!tgNumberYn||!tgNumberYn1||!selectType||!okSelectType||!okSelect||!selectText||!tgZeroYn?styles.bottomRightBtn:styles.bottomRightGoldBtn}>
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
      justifyContent:'space-between'
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
      justifyContent:'center',
      alignItems:'center'
    },
    container6: {
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          width: screenWidth - 32,
          marginHorizontal: 16,
    },
    uploadContainer: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        flexDirection: 'row',
        // width: screenWidth - 32,
        // marginHorizontal: 16,
        height:228,
        marginTop:10
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
    },
    exchangeHistoryText:{
      fontSize:14,
      textAlign:'left',
      lineHeight:16,
      letterSpacing:-0.14,
      color:'rgb(43,43,43)',
      alignItems:'center',
      flex:1,
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
    bottomRightGoldBtn:{
        width:screenWidth/2,
        alignItems:'flex-end',
        height:69.6,
        backgroundColor:'rgb(213,173,66)',
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
    lineStyle:{
        width:screenWidth,
        borderWidth: 0.5,
        borderColor:'rgb(214,213,212)',
        marginTop:9
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
    textStyle3:{
        fontSize:12,
        textAlign:'left',
        lineHeight:18,
        letterSpacing:-0.12,
        color:'rgb(152,152,152)',
        fontFamily:'NanumBarunGothic'
    },
    textStyle:{
      width:343,
      height:22,
      fontSize:12,
      textAlign:'left',
      lineHeight:20,
      letterSpacing:-0.14,
      color:'rgba(0,0,0,0.6)',
      fontFamily:'NanumBarunGothicLight'
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
    findAddr1:{
      width:(screenWidth-32),
      marginHorizontal:16,
      height:46,
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
    methodText:{
      fontSize:14,
      textAlign:'left',
      lineHeight:16,
      letterSpacing:-0.14,
      color:'rgb(108,108,108)',
      fontFamily:'NanumBarunGothic'
    },
    selectType:{
      paddingLeft:10,
      width:227,
      height:46,
      borderRadius:4,
      borderWidth:1,
      borderColor:'rgb(214,213,212)',
      backgroundColor:'rgb(255,255,255)'
    },
    selectType1:{
      paddingLeft:10,
      // marginRight:10,
      // width:120,
      height:46,
      borderRadius:4,
      borderWidth:1,
      borderColor:'rgb(214,213,212)',
      backgroundColor:'rgb(255,255,255)'
    },
    andSelectType:{
      paddingLeft:10,
      paddingTop:10,
      // width:80,
      height:46,
      borderRadius:4,
      borderWidth:1,
      color:'rgb(43,43,43)',
      borderColor:'rgb(214,213,212)',
      backgroundColor:'rgb(255,255,255)'
    },
    andSelectType1:{
      paddingLeft:10,
      paddingTop:10,
      width:227,
      height:46,
      borderRadius:4,
      borderWidth:1,
      color:'rgb(43,43,43)',
      borderColor:'rgb(214,213,212)',
      backgroundColor:'rgb(255,255,255)'
    },
    exchangeTgBox:{
        height: 46,
        flex:2,
        width: 147,
        borderRadius:4,
        marginTop:6,
        borderWidth:1,
        paddingLeft:10,
        paddingRight:40,
        borderColor:'rgb(214,213,212)',
        backgroundColor:'rgb(240,240,240)'
    },
    exchangeTgRedBox:{
        flex:2,
        height: 46,
        width: 147,
        borderRadius:4,
        marginTop:6,
        borderWidth:1,
        paddingLeft:10,
        paddingRight:40,
        borderColor:'rgb(222,76,70)', 
        backgroundColor:'rgb(240,240,240)'
    },
    exchangeTgNoRedBox:{
      height: 46, 
      borderRadius:4,
      marginTop:6,
      borderWidth:1,
      paddingLeft:10,
      paddingRight:40,
      borderColor:'rgb(214,213,212)',
      color:'rgb(108,108,108)'}
    ,
    exchangeTgRedBox1:{
      height: 46, 
      borderRadius:4,
      marginTop:6,
      borderWidth:1,
      paddingLeft:10,
      paddingRight:40,
      borderColor:'rgb(222,76,70)', 
      color:'rgb(108,108,108)'}
    ,
    tgInvalidText:{
        fontFamily:'NanumBarunGothic',
        fontSize:10,
        textAlign:'right',
        lineHeight:12,
        letterSpacing:-0.1,
        marginTop:3,
        flex:1,
        // marginLeft:5,
        // marginRight:15,
        color:'rgb(222,76,70)'
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

export default Exchange;
