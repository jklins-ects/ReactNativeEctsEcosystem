import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { AntDesign } from '@expo/vector-icons';

const DailyDiscussion = () => {
  const navigation = useNavigation();

  const handlePagePress = (pageName) => {
    if (pageName === 'Home') {
      navigation.navigate('Home');
    } else if (pageName === 'Grades') {
      navigation.navigate('Infinite Campus');
    } else if (pageName === 'Website') {
      navigation.navigate('Ecosystem Website'); 
    } else if (pageName === 'DailyDiscussion') {
      navigation.navigate('DailyDiscussion');
    }
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
        headerLeft: () => null,
    });
}, [navigation]);

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://ectspa.infinitecampus.org' }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        style={styles.webview}
      />
      <View style={styles.bottomNavigation}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handlePagePress('Home')}
          accessibilityLabel="Navigate to Home"
        >
          <AntDesign name="home" size={24} color="white" />
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handlePagePress('Grades')}
          accessibilityLabel="Navigate to Grades"
        >
          <AntDesign name="profile" size={24} color="white" />
          <Text style={styles.tabText}>Grades</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handlePagePress('Website')}
          accessibilityLabel="Navigate to Website"
        >
          <AntDesign name="earth" size={24} color="white" />
          <Text style={styles.tabText}>Website</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handlePagePress('DailyDiscussion')}
          accessibilityLabel="Navigate to Daily Discussion"
        >
          <AntDesign name="message1" size={24} color="white" />
          <Text style={styles.tabText}>Daily Discussion</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
},
tabButton: {
    alignItems: 'center',
},
tabText: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
},
});

export default DailyDiscussion;