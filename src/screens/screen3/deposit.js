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

function Deposit(props) {
  // console.log(props);

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>

        <View style={styles.container3}> 

              <View style={styles.personArea}>
                <TouchableOpacity
                  // onPress={() => setComment()}
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
                // onPress={() => setComment()}
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

         <View style={{height:41, justifyContent:'center', marginTop:20, borderBottomWidth:0.5, borderBottomColor:'rgb(214,213,212)'}}>
              <View style={styles.container5}>
                <Text style={styles.exchangeHistoryText}>TG입금하기</Text>
              </View>
         </View>
         
         <View style={styles.container4}>
            <View style={{marginLeft:20, marginTop:22, height:16, flexDirection:'row',alignItems:'center'}}>
                <Text style={styles.infoText1}>현재 고객님의</Text><Text style={styles.infoText2}> 입금번호</Text><Text style={styles.infoText1}>는</Text>
            </View>
            <View style={{flexDirection:'row', alignItems:'center', height:32}}>
                <View style={styles.border2}>
                    <Text style={styles.infoText4}>고유회원번호 + 난수</Text>
                </View>
                <Text style={styles.infoText3}> 입니다.</Text>
            </View>

            <View style={{marginTop:10, marginLeft:20}}>
                <Text style={styles.infoText5}>입금 주소는 입금 횟수, 서버 상태에 따라 매번 변경됩니다.</Text>
                <Text style={styles.infoText5}>입금 전 꼭 확인 부탁드립니다.</Text>
            </View>
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
                        props.navigation.navigate('SecondAuth', {type: 'SecondAuth'});
                    }}
                    >      
                <View style={styles.bottomRightBtn}>
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
      justifyContent:'center',
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
        backgroundColor: 'rgb(213,173,66)', 
        justifyContent: 'center', 
        alignItems: 'center'
      //   marginTop:screenheight
    },
    infoText1:{
        fontSize:14,
        textAlign:'left',
        lineHeight:16,
        letterSpacing:-0.14,
        color:'rgb(43,43,43)',
        fontFamily:'NanumBarunGothic'
    },
    infoText2:{
        fontSize:14,
        fontFamily:'NanumBarunGothicBold',
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
        height:14,
        fontFamily:'NanumBarunGothic'
    },
    infoText5:{
        fontSize:12,
        textAlign:'left',
        lineHeight:18,
        letterSpacing:-0.12,
        color:'rgb(152,152,152)',
        fontFamily:'NanumBarunGothic'
    },
    border2:{
        height:32,
        width:238,
        borderWidth:1,
        // backgroundColor:'rgba(214,213,212,0.7)',
        // borderColor:'rgb(214,213,212)'
        backgroundColor:'rgba(214,213,212,0.36)',
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
    
    


    
    
});

export default Deposit;