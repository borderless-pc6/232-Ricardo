import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Image,
    Linking,
    Modal,
    RefreshControl,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    const [refreshing, setRefreshing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [affiliateModalVisible, setAffiliateModalVisible] = useState(false);
    const [selectedAffiliate, setSelectedAffiliate] = useState<any>(null);

    // Animações
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    const scaleAnim = useRef(new Animated.Value(0.95)).current;

    useEffect(() => {
        // Animação de entrada
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeAnim, slideAnim, scaleAnim]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const [quickActions] = useState([
        {
            id: 1,
            title: 'Cadastrar Energia',
            description: 'Economize 20% na sua conta',
            icon: 'sun.max.fill' as any,
            color: '#FF6B35',
        },
        {
            id: 2,
            title: 'Meus afiliados',
            description: 'Acompanhe seus ganhos',
            icon: 'person.2.fill' as any,
            color: '#4CAF50',
            route: '/referrals',
        },
        {
            id: 3,
            title: 'Medicamentos',
            description: 'Compre com desconto',
            icon: 'pills.fill' as any,
            color: '#2196F3',
            route: '/medicines',
        },
        {
            id: 4,
            title: 'Salões de Beleza',
            description: 'Agende serviços',
            icon: 'scissors' as any,
            color: '#E91E63',
            route: '/beauty-salons',
        },
    ]);

    const [stats] = useState({
        totalSavings: 1250.50,
        monthlySavings: 156.80,
        totalReferrals: 12,
        activeReferrals: 8,
    });

    const [affiliates] = useState([
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

    const backgroundColor = useThemeColor({}, 'background');

    const handleQuickAction = async (action: any) => {
        if (action.id === 1) { // Cadastrar Energia - abrir link da Sunne
            try {
                const url = 'https://ricardogigawatt.economia.sunne.com.br/';
                const supported = await Linking.canOpenURL(url);

                if (supported) {
                    await Linking.openURL(url);
                } else {
                    Alert.alert('Erro', 'Não foi possível abrir o link');
                }
            } catch {
                Alert.alert('Erro', 'Não foi possível abrir o link');
            }
        } else if (action.route) {
            router.push(action.route);
        } else {
            Alert.alert(
                action.title,
                action.description,
                [{ text: 'OK' }]
            );
        }
    };

    const handleShareReferral = () => {
        Alert.alert(
            'Compartilhar Indicação',
            'Compartilhe seu link e ganhe comissões!',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Compartilhar', onPress: () => console.log('Compartilhar link') },
            ]
        );
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor }]}>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <Animated.View
                    style={[
                        styles.content,
                        {
                            opacity: fadeAnim,
                            transform: [
                                { translateY: slideAnim },
                                { scale: scaleAnim }
                            ],
                        },
                    ]}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <ThemedText type="title" style={styles.title}>
                            Clubão do Descontão
                        </ThemedText>
                        <ThemedText style={styles.subtitle}>
                            Economize mais, viva melhor!
                        </ThemedText>
                    </View>

                    {/* Stats Cards */}
                    <View style={styles.statsContainer}>
                        <View style={styles.statsRow}>
                            <TouchableOpacity style={[styles.statCard, { backgroundColor: '#4CAF50' }]}>
                                <IconSymbol name="dollarsign.circle.fill" size={24} color="white" />
                                <ThemedText style={styles.statValue}>R$ {stats.totalSavings.toFixed(2)}</ThemedText>
                                <ThemedText style={styles.statLabel}>Valor Ganho Parcial</ThemedText>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.statCard, { backgroundColor: '#2196F3' }]}>
                                <IconSymbol name="chart.line.uptrend.xyaxis" size={24} color="white" />
                                <ThemedText style={styles.statValue}>R$ {stats.monthlySavings.toFixed(2)}</ThemedText>
                                <ThemedText style={styles.statLabel}>Este Mês</ThemedText>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.statsRow}>
                            <TouchableOpacity
                                style={[styles.statCard, { backgroundColor: '#FF9800' }]}
                                onPress={() => setModalVisible(true)}
                            >
                                <IconSymbol name="person.2.fill" size={24} color="white" />
                                <ThemedText style={styles.statValue}>{stats.totalReferrals}</ThemedText>
                                <ThemedText style={styles.statLabel}>Afiliados do seu link</ThemedText>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.statCard, { backgroundColor: '#FF5722' }]}>
                                <IconSymbol name="exclamationmark.triangle.fill" size={24} color="white" />
                                <ThemedText style={styles.statValue}>3</ThemedText>
                                <ThemedText style={styles.statLabel}>Recuperação de Cobranças</ThemedText>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Quick Actions */}
                    <View style={styles.quickActionsContainer}>
                        <ThemedText type="subtitle" style={styles.sectionTitle}>
                            Ações Rápidas
                        </ThemedText>

                        <View style={styles.quickActionsGrid}>
                            {quickActions.map((action) => (
                                <TouchableOpacity
                                    key={action.id}
                                    style={styles.quickActionCard}
                                    onPress={() => handleQuickAction(action)}
                                >
                                    <View style={[styles.quickActionIcon, { backgroundColor: `${action.color}20` }]}>
                                        {action.id === 1 ? (
                                            <Image
                                                source={require('@/assets/images/logo-energia.jpg')}
                                                style={styles.logoImage}
                                                resizeMode="cover"
                                            />
                                        ) : (
                                            <IconSymbol name={action.icon} size={24} color={action.color} />
                                        )}
                                    </View>
                                    <ThemedText style={styles.quickActionTitle}>{action.title}</ThemedText>
                                    <ThemedText style={styles.quickActionDescription}>{action.description}</ThemedText>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Share Referral */}
                    <View style={styles.shareContainer}>
                        <View style={styles.shareCard}>
                            <View style={styles.shareHeader}>
                                <IconSymbol name="gift.fill" size={24} color="#FF6B35" />
                                <ThemedText style={styles.shareTitle}>Compartilhe e Ganhe!</ThemedText>
                            </View>
                            <ThemedText style={styles.shareDescription}>
                                Envie seu link para o seu amigo e ganhe 30% do valor em kWh + 1% recorrente!
                            </ThemedText>
                            <TouchableOpacity style={styles.shareButton} onPress={handleShareReferral}>
                                <IconSymbol name="square.and.arrow.up" size={20} color="white" />
                                <ThemedText style={styles.shareButtonText}>Compartilhar Link</ThemedText>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <ThemedText style={styles.footerText}>
                            Bem-vindo ao Clubão do Descontão! 🎉
                        </ThemedText>
                    </View>
                </Animated.View>
            </ScrollView>

            {/* Modal de Afiliados */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <ThemedText style={styles.modalTitle}>Meus Afiliados</ThemedText>
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <ThemedText style={styles.closeButtonText}>✕</ThemedText>
                                </TouchableOpacity>
                            </View>

                            <ScrollView style={styles.affiliatesList} showsVerticalScrollIndicator={false}>
                                {affiliates.map((affiliate) => (
                                    <TouchableOpacity
                                        key={affiliate.id}
                                        style={styles.affiliateCard}
                                        onPress={() => {
                                            console.log('Opening affiliate modal for:', affiliate.name);
                                            setSelectedAffiliate(affiliate);
                                            setAffiliateModalVisible(true);
                                        }}
                                    >
                                        <View style={styles.affiliateHeader}>
                                            <View style={styles.affiliateInfo}>
                                                <ThemedText style={styles.affiliateName}>{affiliate.name}</ThemedText>
                                                <ThemedText style={styles.affiliateEmail}>{affiliate.email}</ThemedText>
                                            </View>
                                            <View style={[
                                                styles.statusBadge,
                                                { backgroundColor: affiliate.status === 'active' ? '#4CAF50' : '#FF9800' }
                                            ]}>
                                                <ThemedText style={styles.statusText}>
                                                    {affiliate.status === 'active' ? 'Ativo' : 'Pendente'}
                                                </ThemedText>
                                            </View>
                                        </View>

                                        <View style={styles.affiliateStats}>
                                            <View style={styles.affiliateStatItem}>
                                                <ThemedText style={styles.affiliateStatText}>📅 {new Date(affiliate.joinDate).toLocaleDateString('pt-BR')}</ThemedText>
                                            </View>

                                            {affiliate.status === 'active' && (
                                                <>
                                                    <View style={styles.affiliateStatItem}>
                                                        <ThemedText style={styles.affiliateStatText}>💰 R$ {affiliate.totalEarnings.toFixed(2)}</ThemedText>
                                                    </View>
                                                    <View style={styles.affiliateStatItem}>
                                                        <ThemedText style={styles.affiliateStatText}>⚡ {affiliate.energyConsumption} kWh</ThemedText>
                                                    </View>
                                                </>
                                            )}
                                        </View>

                                        <ThemedText style={styles.chevronText}>›</ThemedText>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Modal de Detalhes do Afiliado */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={affiliateModalVisible}
                onRequestClose={() => setAffiliateModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.affiliateDetailModal}>
                        <View style={styles.affiliateDetailHeader}>
                            <View style={styles.affiliateDetailIconContainer}>
                                <View style={[
                                    styles.affiliateDetailIcon,
                                    { backgroundColor: selectedAffiliate?.status === 'active' ? '#4CAF50' : '#FF9800' }
                                ]}>
                                    <ThemedText style={styles.affiliateDetailIconText}>
                                        {selectedAffiliate?.name?.charAt(0)}
                                    </ThemedText>
                                </View>
                            </View>
                            <View style={styles.affiliateDetailTitleContainer}>
                                <ThemedText style={styles.affiliateDetailTitle}>
                                    {selectedAffiliate?.name}
                                </ThemedText>
                                <ThemedText style={styles.affiliateDetailSubtitle}>
                                    {selectedAffiliate?.email}
                                </ThemedText>
                            </View>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setAffiliateModalVisible(false)}
                            >
                                <ThemedText style={styles.closeButtonText}>✕</ThemedText>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.affiliateDetailContent}>
                            <ThemedText style={styles.affiliateDetailDescription}>
                                Afiliado do Clubão do Descontão
                            </ThemedText>

                            <View style={styles.affiliateDetailPricingBox}>
                                <View style={styles.affiliateDetailPricingRow}>
                                    <ThemedText style={styles.affiliateDetailPricingLabel}>Status:</ThemedText>
                                    <View style={[
                                        styles.affiliateDetailStatusBadge,
                                        { backgroundColor: selectedAffiliate?.status === 'active' ? '#4CAF50' : '#FF9800' }
                                    ]}>
                                        <ThemedText style={styles.affiliateDetailStatusText}>
                                            {selectedAffiliate?.status === 'active' ? 'Ativo' : 'Pendente'}
                                        </ThemedText>
                                    </View>
                                </View>

                                <View style={styles.affiliateDetailPricingRow}>
                                    <ThemedText style={styles.affiliateDetailPricingLabel}>Data de cadastro:</ThemedText>
                                    <ThemedText style={styles.affiliateDetailPricingValue}>
                                        {selectedAffiliate ? new Date(selectedAffiliate.joinDate).toLocaleDateString('pt-BR') : ''}
                                    </ThemedText>
                                </View>

                                <View style={styles.affiliateDetailPricingRow}>
                                    <ThemedText style={styles.affiliateDetailPricingLabel}>Ganhos totais:</ThemedText>
                                    <ThemedText style={styles.affiliateDetailPricingValue}>
                                        R$ {selectedAffiliate?.totalEarnings.toFixed(2)}
                                    </ThemedText>
                                </View>

                                <View style={styles.affiliateDetailPricingRow}>
                                    <ThemedText style={styles.affiliateDetailPricingLabel}>Ganhos mensais:</ThemedText>
                                    <ThemedText style={styles.affiliateDetailPricingValue}>
                                        R$ {selectedAffiliate?.monthlyEarnings.toFixed(2)}
                                    </ThemedText>
                                </View>

                                {selectedAffiliate?.status === 'active' && (
                                    <View style={styles.affiliateDetailPricingRow}>
                                        <ThemedText style={styles.affiliateDetailPricingLabel}>Consumo de energia:</ThemedText>
                                        <ThemedText style={styles.affiliateDetailPricingValue}>
                                            {selectedAffiliate?.energyConsumption} kWh
                                        </ThemedText>
                                    </View>
                                )}
                            </View>

                            <View style={styles.affiliateDetailStockContainer}>
                                <View style={styles.affiliateDetailStockIcon}>
                                    <ThemedText style={styles.affiliateDetailStockIconText}>✓</ThemedText>
                                </View>
                                <ThemedText style={styles.affiliateDetailStockText}>
                                    {selectedAffiliate?.status === 'active' ? 'Ativo no sistema' : 'Aguardando ativação'}
                                </ThemedText>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.affiliateDetailButton}
                            onPress={() => setAffiliateModalVisible(false)}
                        >
                            <ThemedText style={styles.affiliateDetailButtonText}>Fechar</ThemedText>
                        </TouchableOpacity>
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
    content: {
        flex: 1,
        paddingBottom: 20,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: '#FF6B35',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '900',
        fontFamily: 'Arial Black',
        color: 'white',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'Arial Black',
        color: 'white',
        opacity: 0.9,
        textAlign: 'center',
    },
    statsContainer: {
        paddingHorizontal: 20,
        paddingTop: 30,
        marginBottom: 30,
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
    quickActionsContainer: {
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#FF6B35',
    },
    quickActionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    quickActionCard: {
        width: '48%',
        backgroundColor: 'white',
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
    quickActionIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    quickActionTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
        textAlign: 'center',
    },
    quickActionDescription: {
        fontSize: 12,
        opacity: 0.7,
        textAlign: 'center',
    },
    logoImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    shareContainer: {
        paddingHorizontal: 20,
        marginBottom: 30,
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
    // Modal styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 16,
        margin: 20,
        maxWidth: 400,
        width: '90%',
        maxHeight: '80%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 8,
    },
    modalContent: {
        flex: 1,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E7',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF6B35',
    },
    closeButton: {
        padding: 4,
    },
    closeButtonText: {
        fontSize: 18,
        color: '#666',
        fontWeight: 'bold',
    },
    affiliatesList: {
        flex: 1,
        padding: 20,
    },
    affiliateCard: {
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    affiliateHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
        flex: 1,
    },
    affiliateInfo: {
        flex: 1,
    },
    affiliateName: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    affiliateEmail: {
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
    affiliateStats: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        flex: 1,
    },
    affiliateStatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    affiliateStatText: {
        fontSize: 12,
        opacity: 0.7,
    },
    chevronText: {
        fontSize: 20,
        color: '#999',
        fontWeight: 'bold',
    },
    // Modal de detalhes do afiliado
    affiliateDetailModal: {
        backgroundColor: 'white',
        borderRadius: 16,
        margin: 20,
        maxWidth: 400,
        width: '90%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 8,
    },
    affiliateDetailHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        paddingBottom: 16,
    },
    affiliateDetailIconContainer: {
        marginRight: 12,
    },
    affiliateDetailIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    affiliateDetailIconText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    affiliateDetailTitleContainer: {
        flex: 1,
    },
    affiliateDetailTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    affiliateDetailSubtitle: {
        fontSize: 14,
        color: '#FF6B35',
        fontWeight: '500',
    },
    affiliateDetailContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    affiliateDetailDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
    },
    affiliateDetailPricingBox: {
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E9ECEF',
    },
    affiliateDetailPricingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    affiliateDetailPricingLabel: {
        fontSize: 14,
        color: '#666',
        flex: 1,
    },
    affiliateDetailPricingValue: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
        textAlign: 'right',
    },
    affiliateDetailStatusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    affiliateDetailStatusText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    affiliateDetailStockContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    affiliateDetailStockIcon: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    affiliateDetailStockIconText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    affiliateDetailStockText: {
        fontSize: 14,
        color: '#4CAF50',
        fontWeight: '500',
    },
    affiliateDetailButton: {
        backgroundColor: '#FF6B35',
        padding: 16,
        margin: 20,
        borderRadius: 12,
        alignItems: 'center',
    },
    affiliateDetailButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});