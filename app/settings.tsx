import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Modal,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
    const [settingsModalVisible, setSettingsModalVisible] = useState(false);
    const backgroundColor = useThemeColor({}, 'background');

    const handleOptionPress = (option: string) => {
        switch (option) {
            case 'edit-profile':
                Alert.alert('Em desenvolvimento', 'Funcionalidade em desenvolvimento');
                break;
            case 'help-center':
                Alert.alert('Em desenvolvimento', 'Funcionalidade em desenvolvimento');
                break;
            case 'about':
                setSettingsModalVisible(true);
                break;
            case 'logout':
                Alert.alert(
                    'Sair',
                    'Tem certeza que deseja sair da sua conta?',
                    [
                        { text: 'Cancelar', style: 'cancel' },
                        { text: 'Sair', style: 'destructive', onPress: () => router.replace('/auth') }
                    ]
                );
                break;
        }
    };

    const closeSettingsModal = () => {
        setSettingsModalVisible(false);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor }]}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <IconSymbol name="chevron.left" size={28} color="#FF6B35" />
                        <ThemedText style={styles.backButtonText}>Voltar</ThemedText>
                    </TouchableOpacity>
                    <View style={styles.headerContent}>
                        <ThemedText type="title" style={styles.title}>
                            Configurações
                        </ThemedText>
                    </View>
                    <TouchableOpacity style={styles.logoutButton} onPress={() => router.replace('/auth')}>
                        <IconSymbol name="power" size={24} color="#FF6B35" />
                        <ThemedText style={styles.logoutButtonText}>Sair</ThemedText>
                    </TouchableOpacity>
                </View>

                {/* Stats Cards */}
                <View style={styles.statsContainer}>
                    <View style={styles.statsRow}>
                        <View style={styles.statCard}>
                            <View style={styles.statIconContainer}>
                                <IconSymbol name="chart.line.uptrend.xyaxis" size={24} color="#2196F3" />
                            </View>
                            <ThemedText style={styles.statValue}>R$ 156</ThemedText>
                            <ThemedText style={styles.statLabel}>Este Mês</ThemedText>
                        </View>
                        <View style={styles.statCard}>
                            <View style={styles.statIconContainer}>
                                <IconSymbol name="bolt.fill" size={24} color="#FFD700" />
                            </View>
                            <ThemedText style={styles.statValue}>2.850</ThemedText>
                            <ThemedText style={styles.statLabel}>kWh Economizados</ThemedText>
                        </View>
                    </View>
                </View>

                {/* Options Section */}
                <View style={styles.optionsContainer}>
                    <ThemedText type="subtitle" style={styles.sectionTitle}>
                        Opções
                    </ThemedText>

                    <View style={styles.optionsList}>
                        {/* Edit Profile */}
                        <TouchableOpacity
                            style={styles.optionItem}
                            onPress={() => handleOptionPress('edit-profile')}
                        >
                            <View style={styles.optionLeft}>
                                <View style={[styles.optionIcon, { backgroundColor: '#FFE0B2' }]}>
                                    <IconSymbol name="pencil" size={20} color="white" />
                                </View>
                                <View style={styles.optionTextContainer}>
                                    <ThemedText style={styles.optionTitle}>Editar Perfil</ThemedText>
                                    <ThemedText style={styles.optionSubtitle}>Alterar informações pessoais</ThemedText>
                                </View>
                            </View>
                            <IconSymbol name="chevron.right" size={20} color="#999" />
                        </TouchableOpacity>

                        {/* Help Center */}
                        <TouchableOpacity
                            style={styles.optionItem}
                            onPress={() => handleOptionPress('help-center')}
                        >
                            <View style={styles.optionLeft}>
                                <View style={[styles.optionIcon, { backgroundColor: '#E0E0E0' }]}>
                                    <IconSymbol name="questionmark" size={20} color="white" />
                                </View>
                                <View style={styles.optionTextContainer}>
                                    <ThemedText style={styles.optionTitle}>Central de ajuda</ThemedText>
                                </View>
                            </View>
                            <IconSymbol name="chevron.right" size={20} color="#999" />
                        </TouchableOpacity>

                        {/* About App */}
                        <TouchableOpacity
                            style={styles.optionItem}
                            onPress={() => handleOptionPress('about')}
                        >
                            <View style={styles.optionLeft}>
                                <View style={[styles.optionIcon, { backgroundColor: '#E0E0E0' }]}>
                                    <IconSymbol name="info" size={20} color="white" />
                                </View>
                                <View style={styles.optionTextContainer}>
                                    <ThemedText style={styles.optionTitle}>Sobre o App</ThemedText>
                                    <ThemedText style={styles.optionSubtitle}>Versão e informações</ThemedText>
                                </View>
                            </View>
                            <IconSymbol name="chevron.right" size={20} color="#999" />
                        </TouchableOpacity>

                        {/* Logout */}
                        <TouchableOpacity
                            style={styles.optionItem}
                            onPress={() => handleOptionPress('logout')}
                        >
                            <View style={styles.optionLeft}>
                                <View style={[styles.optionIcon, { backgroundColor: '#FF6B35' }]}>
                                    <IconSymbol name="rectangle.portrait.and.arrow.right" size={20} color="white" />
                                </View>
                                <View style={styles.optionTextContainer}>
                                    <ThemedText style={styles.optionTitle}>Sair</ThemedText>
                                    <ThemedText style={styles.optionSubtitle}>Fazer logout da conta</ThemedText>
                                </View>
                            </View>
                            <IconSymbol name="chevron.right" size={20} color="#999" />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* Settings Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={settingsModalVisible}
                onRequestClose={closeSettingsModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        {/* Header do Modal */}
                        <View style={styles.modalHeader}>
                            <ThemedText style={styles.modalTitle}>Configurações</ThemedText>
                            <TouchableOpacity style={styles.closeButton} onPress={closeSettingsModal}>
                                <IconSymbol name="xmark" size={20} color="#999" />
                            </TouchableOpacity>
                        </View>

                        {/* Conteúdo do Modal */}
                        <View style={styles.modalContent}>
                            <ThemedText style={styles.modalDescription}>
                                Configurações em desenvolvimento
                            </ThemedText>

                            <TouchableOpacity style={styles.closeModalButton} onPress={closeSettingsModal}>
                                <ThemedText style={styles.closeModalButtonText}>Fechar</ThemedText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: 'rgba(255, 107, 53, 0.15)',
        borderRadius: 25,
        marginRight: 15,
        borderWidth: 1,
        borderColor: 'rgba(255, 107, 53, 0.3)',
        shadowColor: '#FF6B35',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    backButtonText: {
        marginLeft: 6,
        fontSize: 14,
        fontWeight: '600',
        color: '#FF6B35',
    },
    headerContent: {
        flex: 1,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        backgroundColor: 'rgba(255, 107, 53, 0.1)',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 107, 53, 0.3)',
    },
    logoutButtonText: {
        marginLeft: 4,
        fontSize: 12,
        fontWeight: '600',
        color: '#FF6B35',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF6B35',
    },
    statsContainer: {
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    statsRow: {
        flexDirection: 'row',
        gap: 12,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    statIconContainer: {
        marginBottom: 8,
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    optionsContainer: {
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#FF6B35',
    },
    optionsList: {
        backgroundColor: 'white',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    optionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    optionIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    optionTextContainer: {
        flex: 1,
    },
    optionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 2,
    },
    optionSubtitle: {
        fontSize: 14,
        color: '#666',
    },
    // Modal styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 16,
        width: '100%',
        maxWidth: 400,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 10,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF6B35',
    },
    closeButton: {
        padding: 8,
    },
    modalContent: {
        padding: 20,
        alignItems: 'center',
    },
    modalDescription: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginBottom: 24,
    },
    closeModalButton: {
        backgroundColor: '#FF6B35',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 12,
        alignItems: 'center',
        width: '100%',
    },
    closeModalButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
