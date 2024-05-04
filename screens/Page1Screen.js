import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, BackHandler, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'; // Import icons from Expo vector-icons

const Page1Screen = () => {
    const navigation = useNavigation();
    const [visitedUrls, setVisitedUrls] = useState(['https://ecosystem.ects-cmp.com/']);
    const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
    const webViewRef = useRef(null);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () => backHandler.remove();
    }, []);

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

    const handleBackPress = () => {
        if (currentUrlIndex > 0) {
            goBack();
            return true;
        }
        return false;
    };

    const goBack = () => {
        if (currentUrlIndex > 0) {
            setCurrentUrlIndex((prevIndex) => prevIndex - 1);
            webViewRef.current && webViewRef.current.goBack();
        }
    };

    const handleNavigationStateChange = (navState) => {
        const { url } = navState;

        if (url && url !== visitedUrls[currentUrlIndex]) {
            // Add the new URL to the history stack
            setVisitedUrls((prevUrls) => [...prevUrls.slice(0, currentUrlIndex + 1), url]);
            setCurrentUrlIndex(currentUrlIndex + 1);
        }
    };

    const navigateToPage = (pageName) => {
        handlePagePress(pageName);
    };

    const handleWebViewError = (error) => {
        console.error('WebView error:', error);
    };

    return (
        <View style={styles.container}>
            <WebView
                ref={webViewRef}
                source={{ uri: visitedUrls[currentUrlIndex] }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                onNavigationStateChange={handleNavigationStateChange}
                onError={handleWebViewError}
            />
            {/* Custom bottom navigation */}
            <View style={styles.bottomNavigation}>
                <TouchableOpacity style={styles.tabButton} onPress={() => navigateToPage('Home')}>
                    <AntDesign name="home" size={24} color="white" />
                    <Text style={styles.tabText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButton} onPress={() => navigateToPage('Grades')}>
                    <AntDesign name="profile" size={24} color="white" />
                    <Text style={styles.tabText}>Grades</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButton} onPress={() => handlePagePress('Website')}>
                    <AntDesign name="earth" size={24} color="white" />
                    <Text style={styles.tabText}>Website</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButton} onPress={() => navigateToPage('DailyDiscussion')}>
                    <AntDesign name="message1" size={24} color="white" />
                    <Text style={styles.tabText}>Daily Discussion</Text>
                </TouchableOpacity>
            </View>
            {/* Back button for web page history */}
            <TouchableOpacity style={styles.backButton} onPress={goBack}>
                <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1, // Ensure the button is above the WebView
    },
});

export default Page1Screen;