import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function RegistrationSuccessScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const tintColor = useThemeColor({}, 'tint');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <IconSymbol name="checkmark.circle.fill" size={80} color="#4CAF50" />
        </View>

        {/* Success Message */}
        <ThemedText type="title" style={styles.title}>
          Conta Cadastrada com Sucesso!
        </ThemedText>

        <ThemedText style={styles.subtitle}>
          Sua conta de energia foi cadastrada com sucesso no Clubão do Descontão.
        </ThemedText>

        {/* Benefits */}
        <View style={styles.benefitsContainer}>
          <ThemedText type="subtitle" style={styles.benefitsTitle}>
            O que você ganha:
          </ThemedText>

          <View style={styles.benefitItem}>
            <IconSymbol name="bolt.fill" size={24} color="#FF6B35" />
            <View style={styles.benefitContent}>
              <ThemedText style={styles.benefitTitle}>20% de Desconto</ThemedText>
              <ThemedText style={styles.benefitDescription}>
                Economia garantida na sua próxima fatura de energia
              </ThemedText>
            </View>
          </View>

          <View style={styles.benefitItem}>
            <IconSymbol name="dollarsign.circle.fill" size={24} color="#4CAF50" />
            <View style={styles.benefitContent}>
              <ThemedText style={styles.benefitTitle}>Ganhe Indicando</ThemedText>
              <ThemedText style={styles.benefitDescription}>
                30% do valor em kWh por cada indicação + 1% recorrente
              </ThemedText>
            </View>
          </View>

          <View style={styles.benefitItem}>
            <IconSymbol name="clock.fill" size={24} color="#2196F3" />
            <View style={styles.benefitContent}>
              <ThemedText style={styles.benefitTitle}>Ativação Imediata</ThemedText>
              <ThemedText style={styles.benefitDescription}>
                Seu desconto será aplicado na próxima fatura
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Next Steps */}
        <View style={styles.nextStepsContainer}>
          <ThemedText type="subtitle" style={styles.nextStepsTitle}>
            Próximos Passos:
          </ThemedText>

          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <ThemedText style={styles.stepNumberText}>1</ThemedText>
            </View>
            <ThemedText style={styles.stepText}>
              Aguarde a confirmação por email (até 24h)
            </ThemedText>
          </View>

          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <ThemedText style={styles.stepNumberText}>2</ThemedText>
            </View>
            <ThemedText style={styles.stepText}>
              Seu desconto será aplicado na próxima fatura
            </ThemedText>
          </View>

          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <ThemedText style={styles.stepNumberText}>3</ThemedText>
            </View>
            <ThemedText style={styles.stepText}>
              Compartilhe seu link de indicação e ganhe mais!
            </ThemedText>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: tintColor }]}
            onPress={() => router.replace('/(tabs)')}
          >
            <ThemedText style={styles.primaryButtonText}>
              Ir para Dashboard
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => {
              // Aqui você implementaria a funcionalidade de compartilhar
              console.log('Compartilhar link de indicação');
            }}
          >
            <IconSymbol name="square.and.arrow.up" size={20} color="#FF6B35" />
            <ThemedText style={styles.secondaryButtonText}>
              Compartilhar Link
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <ThemedText style={styles.footerText}>
            Obrigado por escolher o Clubão do Descontão! 🎉
          </ThemedText>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#4CAF50',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.8,
    marginBottom: 40,
    lineHeight: 24,
  },
  benefitsContainer: {
    marginBottom: 40,
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF6B35',
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  benefitContent: {
    marginLeft: 16,
    flex: 1,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  benefitDescription: {
    fontSize: 14,
    opacity: 0.7,
    lineHeight: 20,
  },
  nextStepsContainer: {
    marginBottom: 40,
  },
  nextStepsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF6B35',
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF6B35',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  stepText: {
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  buttonsContainer: {
    gap: 12,
    marginBottom: 30,
  },
  primaryButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FF6B35',
    gap: 8,
  },
  secondaryButtonText: {
    color: '#FF6B35',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
  },
});
