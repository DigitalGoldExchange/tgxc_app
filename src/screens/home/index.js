import React from 'react';
import {StatusBar, StyleSheet, SafeAreaView, Text, Image, View, Dimensions, TextInput, Platform, TouchableOpacity, Alert, FlatList} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {me} from '../../service/auth';
import Moment from 'moment';
import Modal from 'react-native-modal';
import {useTranslation} from 'react-i18next';
import {useIsFocused} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';
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

function HomeScreen(props) {
  // console.log(props);
  const isFocused = useIsFocused();
  const {t, i18n} = useTranslation();
  const [tradeInfo, setTradeInfo] = React.useState([]);
  const [exchange, setExchange] = React.useState(true);
  const [userName, setUserName] = React.useState();
  const [userId, setUserId] = React.useState();
  const [userTg, setUserTg] = React.useState();
  const [identifyNumber, setIdentifyNumber] = React.useState();
  const [alarmCnt, setAlarmCnt] = React.useState();
  const [isFetching,setIsFetching] = React.useState(false);
  const [tradeTime,setTradeTime] = React.useState();
  const [spinner, setSpinner] = React.useState(false);
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [isModalVisible1, setModalVisible1] = React.useState(false);
  const [modalTradeType,setModalTradeType] = React.useState();
  const [modalTradeAddr,setModalTradeAddr] = React.useState();
  const [modalTradeTime,setModalTradeTime] = React.useState();
  const [modalTradeAmount,setModalTradeAmount] = React.useState();
  const [modalTradeReqNumber,setModalTradeReqNumber] = React.useState();
  const [modalExchangeStore,setModalExchangeStore] = React.useState();
  const [modalPhoneNumber,setModalPhoneNumber] = React.useState();
  const [modalStatus,setModalStatus] = React.useState();
  const [modalNote,setModalNote] = React.useState();
  const [exchangeYn, setExchangeYn] = React.useState(false);

  React.useEffect(() => {
    // setSpinner(true);
  //   setTimeout(async () => {
  //     const res = await me();
  //       setUserTg(res.data.user.totalTg);
  //       setUserName(res.data.user.name);
  //       setIdentifyNumber(res.data.user.identifyNumber);
  //       setUserId(res.data.user.userId);
  //       setAlarmCnt(res.data.unreadPushCount);
        
  //       setTradeTime(Moment(res.data.exchangeList.createDatetime).format('YYYY.MM.DD'));

  //      console.log(res.data.exchangeList);
  //     // console.log(user);
  //     setTradeInfo(res.data.exchangeList);
  //     setExchange(res.data.exchangeList?true:false);
  //     setSpinner(false);
  // }, 500);
		(async function anyNameFunction() {
      const res = await me();
      // console.log(res.data.exchangeList);
        setUserTg(res.data.user.totalTg);
        setUserName(res.data.user.name);
        setIdentifyNumber(res.data.user.identifyNumber);
        setUserId(res.data.user.userId);
        setAlarmCnt(res.data.unreadPushCount);
        
        setTradeTime(Moment(res.data.exchangeList.createDatetime).format('YYYY.MM.DD'));

      //  console.log(res.data.exchangeList);
      // console.log(user);
      setTradeInfo(res.data.exchangeList);
      // console.log(res.data.exchangeList[0].exchangeStore);
      setExchange(res.data.exchangeList?true:false);

      return () => {
        me();
      }
        
      
		})();
  }, [isFocused]);
  const onRefresh = async () => {
		setIsFetching(true);
		const res = await me();
    setUserTg(res.data.user.totalTg);
    setUserName(res.data.user.name);
    setIdentifyNumber(res.data.user.identifyNumber);
    setUserId(res.data.user.userId);
    setAlarmCnt(res.data.unreadPushCount);

    // console.log(res.data.exchangeList);
  // console.log(user);
    setTradeInfo(res.data.exchangeList);
  // if(Object.keys(tradeInfo).length == 0){
    setExchange(res.data.exchangeList?true:false);
		setTimeout(() => {
			setIsFetching(false);
		},500)
		
  }

  // const toggleModal1 = () => {
  //   setModalVisible(!isModalVisible);
  // };

  // const toggleModal2 = () => {
  //   setModalVisible1(!isModalVisible1);
  // };
  
  const toggleModal = () => {
    // console.log(modalType);
      setModalVisible(!isModalVisible);
    
  };

  // 리스트 제외 flatlist header 로 수정
  const renderHeader = () => {
		return (
      <React.Fragment>
        <View style={styles.container4}>
          <View style={styles.border}>
            <View style={styles.flexDirectionRow}>
                <Text style={styles.haveTgText}>{t('tgStatus')}</Text>
                <Text style={styles.coinZeusText}>{t('coinZeus')}</Text>
              <View style={{alignItems:'flex-end',flex:1, marginRight:19.6}}>
                <Image
                    style={styles.coinZeusLogo}
                    source={require('../../assets/images/home/coinZeusLogoHorizontalWhiteBg3x.png')}
                    resizeMode="contain"
                />
                </View>                
            </View>
            <View style={{alignItems:'center',height:39,marginTop:20}}>
          <Text style={styles.tgText}>{userTg}TG</Text>
            </View>

            <Text style={styles.insertNumber}>{t('accountNumber')}</Text>

            <View style={styles.flexDirectionRow1}>
              <View style={styles.memberNumberArea}>
                <TextInput
                    style={styles.memberNumberText}
                    value={identifyNumber}
                    editable={false}
                    allowFontScaling={false}
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
      
        <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Screen2', {type: 'Screen2'});
            }}
            >
          <View style={styles.container5}>
              <Text style={styles.exchangeHistoryText}>{t('transactionHistory')}</Text>
          
              <View style={styles.rightButtonArea}>
                <Image
                    style={styles.rightButton}
                    source={require('../../assets/images/auth/icChevronRight24Px3x.png')}
                    resizeMode="contain">
                    </Image>
              </View>
          
          </View>
        </TouchableOpacity> 
      </React.Fragment>  
		);
	};
  
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
        {/* <View style={{marginTop:180, marginLeft:30}}>
          <Text>상호:주식회사 티지엑스씨</Text>
          <Text>주소:서울특별시 서초구 서초대로 77길 62, 108호, 109호, 110호</Text>
          <Text>전화번호:02-533-4559</Text>
          <Text>사업자번호:434-87-01576</Text>
          <Text>이메일:dev@tgxc.net</Text>
          <Text>대표이사:이영한</Text>
        </View> */}
      </View>
    )
  }
  let groupDate = '';
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor='#fff'/>
      {/* <Spinner visible={spinner}  /> */}
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
                        <Text style={styles.modalMenuText1}>거래금액 :</Text><Text style={styles.modalMenuText}> {modalTradeAmount}</Text><Text style={styles.modalMenuText}>TG</Text>
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
              

              <TouchableOpacity
                        onPress={toggleModal}
                        >
              <View style={styles.modalBottomBtnArea}>
                <View style={{justifyContent:'center', alignItems:'center'}}>                 
                    <Text style={styles.bottomCancelBtnText}>확인</Text>                 
                </View>
                
             </View>
             </TouchableOpacity>     
          
          </View>
          </View>
        </Modal>

      <View style={styles.container}>
        <View style={styles.container3}>          
            <View style={styles.personArea}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('MemberInfo', {});
              }}
              >
                <Image
                    style={styles.personText}
                    source={require('../../assets/images/home/icPersonPin24Px3x.png')}
                    resizeMode="contain"
                />
                </TouchableOpacity>
            </View>

            <View style={styles.logoArea}>
                <Image
                    style={styles.tinyLogo}
                    source={require('../../assets/images/tgxc-logo-horizontal-b3x.png')}
                    resizeMode="contain"
                />
            </View>
            
            <View style={styles.alarmArea}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('Alarm', {});
              }}
              >
              { alarmCnt && (
                  <Image
                  style={styles.alarmText}
                  source={require('../../assets/images/home/alarmOn3x.png')}
                  resizeMode="contain"
                  />
              )}
              { !alarmCnt && (
                  <Image
                  style={styles.alarmText}
                  source={require('../../assets/images/home/icNotifications24Px3x.png')}
                  resizeMode="contain"
                  />
              )}
                
              </TouchableOpacity>
            </View>
         </View>
         <View style={{width:screenWidth,backgroundColor:'rgb(248,247,245)', height:36, marginTop:5}}>
          <View style={styles.container3}>        
            <Text style={styles.homeWelcomeText}>{t('sayHi')}</Text><Text style={styles.homeWelcomeText1}> {userName}</Text><Text style={styles.homeWelcomeText}>{t('nim')} {t('isTgxc')}</Text>
          </View>
         </View>

                                  
         {/* <View>거래내역 없을때</View> */}
         <View style={styles.lineStyle}></View>
         

      <FlatList
        contentContainerStyle={{
          paddingBottom: 150,
        }}
				contentInsetAdjustmentBehavior="automatic"
        data={tradeInfo}
        ListHeaderComponent={renderHeader}
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
          console.log(item);
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
                                setModalTradeReqNumber(item.reqNumber && item.reqNumber);
                                if(item.tradeType === 'EXCHANGE'){
                                  setModalExchangeStore(item.exchangeStore.storeAddr);
                                  setModalPhoneNumber(item.exchangeStore.storePhoneNumber);
                                }
                                setModalNote(item.note);  
                                setModalStatus(item.status);
                                setModalTradeType(tradeTypeText); 
                                setModalTradeAddr(item.walletAddr);
                                setModalTradeAmount(item.amount); 
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
                      setModalNote(item.note);  
                      setModalStatus(item.status);
                      setModalTradeType(tradeTypeText); 
                      setModalTradeAddr(item.walletAddr);
                      setModalTradeAmount(item.amount); 
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
      
      {/* <View style={{marginLeft:30}}>
        <Text>상호:주식회사 티지엑스씨</Text>
        <Text>주소:서울특별시 서초구 서초대로 77길 62, 108호, 109호, 110호</Text>
        <Text>전화번호:02-533-4559</Text>
        <Text>사업자번호:434-87-01576</Text>
        <Text>이메일:dev@tgxc.net</Text>
        <Text>대표이사:이영한</Text>
      </View>   */}

      </View>
      
      
    
      
      
    </SafeAreaView>
  );
}



var styles = StyleSheet.create({
	  container: {
      width: screenWidth,
      height:screenheight,
      flexDirection: 'column',
      backgroundColor:'#FFF'
    },
    tinyLogo: {
      width: 119.2,
      height: 40,
    },
    container2: {
      justifyContent: 'center',
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
      height:40.5,
      marginTop:20,
      justifyContent:'center',
      alignItems:'center'
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
      width:17,
      height:19.5
      // alignItems:'flex-end'
    },
    personArea:{
      marginTop:5,
      justifyContent:'center',
      alignItems:'flex-start',
    },
    personText:{
      width:20,
      height:20
    },
    homeWelcomeText:{
      fontSize:12,
      textAlign:'left',
      lineHeight:14,
      letterSpacing:-0.12,
      color:'rgb(43,43,43)',
      marginTop:11.5,
      fontFamily:'NanumBarunGothic' 
    },
    homeWelcomeText1:{
      fontSize:12,
      textAlign:'left',
      lineHeight:14,
      letterSpacing:-0.12,
      color:'rgb(43,43,43)',
      marginTop:11.5,
      fontFamily:'NanumBarunGothicBold' 
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
      flex:1,
      fontFamily:'NanumBarunGothicBold'
    },
    rightButton:{
      width:6.2,
      height:10,
    },
    rightButtonArea:{
      flex:1,
      alignItems:'flex-end'
    },
    lineStyle:{
      width:screenWidth,
      borderWidth: 0.5,
      borderColor:'rgb(214,213,212)'
    },
    border1:{
      width:screenWidth-32,
      height:62,
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
      fontFamily:'NanumBarunGothic' 
    },
    tradeAddr:{
      fontSize:12,
      lineHeight:14,
      letterSpacing:-0.12,
      color:'rgb(108,108,108)',
      fontFamily:'NanumBarunGothic' 
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
    bottomBtnArea:{
      width: screenWidth, 
      height: 69.6, 
      backgroundColor: 'rgb(214,213,212)', 
      justifyContent: 'center', 
      alignItems: 'center'
    //   marginTop:screenheight
    },
    modalType:{
      width:343,
      height:400,
      borderRadius:12,
      backgroundColor:'rgb(255,255,255)'
    },
    modalType1:{
      width:343,
      height:450,
      borderRadius:12,
      backgroundColor:'rgb(255,255,255)'
    },
    modalLineMarginTop:{
      marginTop:350-300
    },
    modalLineMarginTop1:{
      marginTop:500-460
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
    modalBottomBtnArea:{
      // flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      height:50
    },
    bottomCancelBtnText:{
      fontSize:17,
      textAlign:'center',

      lineHeight:22,
      letterSpacing:-0.41,
      color:'rgb(43,43,43)',
      fontFamily:'NanumBarunGothic'
    },
    lineStyle1:{
      width:343,
      borderWidth: 0.5,
      borderColor:'rgb(214,213,212)'
    },
    lineStyle2:{
      marginTop:65,
      width:343,
      borderWidth: 0.5,
      borderColor:'rgb(214,213,212)'
    }


    
    
});

export default HomeScreen;
