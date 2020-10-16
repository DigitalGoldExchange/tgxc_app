import React from 'react';
import {StatusBar, StyleSheet, SafeAreaView, Text, Image, View, Dimensions, TextInput, Platform, TouchableOpacity} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { ScrollView } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select'
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
	containerHeight = 85;
}

function Exchange(props) {
  // console.log(props);

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>

            <View style={{marginTop:15.5}}>
                <View style={styles.container6}>
                    <Text style={styles.findIdTitle}>TG교환</Text>           
                </View>
            </View>
            <View style={styles.lineStyle}></View>

    <ScrollView>

         <View style={{height:16, justifyContent:'center', marginTop:20}}>
            <View style={styles.container5}>
            <Text style={styles.exchangeHistoryText}>교환할TG</Text>
            
            </View>
         </View>

         <View style={styles.container3}>
             <View>
                <TextInput
                    style={{height: 46,width: 147,borderRadius:4,marginTop:6,borderWidth:1,borderColor:'rgb(214,213,212)',paddingLeft:120,color:'rgb(255,255,255)'}}
                    placeholder="g"
                    allowFontScaling={false}
                    placeholderTextColor="rgb(108,108,108)"
                    // onChangeText={(text) => this.setState({text})}
                    />
             </View>
             <View style={{alignItems:'center', justifyContent:'center', width:49, paddingLeft:16, paddingRight:15}}>
                 <Image
                    style={{width:18, height:14, marginTop:6}}
                    source={require('../../assets/images/screen3/icImportExport24Px.png')}
                    resizeMode="contain">
                 </Image>
             </View>   
             <View>
                <TextInput
                    style={{height: 46,width: 147,borderRadius:4,marginTop:6,borderWidth:1,borderColor:'rgb(214,213,212)',paddingLeft:120,backgroundColor:'rgb(240,240,240)'}}
                    placeholder="TG"
                    allowFontScaling={false}
                    placeholderTextColor="rgb(108,108,108)"
                    // onChangeText={(text) => this.setState({text})}
                    />
             </View> 
              
         </View>


         <View style={{height:16, justifyContent:'center', marginTop:24}}>
              <View style={styles.container5}>
                <Text style={styles.exchangeHistoryText}>수령방식</Text>
              </View>
         </View>

         <View style={styles.container2}>
           <View style={{flexDirection:'row', marginTop:20}}>
                <View style={{flex:1}}>
                    <Text style={styles.methodText}>방문수령</Text>
                </View>
                <View style={{flex:1}}>
                    <Text style={styles.methodText}>우편수령</Text>
                </View>
            </View>
         </View>

         <View style={{height:16, justifyContent:'center', marginTop:30}}>
              <View style={styles.container5}>
                <Text style={styles.exchangeHistoryText}>수령 지점 선택</Text>
              </View>
         </View>  

         <View style={styles.container4}>
           <View style={{marginTop:6}}>
              <RNPickerSelect
                  style={{
                      inputIOS:styles.selectType,
                      inputAndroid:styles.selectType,
                      iconContainer:{
                          left:203,
                        //   top:Platform.OS == "ios" ? 0:13
                        top:19
                      }
                    }}
                  placeholder={{
                      label:"지점을 선택해주세요.", 
                      value:null
                      
                    }}
                    Icon={() => {
                        return <Image
                            source={require('../../assets/images/screen3/icExpandMore24Px.png')}
                        />
                    }}
                  onValueChange={(value) => console.log(value)}
                  items={[
                      { label: '서울-종로3M매장', value: '서울-종로3M매장' },
                      { label: '부산-부산 매장', value: '부산-부산 매장' },
                      { label: '광주-광주 매장', value: '광주-광주 매장' },
                  ]}
              />
           </View> 
         </View>

         <View style={{height:16, justifyContent:'center', marginTop:24}}>
              <View style={styles.container5}>
                <Text style={styles.exchangeHistoryText}>신분증 사진</Text>
              </View>
         </View>

         <View style={styles.uploadContainer}> 
            <View style={{height:151,width: (screenWidth - 39) / 3 * 2, borderRadius:4,borderWidth:1,borderColor:'rgb(214,213,212)', backgroundColor:'rgb(240,240,240)'}}>
                <Text style={styles.sampleImageText}>Sample Image</Text>
                <View style={{width:154.6, height:89.7, marginTop:13.8, marginLeft:60}}>
                    <Image
                         source={require('../../assets/images/screen3/7.png')}
                         resizeMode="contain"
                    />
                </View>    
            </View>
            <View style={styles.findAddr}> 
                <TouchableOpacity
                        // onPress={() => {
                        //     props.navigation.navigate('Login', {type: 'Login'});
                        // }}
                        >
                    <Text style={styles.findAddrText}>업로드</Text>               
                </TouchableOpacity>
            </View>
         </View>

         <View style={{height:16, justifyContent:'center', marginTop:24}}>
              <View style={styles.container5}>
                <Text style={styles.exchangeHistoryText}>신분증을 들고있는 사진</Text>
              </View>
         </View>

         <View style={styles.uploadContainer}> 
            <View style={{height:151,width: (screenWidth - 39) / 3 * 2, borderRadius:4,borderWidth:1,borderColor:'rgb(214,213,212)', backgroundColor:'rgb(240,240,240)', flexDirection:'row'}}>
                <Text style={styles.sampleImageText}>Sample Image</Text>
                <View style={{width:113, height:131.8, marginTop:16}}>
                    <Image
                         source={require('../../assets/images/screen3/13.png')}
                         resizeMode="contain"
                    />
                </View>    
            </View>
            <View style={styles.findAddr}> 
                <TouchableOpacity
                        // onPress={() => {
                        //     props.navigation.navigate('Login', {type: 'Login'});
                        // }}
                        >
                    <Text style={styles.findAddrText}>업로드</Text>               
                </TouchableOpacity>
            </View>
         </View>

         <View style={{height:16, alignItems:'center', marginTop:23, width:screenWidth-32, marginHorizontal:16, flexDirection:'row'}}>
          
              {/* <View style={styles.container5}> */}
                <Text style={styles.exchangeHistoryText1}>OTP 인증</Text>

                <TouchableOpacity
                            style={styles.buttonBox1}
                            // onPress={() => {
                            //     kakaoLogin();
                            // }}
                            >
                                <Image
                                    source={require('../../assets/images/screen3/btnOtp.png')}
                                    resizeMode="contain">
                                    </Image>
                        </TouchableOpacity>


              {/* </View> */}
         </View>
         <View style={{marginTop:10.2, width:screenWidth-32, marginHorizontal:16}}>
                <Text style={styles.textStyle3}>구글 OTP에 생성된 6자리 인증 숫자를 입력해주세요.</Text>
        </View>

        <View style={styles.container6}>
                <TextInput
                    style={{height: 46,width: (screenWidth - 39) / 3 * 2,borderRadius:4,borderWidth:1,borderColor:'rgb(214,213,212)',marginTop:9.8, paddingLeft:10,color:'rgb(255,255,255)'}}
                    placeholder=" Verification Code"
                    allowFontScaling={false}
                    placeholderTextColor="rgb(214,213,212)"
                    // onChangeText={(text) => this.setState({text})}
                    />
                <View style={styles.findAddr}>
                    <TouchableOpacity
                            // onPress={() => {
                            //     props.navigation.navigate('Login', {type: 'Login'});
                            // }}
                            >
                    
                        <Text style={styles.findAddrText}>인증하기</Text>               
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{height:30, width:screenWidth, backgroundColor:'#FFF'}}>

            </View>


         
         </ScrollView>        

         

      </View>

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
        width: screenWidth - 32,
        marginHorizontal: 16,
        height:151,
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
        width:138,
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
    }
    
    


    
    
});

export default Exchange;
