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

function Screen4(props) {
  // console.log(props);
  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" />
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
              <Text style={styles.homeWelcomeText}>안녕하세요. $USERNAME님. TGXC입니다.</Text>
            </View>
          </View>  

          <View style={styles.buttonContainer}>
            <View style={{justifyContent:'flex-start', alignItems:'flex-start'}}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('App', {type: 'App'});
                }}
              >
              <View style={styles.personInfoBtn}>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                  <Image
                    style={styles.personPinImg}
                    source={require('../../assets/images/screen4/icPersonPin24Px.png')}
                  >
                  </Image>
                  <Text style={styles.personPinText}>개인정보</Text>
                </View>
              </View>
              </TouchableOpacity>
            </View>
            <View style={{flex:1, justifyContent:'flex-end', alignItems:'flex-end'}}>
              <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('App', {type: 'App'});
                  }}
                >
              <View style={styles.personInfoBtn}>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                  <Image
                    style={styles.personPinImg}
                    source={require('../../assets/images/screen4/icSettings24Px.png')}
                  >
                  </Image>
                  <Text style={styles.personPinText}>고객센터</Text>
                </View>
              </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.titleArea}>
            <Text style={styles.titleText}>TG교환신청</Text>
          </View>
          
          <View style={styles.subTitleArea}>
            <View style={{marginTop:14}}>
              <Text style={styles.subTitleText}>TG교환 신청하기</Text>
            </View>
            <View style={{marginTop:12}}>
              <Text style={styles.subTitleText}>신청 결과 조회</Text>
            </View>
          </View>

          <View style={styles.titleArea}>
            <Text style={styles.titleText}>TG이체</Text>
          </View>

          <View style={styles.subTitleArea}>
            <View style={{marginTop:14}}>
              <Text style={styles.subTitleText}>TG이체 신청하기</Text>
            </View>
            <View style={{marginTop:12}}>
              <Text style={styles.subTitleText}>출금 결과 조회</Text>
            </View>
          </View>        

          <View style={styles.titleArea}>
            <Text style={styles.titleText}>TG입금확인</Text>
          </View>

          <View style={styles.subTitleArea}>
            <View style={{marginTop:14}}>
              <Text style={styles.subTitleText}>TG입금주소 확인</Text>
            </View>
            <View style={{marginTop:12}}>
              <Text style={styles.subTitleText}>입금 결과 조회</Text>
            </View>
          </View>

          <View style={styles.titleArea}>
            <Text style={styles.titleText}>거래내역</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Setting', {type: 'Setting'});
            }}
            >
            <View style={styles.titleArea}>
              <Text style={styles.titleText}>설정</Text>
            </View>
          </TouchableOpacity>
          


        </View>
    </SafeAreaView>
  );
}

var styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height:screenheight,
    flexDirection: 'column',
    backgroundColor:'rgb(255,255,255)'
    
  },
  container3: {
    flexDirection: 'row',
    width: screenWidth - 32,
    marginHorizontal: 16,
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
  logoArea: {
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth - 72,
    marginTop:5
  },
  tinyLogo: {
    width: 119.2,
    height: 40,
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
  homeWelcomeText:{
    fontSize:12,
    textAlign:'left',
    lineHeight:14,
    letterSpacing:-0.12,
    color:'rgb(43,43,43)',
    marginTop:11.5,
  },
  buttonContainer:{
    flexDirection:'row',
    width: screenWidth - 52,
    marginHorizontal: 26,
    height:60,
    marginTop:20,
    marginBottom:20,
    justifyContent:'center'
  },
  personInfoBtn:{
    width:150,
    height:60,
    borderRadius:4,
    borderWidth:0.5,
    backgroundColor:'rgba(214,213,212,0.1)',
    borderColor:'rgb(214,213,212)',
    justifyContent:'center',
    alignItems:'center'
  },
  personPinImg:{
    width:24,
    height:21.4,
    marginRight:8.6
  },
  personPinText:{
    fontSize:14,
    textAlign:'center',
    lineHeight:16,
    letterSpacing:-0.14,
    color:'rgb(108,108,108)'
  },
  titleArea:{
    width:screenWidth,
    height:41,
    backgroundColor:'rgba(214,213,212,0.3)',
    justifyContent:'center',
    alignItems:'center'
  },
  titleText:{
    fontSize:16,
    textAlign:'left',
    lineHeight:19,
    letterSpacing:-0.16,
    color:'rgb(43,43,43)',
    width: screenWidth - 52,
    marginHorizontal: 26,
  },
  subTitleText:{
    fontSize:14,
    textAlign:'left',
    lineHeight:20,
    letterSpacing:-0.14,
    color:'rgb(152,152,152)'
  },
  subTitleArea:{
    height:75,
    width:screenWidth-52,
    marginHorizontal:26
  },



  
  
});

export default Screen4;
