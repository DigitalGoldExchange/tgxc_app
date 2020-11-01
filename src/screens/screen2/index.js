import React from 'react';
import RNPickerSelect from 'react-native-picker-select'
import {StatusBar, StyleSheet, SafeAreaView, Text, Image, View, Dimensions, TextInput, Platform, TouchableOpacity, ScrollView, Alert,FlatList} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {me, changeSelectText} from '../../service/auth';
import {useTranslation} from 'react-i18next';
import Moment from 'moment';
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

  const [userInfo, setUserInfo] = React.useState([]); 
  const [tradeInfo, setTradeInfo] = React.useState([]);
  const [exchange, setExchange] = React.useState(true);
  const [selectText, setSelectText] = React.useState(); 
  const [userName, setUserName] = React.useState();
  const [userId, setUserId] = React.useState();
  const [userTg, setUserTg] = React.useState();
  const [identifyNumber, setIdentifyNumber] = React.useState();
  const [alarmCnt, setAlarmCnt] = React.useState();
  const [isFetching,setIsFetching] = React.useState(false);
  const {t, i18n} = useTranslation();
  React.useEffect(() => {   
    
    setSelectText(props.route.params && props.route.params.selectValue);
  
  },[props]);

  React.useEffect(() => {   
    
    (async function anyNameFunction() {
      const res = await me();
        console.log(res);
        setUserTg(res.data.user.totalTg);
        setUserName(res.data.user.name);
        setIdentifyNumber(res.data.user.identifyNumber);
        setUserId(res.data.user.userId);
        setAlarmCnt(res.data.unreadPushCount);

      // console.log(user);
      setTradeInfo(res.data.exchangeList);
      if(Object.keys(tradeInfo).length == 0){
        setExchange(false);
      }

    })();


  },[]);
  

  const onChangeSelectText = async (value) => {
      console.log("value:"+value);
      setSelectText(value);
      const selectExchange = await changeSelectText(value);
      console.log(selectExchange.data.exchangeList);
      setTradeInfo(selectExchange.data.exchangeList);
      
  }
  // list가 없을때
  const emptyRender = () => {
    return (
      <View style={styles.container3}>
              <View style={styles.border1}>
                  <Text style={styles.noTradeText}>{t('noTrade')}</Text>          
                  <Text style={styles.noTradeText}>{t('noTrade1')}</Text>
              </View>
      </View>
    )
  }
  
  const onRefresh = async () => {
		setIsFetching(true);
		const res = await me();
    setUserTg(res.data.user.totalTg);
    setUserName(res.data.user.name);
    setIdentifyNumber(res.data.user.identifyNumber);
    setUserId(res.data.user.userId);
    setAlarmCnt(res.data.unreadPushCount);

    console.log(res.data.exchangeList);
  // console.log(user);
    setTradeInfo(res.data.exchangeList);
  // if(Object.keys(tradeInfo).length == 0){
    if(Object.keys(tradeInfo).length == 0){
      setExchange(false);
    }
		setTimeout(() => {
			setIsFetching(false);
		},500)
		
  }
  
  return (
    <SafeAreaView>
      <StatusBar backgroundColor='#fff'/>
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
                      label:"전체내역",
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
                      { label: '입금', value: '입금' },
                      { label: '출금', value: '출금' },
                      { label: '교환신청', value: '교환신청' },
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
				renderItem={({item, index}) => {
          let tradeTypeText;
          let tradeTgText;
          let tradeAmountText;
          if(item.tradeType === 'EXCHANGE'){
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
					return (
          <View>
              <View style={styles.dayArea}>
                <Text style={styles.dayText}>{Moment(item.createDatetime).format('YYYY.MM.DD')}</Text>
              </View>
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
              </View>
            </View>
            <View style={styles.tradeLine}></View>
          </View>
          );
        }}

      />            
        {/* <View>거래내역 없을때</View> */}
        <View style={styles.lineStyle}></View>
                   


         {/* <View>거래내역 있을때</View>
        <View style={styles.dayArea}>
          <Text style={styles.dayText}>2020.08.08</Text>
        </View>
        <View style={styles.tradeContainer}>
            <Text style={styles.outPutText}>출금</Text>
            <View style={{flexDirection:'row', alignItems:'baseline', justifyContent:'flex-end', flex:1}}>
              <Text style={styles.outPutText}>99</Text>
              <Text style={styles.outTgText}>TG</Text>
            </View>
        </View>
        <View style={styles.tradeInfoContainer}>
            <Text style={styles.tradeTime}>12:12</Text>
            <View style={{flexDirection:'row',  justifyContent:'flex-end', flex:1}}>
              <Text style={styles.tradeAddr}>0x10086399dd8c1e3de736724af52587a2044c9fa2</Text>
            </View>
        </View>
        <View style={styles.tradeLine}></View>

        <View style={styles.tradeContainer}>
            <Text style={styles.inPutText}>입금</Text>
            <View style={{flexDirection:'row', alignItems:'baseline', justifyContent:'flex-end', flex:1}}>
              <Text style={styles.inPutText}>1</Text>
              <Text style={styles.inTgText}>TG</Text>
            </View>
        </View>
        <View style={styles.tradeInfoContainer}>
            <Text style={styles.tradeTime}>02:12</Text>
            <View style={{flexDirection:'row',  justifyContent:'flex-end', flex:1}}>
              <Text style={styles.tradeAddr}>0x10086399dd8c1e3de736724af52587a2044c9fa2</Text>
            </View>
        </View>
        <View style={styles.tradeLine}></View>

        <View style={styles.dayArea}>
          <Text style={styles.dayText}>2020.08.07</Text>
        </View>
        <View style={styles.tradeContainer}>
            <Text style={styles.exchangeText}>교환신청</Text>
            <View style={{flexDirection:'row', alignItems:'baseline', justifyContent:'flex-end', flex:1}}>
              <Text style={styles.exchangeText}>1</Text>
              <Text style={styles.exchangeTgText}>TG</Text>
            </View>
        </View>
        <View style={styles.tradeInfoContainer}>
            <Text style={styles.tradeTime}>12:12</Text>
            <View style={{flexDirection:'row',  justifyContent:'flex-end', flex:1}}>
              <Text style={styles.tradeAddr}>한국금거래소-종로</Text>
            </View>
        </View>
        <View style={styles.tradeLine}></View>

        <View style={styles.dayArea}>
          <Text style={styles.dayText}>2020.08.06</Text>
        </View>
        <View style={styles.tradeContainer}>
            <Text style={styles.outPutText}>출금</Text>
            <View style={{flexDirection:'row', alignItems:'baseline', justifyContent:'flex-end', flex:1}}>
              <Text style={styles.outPutText}>99</Text>
              <Text style={styles.outTgText}>TG</Text>
            </View>
        </View>
        <View style={styles.tradeInfoContainer}>
            <Text style={styles.tradeTime}>12:12</Text>
            <View style={{flexDirection:'row',  justifyContent:'flex-end', flex:1}}>
              <Text style={styles.tradeAddr}>0x10086399dd8c1e3de736724af52587a2044c9fa2</Text>
            </View>
        </View>
        <View style={styles.tradeLine}></View>

        <View style={styles.tradeContainer}>
            <Text style={styles.inPutText}>입금</Text>
            <View style={{flexDirection:'row', alignItems:'baseline', justifyContent:'flex-end', flex:1}}>
              <Text style={styles.inPutText}>1</Text>
              <Text style={styles.inTgText}>TG</Text>
            </View>
        </View>
        <View style={styles.tradeInfoContainer}>
            <Text style={styles.tradeTime}>02:12</Text>
            <View style={{flexDirection:'row',  justifyContent:'flex-end', flex:1}}>
              <Text style={styles.tradeAddr}>0x10086399dd8c1e3de736724af52587a2044c9fa2</Text>
            </View>
        </View>
        <View style={styles.tradeLine}></View>

        <View style={styles.dayArea}>
          <Text style={styles.dayText}>2020.08.05</Text>
        </View>
        <View style={styles.tradeContainer}>
            <Text style={styles.exchangeText}>교환신청</Text>
            <View style={{flexDirection:'row', alignItems:'baseline', justifyContent:'flex-end', flex:1}}>
              <Text style={styles.exchangeText}>1</Text>
              <Text style={styles.exchangeTgText}>TG</Text>
            </View>
        </View>
        <View style={styles.tradeInfoContainer}>
            <Text style={styles.tradeTime}>12:12</Text>
            <View style={{flexDirection:'row',  justifyContent:'flex-end', flex:1}}>
              <Text style={styles.tradeAddr}>한국금거래소-종로</Text>
            </View>
        </View>
        <View style={styles.tradeLine}></View> */}
            
            

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
    bottomCancelBtnText:{
        fontSize:18,
        lineHeight:20,
        textAlign:'center',
        textAlignVertical:'center',
        letterSpacing:-0.18,
        color:'rgb(255,255,255)',
        // flexDirection:'row'
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
      }
    
});

export default Screen2;
