import React from 'react';
import {useTranslation} from 'react-i18next';
import {StatusBar, StyleSheet, SafeAreaView, Text, Image, View, Dimensions, Platform, TouchableOpacity, Alert} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import i18n from '../language/i18n';
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

function SignUp(props) {
  const {t} = useTranslation();
  // console.log(props);

  const [mandatoryBtn, setMandatoryBtn] = React.useState(true);
  const [marketingBtn, setMarketingBtn] = React.useState(true);
  // const [renderImg, setRenderImg] = React.useState();

  const mandatoryCheck = () => {
    if(mandatoryBtn){
      return (<TouchableOpacity                 
        style={styles.buttonBox0}
        onPress={() => {
            joinMemberMandatory();
        }}
        >
          </TouchableOpacity>
       )
    }else{
      return (
        <TouchableOpacity
          style={styles.buttonBox3}
          onPress={() => {
              joinMemberMandatory();
          }}
        >
          <Image
            style={{marginTop:-2, marginLeft:-2}}
            source={require('../../assets/images/auth/iconCheckCircleRounded.png')}
            resizeMode="contain"
            >
          </Image>
        </TouchableOpacity>
        
      )
    }
    
  } 
  
  const marketingOpt= () => {
    if(marketingBtn){
      setMarketingBtn(false);
    }else{
      setMarketingBtn(true);
    }   
    
  };

  const marketingCheck = () => {
    if(marketingBtn){
      return (<TouchableOpacity                 
        style={styles.buttonBox0}
        onPress={() => {
          marketingOpt();
        }}
        >
          </TouchableOpacity>
       )
    }else{
      return (
        <TouchableOpacity
          style={styles.buttonBox3}
          onPress={() => {
            marketingOpt();
          }}
        >
          <Image
            style={{marginTop:-2, marginLeft:-2}}
            source={require('../../assets/images/auth/iconCheckCircleRounded.png')}
            resizeMode="contain"
            >
          </Image>
        </TouchableOpacity>
        
      )
    }
    
  } 
  
  const joinMemberMandatory= () => {
    if(mandatoryBtn){
      setMandatoryBtn(false);
    }else{
      setMandatoryBtn(true);
    }   
    
  };


  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor='#fff'/>
      <View style={styles.container}>
            <View style={{marginTop:15.5}}>
                <View style={styles.container2}>
                    <Text style={styles.findIdTitle}>{t('signUpTitle')}</Text>                          
                </View>
            </View>
            <View style={styles.lineStyle}></View>
            <View style={styles.container3}>
                <Text style={styles.textAgree}>{t('terms')}</Text>
            </View>
            <View style={styles.container3}>
                <Text style={styles.textStyle}>{t('condition')}</Text>
            </View>
            <View style={styles.container4}>
              
                <View style={mandatoryBtn?styles.border1:styles.border11}>
                    {mandatoryCheck()}
                    <TouchableOpacity
                      onPress={() => {
                        joinMemberMandatory();
                        }}
                      >
                      <Text style={mandatoryBtn?styles.textStyle1:styles.textStyle11}>{t('agreeTermsMandatory')}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.border2}>
                    <View style={styles.tgxcAuth}>
                        <Text style={styles.textStyle2}>{t('tgxcAgree')}</Text>
                        <View style={styles.buttonBoxArea}>
                            <TouchableOpacity
                                style={styles.buttonBox}
                                // onPress={() => {
                                //     kakaoLogin();
                                // }}
                                >
                                    
                                    <Image
                                        source={require('../../assets/images/auth/icChevronRight24Px.png')}
                                        resizeMode="contain">
                                        </Image>
                                        
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.tgxcAuth}>
                        <Text style={styles.textStyle3}>{t('personalInfoAgree')}</Text>
                        <View style={styles.buttonBoxArea1}>
                            <TouchableOpacity
                                style={styles.buttonBox1}
                                // onPress={() => {
                                //     kakaoLogin();
                                // }}
                                >
                                    <Image
                                        source={require('../../assets/images/auth/icChevronRight24Px.png')}
                                        resizeMode="contain">
                                        </Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.container4}>
              <View style={marketingBtn?styles.border1:styles.border11}>
                  {marketingCheck()}
                    <TouchableOpacity
                        onPress={() => {
                          marketingOpt();
                        }}
                      >
                      <Text style={marketingBtn?styles.textStyle1:styles.textStyle11}>{t('agreeMarketing')}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.border3}>
                    <View style={styles.tgxcAuth}>
                        <Text style={styles.textStyle4}>{t('agreeMarketingOption')}</Text>
                        <View style={styles.buttonBoxArea}>
                            <TouchableOpacity
                                style={styles.buttonBox}
                                // onPress={() => {
                                //     kakaoLogin();
                                // }}
                                >
                                    
                                    <Image
                                        source={require('../../assets/images/auth/icChevronRight24Px.png')}
                                        resizeMode="contain">
                                        </Image>
                                        
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            
            


            
            </View>  
            <View style={styles.bottomBtnArea}>
                <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate('Login', {type: 'Login'});
                        }}
                        >
                        <View style={styles.bottomLeftBtn}>                     
                            <Text style={styles.bottomCancelBtnText}>{t('cancel')}</Text>                            
                        </View>
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={mandatoryBtn ? true : false}
                  onPress={() => {
                    i18n.language==='ko'?
                      props.navigation.navigate('JoinStep2', {type: 'JoinStep2'})
                      :
                      props.navigation.navigate('SignUpEng', {})
                  }}
                  >
                <View style={mandatoryBtn?styles.bottomRightBtn:styles.bottomRightGoldBtn}>                 
                    <Text style={styles.bottomConfirmBtnText}>{t('confirm')}</Text>                 
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
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		width: screenWidth - 32,
		marginHorizontal: 16,
    },
    container3: {
		// justifyContent: 'center',
		// alignItems: 'center',
		flexDirection: 'row',
		width: screenWidth - 32,
		marginHorizontal: 16,
    },
    container4: {
		// justifyContent: 'center',
		// alignItems: 'center',
		flexDirection: 'column',
		width: screenWidth - 32,
		marginHorizontal: 16,
    },
    findIdTitle:{
        width:122,
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
    textStyle:{
        width:343,
        // height:36,
        fontSize:14,
        textAlign:'left',
        lineHeight:20,
        letterSpacing:-0.14,
        color:'rgba(0,0,0,0.6)',
        marginTop:3,
        fontFamily:'NanumBarunGothicLight' 
    },
    textStyle1:{
        width:300,
        height:16,
        fontSize:14,
        textAlign:'left',
        lineHeight:16,
        letterSpacing:-0.14,
        color:'rgb(108,108,108)',
        marginTop:15,
        marginBottom:15,
        marginLeft:10,
        marginRight:137,
        fontFamily:'NanumBarunGothic' 
    },
    textStyle11:{
      width:300,
      height:16,
      fontSize:14,
      textAlign:'left',
      lineHeight:16,
      letterSpacing:-0.14,
      color:'rgb(213,173,66)',
      marginTop:15,
      marginBottom:15,
      marginLeft:10,
      marginRight:137,
      fontFamily:'NanumBarunGothic' 
    },
    textStyle2:{
        // width:200,
        height:18,
        fontSize:12,
        textAlign:'left',
        lineHeight:18,
        letterSpacing:-0.12,
        color:'rgb(108,108,108)',
        marginTop:13,
        // marginBottom:15,
        marginLeft:16,
        // marginRight:176,
        fontFamily:'NanumBarunGothic' 
    },
    textStyle3:{
        width:250,
        fontSize:12,
        textAlign:'left',
        lineHeight:18,
        letterSpacing:-0.12,
        color:'rgb(108,108,108)',
        marginTop:22,
        // paddingBottom:20,
        // marginBottom:9,
        marginLeft:16,
        // marginRight:150,
        fontFamily:'NanumBarunGothic'
        
    },
    textStyle4:{
        width:200,
        fontSize:12,
        textAlign:'left',
        lineHeight:18,
        letterSpacing:-0.12,
        color:'rgb(108,108,108)',
        marginTop:13,
        // marginBottom:9,
        marginLeft:16,
        // marginRight:126,
        fontFamily:'NanumBarunGothic' 
    },
    mobileAuthText:{
        width:106,
        height:19,
        fontSize:16,
        textAlign:'left',
        letterSpacing:-0.16,
        lineHeight:19,
        color:'rgb(43,43,43)',
        marginTop:35
    },
    buttonBox0:{
        width:20,
        height:20,
        borderRadius:10,
        borderWidth:1.5,
        borderColor:'rgb(214,213,212)',
        marginLeft:16,
        marginTop:13

    },
    buttonBox3:{
      width:20,
      height:20,
      // borderRadius:10,
      // borderWidth:1.5,
      // borderColor:'rgb(213,173,66)',
      marginLeft:16,
      marginTop:13,
      

  },
    buttonBox:{
        width:5,
        height:8.1
    },
    buttonBoxArea:{
        marginTop:19.5
        // marginLeft:30
    },
    buttonBoxArea1:{
        marginTop:27.9,
        marginLeft:30
    },
    buttonBox1:{
        width:5,
        height:8.1
    },
    buttonImg:{
        width:227,
        height:50
    },
    bottomBtnArea:{
        flexDirection:'row'
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
    bottomConfirmBtnText:{
        fontSize:18,
        lineHeight:20,
        textAlign:'center',
        letterSpacing:-0.18,
        color:'rgb(255,255,255)',
        fontFamily:'NanumBarunGothic'
        // flexDirection:'row'
    },
    bottomCancelBtn:{
        width:screenWidth/2,
        marginTop:27
    },
    bottomConfirmBtn:{
        width:screenWidth/2,
        marginTop:27
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
    bottomRightGoldBtn:{
      width:screenWidth/2,
      alignItems:'flex-end',
      height:69.6,
      backgroundColor:'rgb(213,173,66)',
      alignItems:'center',
      justifyContent:'center'
  },
    emailText:{
        width:37,
        height:16,
        fontSize:14,
        textAlign:'left',
        lineHeight:20,
        letterSpacing:-0.14,
        color:'rgb(108,108,108)',
        marginTop:24
    },
    textAgree:{
        // width:60,
        height:19,
        fontSize:16,
        textAlign:'left',
        lineHeight:19,
        letterSpacing:-0.16,
        color:'rgb(43,43,43)',
        marginTop:25,
        fontFamily:'NanumBarunGothicBold' 
    },
    border1:{
        height:46,
        width:screenWidth-32,
        borderWidth:1,
        marginTop:21.5,
        borderTopLeftRadius:4,
        borderTopRightRadius:4,
        borderColor:'rgb(214,213,212)',
        flexDirection:'row'
    },
    border11:{
      height:46,
      width:screenWidth-32,
      borderWidth:1,
      marginTop:21.5,
      borderTopLeftRadius:4,
      borderTopRightRadius:4,
      borderColor:'rgb(214,213,212)',
      backgroundColor:'rgba(213,173,66,0.1)',
      flexDirection:'row'
    },
    border2:{
        width:screenWidth-32,
        borderWidth:1,
        borderTopWidth:0,
        borderBottomLeftRadius:4,
        borderBottomRightRadius:4,
        borderColor:'rgb(214,213,212)',
        paddingTop:5,
        paddingBottom:15
    },
    border2Text:{
        marginLeft:16
    },
    tgxcAuth:{
        flexDirection:'row',
        paddingRight:25,
        // width:screenWidth-32,
        justifyContent:'space-between',
        alignItems: 'center'
        // marginHorizontal:16
    },
    border3:{
        // height:i18n.language==='ko'? 54: 64,
        width:screenWidth-32,
        borderWidth:1,
        borderTopWidth:0,
        borderBottomLeftRadius:4,
        borderBottomRightRadius:4,
        borderColor:'rgb(214,213,212)',
        paddingTop:15,
        paddingBottom:15
    },
    
});

export default SignUp;
