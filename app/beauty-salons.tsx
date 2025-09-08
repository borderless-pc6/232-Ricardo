import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    Modal,
    ScrollView,
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
    const [selectedService, setSelectedService] = useState<BeautyService | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [calendarModalVisible, setCalendarModalVisible] = useState(false);
    const [generalCalendarVisible, setGeneralCalendarVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
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
        setSelectedService(service);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedService(null);
    };

    // Horários disponíveis para agendamento
    const availableTimes = [
        '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
        '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
        '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
    ];

    const confirmBooking = () => {
        if (!selectedService) return;

        // Fecha o modal de detalhes e abre o calendário
        setModalVisible(false);
        setCalendarModalVisible(true);
    };

    const closeCalendarModal = () => {
        setCalendarModalVisible(false);
        setSelectedDate(null);
        setSelectedTime(null);
    };

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
    };

    const confirmSchedule = () => {
        if (!selectedService || !selectedDate || !selectedTime) return;

        // Simula agendamento do serviço
        console.log('Serviço agendado:', {
            service: selectedService.name,
            date: selectedDate.toLocaleDateString('pt-BR'),
            time: selectedTime
        });

        // Fecha o modal e mostra confirmação
        closeCalendarModal();
        setSelectedService(null);
        Alert.alert(
            'Agendamento Confirmado!',
            `${selectedService.name} agendado para ${selectedDate.toLocaleDateString('pt-BR')} às ${selectedTime}`
        );
    };

    // Funções para gerar o calendário
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];

        // Adiciona dias vazios para alinhar o calendário
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }

        // Adiciona os dias do mês
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(new Date(year, month, day));
        }

        return days;
    };

    const getMonthName = (date: Date) => {
        const months = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        return months[date.getMonth()];
    };

    const isDateAvailable = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
    };

    const isDateSelected = (date: Date) => {
        if (!selectedDate) return false;
        return date.toDateString() === selectedDate.toDateString();
    };

    // Dados simulados de agendamentos
    const appointments = [
        {
            id: '1',
            service: 'Corte Feminino',
            salon: 'Salon Beauty',
            date: new Date(2024, 11, 15), // 15 de dezembro de 2024
            time: '14:30',
            duration: 60,
            price: 45.00,
            status: 'confirmado'
        },
        {
            id: '2',
            service: 'Manicure',
            salon: 'Studio Elegance',
            date: new Date(2024, 11, 18), // 18 de dezembro de 2024
            time: '10:00',
            duration: 45,
            price: 25.00,
            status: 'confirmado'
        },
        {
            id: '3',
            service: 'Escova Progressiva',
            salon: 'Bella Vista',
            date: new Date(2024, 11, 22), // 22 de dezembro de 2024
            time: '16:00',
            duration: 180,
            price: 120.00,
            status: 'pendente'
        }
    ];

    const handleCalendarButtonPress = () => {
        setGeneralCalendarVisible(true);
    };

    const closeGeneralCalendar = () => {
        setGeneralCalendarVisible(false);
    };

    const getAppointmentsForDate = (date: Date) => {
        return appointments.filter(appointment =>
            appointment.date.toDateString() === date.toDateString()
        );
    };

    const hasAppointmentsOnDate = (date: Date) => {
        return getAppointmentsForDate(date).length > 0;
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
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
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
                        <TouchableOpacity style={styles.calendarButton} onPress={handleCalendarButtonPress}>
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

                    {filteredServices.map((service) => (
                        <View key={service.id}>
                            {renderService({ item: service })}
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* Modal Personalizado de Agendamento */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        {selectedService && (
                            <>
                                {/* Header do Modal */}
                                <View style={styles.modalHeader}>
                                    <View style={styles.modalIcon}>
                                        <IconSymbol name={selectedService.image as any} size={32} color="#E91E63" />
                                    </View>
                                    <View style={styles.modalTitleContainer}>
                                        <ThemedText style={styles.modalTitle}>{selectedService.name}</ThemedText>
                                        <ThemedText style={styles.modalCategory}>
                                            Categoria: {categories.find(cat => cat.id === selectedService.category)?.name || selectedService.category}
                                        </ThemedText>
                                    </View>
                                    <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                                        <IconSymbol name="xmark" size={20} color="#999" />
                                    </TouchableOpacity>
                                </View>

                                {/* Conteúdo do Modal */}
                                <View style={styles.modalContent}>
                                    <ThemedText style={styles.modalDescription}>
                                        {selectedService.description}
                                    </ThemedText>

                                    {/* Informações de Duração */}
                                    <View style={styles.durationSection}>
                                        <View style={styles.durationInfo}>
                                            <IconSymbol name="clock.fill" size={20} color="#FF6B35" />
                                            <ThemedText style={styles.durationText}>
                                                Duração: {selectedService.duration} minutos
                                            </ThemedText>
                                        </View>
                                    </View>

                                    {/* Informações de Preço */}
                                    <View style={styles.priceSection}>
                                        <View style={styles.priceRow}>
                                            <ThemedText style={styles.priceLabel}>Preço original:</ThemedText>
                                            <ThemedText style={styles.originalPrice}>
                                                R$ {selectedService.originalPrice.toFixed(2)}
                                            </ThemedText>
                                        </View>
                                        <View style={styles.priceRow}>
                                            <ThemedText style={styles.priceLabel}>Desconto:</ThemedText>
                                            <View style={styles.discountContainer}>
                                                <ThemedText style={styles.modalDiscountText}>
                                                    -{selectedService.discount}%
                                                </ThemedText>
                                            </View>
                                        </View>
                                        <View style={[styles.priceRow, styles.finalPriceRow]}>
                                            <ThemedText style={styles.finalPriceLabel}>Preço final:</ThemedText>
                                            <ThemedText style={styles.finalPrice}>
                                                R$ {selectedService.price.toFixed(2)}
                                            </ThemedText>
                                        </View>
                                    </View>

                                    {/* Status de Disponibilidade */}
                                    <View style={styles.availabilitySection}>
                                        <View style={styles.availabilityInfo}>
                                            <IconSymbol
                                                name={selectedService.available ? "checkmark.circle.fill" : "xmark.circle.fill"}
                                                size={20}
                                                color={selectedService.available ? "#4CAF50" : "#F44336"}
                                            />
                                            <ThemedText style={[
                                                styles.modalAvailabilityText,
                                                { color: selectedService.available ? "#4CAF50" : "#F44336" }
                                            ]}>
                                                {selectedService.available ? "Disponível para agendamento" : "Indisponível no momento"}
                                            </ThemedText>
                                        </View>
                                    </View>
                                </View>

                                {/* Footer do Modal */}
                                <View style={styles.modalFooter}>
                                    <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
                                        <ThemedText style={styles.cancelButtonText}>Cancelar</ThemedText>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.confirmButton, { opacity: selectedService.available ? 1 : 0.5 }]}
                                        onPress={confirmBooking}
                                        disabled={!selectedService.available}
                                    >
                                        <ThemedText style={styles.confirmButtonText}>Agendar</ThemedText>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </View>
                </View>
            </Modal>

            {/* Modal do Calendário */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={calendarModalVisible}
                onRequestClose={closeCalendarModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.calendarModalContainer}>
                        {selectedService && (
                            <>
                                {/* Header do Modal */}
                                <View style={styles.calendarModalHeader}>
                                    <View style={styles.calendarModalIcon}>
                                        <IconSymbol name="calendar" size={24} color="#FF6B35" />
                                    </View>
                                    <View style={styles.calendarModalTitleContainer}>
                                        <ThemedText style={styles.calendarModalTitle}>Agendar Serviço</ThemedText>
                                        <ThemedText style={styles.calendarModalServiceName}>{selectedService.name}</ThemedText>
                                    </View>
                                    <TouchableOpacity style={styles.closeButton} onPress={closeCalendarModal}>
                                        <IconSymbol name="xmark" size={20} color="#999" />
                                    </TouchableOpacity>
                                </View>

                                {/* Conteúdo do Modal */}
                                <ScrollView
                                    style={styles.calendarModalContent}
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={styles.calendarModalContentContainer}
                                >
                                    {/* Seleção de Data */}
                                    <View style={styles.dateSection}>
                                        <ThemedText style={styles.sectionTitle}>Selecionar Data</ThemedText>
                                        <View style={styles.calendarContainer}>
                                            <View style={styles.calendarHeader}>
                                                <ThemedText style={styles.monthYearText}>
                                                    {getMonthName(new Date())} {new Date().getFullYear()}
                                                </ThemedText>
                                            </View>
                                            <View style={styles.calendarGrid}>
                                                {/* Dias da semana */}
                                                <View style={styles.weekDaysRow}>
                                                    {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                                                        <View key={day} style={styles.weekDay}>
                                                            <ThemedText style={styles.weekDayText}>{day}</ThemedText>
                                                        </View>
                                                    ))}
                                                </View>
                                                {/* Dias do mês */}
                                                <View style={styles.daysGrid}>
                                                    {getDaysInMonth(new Date()).map((day, index) => (
                                                        <TouchableOpacity
                                                            key={index}
                                                            style={[
                                                                styles.dayButton,
                                                                day && isDateSelected(day) && styles.selectedDay,
                                                                day && !isDateAvailable(day) && styles.disabledDay
                                                            ]}
                                                            onPress={() => day && isDateAvailable(day) && handleDateSelect(day)}
                                                            disabled={!day || !isDateAvailable(day)}
                                                        >
                                                            {day && (
                                                                <ThemedText style={[
                                                                    styles.dayText,
                                                                    isDateSelected(day) && styles.selectedDayText,
                                                                    !isDateAvailable(day) && styles.disabledDayText
                                                                ]}>
                                                                    {day.getDate()}
                                                                </ThemedText>
                                                            )}
                                                        </TouchableOpacity>
                                                    ))}
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                    {/* Seleção de Horário */}
                                    <View style={styles.timeSection}>
                                        <ThemedText style={styles.sectionTitle}>Selecionar Horário</ThemedText>
                                        <View style={styles.timesGrid}>
                                            {availableTimes.map((time) => (
                                                <TouchableOpacity
                                                    key={time}
                                                    style={[
                                                        styles.timeButton,
                                                        selectedTime === time && styles.selectedTimeButton
                                                    ]}
                                                    onPress={() => handleTimeSelect(time)}
                                                >
                                                    <ThemedText style={[
                                                        styles.timeText,
                                                        selectedTime === time && styles.selectedTimeText
                                                    ]}>
                                                        {time}
                                                    </ThemedText>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </View>

                                    {/* Resumo do Agendamento */}
                                    {selectedDate && selectedTime && (
                                        <View style={styles.summarySection}>
                                            <ThemedText style={styles.summaryTitle}>Resumo do Agendamento</ThemedText>
                                            <View style={styles.summaryInfo}>
                                                <ThemedText style={styles.summaryText}>
                                                    <ThemedText style={styles.summaryLabel}>Serviço:</ThemedText> {selectedService.name}
                                                </ThemedText>
                                                <ThemedText style={styles.summaryText}>
                                                    <ThemedText style={styles.summaryLabel}>Data:</ThemedText> {selectedDate.toLocaleDateString('pt-BR')}
                                                </ThemedText>
                                                <ThemedText style={styles.summaryText}>
                                                    <ThemedText style={styles.summaryLabel}>Horário:</ThemedText> {selectedTime}
                                                </ThemedText>
                                                <ThemedText style={styles.summaryText}>
                                                    <ThemedText style={styles.summaryLabel}>Duração:</ThemedText> {selectedService.duration} minutos
                                                </ThemedText>
                                                <ThemedText style={styles.summaryText}>
                                                    <ThemedText style={styles.summaryLabel}>Valor:</ThemedText> R$ {selectedService.price.toFixed(2)}
                                                </ThemedText>
                                            </View>
                                        </View>
                                    )}
                                </ScrollView>

                                {/* Footer do Modal */}
                                <View style={styles.calendarModalFooter}>
                                    <TouchableOpacity style={styles.cancelButton} onPress={closeCalendarModal}>
                                        <ThemedText style={styles.cancelButtonText}>Cancelar</ThemedText>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.confirmButton, { opacity: selectedDate && selectedTime ? 1 : 0.5 }]}
                                        onPress={confirmSchedule}
                                        disabled={!selectedDate || !selectedTime}
                                    >
                                        <ThemedText style={styles.confirmButtonText}>Confirmar Agendamento</ThemedText>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </View>
                </View>
            </Modal>

            {/* Modal do Calendário Geral */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={generalCalendarVisible}
                onRequestClose={closeGeneralCalendar}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.generalCalendarContainer}>
                        {/* Header do Modal */}
                        <View style={styles.generalCalendarHeader}>
                            <View style={styles.generalCalendarIcon}>
                                <IconSymbol name="calendar" size={24} color="#FF6B35" />
                            </View>
                            <View style={styles.generalCalendarTitleContainer}>
                                <ThemedText style={styles.generalCalendarTitle}>Meus Agendamentos</ThemedText>
                                <ThemedText style={styles.generalCalendarSubtitle}>Visualize seus agendamentos</ThemedText>
                            </View>
                            <TouchableOpacity style={styles.closeButton} onPress={closeGeneralCalendar}>
                                <IconSymbol name="xmark" size={20} color="#999" />
                            </TouchableOpacity>
                        </View>

                        {/* Conteúdo do Modal */}
                        <ScrollView
                            style={styles.generalCalendarContent}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.generalCalendarContentContainer}
                        >
                            {/* Lista de Agendamentos */}
                            <View style={styles.appointmentsSection}>
                                <ThemedText style={styles.sectionTitle}>Próximos Agendamentos</ThemedText>

                                {/* Debug simples */}
                                <ThemedText style={{ color: 'red', fontSize: 16, marginBottom: 10 }}>
                                    DEBUG: {appointments.length} agendamentos encontrados
                                </ThemedText>

                                {appointments.map((appointment) => (
                                    <View key={appointment.id} style={styles.appointmentCard}>
                                        <View style={styles.appointmentHeader}>
                                            <View style={styles.appointmentIcon}>
                                                <IconSymbol name="calendar" size={20} color="#FF6B35" />
                                            </View>
                                            <View style={styles.appointmentInfo}>
                                                <ThemedText style={styles.appointmentService}>{appointment.service}</ThemedText>
                                                <ThemedText style={styles.appointmentSalon}>{appointment.salon}</ThemedText>
                                            </View>
                                            <View style={[
                                                styles.appointmentStatus,
                                                { backgroundColor: appointment.status === 'confirmado' ? '#4CAF50' : '#FF9800' }
                                            ]}>
                                                <ThemedText style={styles.appointmentStatusText}>
                                                    {appointment.status === 'confirmado' ? 'Confirmado' : 'Pendente'}
                                                </ThemedText>
                                            </View>
                                        </View>
                                        <View style={styles.appointmentDetails}>
                                            <View style={styles.appointmentDetailRow}>
                                                <IconSymbol name="calendar" size={16} color="#666" />
                                                <ThemedText style={styles.appointmentDetailText}>
                                                    {appointment.date.toLocaleDateString('pt-BR')}
                                                </ThemedText>
                                            </View>
                                            <View style={styles.appointmentDetailRow}>
                                                <IconSymbol name="clock" size={16} color="#666" />
                                                <ThemedText style={styles.appointmentDetailText}>
                                                    {appointment.time} ({appointment.duration} min)
                                                </ThemedText>
                                            </View>
                                            <View style={styles.appointmentDetailRow}>
                                                <IconSymbol name="dollarsign" size={16} color="#666" />
                                                <ThemedText style={styles.appointmentDetailText}>
                                                    R$ {appointment.price.toFixed(2)}
                                                </ThemedText>
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </View>

                            {/* Calendário */}
                            <View style={styles.generalCalendarSection}>
                                <ThemedText style={styles.sectionTitle}>Calendário</ThemedText>
                                <View style={styles.calendarContainer}>
                                    <View style={styles.calendarHeader}>
                                        <ThemedText style={styles.monthYearText}>
                                            {getMonthName(new Date())} {new Date().getFullYear()}
                                        </ThemedText>
                                    </View>
                                    <View style={styles.calendarGrid}>
                                        {/* Dias da semana */}
                                        <View style={styles.weekDaysRow}>
                                            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                                                <View key={day} style={styles.weekDay}>
                                                    <ThemedText style={styles.weekDayText}>{day}</ThemedText>
                                                </View>
                                            ))}
                                        </View>
                                        {/* Dias do mês */}
                                        <View style={styles.daysGrid}>
                                            {getDaysInMonth(new Date()).map((day, index) => (
                                                <TouchableOpacity
                                                    key={index}
                                                    style={[
                                                        styles.dayButton,
                                                        day && hasAppointmentsOnDate(day) && styles.dayWithAppointments,
                                                        day && isDateSelected(day) && styles.selectedDay
                                                    ]}
                                                    onPress={() => day && handleDateSelect(day)}
                                                    disabled={!day}
                                                >
                                                    {day && (
                                                        <ThemedText style={[
                                                            styles.dayText,
                                                            hasAppointmentsOnDate(day) && styles.dayWithAppointmentsText,
                                                            isDateSelected(day) && styles.selectedDayText
                                                        ]}>
                                                            {day.getDate()}
                                                        </ThemedText>
                                                    )}
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
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
        paddingHorizontal: 20,
        paddingBottom: 20,
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
    // Estilos do Modal
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
        maxHeight: '80%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 10,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    modalIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(233, 30, 99, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    modalTitleContainer: {
        flex: 1,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    modalCategory: {
        fontSize: 14,
        color: '#666',
    },
    closeButton: {
        padding: 8,
    },
    modalContent: {
        padding: 20,
    },
    modalDescription: {
        fontSize: 16,
        color: '#333',
        marginBottom: 20,
        lineHeight: 22,
    },
    durationSection: {
        marginBottom: 20,
    },
    durationInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff5f0',
        padding: 12,
        borderRadius: 8,
    },
    durationText: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: '600',
        color: '#FF6B35',
    },
    priceSection: {
        backgroundColor: '#f8f9fa',
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    finalPriceRow: {
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        paddingTop: 12,
        marginTop: 8,
        marginBottom: 0,
    },
    priceLabel: {
        fontSize: 14,
        color: '#666',
    },
    originalPrice: {
        fontSize: 14,
        textDecorationLine: 'line-through',
        color: '#999',
    },
    discountContainer: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    modalDiscountText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    finalPriceLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    finalPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    availabilitySection: {
        marginBottom: 20,
    },
    availabilityInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        padding: 12,
        borderRadius: 8,
    },
    modalAvailabilityText: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: '600',
    },
    modalFooter: {
        flexDirection: 'row',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        gap: 12,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
    },
    confirmButton: {
        flex: 1,
        backgroundColor: '#FF6B35',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
    },
    // Estilos do Modal do Calendário
    calendarModalContainer: {
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
        flexDirection: 'column',
    },
    calendarModalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    calendarModalIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(255, 107, 53, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    calendarModalTitleContainer: {
        flex: 1,
    },
    calendarModalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    calendarModalServiceName: {
        fontSize: 14,
        color: '#666',
    },
    calendarModalContent: {
        flex: 1,
    },
    calendarModalContentContainer: {
        padding: 20,
        paddingBottom: 10,
    },
    dateSection: {
        marginBottom: 24,
    },
    timeSection: {
        marginBottom: 24,
    },
    calendarContainer: {
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        padding: 16,
        marginTop: 12,
    },
    calendarHeader: {
        alignItems: 'center',
        marginBottom: 16,
    },
    monthYearText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    calendarGrid: {
        width: '100%',
    },
    weekDaysRow: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    weekDay: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 8,
    },
    weekDayText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
    },
    daysGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    dayButton: {
        width: '14.28%',
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
    },
    selectedDay: {
        backgroundColor: '#FF6B35',
        borderRadius: 20,
    },
    disabledDay: {
        opacity: 0.3,
    },
    dayText: {
        fontSize: 14,
        color: '#333',
    },
    selectedDayText: {
        color: 'white',
        fontWeight: 'bold',
    },
    disabledDayText: {
        color: '#999',
    },
    timesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 12,
        gap: 8,
        marginBottom: 20,
    },
    timeButton: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
        minWidth: 70,
        alignItems: 'center',
    },
    selectedTimeButton: {
        backgroundColor: '#FF6B35',
        borderColor: '#FF6B35',
    },
    timeText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    selectedTimeText: {
        color: 'white',
    },
    summarySection: {
        backgroundColor: '#f0f8ff',
        borderRadius: 12,
        padding: 16,
        marginTop: 16,
    },
    summaryTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    summaryInfo: {
        gap: 8,
    },
    summaryText: {
        fontSize: 14,
        color: '#333',
    },
    summaryLabel: {
        fontWeight: '600',
        color: '#666',
    },
    calendarModalFooter: {
        flexDirection: 'row',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        gap: 12,
        backgroundColor: 'white',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    // Estilos do Modal do Calendário Geral
    generalCalendarContainer: {
        backgroundColor: 'white',
        borderRadius: 16,
        width: '100%',
        maxWidth: 400,
        maxHeight: '90%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 10,
        flexDirection: 'column',
    },
    generalCalendarHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    generalCalendarIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(255, 107, 53, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    generalCalendarTitleContainer: {
        flex: 1,
    },
    generalCalendarTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    generalCalendarSubtitle: {
        fontSize: 14,
        color: '#666',
    },
    generalCalendarContent: {
        flex: 1,
    },
    generalCalendarContentContainer: {
        padding: 20,
        paddingBottom: 20,
        flexGrow: 1,
    },
    generalCalendarSection: {
        marginBottom: 24,
    },
    dayWithAppointments: {
        backgroundColor: '#E3F2FD',
        borderWidth: 1,
        borderColor: '#2196F3',
    },
    dayWithAppointmentsText: {
        color: '#1976D2',
        fontWeight: 'bold',
    },
    appointmentsSection: {
        marginBottom: 20,
    },
    appointmentCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderLeftWidth: 4,
        borderLeftColor: '#FF6B35',
    },
    appointmentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    appointmentIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 107, 53, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    appointmentInfo: {
        flex: 1,
    },
    appointmentService: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    appointmentSalon: {
        fontSize: 14,
        color: '#666',
    },
    appointmentStatus: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    appointmentStatusText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    appointmentDetails: {
        gap: 8,
    },
    appointmentDetailRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    appointmentDetailText: {
        marginLeft: 8,
        fontSize: 14,
        color: '#666',
    },
    // Estilos para estado vazio
    emptyAppointmentsContainer: {
        alignItems: 'center',
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    emptyAppointmentsText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#666',
        marginTop: 16,
        marginBottom: 8,
        textAlign: 'center',
    },
    emptyAppointmentsSubtext: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        lineHeight: 20,
    },
});
