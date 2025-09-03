import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    Share,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ReferralsScreen() {
    const [referrals] = useState([
        {
            id: 1,
            name: 'Maria Silva',
            email: 'maria.silva@email.com',
            status: 'active',
            joinDate: '2024-01-15',
            totalEarnings: 125.50,
            monthlyEarnings: 15.80,
            energyConsumption: 450,
        },
        {
            id: 2,
            name: 'João Santos',
            email: 'joao.santos@email.com',
            status: 'active',
            joinDate: '2024-01-20',
            totalEarnings: 98.30,
            monthlyEarnings: 12.40,
            energyConsumption: 380,
        },
        {
            id: 3,
            name: 'Ana Costa',
            email: 'ana.costa@email.com',
            status: 'pending',
            joinDate: '2024-02-01',
            totalEarnings: 0,
            monthlyEarnings: 0,
            energyConsumption: 0,
        },
        {
            id: 4,
            name: 'Carlos Oliveira',
            email: 'carlos.oliveira@email.com',
            status: 'active',
            joinDate: '2024-02-05',
            totalEarnings: 67.20,
            monthlyEarnings: 8.90,
            energyConsumption: 320,
        },
        {
            id: 5,
            name: 'Fernanda Lima',
            email: 'fernanda.lima@email.com',
            status: 'active',
            joinDate: '2024-02-10',
            totalEarnings: 89.10,
            monthlyEarnings: 11.20,
            energyConsumption: 410,
        },
    ]);

    const [stats] = useState({
        totalReferrals: 12,
        activeReferrals: 8,
        pendingReferrals: 4,
        totalEarnings: 1250.50,
        monthlyEarnings: 156.80,
        totalKwh: 2850,
    });

    const backgroundColor = useThemeColor({}, 'background');
    const textColor = useThemeColor({}, 'text');
    const tintColor = useThemeColor({}, 'tint');

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return '#4CAF50';
            case 'pending':
                return '#FF9800';
            default:
                return '#9E9E9E';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'active':
                return 'Ativo';
            case 'pending':
                return 'Pendente';
            default:
                return 'Inativo';
        }
    };

    const handleShareLink = async () => {
        try {
            const referralLink = 'https://clubaodescontao.com/convite/ricardo123';
            const message = `🎉 Olha que legal! Estou economizando 20% na minha conta de energia com o Clubão do Descontão!\n\nVocê também pode economizar e ainda ganhar dinheiro indicando outras pessoas!\n\nUse meu link: ${referralLink}\n\n#ClubãoDoDescontão #Economia #Energia`;

            await Share.share({
                message: message,
                title: 'Clubão do Descontão - Economize 20% na Energia!',
            });
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível compartilhar o link');
        }
    };

    const handleReferralPress = (referral: any) => {
        Alert.alert(
            referral.name,
            `Status: ${getStatusText(referral.status)}\nEmail: ${referral.email}\nData de cadastro: ${new Date(referral.joinDate).toLocaleDateString('pt-BR')}\nGanhos totais: R$ ${referral.totalEarnings.toFixed(2)}\nGanhos mensais: R$ ${referral.monthlyEarnings.toFixed(2)}`,
            [{ text: 'OK' }]
        );
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
                        <IconSymbol name="chevron.left" size={24} color="#FF6B35" />
                    </TouchableOpacity>
                    <View style={styles.headerContent}>
                        <ThemedText type="title" style={styles.title}>
                            Minhas Indicações
                        </ThemedText>
                        <ThemedText style={styles.subtitle}>
                            Acompanhe sua rede de indicações
                        </ThemedText>
                    </View>
                </View>

                {/* Stats Cards */}
                <View style={styles.statsContainer}>
                    <View style={styles.statsRow}>
                        <View style={[styles.statCard, { backgroundColor: '#4CAF50' }]}>
                            <IconSymbol name="person.2.fill" size={24} color="white" />
                            <ThemedText style={styles.statValue}>{stats.totalReferrals}</ThemedText>
                            <ThemedText style={styles.statLabel}>Total de Indicações</ThemedText>
                        </View>
                        <View style={[styles.statCard, { backgroundColor: '#2196F3' }]}>
                            <IconSymbol name="checkmark.circle.fill" size={24} color="white" />
                            <ThemedText style={styles.statValue}>{stats.activeReferrals}</ThemedText>
                            <ThemedText style={styles.statLabel}>Indicações Ativas</ThemedText>
                        </View>
                    </View>
                    <View style={styles.statsRow}>
                        <View style={[styles.statCard, { backgroundColor: '#FF9800' }]}>
                            <IconSymbol name="clock.fill" size={24} color="white" />
                            <ThemedText style={styles.statValue}>{stats.pendingReferrals}</ThemedText>
                            <ThemedText style={styles.statLabel}>Pendentes</ThemedText>
                        </View>
                        <View style={[styles.statCard, { backgroundColor: '#9C27B0' }]}>
                            <IconSymbol name="dollarsign.circle.fill" size={24} color="white" />
                            <ThemedText style={styles.statValue}>R$ {stats.totalEarnings.toFixed(2)}</ThemedText>
                            <ThemedText style={styles.statLabel}>Total Ganho</ThemedText>
                        </View>
                    </View>
                </View>

                {/* Share Link Section */}
                <View style={styles.shareContainer}>
                    <View style={styles.shareCard}>
                        <View style={styles.shareHeader}>
                            <IconSymbol name="gift.fill" size={24} color="#FF6B35" />
                            <ThemedText style={styles.shareTitle}>Compartilhe e Ganhe!</ThemedText>
                        </View>
                        <ThemedText style={styles.shareDescription}>
                            Compartilhe seu link de indicação e ganhe 30% do valor em kWh por cada nova indicação + 1% recorrente!
                        </ThemedText>
                        <TouchableOpacity style={styles.shareButton} onPress={handleShareLink}>
                            <IconSymbol name="square.and.arrow.up" size={20} color="white" />
                            <ThemedText style={styles.shareButtonText}>Compartilhar Link</ThemedText>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Referrals List */}
                <View style={styles.referralsContainer}>
                    <ThemedText type="subtitle" style={styles.sectionTitle}>
                        Suas Indicações
                    </ThemedText>

                    {referrals.map((referral) => (
                        <TouchableOpacity
                            key={referral.id}
                            style={styles.referralCard}
                            onPress={() => handleReferralPress(referral)}
                        >
                            <View style={styles.referralHeader}>
                                <View style={styles.referralInfo}>
                                    <ThemedText style={styles.referralName}>{referral.name}</ThemedText>
                                    <ThemedText style={styles.referralEmail}>{referral.email}</ThemedText>
                                </View>
                                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(referral.status) }]}>
                                    <ThemedText style={styles.statusText}>
                                        {getStatusText(referral.status)}
                                    </ThemedText>
                                </View>
                            </View>

                            <View style={styles.referralStats}>
                                <View style={styles.referralStatItem}>
                                    <IconSymbol name="calendar" size={16} color="#999" />
                                    <ThemedText style={styles.referralStatText}>
                                        {new Date(referral.joinDate).toLocaleDateString('pt-BR')}
                                    </ThemedText>
                                </View>

                                {referral.status === 'active' && (
                                    <>
                                        <View style={styles.referralStatItem}>
                                            <IconSymbol name="dollarsign.circle" size={16} color="#4CAF50" />
                                            <ThemedText style={styles.referralStatText}>
                                                R$ {referral.totalEarnings.toFixed(2)}
                                            </ThemedText>
                                        </View>
                                        <View style={styles.referralStatItem}>
                                            <IconSymbol name="bolt.fill" size={16} color="#FF6B35" />
                                            <ThemedText style={styles.referralStatText}>
                                                {referral.energyConsumption} kWh
                                            </ThemedText>
                                        </View>
                                    </>
                                )}
                            </View>

                            <IconSymbol name="chevron.right" size={20} color="#999" />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* How it Works */}
                <View style={styles.howItWorksContainer}>
                    <ThemedText type="subtitle" style={styles.sectionTitle}>
                        Como Funciona o Sistema de Indicação
                    </ThemedText>

                    <View style={styles.stepsContainer}>
                        <View style={styles.step}>
                            <View style={styles.stepNumber}>
                                <ThemedText style={styles.stepNumberText}>1</ThemedText>
                            </View>
                            <View style={styles.stepContent}>
                                <ThemedText style={styles.stepTitle}>Compartilhe seu Link</ThemedText>
                                <ThemedText style={styles.stepDescription}>
                                    Use o botão "Compartilhar Link" para enviar seu link de indicação
                                </ThemedText>
                            </View>
                        </View>

                        <View style={styles.step}>
                            <View style={styles.stepNumber}>
                                <ThemedText style={styles.stepNumberText}>2</ThemedText>
                            </View>
                            <View style={styles.stepContent}>
                                <ThemedText style={styles.stepTitle}>Amigo se Cadastra</ThemedText>
                                <ThemedText style={styles.stepDescription}>
                                    Seu amigo usa seu link e cadastra sua conta de energia
                                </ThemedText>
                            </View>
                        </View>

                        <View style={styles.step}>
                            <View style={styles.stepNumber}>
                                <ThemedText style={styles.stepNumberText}>3</ThemedText>
                            </View>
                            <View style={styles.stepContent}>
                                <ThemedText style={styles.stepTitle}>Você Ganha!</ThemedText>
                                <ThemedText style={styles.stepDescription}>
                                    30% do valor em kWh + 1% recorrente das contas cadastradas
                                </ThemedText>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <ThemedText style={styles.footerText}>
                        Quanto mais você indica, mais você ganha! 💰
                    </ThemedText>
                </View>
            </ScrollView>
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
        padding: 8,
        marginRight: 12,
    },
    headerContent: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF6B35',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        opacity: 0.7,
    },
    statsContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    statsRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 12,
    },
    statCard: {
        flex: 1,
        padding: 16,
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
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 8,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: 'white',
        opacity: 0.9,
        textAlign: 'center',
    },
    shareContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    shareCard: {
        backgroundColor: 'white',
        padding: 20,
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
    shareHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    shareTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 8,
        color: '#FF6B35',
    },
    shareDescription: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 16,
        opacity: 0.8,
    },
    shareButton: {
        backgroundColor: '#FF6B35',
        padding: 16,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    shareButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    referralsContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#FF6B35',
    },
    referralCard: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    referralHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    referralInfo: {
        flex: 1,
    },
    referralName: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    referralEmail: {
        fontSize: 14,
        opacity: 0.7,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    referralStats: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    referralStatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    referralStatText: {
        fontSize: 12,
        opacity: 0.7,
    },
    howItWorksContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    stepsContainer: {
        gap: 16,
    },
    step: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        padding: 16,
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
    stepNumber: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#FF6B35',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    stepNumberText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    stepContent: {
        flex: 1,
    },
    stepTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    stepDescription: {
        fontSize: 14,
        opacity: 0.7,
        lineHeight: 20,
    },
    footer: {
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    footerText: {
        fontSize: 14,
        opacity: 0.7,
        textAlign: 'center',
    },
});
