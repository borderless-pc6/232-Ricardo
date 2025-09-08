import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useState } from 'react';
import {
    Alert,
    Modal,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [settingsModalVisible, setSettingsModalVisible] = useState(false);
    const [editingProfile, setEditingProfile] = useState({
        name: 'Ricardo Silva',
        email: 'ricardo.silva@email.com',
        phone: '(11) 99999-9999',
        birthDate: '15/03/1985',
        cpf: '123.456.789-00',
        address: 'Rua das Flores, 123',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567',
    });
    const backgroundColor = useThemeColor({}, 'background');

    const [userProfile] = useState({
        name: 'Ricardo Silva',
        email: 'ricardo.silva@email.com',
        phone: '(11) 99999-9999',
        joinDate: '2024-01-01',
        totalReferrals: 12,
        activeReferrals: 8,
        totalEarnings: 1250.50,
        monthlyEarnings: 156.80,
        energySavings: 2850,
    });

    const [profileStats] = useState([
        {
            id: 1,
            title: 'Indicações Totais',
            value: '12',
            icon: 'person.2.fill',
            color: '#4CAF50',
        },
        {
            id: 2,
            title: 'Ganhos Totais',
            value: 'R$ 1.250',
            icon: 'dollarsign.circle.fill',
            color: '#FF6B35',
        },
        {
            id: 3,
            title: 'Este Mês',
            value: 'R$ 156',
            icon: 'chart.line.uptrend.xyaxis',
            color: '#2196F3',
        },
        {
            id: 4,
            title: 'kWh Economizados',
            value: '2.850',
            icon: 'bolt.fill',
            color: '#FF9800',
        },
    ]);

    const [profileOptions] = useState([
        {
            id: 1,
            title: 'Editar Perfil',
            description: 'Alterar informações pessoais',
            icon: 'pencil',
            color: '#FF6B35',
            action: () => setEditModalVisible(true),
        },
        {
            id: 2,
            title: 'Configurações',
            description: 'Preferências e notificações',
            icon: 'gear',
            color: '#666',
            action: () => setSettingsModalVisible(true),
        },
        {
            id: 3,
            title: 'Histórico de Ganhos',
            description: 'Ver relatórios detalhados',
            icon: 'chart.bar.fill',
            color: '#4CAF50',
            action: () => Alert.alert('Em breve', 'Funcionalidade em desenvolvimento'),
        },
        {
            id: 4,
            title: 'Ajuda e Suporte',
            description: 'Central de ajuda',
            icon: 'questionmark.circle',
            color: '#2196F3',
            action: () => Alert.alert('Ajuda', 'Entre em contato conosco'),
        },
        {
            id: 5,
            title: 'Sobre o App',
            description: 'Versão e informações',
            icon: 'info.circle',
            color: '#8E8E93',
            action: () => Alert.alert('Sobre', 'Clubão do Descontão v1.0.0'),
        },
        {
            id: 6,
            title: 'Sair',
            description: 'Fazer logout da conta',
            icon: 'rectangle.portrait.and.arrow.right',
            color: '#FF5722',
            action: () => Alert.alert('Sair', 'Tem certeza que deseja sair?'),
        },
    ]);

    const handleOptionPress = (option: any) => {
        option.action();
    };

    const handleEditProfile = () => {
        console.log('Abrindo modal de edição...');
        setEditingProfile({
            name: userProfile.name,
            email: userProfile.email,
            phone: userProfile.phone,
            birthDate: '15/03/1985',
            cpf: '123.456.789-00',
            address: 'Rua das Flores, 123',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '01234-567',
        });
        setEditModalVisible(true);
        console.log('Modal deve estar visível agora:', editModalVisible);
    };

    const handleSaveProfile = () => {
        // Aqui você pode implementar a lógica de salvamento
        Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
        setEditModalVisible(false);
    };

    const handleCancelEdit = () => {
        setEditingProfile({
            name: userProfile.name,
            email: userProfile.email,
            phone: userProfile.phone,
            birthDate: '15/03/1985',
            cpf: '123.456.789-00',
            address: 'Rua das Flores, 123',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '01234-567',
        });
        setEditModalVisible(false);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor }]}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <ThemedText type="title" style={styles.title}>
                        Meu Perfil
                    </ThemedText>
                    <ThemedText style={styles.subtitle}>
                        Gerencie sua conta e preferências
                    </ThemedText>
                </View>

                {/* Profile Card */}
                <View style={styles.profileCard}>
                    <View style={styles.profileHeader}>
                        <View style={styles.profileAvatar}>
                            <ThemedText style={styles.profileAvatarText}>
                                {userProfile.name.charAt(0)}
                            </ThemedText>
                        </View>
                        <View style={styles.profileInfo}>
                            <ThemedText style={styles.profileName}>{userProfile.name}</ThemedText>
                            <ThemedText style={styles.profileEmail}>{userProfile.email}</ThemedText>
                            <ThemedText style={styles.profilePhone}>{userProfile.phone}</ThemedText>
                            <View style={styles.profileStatus}>
                                <IconSymbol name="checkmark.circle.fill" size={16} color="#4CAF50" />
                                <ThemedText style={styles.profileStatusText}>Membro desde {new Date(userProfile.joinDate).toLocaleDateString('pt-BR')}</ThemedText>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.profileEditButton}
                            onPress={handleEditProfile}
                        >
                            <IconSymbol name="pencil" size={20} color="#FF6B35" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Stats Grid */}
                <View style={styles.statsContainer}>
                    <ThemedText type="subtitle" style={styles.sectionTitle}>
                        Estatísticas
                    </ThemedText>
                    <View style={styles.statsGrid}>
                        {profileStats.map((stat) => (
                            <View key={stat.id} style={styles.statCard}>
                                <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
                                    <IconSymbol name={stat.icon as any} size={24} color={stat.color} />
                                </View>
                                <ThemedText style={styles.statValue}>{stat.value}</ThemedText>
                                <ThemedText style={styles.statLabel}>{stat.title}</ThemedText>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Profile Options */}
                <View style={styles.optionsContainer}>
                    <ThemedText type="subtitle" style={styles.sectionTitle}>
                        Opções
                    </ThemedText>
                    <View style={styles.optionsList}>
                        {profileOptions.map((option) => (
                            <TouchableOpacity
                                key={option.id}
                                style={styles.optionItem}
                                onPress={() => handleOptionPress(option)}
                            >
                                <View style={styles.optionLeft}>
                                    <View style={[styles.optionIcon, { backgroundColor: `${option.color}20` }]}>
                                        <IconSymbol name={option.icon as any} size={20} color={option.color} />
                                    </View>
                                    <View style={styles.optionText}>
                                        <ThemedText style={styles.optionTitle}>{option.title}</ThemedText>
                                        <ThemedText style={styles.optionDescription}>{option.description}</ThemedText>
                                    </View>
                                </View>
                                <IconSymbol name="chevron.right" size={16} color="#999" />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <ThemedText style={styles.footerText}>
                        Clubão do Descontão v1.0.0
                    </ThemedText>
                </View>
            </ScrollView>

            {/* Modal de Editar Perfil */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={editModalVisible}
                onRequestClose={handleCancelEdit}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.editModalContainer}>
                        <View style={styles.modalHeader}>
                            <ThemedText style={styles.modalTitle}>Editar Perfil</ThemedText>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={handleCancelEdit}
                            >
                                <IconSymbol name="xmark" size={20} color="#999" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.editModalContent} showsVerticalScrollIndicator={false}>
                            {/* Debug Text */}
                            <ThemedText style={styles.debugText}>
                                Modal de Edição Funcionando!
                            </ThemedText>

                            {/* Avatar Section */}
                            <View style={styles.editAvatarSection}>
                                <View style={styles.editAvatar}>
                                    <ThemedText style={styles.editAvatarText}>
                                        {editingProfile.name.charAt(0)}
                                    </ThemedText>
                                </View>
                                <TouchableOpacity style={styles.changePhotoButton}>
                                    <IconSymbol name="camera.fill" size={16} color="#FF6B35" />
                                    <ThemedText style={styles.changePhotoText}>Alterar Foto</ThemedText>
                                </TouchableOpacity>
                            </View>

                            {/* Form Fields */}
                            <View style={styles.formSection}>
                                <View style={styles.inputGroup}>
                                    <ThemedText style={styles.inputLabel}>Nome Completo</ThemedText>
                                    <TextInput
                                        style={styles.textInput}
                                        value={editingProfile.name}
                                        onChangeText={(text) => setEditingProfile({ ...editingProfile, name: text })}
                                        placeholder="Digite seu nome completo"
                                        placeholderTextColor="#999"
                                    />
                                </View>

                                <View style={styles.inputGroup}>
                                    <ThemedText style={styles.inputLabel}>E-mail</ThemedText>
                                    <TextInput
                                        style={styles.textInput}
                                        value={editingProfile.email}
                                        onChangeText={(text) => setEditingProfile({ ...editingProfile, email: text })}
                                        placeholder="Digite seu e-mail"
                                        placeholderTextColor="#999"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                    />
                                </View>

                                <View style={styles.inputGroup}>
                                    <ThemedText style={styles.inputLabel}>Telefone</ThemedText>
                                    <TextInput
                                        style={styles.textInput}
                                        value={editingProfile.phone}
                                        onChangeText={(text) => setEditingProfile({ ...editingProfile, phone: text })}
                                        placeholder="(11) 99999-9999"
                                        placeholderTextColor="#999"
                                        keyboardType="phone-pad"
                                    />
                                </View>

                                <View style={styles.inputGroup}>
                                    <ThemedText style={styles.inputLabel}>Data de Nascimento</ThemedText>
                                    <TextInput
                                        style={styles.textInput}
                                        value={editingProfile.birthDate}
                                        onChangeText={(text) => setEditingProfile({ ...editingProfile, birthDate: text })}
                                        placeholder="DD/MM/AAAA"
                                        placeholderTextColor="#999"
                                        keyboardType="numeric"
                                    />
                                </View>

                                <View style={styles.inputGroup}>
                                    <ThemedText style={styles.inputLabel}>CPF</ThemedText>
                                    <TextInput
                                        style={styles.textInput}
                                        value={editingProfile.cpf}
                                        onChangeText={(text) => setEditingProfile({ ...editingProfile, cpf: text })}
                                        placeholder="000.000.000-00"
                                        placeholderTextColor="#999"
                                        keyboardType="numeric"
                                    />
                                </View>

                                <View style={styles.inputGroup}>
                                    <ThemedText style={styles.inputLabel}>Endereço</ThemedText>
                                    <TextInput
                                        style={styles.textInput}
                                        value={editingProfile.address}
                                        onChangeText={(text) => setEditingProfile({ ...editingProfile, address: text })}
                                        placeholder="Rua, número, complemento"
                                        placeholderTextColor="#999"
                                    />
                                </View>

                                <View style={styles.inputRow}>
                                    <View style={[styles.inputGroup, { flex: 2, marginRight: 8 }]}>
                                        <ThemedText style={styles.inputLabel}>Cidade</ThemedText>
                                        <TextInput
                                            style={styles.textInput}
                                            value={editingProfile.city}
                                            onChangeText={(text) => setEditingProfile({ ...editingProfile, city: text })}
                                            placeholder="Cidade"
                                            placeholderTextColor="#999"
                                        />
                                    </View>
                                    <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                                        <ThemedText style={styles.inputLabel}>UF</ThemedText>
                                        <TextInput
                                            style={styles.textInput}
                                            value={editingProfile.state}
                                            onChangeText={(text) => setEditingProfile({ ...editingProfile, state: text })}
                                            placeholder="SP"
                                            placeholderTextColor="#999"
                                            maxLength={2}
                                        />
                                    </View>
                                </View>

                                <View style={styles.inputGroup}>
                                    <ThemedText style={styles.inputLabel}>CEP</ThemedText>
                                    <TextInput
                                        style={styles.textInput}
                                        value={editingProfile.zipCode}
                                        onChangeText={(text) => setEditingProfile({ ...editingProfile, zipCode: text })}
                                        placeholder="00000-000"
                                        placeholderTextColor="#999"
                                        keyboardType="numeric"
                                    />
                                </View>
                            </View>
                        </ScrollView>

                        {/* Action Buttons */}
                        <View style={styles.modalActions}>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={handleCancelEdit}
                            >
                                <ThemedText style={styles.cancelButtonText}>Cancelar</ThemedText>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.saveButton}
                                onPress={handleSaveProfile}
                            >
                                <ThemedText style={styles.saveButtonText}>Salvar</ThemedText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Modal de Configurações */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={settingsModalVisible}
                onRequestClose={() => setSettingsModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <ThemedText style={styles.modalTitle}>Configurações</ThemedText>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setSettingsModalVisible(false)}
                            >
                                <IconSymbol name="xmark" size={20} color="#999" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.modalContent}>
                            <ThemedText style={styles.modalDescription}>
                                Configurações em desenvolvimento
                            </ThemedText>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() => setSettingsModalVisible(false)}
                            >
                                <ThemedText style={styles.modalButtonText}>Fechar</ThemedText>
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
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: '#FF6B35',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '900',
        color: 'white',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: 'white',
        opacity: 0.9,
        textAlign: 'center',
    },
    profileCard: {
        backgroundColor: 'white',
        margin: 20,
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileAvatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#FF6B35',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    profileAvatarText: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
    },
    profileInfo: {
        flex: 1,
    },
    profileName: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#333',
    },
    profileEmail: {
        fontSize: 16,
        color: '#666',
        marginBottom: 4,
    },
    profilePhone: {
        fontSize: 14,
        color: '#999',
        marginBottom: 8,
    },
    profileStatus: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileStatusText: {
        fontSize: 12,
        color: '#4CAF50',
        fontWeight: '600',
        marginLeft: 4,
    },
    profileEditButton: {
        padding: 12,
        borderRadius: 20,
        backgroundColor: '#f8f9fa',
    },
    statsContainer: {
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#FF6B35',
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    statCard: {
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
    statIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    statValue: {
        fontSize: 18,
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
        marginBottom: 30,
    },
    optionsList: {
        backgroundColor: 'white',
        borderRadius: 16,
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
        borderBottomColor: '#f0f0f0',
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
    optionText: {
        flex: 1,
    },
    optionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 2,
    },
    optionDescription: {
        fontSize: 14,
        color: '#666',
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
    },
    modalDescription: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        opacity: 0.8,
    },
    modalButton: {
        backgroundColor: '#FF6B35',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 12,
        alignItems: 'center',
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    // Estilos do modal de edição
    editModalContainer: {
        backgroundColor: 'white',
        borderRadius: 16,
        width: '100%',
        maxWidth: 400,
        height: '80%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 10,
    },
    editModalContent: {
        flex: 1,
        paddingHorizontal: 20,
    },
    debugText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF6B35',
        textAlign: 'center',
        marginBottom: 20,
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 8,
    },
    editAvatarSection: {
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        marginBottom: 20,
    },
    editAvatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#FF6B35',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    editAvatarText: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
    },
    changePhotoButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#f8f9fa',
        borderWidth: 1,
        borderColor: '#FF6B35',
    },
    changePhotoText: {
        color: '#FF6B35',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 6,
    },
    formSection: {
        paddingBottom: 20,
    },
    inputGroup: {
        marginBottom: 20,
    },
    inputRow: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        backgroundColor: '#f8f9fa',
    },
    modalActions: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        gap: 12,
    },
    cancelButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#666',
        fontSize: 16,
        fontWeight: '600',
    },
    saveButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: '#FF6B35',
        alignItems: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
