import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, ScrollView, Linking, useWindowDimensions } from 'react-native';
import HTML from 'react-native-render-html';

const PostCard = ({ title, content, linkUrl }) => {
    const [expanded, setExpanded] = useState(false);
    const windowWidth = useWindowDimensions().width;

    function resizeImagesInContent(content, maxWidth) {
        if (!content) {
            return null;
        }

        const imgRegex = /<img[^>]*src\s*=\s*['"]([^'"]+)['"][^>]*>/g;
        const resizedContent = content.replace(imgRegex, (match, url) => {
            return `<img src='${url}' style='max-width:${maxWidth}px; height:auto;'>`;
        });

        return resizedContent;
    }

    function extractImageUrl(contentEncoded) {
        if (!contentEncoded) {
            return null;
        }

        const imgRegex = /<img[^>`]+src\s*=\s*['"]([^'"]+)['\"][^>]*>/;
        const matchResult = imgRegex.exec(contentEncoded);
        return matchResult ? matchResult[1] : null;
    }

    const resizedContent = resizeImagesInContent(content, windowWidth);
    const imageUrl = extractImageUrl(content);

    const handlePress = () => {
        setExpanded(!expanded);
    };

    const handleLinkPress = () => {
        if (linkUrl) {
            Linking.openURL(linkUrl);
        }
    };

    return (
        <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            {!expanded && imageUrl && (
                <Image source={{ uri: imageUrl }} style={styles.image} />
            )}
            <TouchableOpacity onPress={handlePress} style={styles.button}>
                <Text style={styles.buttonText}>{expanded ? 'Close' : 'Show more'}</Text>
            </TouchableOpacity>
            <Modal visible={expanded} animationType="slide">
                <View style={styles.modalContent}>
                    <TouchableOpacity onPress={handlePress} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>{title}</Text>
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        <HTML
                            source={{ html: resizedContent || '' }}
                            contentWidth={windowWidth}
                            ignoredDomTags={['video']}
                        />
                        {linkUrl && (
                            <TouchableOpacity onPress={handleLinkPress} style={styles.linkButton}>
                                <Text style={styles.linkButtonText}>Open Link</Text>
                            </TouchableOpacity>
                        )}
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
};



const styles = StyleSheet.create({
    card: {
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 5,
        marginBottom: 5,
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 10,
    },
    button: {
        alignSelf: 'flex-end',
        marginTop: 5,
        padding: 5,
        zIndex: 1,
    },
    buttonText: {
        color: 'blue',
        fontWeight: 'bold',
    },
    modalContent: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    closeButton: {
        position: 'absolute',
        top: 30,
        right: 10,
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 5,
        zIndex: 2,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    modalTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    linkButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 5,
        alignSelf: 'center',
    },
    linkButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default PostCard;
