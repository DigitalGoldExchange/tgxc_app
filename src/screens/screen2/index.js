import React from 'react';
import RNPickerSelect from 'react-native-picker-select'
import {StatusBar, StyleSheet, SafeAreaView, Text, Image, View, Dimensions, TextInput, Platform, TouchableOpacity, ScrollView, Alert,FlatList} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {me, changeSelectText, doExchangeCancel} from '../../service/auth';
import {useTranslation} from 'react-i18next';
import Modal from 'react-native-modal';
import Moment from 'moment';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenheight = Math.round(Dimensions.get('window').height);
let containerHeight = 130;
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
	containerHeight = 100;
}



function Screen2(props) {
 console.log(props);

  const [tradeInfo, setTradeInfo] = React.useState([]);
  const [exchange, setExchange] = React.useState(true);
  const [selectText, setSelectText] = React.useState(''); 
  const [userName, setUserName] = React.useState();
  const [userId, setUserId] = React.useState();
  const [userTg, setUserTg] = React.useState();
  const [identifyNumber, setIdentifyNumber] = React.useState();
  const [alarmCnt, setAlarmCnt] = React.useState();
  const [isFetching,setIsFetching] = React.useState(false);
  const {t, i18n} = useTranslation();
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [modalTradeType,setModalTradeType] = React.useState();
  const [modalTradeAddr,setModalTradeAddr] = React.useState();
  const [modalTradeTime,setModalTradeTime] = React.useState();
  const [modalTradeAmount,setModalTradeAmount] = React.useState();
  const [modalTradeReqQty,setModalTradeReqQty] = React.useState();
  const [modalTradeReqType,setModalTradeReqType] = React.useState();
  const [modalTradeReqNumber,setModalTradeReqNumber] = React.useState();
  const [modalExchangeStore,setModalExchangeStore] = React.useState();
  const [modalPhoneNumber,setModalPhoneNumber] = React.useState();
  const [modalStatus,setModalStatus] = React.useState();
  const [modalNote,setModalNote] = React.useState();
  const [exchangeYn, setExchangeYn] = React.useState(false);
  const [modalExchangeId,setModalExchangeId] = React.useState();
  const isFocused = useIsFocused();


  React.useEffect(() => {   
    
    setSelectText(props.route.params && props.route.params.selectValue);
  //  onChangeSelectText(props.route.params && props.route.params.selectValue);
    
  
  },[props.route.params]);

  React.useEffect(() => {   
    
    (async function anyNameFunction() {
      const res = await me();
        // console.log(res);
        // setUserTg(res.data.user.totalTg);
        // setUserName(res.data.user.name);
        // setIdentifyNumber(res.data.user.identifyNumber);
        // setUserId(res.data.user.userId);
        // setAlarmCnt(res.data.unreadPushCount);

      // console.log(user);
      setTradeInfo(res.data.exchangeList);
      // if(Object.keys(tradeInfo).length == 0){
      //   setExchange(false);
      // }

    })();


  },[isFocused]);

  const exchangeCancel = () => {
    // Alert.alert(null,"신청한 내역을 취소하시겠습니까?");
    Alert.alert(
      null,
      `신청한 내역을 취소하시겠습니까?`,
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: async () => {
            
            const bodyFormData = new FormData();
            bodyFormData.append('exchangeId', modalExchangeId);
            bodyFormData.append('status','취소');

            const res = await doExchangeCancel(bodyFormData);
            console.log(res);
            if (res.data.result) {
              Alert.alert(null, '정상 취소되었습니다.', [
                {
                  text: '확인',
                  onPress: () =>  {toggleModal(); onRefresh();},
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
  

  const onChangeSelectText = async (value) => {
      // console.log("value:"+value);
      setSelectText(value);
      const selectExchange = await changeSelectText(value);
      // console.log(selectExchange.data.exchangeList);
      setTradeInfo(selectExchange.data.exchangeList);
      
  }
  // list가 없을때
  const emptyRender = () => {
    return (
      <View>
      <View style={styles.tradeLine1}></View>  
      <View style={styles.container3}>
              <View style={styles.border1}>
                  <Text style={styles.noTradeText}>{t('noTrade')}</Text>          
                  <Text style={styles.noTradeText}>{t('noTrade1')}</Text>
              </View>
      </View>
      </View>
    )
  }
  let groupDate = '';
  
  const onRefresh = async () => {
		setIsFetching(true);
		const res = await me();
    // setUserTg(res.data.user.totalTg);
    // setUserName(res.data.user.name);
    // setIdentifyNumber(res.data.user.identifyNumber);
    // setUserId(res.data.user.userId);
    // setAlarmCnt(res.data.unreadPushCount);

    // console.log(res.data.exchangeList);
  // console.log(user);
    setTradeInfo(res.data.exchangeList);
  // if(Object.keys(tradeInfo).length == 0){
    // if(Object.keys(tradeInfo).length == 0){
    //   setExchange(false);
    // }
		setTimeout(() => {
			setIsFetching(false);
		},500)
		
  }

  const toggleModal = () => {
    // console.log(modalType);
      setModalVisible(!isModalVisible);
    
  };
  
  return (
    <SafeAreaView>
      <StatusBar backgroundColor='#fff'/>
      <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
          <View style={{justifyContent:'center', alignItems:'center'}}>
        
           <View style={exchangeYn?styles.modalType1:styles.modalType}>

              <View style={{marginTop:20}}>
                <Text style={styles.modalTitleText}>거래 상세내역</Text>
              </View>
              <View style={{marginTop:30}}>
                  <View style={styles.modalContailner}>
                    <View style={{alignItems:'center',justifyContent:'center'}}>
                        <Text style={styles.modalMenuText}>{modalTradeType}</Text>
                    </View>                   
                  </View>
              </View>
              
              <View style={{marginTop:16}}>
                  <View style={styles.modalContailner}>
                    <View style={{alignItems:'center',justifyContent:'center'}}>
                      <Text style={styles.modalMenuText1}>{modalTradeAddr}</Text>
                    </View>
                  </View>
              </View>

              
               {
                 modalTradeReqNumber && (
                  <View style={{marginTop:10}}>
                    <View style={styles.modalContailner}>
                      <View style={{alignItems:'center',justifyContent:'center', flexDirection:'row'}}>
                          <Text style={styles.modalMenuText1}>신청번호 :</Text><Text style={styles.modalMenuText}> {modalTradeReqNumber}</Text>
                      </View>
                    </View>
                  </View>
                 )
               }   
               
                    
              {
                exchangeYn && (  
                    <View>
                      <View style={{marginTop:10}}>
                      <View style={{marginLeft:40}}>
                        <View style={{height:50, width:270}}>
                          <Text style={styles.modalMenuText1}>매장주소</Text>
                          <View style={{marginTop:5}}>
                          <Text style={styles.modalMenuText}>{modalExchangeStore}</Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View style={{marginTop:20}}>
                      <View style={styles.modalContailner}>
                        <View style={{alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                            <Text style={styles.modalMenuText1}>대표전화 :</Text><Text style={styles.modalMenuText}> {modalPhoneNumber}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={{marginTop:10}}>
                      <View style={styles.modalContailner}>
                        <View style={{alignItems:'center',justifyContent:'center', flexDirection:'row'}}>
                          <Text style={styles.modalMenuText1}>거래일자 :</Text><Text style={styles.modalMenuText}> {modalTradeTime}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={{marginTop:10}}>
                      <View style={styles.modalContailner}>
                        <View style={{alignItems:'center',justifyContent:'center', flexDirection:'row'}}>
                          <Text style={styles.modalMenuText1}>신청정보 :</Text><Text style={styles.modalMenuText}> {modalTradeReqType}g, </Text><Text style={styles.modalMenuText}> {modalTradeReqQty}개, </Text><Text style={styles.modalMenuText}> {modalTradeAmount}</Text><Text style={styles.modalMenuText}>TG</Text>
                        </View>
                      </View>
                    </View>

                    <View style={{marginTop:10}}>
                      <View style={styles.modalContailner}>
                        <View style={{alignItems:'center',justifyContent:'center', flexDirection:'row'}}>
                        <Text style={styles.modalMenuText1}>현재상태 :</Text><Text style={styles.modalMenuText}> {modalStatus}</Text>
                        </View>
                      </View>
                    </View>

                    <View style={{marginTop:10, height:50}}>
                      <View style={styles.modalContailner}>
                        <View style={{alignItems:'center',justifyContent:'center'}}>
                        <Text style={styles.modalMenuText}>{modalNote}</Text>
                        </View>
                      </View>
                    </View>


                </View>
                )
              }



              {
                !exchangeYn && (
                  <View style={{marginBottom:30}}>
                  <View style={{marginTop:16}}>
                  <View style={styles.modalContailner}>
                    <View style={{alignItems:'center',justifyContent:'center', flexDirection:'row'}}>
                        <Text style={styles.modalMenuText1}>거래일자 :</Text><Text style={styles.modalMenuText}> {modalTradeTime}</Text>
                    </View>
                  </View>
                </View>
                
                  <View style={{marginTop:16}}>
                  <View style={styles.modalContailner}>
                    <View style={{alignItems:'center',justifyContent:'center', flexDirection:'row'}}>
                    <Text style={styles.modalMenuText1}>거래금액 :</Text><Text style={styles.modalMenuText}> {modalTradeAmount}</Text><Text style={styles.modalMenuText}>TG</Text>
                    </View>
                  </View>
                </View>
                {
                  modalStatus && (
                    <View style={{marginTop:16}}>
                      <View style={styles.modalContailner}>
                        <View style={{alignItems:'center',justifyContent:'center', flexDirection:'row'}}>
                          <Text style={styles.modalMenuText1}>현재상태 :</Text><Text style={styles.modalMenuText}> {modalStatus}</Text>
                        </View>
                      </View>
                    </View>
                  )
                }
                

                    <View style={{marginTop:10, height:50}}>
                      <View style={styles.modalContailner}>
                        <View style={{alignItems:'center',justifyContent:'center'}}>
                        <Text style={styles.modalMenuText}>{modalNote}</Text>
                        </View>
                      </View>
                    </View>
                
                </View>
              
                )
              }
              {
                modalTradeReqNumber && (
                  <View style={styles.lineStyle1}></View>
                )
              }
              {
                !modalTradeReqNumber && (
                    <View style={styles.lineStyle2}></View>
                )
              }
              

              {
                exchangeYn && (
                  <View style={styles.modalBottomBtnArea}>
                    <TouchableOpacity
                            onPress={exchangeCancel}
                            >
                            <View style={{width:344/2,height:45, justifyContent:'center', alignItems:'center', borderRightWidth:0.5, borderRightColor:'rgba(60,60,67,0.29)'}}>                     
                                <Text style={styles.bottomCancelBtnText}>신청취소</Text>                            
                            </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                            onPress={toggleModal}
                            >
                    <View style={{width:344/2,height:45, justifyContent:'center', alignItems:'center'}}>                 
                        <Text style={styles.bottomConfirmBtnText}>확인</Text>                 
                    </View>
                    </TouchableOpacity>
                </View>
                )
              }
              {
                !exchangeYn && (
                  <TouchableOpacity
                        onPress={toggleModal}
                        >
                    <View style={styles.modalBottomBtnArea}>
                        <View style={{justifyContent:'center', alignItems:'center'}}>                 
                            <Text style={styles.bottomConfirmBtnText}>확인</Text>                 
                        </View>
                  </View>
                  </TouchableOpacity>    
                )
              } 


          
          </View>
          </View>
      </Modal>
      <View style={styles.container}>
            <View style={{marginTop:15.5}}>
                <View style={styles.container2}>
                    <Text style={styles.findIdTitle}>{t('transactionHistory')}</Text>
                </View>
            </View>
            <View style={styles.lineStyle}></View>
            
            <View style={styles.selectBarArea}>
              <RNPickerSelect
                  value={selectText}
                  style={{
                      inputIOS:styles.selectType,
                      inputAndroid:styles.andSelectType,
                      iconContainer:{
                          left:100,
                        //   top:Platform.OS == "ios" ? 0:13
                        top:12
                      }
                    }}
                  placeholder={{
                      label:t('all'),
                      value:'전체내역'
                    }}
                    Icon={() => {
                        return <Image
                            source={require('../../assets/images/screen3/icExpandMore24Px.png')}
                        />
                    }}
                  // onValueChange={(value) => console.log(value)}
                  onValueChange={(value) => onChangeSelectText(value)}
                  // selected={selectText}
                  items={[
                      { label: t('deposit'), value: '입금' },
                      { label: t('withdraw'), value: '출금' },
                      { label: t('exchange'), value: '교환신청' },
                  ]}
              />
            </View>

   
      <FlatList
        contentContainerStyle={{
          paddingBottom: 50,
        }}
				contentInsetAdjustmentBehavior="automatic"
        data={tradeInfo}
        ListEmptyComponent={emptyRender}
				onRefresh={() => onRefresh()}
				refreshing={isFetching}
        onEndReachedThreshold={0.5}
        keyExtractor={(item) => item.exchangeId.toString()}
        // onEndReached={onEndReached}
        renderSectionHeader={({ section: { tradeTime}  }) => (
          <Text style={styles.dayText}>{tradeTime}</Text>
        )}
				renderItem={({item, index}) => {
          let tradeTypeText;
          let tradeTgText;
          let tradeAmountText;
          let modalChoice;
          if(item.tradeType === 'EXCHANGE'){
            modalChoice = 1;
              tradeTypeText = <Text style={styles.exchangeText}>{t('exchange')}</Text>;
              tradeAmountText = <Text style={styles.exchangeText}>{item.amount}</Text>;
              tradeTgText = <Text style={styles.exchangeTgText}>TG</Text>;
          }else if(item.tradeType === 'OUT'){
            tradeTypeText = <Text style={styles.outPutText}>{t('withdraw')}</Text>;
            tradeAmountText = <Text style={styles.outPutText}>{item.amount}</Text>;
            tradeTgText = <Text style={styles.outTgText}>TG</Text>;
          }else{
            tradeTypeText = <Text style={styles.inPutText}>{t('deposit')}</Text>;
            tradeAmountText = <Text style={styles.inPutText}>{item.amount}</Text>;
            tradeTgText = <Text style={styles.inTgText}>TG</Text>;
          }
          if(groupDate == Moment(item.createDatetime).format('YYYY.MM.DD')){
            groupDate = Moment(item.createDatetime).format('YYYY.MM.DD');
            return (
              <TouchableOpacity
                onPress={() => {toggleModal(); 
                                setExchangeYn(modalChoice?true:false);
                                setModalTradeReqNumber(item.reqNumber);
                                if(item.tradeType === 'EXCHANGE'){
                                  setModalExchangeStore(item.exchangeStore.storeAddr);
                                  setModalPhoneNumber(item.exchangeStore.storePhoneNumber);
                                }
                                if(item.note !== null){
                                  setModalNote(item.note);  
                                }
                                setModalStatus(item.status);
                                setModalTradeType(tradeTypeText); 
                                setModalTradeAddr(item.walletAddr);
                                setModalTradeAmount(item.amount);
                                setModalTradeReqQty(item.reqQty);
                                setModalTradeReqType(item.reqType);
                                setModalExchangeId(item.exchangeId);
                                setModalTradeTime(Moment(item.createDatetime).format('YYYY/MM/DD HH:mm:ss'));
                              }}
              >
              <View>
                  {/* <View style={styles.dayArea}>
                    <Text style={styles.dayText}>{Moment(item.createDatetime).format('YYYY.MM.DD')}</Text>
                  </View> */}
                <View style={styles.tradeContainer}>
                    {tradeTypeText}
                    <View style={{flexDirection:'row', alignItems:'baseline', justifyContent:'flex-end', flex:1}}>
                      <View>
                        {tradeAmountText}
                      </View>
                      <View>
                        {tradeTgText}
                      </View>
                    </View>
                 </View>
                <View style={styles.tradeInfoContainer}>
                  <Text style={styles.tradeTime}>{Moment(item.createDatetime).format('HH')}:{Moment(item.createDatetime).format('mm')}</Text>
                  <View style={{flexDirection:'row',  justifyContent:'flex-end', flex:1}}>
                    <Text style={styles.tradeAddr}>{item.walletAddr}</Text>
                    {
                        item.status && (
                          <Text style={styles.tradeAddr}>     {item.status}</Text>
                        )
                      }
                  </View>
                </View>
                <View style={styles.tradeLine}></View>
              </View>
              </TouchableOpacity>
              );
          }else{
            groupDate = Moment(item.createDatetime).format('YYYY.MM.DD');
            return (
              
              <View>
                  <View style={styles.dayArea}>
                    <Text style={styles.dayText}>{Moment(item.createDatetime).format('YYYY.MM.DD')}</Text>
                  </View>
                  <TouchableOpacity
                onPress={() => {toggleModal(); 
                                setExchangeYn(modalChoice?true:false);
                                setModalTradeReqNumber(item.reqNumber);
                                if(item.tradeType === 'EXCHANGE'){
                                  setModalExchangeStore(item.exchangeStore.storeAddr);
                                  setModalPhoneNumber(item.exchangeStore.storePhoneNumber);
                                }
                                if(item.note !== null){
                                  setModalNote(item.note);  
                                }
                                setModalStatus(item.status);
                                setModalTradeType(tradeTypeText); 
                                setModalTradeAddr(item.walletAddr);
                                setModalTradeAmount(item.amount); 
                                setModalTradeReqQty(item.reqQty);
                                setModalTradeReqType(item.reqType);
                                setModalExchangeId(item.exchangeId);
                                setModalTradeTime(Moment(item.createDatetime).format('YYYY/MM/DD HH:mm:ss'));
                              }}
              >
                <View style={styles.tradeContainer}>
                    {tradeTypeText}
                    <View style={{flexDirection:'row', alignItems:'baseline', justifyContent:'flex-end', flex:1}}>
                      <View>
                        {tradeAmountText}
                      </View>
                      <View>
                        {tradeTgText}
                      </View>
                    </View>
                 </View>
                <View style={styles.tradeInfoContainer}>
                  <Text style={styles.tradeTime}>{Moment(item.createDatetime).format('HH')}:{Moment(item.createDatetime).format('mm')}</Text>
                  <View style={{flexDirection:'row',  justifyContent:'flex-end', flex:1}}>
                    <Text style={styles.tradeAddr}>{item.walletAddr}</Text>
                    {
                        item.status && (
                          <Text style={styles.tradeAddr}>     {item.status}</Text>
                        )
                      }
                  </View>
                </View>
                <View style={styles.tradeLine}></View>
                </TouchableOpacity>
              </View>
              );
          }
        }}

      />            
        {/* <View>거래내역 없을때</View> */}
        <View style={styles.lineStyle}></View>
                   

            
            

      </View>

       
    </SafeAreaView>
  );
}

var styles = StyleSheet.create({
	container: {
        width: screenWidth,
        height:screenheight-containerHeight,
        flexDirection: 'column',
        backgroundColor:'#FFF',
        paddingBottom:-100
    },
    container2: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		width: screenWidth - 32,
		marginHorizontal: 16,
    },
    findIdTitle:{
        // width:122,
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
    bottomCancelBtnText:{
      fontSize:17,
      textAlign:'center',
      lineHeight:22,
      letterSpacing:-0.41,
      color:'rgb(222,76,70)',
      fontFamily:'NanumBarunGothic'
    },
    bottomConfirmBtnText:{
      fontSize:17,
      textAlign:'center',
      lineHeight:22,
      letterSpacing:-0.41,
      color:'rgb(43,43,43)',
      fontFamily:'NanumBarunGothic'
    },
    bottomBtnArea:{
        width: screenWidth, 
        height: 69.6, 
        backgroundColor: 'rgb(213,173,66)', 
        justifyContent: 'center', 
        alignItems: 'center'
      //   marginTop:screenheight
    },
    selectBarArea:{
      flexDirection: 'row',
      width: screenWidth - 32,
      marginHorizontal: 16,
      marginTop:11,
      marginBottom:13
    },
    dayArea:{
        height:30,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgba(214,213,212,0.3)'
      },
      dayText:{
        fontSize:12,
        textAlign:'center',
        lineHeight:14,
        letterSpacing:-0.12,
        height:14,
        color:'rgb(108,108,108)',
        fontFamily:'NanumBarunGothicBold'
      },
      outPutText:{
        fontSize:16,
        // textAlign:'left',
        lineHeight:19,
        letterSpacing:-0.16,
        color:'rgb(61,112,208)',
        fontFamily:'NanumBarunGothicBold'
      },
      inPutText:{
        fontSize:16,
        // textAlign:'left',
        lineHeight:19,
        letterSpacing:-0.16,
        color:'rgb(222,76,70)',
        fontFamily:'NanumBarunGothicBold'
      },
      exchangeText:{
        fontSize:16,
        // textAlign:'left',
        lineHeight:19,
        letterSpacing:-0.16,
        color:'rgb(43,43,43)',
        fontFamily:'NanumBarunGothicBold'
      },
      outTgText:{
        fontSize:10,
        lineHeight:12,
        letterSpacing:-0.1,
        color:'rgb(61,112,208)',
        fontFamily:'NanumBarunGothic',
        marginLeft:1
      },
      exchangeTgText:{
        fontSize:10,
        lineHeight:12,
        letterSpacing:-0.1,
        color:'rgb(43,43,43)',
        fontFamily:'NanumBarunGothic',
        marginLeft:1
      },
      inTgText:{
        fontSize:10,
        lineHeight:12,
        letterSpacing:-0.1,
        color:'rgb(222,76,70)',
        fontFamily:'NanumBarunGothic',
        marginLeft:1
      },
      tradeTime:{
        fontSize:12,
        textAlign:'left',
        lineHeight:14,
        letterSpacing:-0.12,
        color:'rgb(108,108,108)',
        fontFamily:'NanumBarunGothic',
      },
      tradeAddr:{
        fontSize:12,
        lineHeight:14,
        letterSpacing:-0.12,
        color:'rgb(108,108,108)',
        fontFamily:'NanumBarunGothic',
      },
      tradeLine:{
        width:screenWidth,
        borderWidth: 0.5,
        borderColor:'rgb(214,213,212)',
        marginTop:16
      },
      tradeLine1:{
        width:screenWidth,
        borderWidth: 0.5,
        borderColor:'rgb(214,213,212)',
        marginTop:10
      },
      tradeContainer: {
        flexDirection: 'row',
        width: screenWidth - 32,
        marginHorizontal: 16,
        height:19,
        marginTop:21,
        justifyContent:'center',
        alignItems:'center'
      },
      tradeInfoContainer: {
        flexDirection: 'row',
        width: screenWidth - 32,
        marginHorizontal: 16,
        height:14,
        marginTop:10,
        // justifyContent:'center',
        alignItems:'center'
      },
      selectType:{
        paddingLeft:10,
        width:128,
        height:32,
        borderRadius:4,
        borderWidth:1,
        borderColor:'rgb(214,213,212)',
        backgroundColor:'rgb(255,255,255)'
      },
      andSelectType:{
        paddingLeft:10,
        width:128,
        height:32,
        borderRadius:4,
        borderWidth:1,
        color:'rgb(43,43,43)',
        borderColor:'rgb(214,213,212)',
        backgroundColor:'rgb(255,255,255)'
      },
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
      modalType1:{
        width:343,
        height:450,
        borderRadius:12,
        backgroundColor:'rgb(255,255,255)'
      },
      modalType:{
        width:343,
        height:400,
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
      modalContailner:{
        flexDirection: 'row',
        width:250,
        // width: screenWidth - 32,
        // marginHorizontal: 16,
        marginLeft:40
      },
      modalMenuText:{
        fontSize:14,
        textAlign:'left',
        lineHeight:19,
        letterSpacing:-0.14,
        color:'rgb(108,108,108)',
        fontFamily:'NanumBarunGothic'
      },
      modalMenuText1:{
        fontSize:14,
        textAlign:'left',
        lineHeight:19,
        letterSpacing:-0.14,
        color:'rgb(43,43,43)',
        fontFamily:'NanumBarunGothic'
      },
      modalLineMarginTop:{
        marginTop:350-300
      },
      modalLineMarginTop1:{
        marginTop:500-460
      },
      modalBottomBtnArea:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        height:50
      },
      lineStyle1:{
        width:343,
        borderWidth: 0.5,
        borderColor:'rgb(214,213,212)'
      },
      modalConfirmBtn:{
        fontSize:17,
        textAlign:'center',
        textAlignVertical:'center',
        lineHeight:22,
        letterSpacing:-0.41,
        color:'rgb(43,43,43)',
        fontFamily:'NanumBarunGothic'
      },
      lineStyle2:{
        marginTop:65,
        width:343,
        borderWidth: 0.5,
        borderColor:'rgb(214,213,212)'
      }
  
    
});

export default Screen2;
