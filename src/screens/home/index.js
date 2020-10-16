import React from 'react';
import {StatusBar, StyleSheet, SafeAreaView, Text, Image, View, Dimensions, TextInput, Platform, TouchableOpacity} from 'react-native';
import DeviceInfo from 'react-native-device-info';
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
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content"/>
      <View style={styles.container}>
        <View style={styles.container3}>          
            <View style={styles.personArea}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('MemberInfo', {type: 'MemberInfo'});
              }}
              >
                <Image
                    style={styles.personText}
                    source={require('../../assets/images/home/icPersonPin24Px.png')}
                    resizeMode="contain"
                />
                </TouchableOpacity>
            </View>

            <View style={styles.logoArea}>
                <Image
                    style={styles.tinyLogo}
                    source={require('../../assets/images/tgxc-logo-horizontal-b.png')}
                    resizeMode="contain"
                />
            </View>
            
            <View style={styles.alarmArea}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('Alarm', {type: 'Alarm'});
              }}
              >
                <Image
                    style={styles.alarmText}
                    source={require('../../assets/images/home/alarmOn.png')}
                    resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
         </View>
         <View style={{width:screenWidth,backgroundColor:'rgb(248,247,245)', height:36, marginTop:5}}>
          <View style={styles.container3}>        
            <Text style={styles.homeWelcomeText}>안녕하세요.</Text><Text style={styles.homeWelcomeText1}> $USERNAME</Text><Text style={styles.homeWelcomeText}>님. TGXC입니다.</Text>
          </View>
         </View>

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
                <Text style={styles.tgText}>999TG</Text>
              </View>

              <Text style={styles.insertNumber}>입금번호</Text>

              <View style={styles.flexDirectionRow1}>
                <TextInput
                    style={styles.memberNumberText}
                    value=" 고유회원번호"
                    allowFontScaling={false}
                    placeholderTextColor="rgb(43,43,43)"
                    // onChangeText={(text) => this.setState({text})}
                />
                <View style={styles.randomArea}>
                    <TouchableOpacity
                            // onPress={() => {
                            //     props.navigation.navigate('Login', {type: 'Login'});
                            // }}
                            >
                    
                        <Text style={styles.randomText}>입금난수</Text>               
                    </TouchableOpacity>
                </View>                            
              </View>
           </View>
         </View>
         
         <View style={styles.container5}>
           <Text style={styles.exchangeHistoryText}>거래내역</Text>
           <TouchableOpacity
                            style={styles.rightButtonArea}
                            onPress={() => {
                              props.navigation.navigate('Screen2', {type: 'Screen2'});
                            }}
                            >
                                <Image
                                    style={styles.rightButton}
                                    source={require('../../assets/images/auth/icChevronRight24Px2x.png')}
                                    resizeMode="contain">
                                    </Image>
            </TouchableOpacity>
         </View>

         {/* <View>거래내역 없을때</View> */}
         {/* <View style={styles.lineStyle}></View>

         <View style={styles.container3}>
                <View style={styles.border1}>
                    <Text style={styles.noTradeText}>거래내역이 존재하지 않습니다.</Text>          
                    <Text style={styles.noTradeText}>TG입금을 통해 첫 거래를 시작해보세요.</Text>
                </View>
         </View> */}

         {/* <View>거래내역 있을때</View> */}
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
      height: 32,
      flex:2,
      borderRadius:4,
      borderWidth:1,
      borderColor:'rgba(214,213,212,0.36)',
      marginTop:5.8, 
      paddingLeft:10,
      color:'rgb(43,43,43)',
      lineHeight:14,
      letterSpacing:-0.12,
      fontFamily:'NanumBarunGothic'
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
    }


    
    
});

export default HomeScreen;
