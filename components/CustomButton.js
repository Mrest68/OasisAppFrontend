import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from 'react-native';

const CustomButton = ({ onPress, text }) => {
    const [pressed, setPressed] = useState(false); // State to track if the button is pressed

    return (
        <Pressable 
            onPressIn={() => setPressed(true)} // Set pressed to true when button is pressed
            onPressOut={() => setPressed(false)} // Set pressed to false when button is released
            onPress={onPress} 
            style={[styles.container, pressed && styles.pressed]} // Change style based on pressed state
        >
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black', // Default button color
        width: '50%',
        padding: 15,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 25,
    },
    pressed: {
        backgroundColor: '#9dcff8', // Color when pressed (darker shade)
    },
    text: {
        fontWeight: 'bold',
        color: 'white',
    }
});

export default CustomButton;
