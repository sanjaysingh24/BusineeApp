import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";


// This ensures the auth session is correctly managed
WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
    useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
      try {
        const { createdSessionId, signIn, signUp, setActive } =
          await startOAuthFlow();
  
        if (createdSessionId) {
          setActive({ session: createdSessionId });
        } else {
          // Use signIn or signUp for next steps such as MFA
        }
      } catch (err) {
        console.error("OAuth error", err);
      }
    }, []);

    return (
        <View>
            <View style={styles.flex}>
                <Image source={require('./../assets/images/Login_image.png')} style={styles.image} />
            </View>
            <View style={styles.subcontainer}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>
                    Your Ultimate <Text style={{ color: Colors.PRIMARY }}>Community Business Directory </Text>App
                </Text>
                <Text style={styles.findtext}>Find your favorite business near you and post your own business to your community</Text>
                <TouchableOpacity style={styles.btn} onPress={onPress}>
                    <Text style={{ textAlign: 'center', color: 'white' }}>Let's Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 210,
        height: 400,
        borderRadius: 20,
        borderWidth: 6,
        borderColor: "#000"
    },
    flex: {
        display: 'flex',
        marginTop: 100,
        alignItems: 'center'
    },
    subcontainer: {
        backgroundColor: '#fff',
        padding: 20,
        marginTop: -20,
    },
    findtext: {
        fontSize: 15,
        textAlign: 'center',
        marginVertical: 15,
        color: Colors.GRAY
    },
    btn: {
        backgroundColor: Colors.PRIMARY,
        padding: 16,
        borderRadius: 99,
        marginTop: 20
    }
});
