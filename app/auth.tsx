import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('123@gmail.com');
  const [password, setPassword] = useState('123456');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');

  const handleAuth = () => {
    console.log('Tentando fazer login...', { email, password });

    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    if (!isLogin && !name) {
      Alert.alert('Erro', 'Por favor, insira seu nome');
      return;
    }

    // Login direto sem alert
    console.log('Login válido, navegando...');
    try {
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Erro na navegação:', error);
      Alert.alert('Erro', 'Erro ao fazer login. Tente novamente.');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {/* Header com botão de voltar */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <IconSymbol name="chevron.left" size={24} color="#FF6B35" />
        </TouchableOpacity>
        <ThemedText type="title" style={styles.headerTitle}>
          {isLogin ? 'Entrar' : 'Cadastrar'}
        </ThemedText>
        <View style={styles.headerSpacer} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <ThemedText type="title" style={styles.title}>
              Clubão do Descontão
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              {isLogin ? 'Faça login para continuar' : 'Crie sua conta'}
            </ThemedText>
          </View>

          <View style={styles.form}>
            {!isLogin && (
              <View style={styles.inputContainer}>
                <ThemedText style={styles.label}>Nome completo</ThemedText>
                <TextInput
                  style={[styles.input, { color: textColor, borderColor: textColor }]}
                  placeholder="Digite seu nome completo"
                  placeholderTextColor="#999"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>
            )}

            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>E-mail</ThemedText>
              <TextInput
                style={[styles.input, { color: textColor, borderColor: textColor }]}
                placeholder="Digite seu e-mail"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Senha</ThemedText>
              <TextInput
                style={[styles.input, { color: textColor, borderColor: textColor }]}
                placeholder="Digite sua senha"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            {!isLogin && (
              <View style={styles.inputContainer}>
                <ThemedText style={styles.label}>Confirmar senha</ThemedText>
                <TextInput
                  style={[styles.input, { color: textColor, borderColor: textColor }]}
                  placeholder="Confirme sua senha"
                  placeholderTextColor="#999"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />
              </View>
            )}

            <TouchableOpacity
              style={[styles.button, { backgroundColor: tintColor }]}
              onPress={handleAuth}
            >
              <Text style={styles.buttonText}>
                {isLogin ? 'Entrar' : 'Criar conta'}
              </Text>
            </TouchableOpacity>

            {/* Botão de teste para pular login */}
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#4CAF50', marginTop: 10 }]}
              onPress={() => {
                console.log('Pulando login...');
                router.replace('/(tabs)');
              }}
            >
              <Text style={styles.buttonText}>
                Pular Login (Teste)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.switchButton}
              onPress={() => setIsLogin(!isLogin)}
            >
              <ThemedText style={styles.switchText}>
                {isLogin
                  ? 'Não tem uma conta? Cadastre-se'
                  : 'Já tem uma conta? Faça login'}
              </ThemedText>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <ThemedText style={styles.footerText}>
              Os melhores descontos estão aqui! 🎉
            </ThemedText>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: 'white',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  headerSpacer: {
    width: 40, // Mesmo tamanho do botão para centralizar o título
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    color: '#FF6B35', // Cor laranja para destacar
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.8,
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    backgroundColor: 'transparent',
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  switchButton: {
    alignItems: 'center',
    padding: 10,
  },
  switchText: {
    color: '#0a7ea4',
    fontSize: 16,
  },
  footer: {
    alignItems: 'center',
    marginTop: 40,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 14,
    opacity: 0.7,
  },
});
