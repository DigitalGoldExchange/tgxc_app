import React from 'react';
import {StatusBar, StyleSheet, SafeAreaView, Text, Image, View, Dimensions, TextInput, Platform, Button, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import DeviceInfo from 'react-native-device-info';
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


function MemberInfo(props) {


  const [isModalVisible, setModalVisible] = React.useState(false);

  const [userInfo, setUserInfo] = React.useState([]);

  React.useEffect(() => {
		(async function anyNameFunction() {
      const users = await AsyncStorage.getItem('user');
      setUserInfo(JSON.parse(users));
		})();
	}, []);
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const changePassword = () => {
    alert("비밀번호 변경 로직 구현할거야");
  };

  
  // console.log(props);
  return (


    <SafeAreaView>
      <StatusBar barStyle="light-content" />


        <Modal isVisible={isModalVisible}>
          <View style={{justifyContent:'center', alignItems:'center'}}>
          <View style={styles.modalType}>

              <View style={{marginTop:20}}>
                <Text style={styles.modalTitleText}>비밀번호 변경</Text>
              </View>

              <View style={{marginTop:25}}>
                  <View style={styles.modalContailner}>
                    <View style={{width:80, alignItems:'center',justifyContent:'center'}}>
                      <Text style={styles.modalMenuText}>현재 비밀번호</Text>
                    </View>                   
                      <TextInput
                        style={styles.modalTextInputType}
                        allowFontScaling={false}
                        placeholder=" 비밀번호 입력"
                        placeholderTextColor="rgb(214,213,212)"
                        // onChangeText={(text) => this.setState({text})}
                        />
                  </View>
              </View>

              <View style={{marginTop:16}}>
                  <View style={styles.modalContailner}>
                    <View style={{width:80, alignItems:'center',justifyContent:'center'}}>
                      <Text style={styles.modalMenuText}>비밀번호 변경</Text>
                    </View>
                  
                  <TextInput
                    style={styles.modalTextInputType}
                    allowFontScaling={false}
                    placeholder=" 영어+숫자+특수문자8~20자"
                    placeholderTextColor="rgb(214,213,212)"
                    // onChangeText={(text) => this.setState({text})}
                    />
                    </View>
              </View>

              <View style={{marginTop:16}}>
                  <View style={styles.modalContailner}>
                    <View style={{width:80, alignItems:'center',justifyContent:'center'}}>
                      <Text style={styles.modalMenuText}>비밀번호 확인</Text>
                    </View>
                  
                  <TextInput
                    style={styles.modalTextInputType}
                    allowFontScaling={false}
                    placeholder=" 비밀번호 재입력"
                    placeholderTextColor="rgb(214,213,212)"
                    // onChangeText={(text) => this.setState({text})}
                    />
                    </View>
              </View>

              <View style={styles.lineStyle}></View>

            
              <View style={styles.bottomBtnArea}>
                <TouchableOpacity
                        onPress={toggleModal}
                        >
                        <View style={{width:344/2,height:43.5, justifyContent:'center', alignItems:'center', borderRightWidth:0.5, borderRightColor:'rgba(60,60,67,0.29)'}}>                     
                            <Text style={styles.bottomCancelBtnText}>취소</Text>                            
                        </View>
                </TouchableOpacity>
                <TouchableOpacity
                        onPress={changePassword}
                        >
                <View style={{width:344/2,height:43.5, justifyContent:'center', alignItems:'center'}}>                 
                    <Text style={styles.bottomCancelBtnText}>확인</Text>                 
                </View>
                </TouchableOpacity>
            </View>

          
          </View>
          </View>
        </Modal>



        <View style={styles.container}>

          <View style={styles.container3}>          
            <View style={styles.logoArea}>
                <Image
                    style={styles.tinyLogo}
                    source={require('../../assets/images/tgxc-logo-horizontal-b.png')}
                    resizeMode="contain"
                />
            </View>
          </View>
          
          <View style={styles.container4}>
            <View style={{justifyContent:'center', alignItems:'center'}}>
            <TouchableOpacity
                      onPress={() => {
                          props.navigation.navigate('App', {type: 'App'});
                      }}
                      >
              <View style={styles.arrowLeftArea}> 
                  
                          <Image
                              style={styles.arrowLeft}
                              source={require('../../assets/images/screen4/icKeyboardArrowLeft24Px3x.png')}
                              resizeMode="contain"
                              >
                          </Image>               
                  
              </View>
            </TouchableOpacity>
            </View>
            <View style={{justifyContent:'center',alignItems:'center', width:screenWidth-100}}>
                <Text style={styles.titleText}>회원정보</Text>
            </View> 
          </View>

          <View style={{marginTop:28}}>
            <View style={styles.container5}>
                <View style={{width:54}}>
                  <Text style={styles.textType}>이름</Text>
                </View>
                <View>
                <TextInput
                    style={styles.textInputType}
                    allowFontScaling={false}
                    placeholderTextColor="rgb(214,213,212)"
                    value={userInfo.name}
                    editable={false}
                    // onChangeText={(text) => this.setState({text})}
                    />
                </View>
            </View>
          </View> 

          <View style={{marginTop:20}}>
           <View style={styles.container5}>
                <View style={{width:54}}>
                  <Text style={styles.textType}>이메일</Text>
                </View>
                <View>
                <TextInput
                    style={styles.textInputType}
                    allowFontScaling={false}
                    value={userInfo.emailId}
                    editable={false}
                    placeholderTextColor="rgb(214,213,212)"
                    // onChangeText={(text) => this.setState({text})}
                    />
                </View>
            </View>
          </View>

          <View style={{marginTop:20}}>
            <View style={styles.container5}>
              <View style={{justifyContent:'center', marginRight:6}}>
                <Text style={styles.textType}>비밀번호 변경</Text>
              </View>
              <View style={{flex:4, flexDirection:'row'}}>
                <View style={{flex:3, justifyContent:'center', alignItems:'center'}}></View>
                    <TouchableOpacity
                      onPress={toggleModal}
                      >
                      <View style={styles.changeButton}><Text style={styles.changeText}>변경</Text></View>     
                    </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{marginTop:20}}>
           <View style={styles.container5}>
                <View style={{width:54}}>
                  <Text style={styles.textType}>주소</Text>
                </View>

                <View style={{flexDirection:'row'}}>
                  <TextInput
                    style={styles.textInputType1}
                    allowFontScaling={false}
                    editable={false}
                    placeholderTextColor="rgb(214,213,212)"
                    // onChangeText={(text) => this.setState({text})}
                    />
                   <TouchableOpacity
                      // onPress={() => {
                      //   props.navigation.navigate('App', {type: 'App'});
                      // }}
                      >
                      <View style={styles.changeButton}><Text style={styles.changeText}>검색</Text></View>     
                    </TouchableOpacity> 

                  
                </View>

            </View>
          </View>

          <View style={{marginTop:20}}>
           <View style={styles.container5}>
                <View style={{width:54}}>
                  <Text style={styles.textType}></Text>
                </View>
                <View>
                <TextInput
                    style={styles.textInputType2}
                    allowFontScaling={false}
                    placeholderTextColor="rgb(214,213,212)"
                    // onChangeText={(text) => this.setState({text})}
                    />
                </View>
            </View>
          </View>
          
          <View style={{marginTop:20}}>
           <View style={styles.container5}>
                <View style={{width:54}}>
                  <Text style={styles.textType}>연락처</Text>
                </View>

                <View style={{flexDirection:'row'}}>
                  <TextInput
                    style={styles.textInputType1}
                    allowFontScaling={false}
                    placeholderTextColor="rgb(214,213,212)"
                    // onChangeText={(text) => this.setState({text})}
                    />
                   <TouchableOpacity
                      // onPress={() => {
                      //   props.navigation.navigate('App', {type: 'App'});
                      // }}
                      >
                      <View style={styles.changeButton}><Text style={styles.changeText}>변경</Text></View>     
                    </TouchableOpacity> 

                  
                </View>

            </View>
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
    backgroundColor:'rgb(255,255,255)'
  },
  container3: {
    flexDirection: 'row',
    width: screenWidth - 32,
    marginHorizontal: 16,
    justifyContent:'center'
  },
  container4: {
    flexDirection: 'row',
    width: screenWidth - 32,
    marginHorizontal: 16,
    height:41,
    marginTop:5
  },
  container5: {
    flexDirection: 'row',
    width: screenWidth - 60,
    marginHorizontal: 30,
    height:46,
    justifyContent:'space-between'
    // alignItems:'center',
    // justifyContent:'center'
  },
  modalContailner:{
    flexDirection: 'row',
    width: screenWidth - 32,
    marginHorizontal: 16
  },
  logoArea: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:5
  },
  tinyLogo: {
    width: 119.2,
    height: 40,
  },
  titleArea:{
      justifyContent:'center',
      alignItems:'center'
  },
  titleText:{
      fontSize:16,
      lineHeight:19,
      letterSpacing:-0.16,
      color:'rgb(43,43,43)',
      fontFamily:'NanumBarunGothicBold'
  },
  arrowLeft:{
    width:16,
    height:16
  },
  arrowLeftArea:{
    justifyContent:'center',
    alignItems:'flex-start',
    width:30,
    height:30
  },
  textType:{
    height:16,
    fontSize:14,
    textAlign:'left',
    paddingTop:10,
    lineHeight:20,
    letterSpacing:-0.14,
    color:'rgb(108,108,108)',
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    fontFamily:'NanumBarunGothic'
  },
  textInputType:{
    height:46,
    width:screenWidth-120,
    borderRadius:4,
    borderWidth:1,
    borderColor:'rgb(214,213,212)',
    backgroundColor:'rgb(240,240,240)',
    paddingLeft:10
  },
  textInputType1:{
    height:46,
    width:(screenWidth-128)/4*3,
    borderRadius:4,
    borderWidth:1,
    borderColor:'rgb(214,213,212)',
    backgroundColor:'rgb(240,240,240)',
    marginRight:6
  },
  textInputType2:{
    height:46,
    width:screenWidth-120,
    borderRadius:4,
    borderWidth:1,
    borderColor:'rgb(214,213,212)',
    backgroundColor:'rgb(255,255,255)'
  },
  modalTextInputType:{
    marginLeft:18,
    width:208,
    height:46,
    borderRadius:4,
    backgroundColor:'rgb(255,255,255)',
    borderColor:'rgb(214,213,212)',
    borderWidth:1,
    paddingLeft:10
  },  
  changeButton:{
    borderRadius:4,
    borderWidth:1,
    borderColor:'rgb(213,173,66)',
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    width:(screenWidth-120)/4,
  },
  changeText:{
    fontSize:14,
    textAlign:'center',
    lineHeight:16,
    letterSpacing:-0.14,
    color:'rgb(213,173,66)',
    fontFamily:'NanumBarunGothicBold'
  },
  modalType:{
    width:343,
    height:308,
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
  modalMenuText:{
    fontSize:14,
    textAlign:'left',
    lineHeight:20,
    letterSpacing:-0.14,
    color:'rgb(108,108,108)',
    fontFamily:'NanumBarunGothic'
  },
  lineStyle:{
    marginTop:30,
    width:screenWidth,
    borderWidth: 0.5,
    borderColor:'rgba(60,60,67,0.29)'
  },
  bottomBtnArea:{
    flexDirection:'row'
  },
  bottomCancelBtnText:{
    fontSize:17,
    textAlign:'center',
    lineHeight:22,
    letterSpacing:-0.41,
    color:'rgb(43,43,43)',
    fontFamily:'NanumBarunGothic'
  }




  
  
});

export default MemberInfo;
