import React from 'react';
import {StatusBar, StyleSheet, SafeAreaView, Text, Image, View, Dimensions, TextInput, Platform, TouchableOpacity, FlatList} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Moment from 'moment';
import Modal from 'react-native-modal';
import {useIsFocused} from '@react-navigation/native';
import {me, getAlarmList} from '../../service/auth';
import {useTranslation} from 'react-i18next';
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

function alarm(props) {
  // console.log(props);
  const {t, i18n} = useTranslation();
  const [content, setContent] = React.useState();
  const [title, setTitle] = React.useState();
  const [alarm, setAlarm] = React.useState([]);
  const [isFetching,setIsFetching] = React.useState(false);
  const [isModalVisible, setModalVisible] = React.useState(false);
  const isFocused = useIsFocused();

  React.useEffect(() => {
		(async function anyNameFunction() {
      const res = await me();
      // console.log(res);
        
      const alarmList = await getAlarmList();
      console.log(alarmList.data.pushList[0].contents);
      // setTitle(alarmList.data.pushList[0].title);
      // setContent(alarmList.data.pushList[0].contents);
      setAlarm(alarmList.data.pushList);
		})();
  }, [isFocused]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // list가 없을때
  const emptyRender = () => {
    return (
      <View style={styles.container3}>
              <View style={styles.border1}>
                  <Text style={styles.noTradeText}>알림내역이 존재하지 않습니다.</Text>          
              </View>
      </View>
    )
  }

  const onRefresh = async () => {
		setIsFetching(true);
		const res = await me();
      // console.log(res);
        
      const alarmList = await getAlarmList();
      // console.log(alarmList.data.pushList);
      // setTitle(alarmList.data.pushList[0].title);
      // setContent(alarmList.data.pushList[0].contents);
      setAlarm(alarmList.data.pushList);
		  setTimeout(() => {
			setIsFetching(false);
		},1000)
		
  }


  return (
    <SafeAreaView>
      <StatusBar backgroundColor='#fff'/>

      <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
          <View style={{justifyContent:'center', alignItems:'center'}}>
            <View style={styles.modalType}>
              <View style={styles.modalContailner}>
                <Text style={styles.modalTitleText}>{content}</Text>
              </View>
                <View style={styles.lineStyle1}></View>

                <View style={styles.modalBottomBtnArea}>
                  <TouchableOpacity
                          onPress={toggleModal}
                          >
                          <View style={{width:343,height:43.5, justifyContent:'center', alignItems:'center', borderRightWidth:0.5, borderRightColor:'rgba(60,60,67,0.29)'}}>                     
                              <Text style={styles.bottomCancelBtnText}>{t('confirm')}</Text>                            
                          </View>
                  </TouchableOpacity>
              </View>

            
            </View>
          </View>
      </Modal>

      <View style={styles.container}>

            <View style={{marginTop:15.5}}>
              <View style={styles.container6}>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                  <TouchableOpacity
                          onPress={() => {
                              props.navigation.navigate('App', {});
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
                    <Text style={styles.findIdTitle}>{t('alerts')}</Text>           
                </View>
              </View>
            </View>
            <View style={styles.lineStyle}></View>

            
                
                <FlatList
                    contentContainerStyle={{
                      paddingBottom: 50,
                    }}
                    contentInsetAdjustmentBehavior="automatic"
                    data={alarm}
                    ListEmptyComponent={emptyRender}
                    onRefresh={() => onRefresh()}
                    refreshing={isFetching}
                    onEndReachedThreshold={0.5}
                    keyExtractor={(item) => item.pushInfoId.toString()}
                    // onEndReached={onEndReached}
                    renderItem={({item, index}) => {
                      
                      return (
                        <View>
                          <TouchableOpacity
                            onPress={() => {toggleModal(); setContent(item.contents);}}
                          >
                        <View style={styles.alarmListBox}>
                          <View>
                            <Text style={styles.dayText}>{Moment(item.createDatetime).format('YYYY/MM/DD')}</Text>
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop:5}}>
                              <Text style={styles.alarmText}></Text><Text style={styles.alarmBoldText}>{item.title}</Text>
                            </View>
                          </View>
                          <View>
                          <Image
                              // style={styles.arrowLeft}
                              // source={require('../../assets/images/screen3/icExpandMore24Px.png')}
                              source={require('../../assets/images/auth/icChevronRight24Px.png')}
                              resizeMode="contain"
                              >
                          </Image>
                          </View>
                       </View>
                       </TouchableOpacity>
                        <View style={styles.bottomLineStyle}></View>
                        </View>
                      );
                    }}

                  />    
            
            

            {/* <View style={styles.alarmListBox}>
                <View>
                  <Text style={styles.dayText}>2020/01/01</Text>
                  <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop:5}}>
                    <Text style={styles.alarmText}>[알림]</Text><Text style={styles.alarmBoldText}> 입금</Text><Text style={styles.alarmText}>이 완료되었습니다.</Text>
                  </View>
                </View>
                <View>
                  <Image
                      // style={styles.arrowLeft}
                      source={require('../../assets/images/screen3/icExpandMore24Px.png')}
                      resizeMode="contain"
                      >
                  </Image>
                </View>
            </View>
            <View style={styles.bottomLineStyle}></View>

            <View style={styles.alarmListBox}>
                <View>
                  <Text style={styles.dayText}>2020/01/01</Text>
                  <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop:5}}>
                    <Text style={styles.alarmText}>[알림]</Text><Text style={styles.alarmBoldText}> 출금</Text><Text style={styles.alarmText}>이 완료되었습니다.</Text>
                  </View>
                </View>
                <View>
                  <Image
                      // style={styles.arrowLeft}
                      source={require('../../assets/images/screen3/icExpandMore24Px.png')}
                      resizeMode="contain"
                      >
                  </Image>
                </View>
            </View>
            <View style={styles.bottomLineStyle}></View> */}
         

      </View>

      

    </SafeAreaView>
  );
}

var styles = StyleSheet.create({
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
    },
	  container: {
      width: screenWidth,
      height:screenheight,
      flexDirection: 'column',
      backgroundColor:'#FFF'
    },
    container6: {
          // justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          width: screenWidth - 32,
          marginHorizontal: 16,
          height:50
    },
    lineStyle:{
        width:screenWidth,
        borderWidth: 0.5,
        borderColor:'rgb(214,213,212)',
        marginTop:9
    },
    lineStyle1:{
      // marginTop:30,
      width:343,
      borderWidth: 0.5,
      borderColor:'rgba(60,60,67,0.29)'
    },
    bottomLineStyle:{
      width:screenWidth,
      borderWidth: 0.5,
      borderColor:'rgb(214,213,212)'
  },
    findIdTitle:{
        // width:138,
        height:26,
        fontSize:22,
        textAlign:'center',
        lineHeight:26,
        letterSpacing:-0.22,
        color:'rgba(0,0,0,0.87)',
        fontFamily:'NanumBarunGothicBold'
    },
    arrowLeftArea:{
      justifyContent:'center',
      alignItems:'flex-start',
      width:30,
      height:30
    },
    arrowLeft:{
      width:16,
      height:16
    },
    alarmListBox:{
      height:80,
      flexDirection:'row',
      width: screenWidth-32,
      marginHorizontal: 16,
      justifyContent:'space-between',
      alignItems:'center'
    },
    dayText:{
      fontSize:12,
      textAlign:'left',
      lineHeight:20,
      letterSpacing:-0.12,
      color:'rgb(108,108,108)',
      height:17,
      fontFamily:'NanumBarunGothicLight'
    },
    alarmText:{
      fontSize:16,
      // fontFamily:NanumBarunGothic,
      textAlign:'left',
      lineHeight:19,
      letterSpacing:-0.16,
      color:'rgb(43,43,43)',
      fontFamily:'NanumBarunGothic'
    },
    alarmBoldText:{
      fontSize:16,
      // fontFamily:NanumBarunGothicBold,
      textAlign:'left',
      lineHeight:19,
      letterSpacing:-0.16,
      color:'rgb(43,43,41)',
      fontFamily:'NanumBarunGothicBold'
    },
    modalType:{
      width:343,
      height:200,
      borderRadius:12,
      backgroundColor:'rgb(255,255,255)'
    },
    bottomCancelBtnText:{
      fontSize:17,
      textAlign:'center',
      lineHeight:22,
      letterSpacing:-0.41,
      color:'rgb(43,43,43)',
      fontFamily:'NanumBarunGothic'
    },
    modalBottomBtnArea:{
      flexDirection:'row'
    },
    modalTitleText:{
      fontSize:16,
      textAlign:'left',
      lineHeight:30,
      letterSpacing:-0.16,
      color:'rgb(43,43,43)',
      fontFamily:'NanumBarunGothicBold',
      width:300,
      height:120
    },
    modalContailner:{
      flexDirection: 'row',
      width: screenWidth - 32,
      marginHorizontal: 16,
      marginTop:30
    }
    
    


    
    
});

export default alarm;
