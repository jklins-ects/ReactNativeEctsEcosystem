import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchPosts } from '../services/api';
import PostCard from '../components/PostCard';
import { AntDesign } from '@expo/vector-icons';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                setLoading(true);
                const data = await fetchPosts(page);
                if (data.channel.item.length === 0) {
                    setHasMore(false);
                } else {
                    const extractedPosts = data.channel.item.map(post => {
                        const imageUrl = extractImageUrl(post['content-encoded']);
                        return { ...post, imageUrl };
                    });
                    setPosts(prevPosts => [...prevPosts, ...extractedPosts]);
                    setFilteredPosts(prevPosts => [...prevPosts, ...extractedPosts]);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };
        loadPosts();
    }, [page]);

    useEffect(() => {
        if (selectedCategory) {
            const filtered = posts.filter(post => post.category.includes(selectedCategory));
            setFilteredPosts(filtered);
        } else {
            setFilteredPosts(posts);
        }
    }, [selectedCategory, posts]);

    const handleLoadMore = () => {
        setPage(page + 1);
    };

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

    const extractImageUrl = (contentEncoded) => {
        const regex = /<img[^>]+src="([^">]+)/g;
        const match = regex.exec(contentEncoded);
        return match && match.length >= 2 ? match[1] : null;
    };
    

    return (
        <View style={styles.container}>
            {/* Post List */}
            <ScrollView style={styles.scrollView}>
                {filteredPosts.map((post, index) => (
                    <PostCard
                        key={index}
                        title={post.title}
                        content={post['content-encoded']}
                        imageUrl={post.imageUrl}
                    />
                ))}
                {hasMore && (
                    <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={styles.loadMoreText}>Load More</Text>
                        )}
                    </TouchableOpacity>
                )}
            </ScrollView>

            {/* Custom Bottom Navigation */}
            <View style={styles.bottomNavigation}>
                <TouchableOpacity style={styles.tabButton} onPress={() => handlePagePress('Home')}>
                    <AntDesign name="home" size={24} color="white" />
                    <Text style={styles.tabText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButton} onPress={() => handlePagePress('Grades')}>
                    <AntDesign name="profile" size={24} color="white" />
                    <Text style={styles.tabText}>Grades</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButton} onPress={() => handlePagePress('Website')}>
                    <AntDesign name="earth" size={24} color="white" />
                    <Text style={styles.tabText}>Website</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButton} onPress={() => handlePagePress('DailyDiscussion')}>
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
        padding: 10,
    },
    scrollView: {
        flex: 1,
        marginBottom: 20,
    },
    loadMoreButton: {
        backgroundColor: 'lightblue',
        padding: 10,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    loadMoreText: {
        fontSize: 16,
        fontWeight: 'bold',
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

export default HomeScreen;
