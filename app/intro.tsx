import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function IntroScreen() {
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        // Navegar para a tela de autenticação após 3 segundos
        const timer = setTimeout(() => {
            router.replace('/auth');
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const handleSkip = () => {
        router.replace('/auth');
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {/* Logo do App */}
                <View style={styles.logoContainer}>
                    {!imageError ? (
                        <Image
                            source={require('@/assets/images/icon.png')}
                            style={styles.logo}
                            resizeMode="contain"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <View style={styles.logoFallback}>
                            <Text style={styles.logoText}>⚡</Text>
                        </View>
                    )}
                </View>

                {/* Logo e Texto do App */}
                <View style={styles.textContainer}>
                    <Text style={styles.appTitle}>
                        Clubão do Descontão
                    </Text>

                    <Text style={styles.appSubtitle}>
                        Economize 20% na sua conta de energia
                    </Text>

                    <Text style={styles.appDescription}>
                        Ganhe dinheiro indicando amigos e economize na sua conta de energia elétrica
                    </Text>
                </View>

                {/* Botão para pular */}
                <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                    <Text style={styles.skipButtonText}>Pular</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF6B35',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: height * 0.5,
    },
    logo: {
        width: 150,
        height: 150,
        borderRadius: 75,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    logoFallback: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    logoText: {
        fontSize: 60,
        color: 'white',
    },
    textContainer: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingBottom: 40,
    },
    appTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 12,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    appSubtitle: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        marginBottom: 12,
        opacity: 0.9,
        fontWeight: '600',
    },
    appDescription: {
        fontSize: 13,
        color: 'white',
        textAlign: 'center',
        opacity: 0.8,
        lineHeight: 18,
    },
    skipButton: {
        position: 'absolute',
        top: 60,
        right: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 20,
    },
    skipButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
});