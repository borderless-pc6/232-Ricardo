import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OffersScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const [offers] = useState([
    {
      id: 1,
      title: 'Desconto de Energia',
      description: 'Economize 20% na sua conta de energia elétrica',
      discount: '20%',
      icon: 'bolt.fill' as any,
      color: '#FF6B35',
      isActive: true,
    },
    {
      id: 2,
      title: 'Medicamentos',
      description: 'Compre medicamentos direto dos laboratórios',
      discount: 'Até 40%',
      icon: 'pills.fill' as any,
      color: '#4CAF50',
      isActive: false,
      comingSoon: true,
    },
    {
      id: 3,
      title: 'Salões de Beleza',
      description: 'Agende serviços de beleza com desconto',
      discount: 'Até 30%',
      icon: 'scissors' as any,
      color: '#E91E63',
      isActive: false,
      comingSoon: true,
    },
  ]);

  const [referralStats] = useState({
    totalReferrals: 12,
    activeReferrals: 8,
    monthlyEarnings: 45.80,
    totalEarnings: 1250.50,
  });

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  const handleOfferPress = (offer: any) => {
    if (offer.comingSoon) {
      Alert.alert(
        'Em Breve',
        'Esta funcionalidade estará disponível em breve!',
        [{ text: 'OK' }]
      );
      return;
    }

    if (offer.id === 1) { // Desconto de Energia
      setSelectedOffer(offer);
      setModalVisible(true);
    } else {
      Alert.alert(
        offer.title,
        offer.description,
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Acessar', onPress: () => console.log(`Acessar ${offer.title}`) },
        ]
      );
    }
  };

  const handleModalAccess = () => {
    setModalVisible(false);
    router.push('/energy-registration');
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setSelectedOffer(null);
  };

  const handleReferralPress = () => {
    Alert.alert(
      'Sistema de Indicação',
      'Compartilhe seu link de indicação e ganhe comissões!',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Ver Indicações', onPress: () => router.push('/referrals') },
        { text: 'Compartilhar Link', onPress: () => console.log('Compartilhar link') },
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
              Ofertas Especiais
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              Descubra os melhores descontos e ofertas exclusivas
            </ThemedText>
          </View>

          {/* Offers Section */}
          <View style={styles.offersContainer}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Nossas Ofertas
            </ThemedText>

            {offers.map((offer) => (
              <TouchableOpacity
                key={offer.id}
                style={[
                  styles.offerCard,
                  !offer.isActive && styles.disabledCard
                ]}
                onPress={() => handleOfferPress(offer)}
                disabled={!offer.isActive}
              >
                <View style={[styles.offerIcon, { backgroundColor: `${offer.color}20` }]}>
                  <IconSymbol name={offer.icon} size={28} color={offer.color} />
                </View>

                <View style={styles.offerContent}>
                  <View style={styles.offerHeader}>
                    <ThemedText style={styles.offerTitle}>{offer.title}</ThemedText>
                    <View style={[styles.discountBadge, { backgroundColor: offer.color }]}>
                      <ThemedText style={styles.discountText}>{offer.discount}</ThemedText>
                    </View>
                  </View>
                  <ThemedText style={styles.offerDescription}>
                    {offer.description}
                  </ThemedText>
                  {offer.comingSoon && (
                    <View style={styles.comingSoonBadge}>
                      <ThemedText style={styles.comingSoonText}>Em Breve</ThemedText>
                    </View>
                  )}
                </View>

                <IconSymbol
                  name="chevron.right"
                  size={20}
                  color={offer.isActive ? "#999" : "#ccc"}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Referral Stats */}
          <View style={styles.referralStatsContainer}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Suas Indicações
            </ThemedText>

            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <IconSymbol name="person.2.fill" size={24} color="#FF6B35" />
                <ThemedText style={styles.statNumber}>{referralStats.totalReferrals}</ThemedText>
                <ThemedText style={styles.statLabel}>Total de Indicações</ThemedText>
              </View>

              <View style={styles.statItem}>
                <IconSymbol name="checkmark.circle.fill" size={24} color="#4CAF50" />
                <ThemedText style={styles.statNumber}>{referralStats.activeReferrals}</ThemedText>
                <ThemedText style={styles.statLabel}>Indicações Ativas</ThemedText>
              </View>

              <View style={styles.statItem}>
                <IconSymbol name="dollarsign.circle.fill" size={24} color="#2196F3" />
                <ThemedText style={styles.statNumber}>R$ {referralStats.monthlyEarnings.toFixed(2)}</ThemedText>
                <ThemedText style={styles.statLabel}>Ganhos Mensais</ThemedText>
              </View>

              <View style={styles.statItem}>
                <IconSymbol name="chart.line.uptrend.xyaxis" size={24} color="#9C27B0" />
                <ThemedText style={styles.statNumber}>R$ {referralStats.totalEarnings.toFixed(2)}</ThemedText>
                <ThemedText style={styles.statLabel}>Total Ganho</ThemedText>
              </View>
            </View>

            <TouchableOpacity style={styles.referralButton} onPress={handleReferralPress}>
              <IconSymbol name="square.and.arrow.up" size={20} color="white" />
              <ThemedText style={styles.referralButtonText}>Compartilhar Link de Indicação</ThemedText>
            </TouchableOpacity>
          </View>

          {/* How it Works */}
          <View style={styles.howItWorksContainer}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Como Funciona
            </ThemedText>

            <View style={styles.stepsContainer}>
              <View style={styles.step}>
                <View style={styles.stepNumber}>
                  <ThemedText style={styles.stepNumberText}>1</ThemedText>
                </View>
                <View style={styles.stepContent}>
                  <ThemedText style={styles.stepTitle}>Cadastre sua Conta</ThemedText>
                  <ThemedText style={styles.stepDescription}>
                    Cadastre sua conta de energia e comece a economizar 20%
                  </ThemedText>
                </View>
              </View>

              <View style={styles.step}>
                <View style={styles.stepNumber}>
                  <ThemedText style={styles.stepNumberText}>2</ThemedText>
                </View>
                <View style={styles.stepContent}>
                  <ThemedText style={styles.stepTitle}>Indique Amigos</ThemedText>
                  <ThemedText style={styles.stepDescription}>
                    Compartilhe seu link e ganhe 30% do valor em kWh
                  </ThemedText>
                </View>
              </View>

              <View style={styles.step}>
                <View style={styles.stepNumber}>
                  <ThemedText style={styles.stepNumberText}>3</ThemedText>
                </View>
                <View style={styles.stepContent}>
                  <ThemedText style={styles.stepTitle}>Ganhe Recorrente</ThemedText>
                  <ThemedText style={styles.stepDescription}>
                    Receba 1% recorrente das contas cadastradas
                  </ThemedText>
                </View>
              </View>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <ThemedText style={styles.footerText}>
              Economize mais, viva melhor! 💰
            </ThemedText>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Modal para Desconto de Energia */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ThemedText style={styles.modalTitle}>
                {selectedOffer?.title}
              </ThemedText>
              <ThemedText style={styles.modalDescription}>
                {selectedOffer?.description}
              </ThemedText>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleModalCancel}
                >
                  <ThemedText style={styles.modalButtonText}>Cancelar</ThemedText>
                </TouchableOpacity>

                <View style={styles.modalButtonSeparator} />

                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleModalAccess}
                >
                  <ThemedText style={styles.modalButtonText}>Acessar</ThemedText>
                </TouchableOpacity>
              </View>
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
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    textAlign: 'center',
  },
  offersContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#FF6B35',
  },
  offerCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
  disabledCard: {
    opacity: 0.6,
  },
  offerIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  offerContent: {
    flex: 1,
  },
  offerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  discountBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  offerDescription: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 8,
  },
  comingSoonBadge: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  comingSoonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  referralStatsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  statItem: {
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
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'center',
  },
  referralButton: {
    backgroundColor: '#FF6B35',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  referralButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  howItWorksContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
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
    maxWidth: 320,
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
  modalContent: {
    padding: 24,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  modalButtons: {
    flexDirection: 'row',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  modalButtonSeparator: {
    width: 1,
    backgroundColor: '#E5E5E7',
    marginVertical: 4,
  },
});