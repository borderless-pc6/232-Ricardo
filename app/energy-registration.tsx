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
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EnergyRegistrationScreen() {
    const [formData, setFormData] = useState({
        customerName: '',
        cpf: '',
        contractNumber: '',
        meterNumber: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phone: '',
        email: '',
        energyProvider: '',
        monthlyConsumption: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    const backgroundColor = useThemeColor({}, 'background');
    const textColor = useThemeColor({}, 'text');
    const tintColor = useThemeColor({}, 'tint');

    const energyProviders = [
        'CPFL Energia',
        'Enel',
        'Light',
        'AES Eletropaulo',
        'Cemig',
        'Coelba',
        'Celpe',
        'Energisa',
        'Outro'
    ];

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const formatCPF = (value: string) => {
        const numbers = value.replace(/\D/g, '');
        return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    };

    const formatCEP = (value: string) => {
        const numbers = value.replace(/\D/g, '');
        return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
    };

    const formatPhone = (value: string) => {
        const numbers = value.replace(/\D/g, '');
        if (numbers.length <= 10) {
            return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        } else {
            return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        }
    };

    const validateForm = () => {
        const requiredFields = [
            'customerName', 'cpf', 'contractNumber', 'meterNumber',
            'address', 'city', 'state', 'zipCode', 'phone', 'email', 'energyProvider'
        ];

        for (const field of requiredFields) {
            if (!formData[field as keyof typeof formData].trim()) {
                Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios');
                return false;
            }
        }

        // Validação básica de CPF
        const cpfNumbers = formData.cpf.replace(/\D/g, '');
        if (cpfNumbers.length !== 11) {
            Alert.alert('Erro', 'CPF deve ter 11 dígitos');
            return false;
        }

        // Validação básica de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            Alert.alert('Erro', 'Por favor, insira um email válido');
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsLoading(true);

        // Simular processamento
        setTimeout(() => {
            setIsLoading(false);
            // Navegar diretamente para a tela de sucesso
            router.replace('/registration-success');
        }, 2000);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor }]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
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
                                Cadastrar Conta de Energia
                            </ThemedText>
                            <ThemedText style={styles.subtitle}>
                                Economize 20% na sua conta de energia
                            </ThemedText>
                        </View>
                    </View>

                    {/* Discount Banner */}
                    <View style={styles.discountBanner}>
                        <IconSymbol name="bolt.fill" size={32} color="white" />
                        <View style={styles.discountContent}>
                            <ThemedText style={styles.discountTitle}>Desconto de 20%</ThemedText>
                            <ThemedText style={styles.discountDescription}>
                                Cadastre sua conta e comece a economizar hoje mesmo!
                            </ThemedText>
                        </View>
                    </View>

                    {/* Form */}
                    <View style={styles.form}>
                        {/* Dados Pessoais */}
                        <View style={styles.section}>
                            <ThemedText type="subtitle" style={styles.sectionTitle}>
                                Dados Pessoais
                            </ThemedText>

                            <View style={styles.inputContainer}>
                                <ThemedText style={styles.label}>Nome completo *</ThemedText>
                                <TextInput
                                    style={[styles.input, { color: textColor, borderColor: textColor }]}
                                    placeholder="Digite seu nome completo"
                                    placeholderTextColor="#999"
                                    value={formData.customerName}
                                    onChangeText={(value) => handleInputChange('customerName', value)}
                                    autoCapitalize="words"
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <ThemedText style={styles.label}>CPF *</ThemedText>
                                <TextInput
                                    style={[styles.input, { color: textColor, borderColor: textColor }]}
                                    placeholder="000.000.000-00"
                                    placeholderTextColor="#999"
                                    value={formData.cpf}
                                    onChangeText={(value) => handleInputChange('cpf', formatCPF(value))}
                                    keyboardType="numeric"
                                    maxLength={14}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <ThemedText style={styles.label}>Telefone *</ThemedText>
                                <TextInput
                                    style={[styles.input, { color: textColor, borderColor: textColor }]}
                                    placeholder="(00) 00000-0000"
                                    placeholderTextColor="#999"
                                    value={formData.phone}
                                    onChangeText={(value) => handleInputChange('phone', formatPhone(value))}
                                    keyboardType="phone-pad"
                                    maxLength={15}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <ThemedText style={styles.label}>E-mail *</ThemedText>
                                <TextInput
                                    style={[styles.input, { color: textColor, borderColor: textColor }]}
                                    placeholder="seu@email.com"
                                    placeholderTextColor="#999"
                                    value={formData.email}
                                    onChangeText={(value) => handleInputChange('email', value)}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>

                        {/* Dados da Conta de Energia */}
                        <View style={styles.section}>
                            <ThemedText type="subtitle" style={styles.sectionTitle}>
                                Dados da Conta de Energia
                            </ThemedText>

                            <View style={styles.inputContainer}>
                                <ThemedText style={styles.label}>Concessionária *</ThemedText>
                                <View style={[styles.pickerContainer, { borderColor: textColor }]}>
                                    <TextInput
                                        style={[styles.pickerInput, { color: textColor }]}
                                        placeholder="Selecione sua concessionária"
                                        placeholderTextColor="#999"
                                        value={formData.energyProvider}
                                        onChangeText={(value) => handleInputChange('energyProvider', value)}
                                    />
                                </View>
                            </View>

                            <View style={styles.inputContainer}>
                                <ThemedText style={styles.label}>Número do contrato *</ThemedText>
                                <TextInput
                                    style={[styles.input, { color: textColor, borderColor: textColor }]}
                                    placeholder="Digite o número do contrato"
                                    placeholderTextColor="#999"
                                    value={formData.contractNumber}
                                    onChangeText={(value) => handleInputChange('contractNumber', value)}
                                    keyboardType="numeric"
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <ThemedText style={styles.label}>Número do medidor *</ThemedText>
                                <TextInput
                                    style={[styles.input, { color: textColor, borderColor: textColor }]}
                                    placeholder="Digite o número do medidor"
                                    placeholderTextColor="#999"
                                    value={formData.meterNumber}
                                    onChangeText={(value) => handleInputChange('meterNumber', value)}
                                    keyboardType="numeric"
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <ThemedText style={styles.label}>Consumo médio mensal (kWh)</ThemedText>
                                <TextInput
                                    style={[styles.input, { color: textColor, borderColor: textColor }]}
                                    placeholder="Ex: 300"
                                    placeholderTextColor="#999"
                                    value={formData.monthlyConsumption}
                                    onChangeText={(value) => handleInputChange('monthlyConsumption', value)}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>

                        {/* Endereço */}
                        <View style={styles.section}>
                            <ThemedText type="subtitle" style={styles.sectionTitle}>
                                Endereço da Instalação
                            </ThemedText>

                            <View style={styles.inputContainer}>
                                <ThemedText style={styles.label}>Endereço completo *</ThemedText>
                                <TextInput
                                    style={[styles.input, { color: textColor, borderColor: textColor }]}
                                    placeholder="Rua, número, complemento"
                                    placeholderTextColor="#999"
                                    value={formData.address}
                                    onChangeText={(value) => handleInputChange('address', value)}
                                />
                            </View>

                            <View style={styles.row}>
                                <View style={[styles.inputContainer, { flex: 2 }]}>
                                    <ThemedText style={styles.label}>Cidade *</ThemedText>
                                    <TextInput
                                        style={[styles.input, { color: textColor, borderColor: textColor }]}
                                        placeholder="Sua cidade"
                                        placeholderTextColor="#999"
                                        value={formData.city}
                                        onChangeText={(value) => handleInputChange('city', value)}
                                        autoCapitalize="words"
                                    />
                                </View>
                                <View style={[styles.inputContainer, { flex: 1, marginLeft: 12 }]}>
                                    <ThemedText style={styles.label}>UF *</ThemedText>
                                    <TextInput
                                        style={[styles.input, { color: textColor, borderColor: textColor }]}
                                        placeholder="SP"
                                        placeholderTextColor="#999"
                                        value={formData.state}
                                        onChangeText={(value) => handleInputChange('state', value.toUpperCase())}
                                        autoCapitalize="characters"
                                        maxLength={2}
                                    />
                                </View>
                            </View>

                            <View style={styles.inputContainer}>
                                <ThemedText style={styles.label}>CEP *</ThemedText>
                                <TextInput
                                    style={[styles.input, { color: textColor, borderColor: textColor }]}
                                    placeholder="00000-000"
                                    placeholderTextColor="#999"
                                    value={formData.zipCode}
                                    onChangeText={(value) => handleInputChange('zipCode', formatCEP(value))}
                                    keyboardType="numeric"
                                    maxLength={9}
                                />
                            </View>
                        </View>

                        {/* Submit Button */}
                        <TouchableOpacity
                            style={[
                                styles.submitButton,
                                { backgroundColor: tintColor },
                                isLoading && styles.submitButtonDisabled
                            ]}
                            onPress={handleSubmit}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ThemedText style={styles.submitButtonText}>Cadastrando...</ThemedText>
                            ) : (
                                <ThemedText style={styles.submitButtonText}>Cadastrar Conta</ThemedText>
                            )}
                        </TouchableOpacity>

                        {/* Info */}
                        <View style={styles.infoContainer}>
                            <IconSymbol name="info.circle" size={20} color="#FF6B35" />
                            <ThemedText style={styles.infoText}>
                                Seus dados estão seguros e serão utilizados apenas para processar o desconto na sua conta de energia.
                            </ThemedText>
                        </View>
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
    keyboardView: {
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
    discountBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FF6B35',
        marginHorizontal: 20,
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
    },
    discountContent: {
        marginLeft: 12,
        flex: 1,
    },
    discountTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    discountDescription: {
        color: 'white',
        fontSize: 14,
        opacity: 0.9,
    },
    form: {
        paddingHorizontal: 20,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#FF6B35',
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 16,
        fontSize: 16,
        backgroundColor: 'transparent',
    },
    pickerContainer: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 16,
        backgroundColor: 'transparent',
    },
    pickerInput: {
        fontSize: 16,
    },
    row: {
        flexDirection: 'row',
    },
    submitButton: {
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    submitButtonDisabled: {
        opacity: 0.6,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: 'rgba(255, 107, 53, 0.1)',
        padding: 16,
        borderRadius: 8,
        marginBottom: 30,
    },
    infoText: {
        fontSize: 14,
        marginLeft: 12,
        flex: 1,
        lineHeight: 20,
    },
});
