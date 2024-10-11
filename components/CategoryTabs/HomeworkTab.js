import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Modal, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const calcFont = (percent)=>{
    const size = width/375;
    return Math.round(percent*size);
};
const baseWidth = 375;
const baseHeight = 667;
const scale = Math.min(width / baseWidth, height / baseHeight); 

const HomeworkTab = ({ selectedCategory }) => {
    const [hwTitle, setHwTitle] = useState('');
    const [hwDescription, setHwDescription] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const loadHomework = async () => {
        try {
            const response = await axios.get("https://oasisapp-flask-bacb79846120.herokuapp.com/homework")
            if (response.data.success) {
                setHwTitle(response.data.title);
                setHwDescription(response.data.description);
            }
        } catch (error) {
            setError(error.message);
            console.log(error);
        }
    };

    const loadSubmissionState = async () => {
        try {
            const savedState = await AsyncStorage.getItem('homeworkSubmissionState');
            if (savedState !== null) {
                setIsSubmitted(JSON.parse(savedState));
            }
        } catch (error) {
            console.log('Failed to load submission state:', error);
        }
    };

    useEffect(() => {
        loadHomework();
        loadSubmissionState();
    }, [selectedCategory]);

    const handleDocumentPress = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleSubmit = async () => {
        setIsSubmitted(true);
        try {
            await AsyncStorage.setItem('homeworkSubmissionState', JSON.stringify(true));
        } catch (error) {
            console.log('Failed to save submission state:', error);
        }
    };

    return (
        <View style={styles.container}>
            {error && <Text style={styles.errorText}>{error}</Text>}
            {hwTitle.length > 0 ? (
                <View style={styles.textContainer}>
                    <TouchableOpacity onPress={handleDocumentPress} style={styles.textAndButtonContainer}>
                        <View style={styles.textContent}>
                            <Text style={styles.hwTitle}>{hwTitle}</Text>
                        </View>
                        <View style={styles.expandButtonContainer}>
                            <Text style={styles.expandButtonText}>Expand</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            ) : (
                <Text style={styles.loadingText}>Loading...</Text>
            )}

            <Modal
                visible={isModalVisible}
                transparent={true}
                onRequestClose={handleCloseModal}
                animationType="slide"
            >
                <View style={styles.modalContainer}>
                    <ScrollView style={styles.documentContainer}>
                        <Text style={styles.documentTitle}>{hwTitle}</Text>
                        <Text style={styles.documentContent}>{hwDescription}</Text>
                        
                    </ScrollView>
                    <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                        <Text style={styles.closeButtonText}>✖</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.submitButton, isSubmitted && styles.submitButtonSubmitted]}
                        onPress={handleSubmit}
                        disabled={isSubmitted}
                    >
                        
                        <Text style={styles.submitButtonText}>{isSubmitted ? 'Submitted' : 'Submit'}</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({

    submitButton: {
        marginBottom: 40,
        backgroundColor: '#9dcff8',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    submitButtonSubmitted: {
        backgroundColor: 'blue',
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
    },
    container: {
        flex: 1,
        marginTop: 10,
    },
    textContainer: {
        flex: 1,
        marginHorizontal: 15,
        marginBottom: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        padding: 10,
    },
    textAndButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textContent: {
        flex: 1,
    },
    hwTitle: {
        fontSize: calcFont(17),
        // fontSize: '25',
        fontWeight: '500',

    },
    expandButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#36b2f9',
        borderRadius: 10,
        padding: 10,
    },
    expandButtonText: {
        fontSize: calcFont(16),
        color: 'white',
    },
    loadingText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#36b2f9',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    documentContainer: {
        width: width * 0.9,
        height: height * 0.8,
    },
    documentTitle: {
        fontSize: calcFont(20),
        fontWeight: 'bold',
        marginTop: 100,
        textAlign:'center',
    },
    documentContent: {
        fontSize: calcFont(16),
        color: 'black',
        marginTop: 30,
        lineHeight:calcFont(30),
    },
    closeButton: {
        position: 'absolute',
        top: 30,
        right: 30,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
    },
    closeButtonText: {
        fontSize: 24,
        color: 'black',
    },
});

export default HomeworkTab;
