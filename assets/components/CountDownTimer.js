//https://aboutreact.com/react-native-countdown-timer/
import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import CountDown from 'react-native-countdown-component';
import moment from 'moment';

export default function CountDownTimer() {
    const [totalDuration, setTotalDuration] = useState(0);

    useEffect(() => {
        // Coundown timer for a given expiry date-time
        let date = 
          moment()
            .utcOffset('+05:30')
            .format('YYYY-MM-DD hh:mm:ss');
        
        // Getting the current date-time
        // You can set your own date-time
        let expirydate = '2020-12-23 04:00:45';
        
        let diffr = 
          moment
            .duration(moment(expirydate)
            .diff(moment(date)));
        // Difference of the expiry date-time
        var hours = parseInt(diffr.asHours());
        var minutes = parseInt(diffr.minutes());
        var seconds = parseInt(diffr.seconds());
    
        // Converting in seconds
        var d = hours * 60 * 60 + minutes * 60 + seconds;
    
        // Settign up the duration of countdown
        setTotalDuration(d);
      }, []);
    
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <Text style={styles.title}>
              Time left to confirm appointment
            </Text>
            <CountDown
              until={totalDuration}
              //duration of countdown in seconds
              timetoShow={('H', 'M', 'S')}
              //formate to show
              onFinish={() => alert('finished')}
              //on Finish call
              onPress={() => alert('hello')}
              //on Press call
              size={20}
            />
          </View>
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
});
