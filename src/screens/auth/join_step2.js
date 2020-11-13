import React from 'react';
import {findEmail} from '../../service/auth';
import {StatusBar, StyleSheet, SafeAreaView, Text, Image, View, Dimensions, Platform, TouchableOpacity, Alert} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {useIsFocused} from '@react-navigation/native';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenheight = Math.round(Dimensions.get('window').height);
let containerHeight = 155;
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



function JoinStep2(props) {

  const [isKorea, setIsKorea] = React.useState(true);
  const [resultYn, setResultYn] = React.useState(false);
  const [dupl, setDupl] = React.useState(false);
  const [niceName, setNiceName] = React.useState();
  const [nicePhone, setNicePhone] = React.useState();
  const [niceBirthDate, setNiceBirthDate] = React.useState(); 
  const isFocused = useIsFocused();
//   console.log(props.route.params);

  React.useEffect(() => {   
    

    setNicePhone(props.route.params.nicePhone);
    setNiceName(props.route.params.niceName);
    setNiceBirthDate(props.route.params.niceBirthDate);
    

  },[props.route.params]);

  React.useEffect(() => {
    // setDupl(true);
    (async function anyNameFunction() {
        if(nicePhone !== undefined){
            const res = await findEmail(nicePhone);
           
            if(res.data.result){
                if(props.route.params.resultYn === 'success'){
                    setResultYn(true);
                }   
            }
            else if(!res.data.result && res.data.resultMsg === '중복'){
                // Alert.alert(null, '이미 가입된 핸드폰 번호입니다.', [
                //     {
                //         text: '확인',
                //         onPress: () => props.navigation.navigate('Login', {}),
                //     },
                // ]);
                Alert.alert(null, '이미 가입된 핸드폰 번호입니다.');
            
            }
    }
        
    
    })();

    return()=>{
        setNicePhone();
        // setDupl();
    }
    
  }, [isFocused]);

  
  return (
    <SafeAreaView>
      <StatusBar backgroundColor='#fff'/>
      <View style={styles.container}>
            <View style={{marginTop:15.5}}>   
                <View style={styles.container2}>
                    <Text style={styles.findIdTitle}>회원가입</Text>           
                </View>
            </View>
            <View style={styles.lineStyle}></View>
            <View style={styles.container3}>
                <Text style={styles.textStyle}>회원가입을 위해 본인인증이 필요합니다.</Text>
            </View>
            <View style={styles.container3}>
                <Text style={styles.mobileAuthText}>휴대폰 본인 인증</Text>
            </View>
            <View style={styles.container3}>
                <Text style={styles.textStyle1}>타인의 개인정보를 도용하여 가입한 경우, 서비스 이용제한 및 법적 제재를 받으실 수 있습니다.</Text>
            </View>
            <View style={styles.container3}>
                <TouchableOpacity
                    style={styles.buttonBox}
                    disabled={resultYn?true:false}
                    onPress={() => {
                        // setDupl(true);
                        props.navigation.navigate('JoinNice', {});
                    }}
                    >
                    
                    <Image
                        style={styles.buttonImg}
                        source={resultYn?require('../../assets/images/auth/invalidName3x.png'):require('../../assets/images/auth/btn13x.png')}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            </View>    
            <View style={styles.bottomBtnArea}>
            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate('Login', {});
                }}
                >
                <View style={styles.bottomLeftBtn}>
                    <Text style={styles.bottomCancelBtnText}>취소</Text>               
                </View>
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={!resultYn?true:false}
                    onPress={() => {
                        setIsKorea(true);
                        props.navigation.navigate('JoinStep3', {isKorea: isKorea, nicePhone:nicePhone,niceName:niceName,niceBirthDate:niceBirthDate});
                    }}
                    >      
                <View style={!resultYn?styles.bottomRightBtn:styles.bottomRightGoldBtn}>
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
    findIdTitle:{
        width:102,
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
    textStyle:{
        width:318,
        height:18,
        fontSize:14,
        textAlign:'left',
        lineHeight:20,
        letterSpacing:-0.14,
        color:'rgba(0,0,0,0.6)',
        marginTop:24,
        fontFamily:'NanumBarunGothicLight' 
    },
    textStyle1:{
        width:343,
        height:40,
        fontSize:14,
        textAlign:'left',
        lineHeight:20,
        letterSpacing:-0.14,
        color:'rgba(0,0,0,0.6)',
        marginTop:6,
        fontFamily:'NanumBarunGothicLight' 
    },
    mobileAuthText:{
        width:120,
        height:19,
        fontSize:16,
        textAlign:'left',
        letterSpacing:-0.16,
        lineHeight:19,
        color:'rgb(43,43,43)',
        marginTop:35,
        fontFamily:'NanumBarunGothicBold' 
    },
    buttonBox:{
        width:227,
        height:50,
        marginTop:20.5
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
        // width:screenWidth/2,
        // marginTop:27
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
    }
    
});

export default JoinStep2;
