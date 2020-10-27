import React from 'react';
import RNPickerSelect from 'react-native-picker-select'
import {StatusBar, StyleSheet, SafeAreaView, Text, Image, View, Dimensions, TextInput, Platform, TouchableOpacity, ScrollView} from 'react-native';
import DeviceInfo from 'react-native-device-info';
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

  const [userInfo, setUserInfo] = React.useState([]);
  const [tradeInfo, setTradeInfo] = React.useState([]);
  const [exchange, setExchange] = React.useState(true);

  React.useEffect(() => {
		(async function anyNameFunction() {
      const user = await AsyncStorage.getItem('user');
      const tradeList = await AsyncStorage.getItem('tradeList');

      // console.log(user);
      console.log(tradeList);
      setUserInfo(JSON.parse(user));
      setTradeInfo(JSON.parse(tradeList));
      if(Object.keys(tradeInfo).length == 0){
        setExchange(false);
      }
		})();
  }, []);

  const [selectText, setSelectText] = React.useState([]);

  // console.log(props);
  return (
    <SafeAreaView>
      <StatusBar/>
      <View style={styles.container}>
            <View style={{marginTop:15.5}}>
                <View style={styles.container2}>
                    <Text style={styles.findIdTitle}>거래내역</Text>
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
                      // value:{selectText}
                    }}
                    Icon={() => {
                        return <Image
                            source={require('../../assets/images/screen3/icExpandMore24Px.png')}
                        />
                    }}
                  // onValueChange={(value) => console.log(value)}
                  onValueChange={(value) => {setSelectText(value);}}
                  items={[
                      { label: '입금', value: '입금' },
                      { label: '출금', value: '출금' },
                      { label: '교환신청', value: '교환신청' },
                  ]}
              />
            </View>

      <ScrollView>

        {/* <View>거래내역 없을때</View> */}
        <View style={styles.lineStyle}></View>
         {
           !exchange && (
          
            <View style={styles.container3}>
                   <View style={styles.border1}>
                       <Text style={styles.noTradeText}>거래내역이 존재하지 않습니다.</Text>          
                       <Text style={styles.noTradeText}>TG입금을 통해 첫 거래를 시작해보세요.</Text>
                   </View>
            </View>
           )
         }            


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
            
            
      </ScrollView>
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
        height:32,
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
