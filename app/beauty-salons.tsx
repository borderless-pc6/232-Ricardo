import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface BeautyService {
    id: string;
    name: string;
    description: string;
    duration: number;
    price: number;
    originalPrice: number;
    discount: number;
    category: string;
    image: string;
    available: boolean;
}

interface Salon {
    id: string;
    name: string;
    address: string;
    rating: number;
    distance: number;
    image: string;
    services: BeautyService[];
    isOpen: boolean;
    nextAvailableSlot: string;
}

export default function BeautySalonsScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const backgroundColor = useThemeColor({}, 'background');

    const services: BeautyService[] = [
        {
            id: '1',
            name: 'Corte Feminino',
            description: 'Corte moderno e estilizado',
            duration: 60,
            price: 45.00,
            originalPrice: 65.00,
            discount: 31,
            category: 'cabelo',
            image: 'scissors',
            available: true,
        },
        {
            id: '2',
            name: 'Escova Progressiva',
            description: 'Alisamento com formol',
            duration: 180,
            price: 120.00,
            originalPrice: 180.00,
            discount: 33,
            category: 'cabelo',
            image: 'sparkles',
            available: true,
        },
        {
            id: '3',
            name: 'Manicure',
            description: 'Cuidados com as unhas',
            duration: 45,
            price: 25.00,
            originalPrice: 35.00,
            discount: 29,
            category: 'unhas',
            image: 'hand.raised.fill',
            available: true,
        },
        {
            id: '4',
            name: 'Pedicure',
            description: 'Cuidados com os pés',
            duration: 60,
            price: 30.00,
            originalPrice: 45.00,
            discount: 33,
            category: 'unhas',
            image: 'figure.walk',
            available: true,
        },
        {
            id: '5',
            name: 'Design de Sobrancelhas',
            description: 'Modelagem e design',
            duration: 30,
            price: 20.00,
            originalPrice: 30.00,
            discount: 33,
            category: 'sobrancelhas',
            image: 'eye.fill',
            available: true,
        },
        {
            id: '6',
            name: 'Limpeza de Pele',
            description: 'Tratamento facial completo',
            duration: 90,
            price: 80.00,
            originalPrice: 120.00,
            discount: 33,
            category: 'pele',
            image: 'drop.fill',
            available: true,
        },
    ];

    const salons: Salon[] = [
        {
            id: '1',
            name: 'Salon Beauty',
            address: 'Rua das Flores, 123 - Centro',
            rating: 4.8,
            distance: 0.8,
            image: 'scissors',
            services: services.slice(0, 3),
            isOpen: true,
            nextAvailableSlot: '14:30',
        },
        {
            id: '2',
            name: 'Studio Elegance',
            address: 'Av. Principal, 456 - Jardins',
            rating: 4.6,
            distance: 1.2,
            image: 'sparkles',
            services: services.slice(2, 5),
            isOpen: true,
            nextAvailableSlot: '16:00',
        },
        {
            id: '3',
            name: 'Bella Vista',
            address: 'Rua da Paz, 789 - Vila Nova',
            rating: 4.9,
            distance: 2.1,
            image: 'star.fill',
            services: services,
            isOpen: false,
            nextAvailableSlot: '09:00',
        },
    ];

    const categories = [
        { id: 'all', name: 'Todos', icon: 'list.bullet' },
        { id: 'cabelo', name: 'Cabelo', icon: 'scissors' },
        { id: 'unhas', name: 'Unhas', icon: 'hand.raised.fill' },
        { id: 'sobrancelhas', name: 'Sobrancelhas', icon: 'eye.fill' },
        { id: 'pele', name: 'Pele', icon: 'sparkles' },
    ];

    const filteredServices = services.filter(service => {
        const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleBookService = (service: BeautyService) => {
        Alert.alert(
            'Agendar Serviço',
            `Deseja agendar ${service.name} por R$ ${service.price.toFixed(2)}?\n\nDuração: ${service.duration} minutos`,
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Agendar', onPress: () => console.log('Serviço agendado:', service.name) },
            ]
        );
    };

    const handleViewSalon = (salon: Salon) => {
        Alert.alert(
            salon.name,
            `Endereço: ${salon.address}\n\nAvaliação: ${salon.rating} ⭐\nDistância: ${salon.distance} km\n\nStatus: ${salon.isOpen ? 'Aberto' : 'Fechado'}\nPróximo horário: ${salon.nextAvailableSlot}`,
            [
                { text: 'OK' },
                { text: 'Ver Serviços', onPress: () => console.log('Ver serviços do salão:', salon.name) },
            ]
        );
    };

    const renderService = ({ item }: { item: BeautyService }) => (
        <TouchableOpacity style={styles.serviceCard} onPress={() => handleBookService(item)}>
            <View style={styles.serviceHeader}>
                <View style={styles.serviceIcon}>
                    <IconSymbol name={item.image as any} size={24} color="#E91E63" />
                </View>
                <View style={styles.serviceInfo}>
                    <ThemedText style={styles.serviceName}>{item.name}</ThemedText>
                    <ThemedText style={styles.serviceDescription}>{item.description}</ThemedText>
                    <View style={styles.serviceDetails}>
                        <View style={styles.durationContainer}>
                            <IconSymbol name="clock.fill" size={14} color="#666" />
                            <ThemedText style={styles.durationText}>{item.duration} min</ThemedText>
                        </View>
                    </View>
                </View>
                <View style={styles.servicePrice}>
                    <ThemedText style={styles.priceOriginal}>R$ {item.originalPrice.toFixed(2)}</ThemedText>
                    <ThemedText style={styles.priceFinal}>R$ {item.price.toFixed(2)}</ThemedText>
                    <View style={styles.discountBadge}>
                        <ThemedText style={styles.discountText}>-{item.discount}%</ThemedText>
                    </View>
                </View>
            </View>
            <View style={styles.serviceFooter}>
                <View style={styles.availabilityStatus}>
                    <IconSymbol
                        name={item.available ? "checkmark.circle.fill" : "xmark.circle.fill"}
                        size={16}
                        color={item.available ? "#4CAF50" : "#F44336"}
                    />
                    <ThemedText style={[styles.availabilityText, { color: item.available ? "#4CAF50" : "#F44336" }]}>
                        {item.available ? "Disponível" : "Indisponível"}
                    </ThemedText>
                </View>
                <TouchableOpacity
                    style={[styles.bookButton, { opacity: item.available ? 1 : 0.5 }]}
                    onPress={() => handleBookService(item)}
                    disabled={!item.available}
                >
                    <ThemedText style={styles.bookButtonText}>Agendar</ThemedText>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    const renderSalon = ({ item }: { item: Salon }) => (
        <TouchableOpacity style={styles.salonCard} onPress={() => handleViewSalon(item)}>
            <View style={styles.salonHeader}>
                <View style={styles.salonIcon}>
                    <IconSymbol name={item.image as any} size={24} color="#E91E63" />
                </View>
                <View style={styles.salonInfo}>
                    <ThemedText style={styles.salonName}>{item.name}</ThemedText>
                    <ThemedText style={styles.salonAddress}>{item.address}</ThemedText>
                    <View style={styles.salonDetails}>
                        <View style={styles.ratingContainer}>
                            <IconSymbol name="star.fill" size={14} color="#FFD700" />
                            <ThemedText style={styles.ratingText}>{item.rating}</ThemedText>
                        </View>
                        <View style={styles.distanceContainer}>
                            <IconSymbol name="location.fill" size={14} color="#666" />
                            <ThemedText style={styles.distanceText}>{item.distance} km</ThemedText>
                        </View>
                    </View>
                </View>
                <View style={styles.salonStatus}>
                    <View style={[styles.statusBadge, { backgroundColor: item.isOpen ? '#4CAF50' : '#F44336' }]}>
                        <ThemedText style={styles.statusText}>
                            {item.isOpen ? 'Aberto' : 'Fechado'}
                        </ThemedText>
                    </View>
                    <ThemedText style={styles.nextSlotText}>
                        Próximo: {item.nextAvailableSlot}
                    </ThemedText>
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderCategory = ({ item }: { item: typeof categories[0] }) => (
        <TouchableOpacity
            style={[
                styles.categoryButton,
                selectedCategory === item.id && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory(item.id)}
        >
            <IconSymbol
                name={item.icon as any}
                size={20}
                color={selectedCategory === item.id ? "white" : "#FF6B35"}
            />
            <ThemedText style={[
                styles.categoryText,
                selectedCategory === item.id && styles.categoryTextActive
            ]}>
                {item.name}
            </ThemedText>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor }]} edges={['bottom']}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <IconSymbol name="chevron.left" size={24} color="#FF6B35" />
                    </TouchableOpacity>
                    <ThemedText type="title" style={styles.headerTitle}>
                        Salões de Beleza
                    </ThemedText>
                    <TouchableOpacity style={styles.calendarButton}>
                        <IconSymbol name="calendar" size={24} color="#FF6B35" />
                    </TouchableOpacity>
                </View>

                <ThemedText style={styles.headerSubtitle}>
                    Agende seus serviços de beleza com os melhores profissionais
                </ThemedText>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <IconSymbol name="magnifyingglass" size={20} color="#999" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar serviços..."
                        placeholderTextColor="#999"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            {/* Categories */}
            <View style={styles.categoriesContainer}>
                <FlatList
                    data={categories}
                    renderItem={renderCategory}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesList}
                />
            </View>

            {/* Salons Section */}
            <View style={styles.salonsSection}>
                <ThemedText style={styles.sectionTitle}>Salões Próximos</ThemedText>
                <FlatList
                    data={salons}
                    renderItem={renderSalon}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.salonsList}
                />
            </View>

            {/* Services Section */}
            <View style={styles.servicesSection}>
                <View style={styles.resultsHeader}>
                    <ThemedText style={styles.sectionTitle}>
                        Serviços Disponíveis
                    </ThemedText>
                    <ThemedText style={styles.resultsText}>
                        {filteredServices.length} serviços encontrados
                    </ThemedText>
                </View>

                <FlatList
                    data={filteredServices}
                    renderItem={renderService}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.servicesList}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 12,
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF6B35',
    },
    calendarButton: {
        padding: 8,
    },
    headerSubtitle: {
        fontSize: 16,
        opacity: 0.7,
        textAlign: 'center',
    },
    searchContainer: {
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
        color: '#333',
    },
    categoriesContainer: {
        marginBottom: 16,
    },
    categoriesList: {
        paddingHorizontal: 20,
    },
    categoryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        marginRight: 12,
        borderWidth: 1,
        borderColor: '#FF6B35',
    },
    categoryButtonActive: {
        backgroundColor: '#FF6B35',
    },
    categoryText: {
        marginLeft: 8,
        fontSize: 14,
        fontWeight: '600',
        color: '#FF6B35',
    },
    categoryTextActive: {
        color: 'white',
    },
    salonsSection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF6B35',
        marginBottom: 12,
        paddingHorizontal: 20,
    },
    salonsList: {
        paddingHorizontal: 20,
    },
    salonCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginRight: 12,
        width: 280,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    salonHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    salonIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(233, 30, 99, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    salonInfo: {
        flex: 1,
        marginRight: 12,
    },
    salonName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    salonAddress: {
        fontSize: 14,
        opacity: 0.7,
        marginBottom: 8,
    },
    salonDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    ratingText: {
        marginLeft: 4,
        fontSize: 14,
        fontWeight: '600',
    },
    distanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    distanceText: {
        marginLeft: 4,
        fontSize: 14,
        opacity: 0.7,
    },
    salonStatus: {
        alignItems: 'flex-end',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginBottom: 4,
    },
    statusText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    nextSlotText: {
        fontSize: 12,
        opacity: 0.7,
    },
    servicesSection: {
        flex: 1,
        paddingHorizontal: 20,
    },
    resultsHeader: {
        marginBottom: 16,
    },
    resultsText: {
        fontSize: 14,
        opacity: 0.7,
        marginTop: 4,
    },
    servicesList: {
        paddingBottom: 20,
    },
    serviceCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    serviceHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    serviceIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(233, 30, 99, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    serviceInfo: {
        flex: 1,
        marginRight: 12,
    },
    serviceName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    serviceDescription: {
        fontSize: 14,
        opacity: 0.7,
        marginBottom: 8,
    },
    serviceDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    durationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    durationText: {
        marginLeft: 4,
        fontSize: 14,
        opacity: 0.7,
    },
    servicePrice: {
        alignItems: 'flex-end',
    },
    priceOriginal: {
        fontSize: 12,
        textDecorationLine: 'line-through',
        opacity: 0.6,
        marginBottom: 2,
    },
    priceFinal: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 4,
    },
    discountBadge: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    discountText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    serviceFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    availabilityStatus: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    availabilityText: {
        marginLeft: 6,
        fontSize: 14,
        fontWeight: '600',
    },
    bookButton: {
        backgroundColor: '#FF6B35',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
    },
    bookButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
});
