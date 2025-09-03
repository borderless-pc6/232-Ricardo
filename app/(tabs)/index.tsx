import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function HomeScreen() {
  const [userStats] = useState({
    totalEarnings: 1250.50,
    totalKwh: 850.25,
    referralsCount: 12,
    monthlyRecurring: 45.80,
  });

  const [refreshing, setRefreshing] = useState(false);
  const [greeting] = useState('Olá, Ricardo! 👋');

  const backgroundColor = useThemeColor({}, 'background');

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
    // Simular atualização de dados
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleEnergyDiscount = () => {
    Alert.alert(
      'Desconto de Energia',
      'Economize 20% na sua conta de energia! Cadastre sua conta e comece a economizar hoje mesmo.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Cadastrar Conta', onPress: () => router.push('/energy-registration') },
      ]
    );
  };

  const handleMedicines = () => {
    Alert.alert(
      'Medicamentos',
      'Compre medicamentos diretamente dos laboratórios com preços especiais!',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Ver Medicamentos', onPress: () => console.log('Ver medicamentos') },
      ]
    );
  };

  const handleSalonBooking = () => {
    Alert.alert(
      'Salões de Beleza',
      'Agende seus serviços de beleza com os melhores profissionais!',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Agendar', onPress: () => console.log('Agendar salão') },
      ]
    );
  };

  const handleReferral = () => {
    Alert.alert(
      'Sistema de Indicação',
      'Ganhe 30% do valor em kWh ao indicar novos usuários + 1% recorrente!',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Ver Indicações', onPress: () => router.push('/referrals') },
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
            <View style={styles.headerTop}>
              <View style={styles.greetingContainer}>
                <ThemedText type="title" style={styles.welcomeText}>
                  {greeting}
                </ThemedText>
                <ThemedText style={styles.subtitleText}>
                  Bem-vindo ao Clubão do Descontão
                </ThemedText>
              </View>
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => router.replace('/auth')}
              >
                <IconSymbol name="rectangle.portrait.and.arrow.right" size={20} color="#FF6B35" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            <View style={styles.statsRow}>
              <TouchableOpacity style={[styles.statCard, { backgroundColor: '#4CAF50' }]} activeOpacity={0.8}>
                <View style={styles.statIconContainer}>
                  <IconSymbol name="dollarsign.circle.fill" size={28} color="white" />
                </View>
                <ThemedText style={styles.statValue}>R$ {userStats.totalEarnings.toFixed(2)}</ThemedText>
                <ThemedText style={styles.statLabel}>Total Ganho</ThemedText>
                <View style={styles.statTrend}>
                  <IconSymbol name="arrow.up.right" size={12} color="white" />
                  <ThemedText style={styles.statTrendText}>+12%</ThemedText>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.statCard, { backgroundColor: '#2196F3' }]} activeOpacity={0.8}>
                <View style={styles.statIconContainer}>
                  <IconSymbol name="bolt.fill" size={28} color="white" />
                </View>
                <ThemedText style={styles.statValue}>{userStats.totalKwh.toFixed(1)} kWh</ThemedText>
                <ThemedText style={styles.statLabel}>Energia Economizada</ThemedText>
                <View style={styles.statTrend}>
                  <IconSymbol name="arrow.up.right" size={12} color="white" />
                  <ThemedText style={styles.statTrendText}>+8%</ThemedText>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.statsRow}>
              <TouchableOpacity style={[styles.statCard, { backgroundColor: '#FF9800' }]} activeOpacity={0.8}>
                <View style={styles.statIconContainer}>
                  <IconSymbol name="person.2.fill" size={28} color="white" />
                </View>
                <ThemedText style={styles.statValue}>{userStats.referralsCount}</ThemedText>
                <ThemedText style={styles.statLabel}>Indicações</ThemedText>
                <View style={styles.statTrend}>
                  <IconSymbol name="arrow.up.right" size={12} color="white" />
                  <ThemedText style={styles.statTrendText}>+3</ThemedText>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.statCard, { backgroundColor: '#9C27B0' }]} activeOpacity={0.8}>
                <View style={styles.statIconContainer}>
                  <IconSymbol name="arrow.clockwise.circle.fill" size={28} color="white" />
                </View>
                <ThemedText style={styles.statValue}>R$ {userStats.monthlyRecurring.toFixed(2)}</ThemedText>
                <ThemedText style={styles.statLabel}>Recorrente/Mês</ThemedText>
                <View style={styles.statTrend}>
                  <IconSymbol name="arrow.up.right" size={12} color="white" />
                  <ThemedText style={styles.statTrendText}>+5%</ThemedText>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActionsContainer}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Ações Rápidas
            </ThemedText>

            <View style={styles.quickActionsRow}>
              <TouchableOpacity style={styles.quickActionButton} onPress={handleEnergyDiscount}>
                <View style={[styles.quickActionIcon, { backgroundColor: '#FF6B35' }]}>
                  <IconSymbol name="bolt.fill" size={24} color="white" />
                </View>
                <ThemedText style={styles.quickActionText}>Cadastrar Energia</ThemedText>
                <ThemedText style={styles.quickActionSubtext}>Economize 20%</ThemedText>
              </TouchableOpacity>

              <TouchableOpacity style={styles.quickActionButton} onPress={handleReferral}>
                <View style={[styles.quickActionIcon, { backgroundColor: '#4CAF50' }]}>
                  <IconSymbol name="person.badge.plus" size={24} color="white" />
                </View>
                <ThemedText style={styles.quickActionText}>Indicar Amigo</ThemedText>
                <ThemedText style={styles.quickActionSubtext}>Ganhe 30%</ThemedText>
              </TouchableOpacity>
            </View>
          </View>

          {/* Main Services */}
          <View style={styles.servicesContainer}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Nossos Serviços
            </ThemedText>

            <TouchableOpacity style={styles.serviceCard} onPress={handleEnergyDiscount}>
              <View style={styles.serviceIcon}>
                <IconSymbol name="bolt.fill" size={32} color="#FF6B35" />
              </View>
              <View style={styles.serviceContent}>
                <ThemedText style={styles.serviceTitle}>Desconto de Energia</ThemedText>
                <ThemedText style={styles.serviceDescription}>
                  Economize 20% na sua conta de energia
                </ThemedText>
                <View style={styles.discountBadge}>
                  <ThemedText style={styles.discountText}>-20%</ThemedText>
                </View>
              </View>
              <IconSymbol name="chevron.right" size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.serviceCard} onPress={handleMedicines}>
              <View style={styles.serviceIcon}>
                <IconSymbol name="pills.fill" size={32} color="#4CAF50" />
              </View>
              <View style={styles.serviceContent}>
                <ThemedText style={styles.serviceTitle}>Medicamentos</ThemedText>
                <ThemedText style={styles.serviceDescription}>
                  Compre direto dos laboratórios
                </ThemedText>
                <View style={styles.newBadge}>
                  <ThemedText style={styles.newText}>Em Breve</ThemedText>
                </View>
              </View>
              <IconSymbol name="chevron.right" size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.serviceCard} onPress={handleSalonBooking}>
              <View style={styles.serviceIcon}>
                <IconSymbol name="scissors" size={32} color="#E91E63" />
              </View>
              <View style={styles.serviceContent}>
                <ThemedText style={styles.serviceTitle}>Salões de Beleza</ThemedText>
                <ThemedText style={styles.serviceDescription}>
                  Agende seus serviços de beleza
                </ThemedText>
                <View style={styles.newBadge}>
                  <ThemedText style={styles.newText}>Em Breve</ThemedText>
                </View>
              </View>
              <IconSymbol name="chevron.right" size={20} color="#999" />
            </TouchableOpacity>
          </View>

          {/* Referral System */}
          <View style={styles.referralContainer}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Sistema de Indicação
            </ThemedText>

            <View style={styles.referralCard}>
              <View style={styles.referralHeader}>
                <IconSymbol name="gift.fill" size={24} color="#FF6B35" />
                <ThemedText style={styles.referralTitle}>Ganhe Indicando!</ThemedText>
              </View>
              <ThemedText style={styles.referralDescription}>
                • 30% do valor em kWh por indicação{'\n'}
                • 1% recorrente das contas cadastradas{'\n'}
                • Acompanhe sua rede de indicações
              </ThemedText>
              <TouchableOpacity style={styles.referralButton} onPress={handleReferral}>
                <ThemedText style={styles.referralButtonText}>Ver Minhas Indicações</ThemedText>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <ThemedText style={styles.footerText}>
              Os melhores descontos estão aqui! 🎉
            </ThemedText>
          </View>
        </Animated.View>
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
  content: {
    flex: 1,
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greetingContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  subtitleText: {
    fontSize: 16,
    opacity: 0.7,
    marginTop: 4,
  },
  logoutButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 10,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  statIconContainer: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'white',
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: 8,
  },
  statTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statTrendText: {
    fontSize: 10,
    color: 'white',
    fontWeight: '600',
    marginLeft: 4,
  },
  quickActionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 10,
  },
  quickActionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
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
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  quickActionSubtext: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'center',
  },
  servicesContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#FF6B35',
  },
  serviceCard: {
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
  serviceIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  serviceContent: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 8,
  },
  discountBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  discountText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  newBadge: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  newText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  referralContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 10,
  },
  referralCard: {
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
  referralHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  referralTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#FF6B35',
  },
  referralDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
    opacity: 0.8,
  },
  referralButton: {
    backgroundColor: '#FF6B35',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  referralButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  footer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 20,
  },
  footerText: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
  },
});

