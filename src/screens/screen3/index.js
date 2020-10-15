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

function Screen3(props) {
  // console.log(props);

  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" />
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
            <Text style={styles.homeWelcomeText}>안녕하세요. $USERNAME님. TGXC입니다.</Text>
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
                    placeholder=" 고유회원번호"
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

         <View style={{height:60, justifyContent:'center', marginTop:20, borderBottomWidth:0.5, borderBottomColor:'rgb(214,213,212)'}}>
          <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Deposit', {type: 'Deposit'});
              }}
              >
              <View style={styles.container5}>
                <Text style={styles.exchangeHistoryText}>TG입금하기</Text>
                                  <View style={styles.rightButtonArea}>
                                      <Image
                                          style={styles.rightButton}
                                          source={require('../../assets/images/auth/icChevronRight24Px2x.png')}
                                          resizeMode="contain">
                                          </Image>
                                  </View>
              </View>
          </TouchableOpacity>
         </View>    

         <View style={{height:60, justifyContent:'center', borderBottomWidth:0.5, borderBottomColor:'rgb(214,213,212)'}}>   
            <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Withdraw', {type: 'Withdraw'});
            }}
            >
            <View style={styles.container5}>
              <Text style={styles.exchangeHistoryText}>TG이체하기</Text>

                    <View style={styles.rightButtonArea}>
                      <Image
                          style={styles.rightButton}
                          source={require('../../assets/images/auth/icChevronRight24Px2x.png')}
                          resizeMode="contain">
                          </Image>
                    </View>
                
            </View>
         </TouchableOpacity>
         </View>

         <View style={{height:60, justifyContent:'center', borderBottomWidth:0.5, borderBottomColor:'rgb(214,213,212)'}}>
            <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('Exchange', {type: 'Exchange'});
                }}
                >
                <View style={styles.container5}>
                  <Text style={styles.exchangeHistoryText}>TG교환하기</Text>
                  
                      <View style={styles.rightButtonArea}>
                        <Image
                            style={styles.rightButton}
                            source={require('../../assets/images/auth/icChevronRight24Px2x.png')}
                            resizeMode="contain">
                        </Image>
                      </View>
                    
                </View>
            </TouchableOpacity>
           </View>
        
       

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
      color:'rgb(43,43,43)'
    },
    coinZeusText:{
      fontSize:10,
      textAlign:'left',
      lineHeight:12,
      letterSpacing:-0.1,
      color:'rgb(152,152,152)',
      marginLeft:7
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
      color:'rgb(43,43,43)'
    },
    insertNumber:{
      fontSize:12,
      textAlign:'left',
      lineHeight:18,
      letterSpacing:-0.12,
      color:'rgb(152,152,152)',
      marginLeft:20,
      marginTop:25.2
    },
    randomText:{
      fontSize:12,
      textAlign:'center',
      lineHeight:14,
      letterSpacing:-0.12,
      color:'rgb(213,173,66)'
    },
    memberNumberText:{
      fontSize:12,
      height: 32,
      flex:2,
      borderRadius:4,
      borderWidth:1,
      borderColor:'rgb(214,213,212)',
      marginTop:5.8, 
      paddingLeft:10,
      color:'rgb(255,255,255)',
      opacity:0.7
    },
    randomArea:{
      height:32,
      flex:1, 
      borderWidth:1,
      borderColor:'rgb(214,213,212)', 
      borderRadius:4, 
      color:'rgb(255,255,255)',
      marginLeft:6,
      marginTop:5.8, 
      opacity:0.7, 
      justifyContent:'center'
    },
    exchangeHistoryText:{
      fontSize:14,
      textAlign:'left',
      lineHeight:16,
      letterSpacing:-0.14,
      color:'rgb(43,43,43)',
      alignItems:'center',
      flex:1
    },
    rightButton:{
      width:6.2,
      height:10,
    },
    rightButtonArea:{
      flex:1,
      alignItems:'flex-end'
    }
    
    


    
    
});

export default Screen3;
