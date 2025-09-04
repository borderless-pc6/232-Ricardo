import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    Modal,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Medicine {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice: number;
    discount: number;
    laboratory: string;
    category: string;
    image: string;
    inStock: boolean;
    quantity: number;
}

export default function MedicinesScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [cartModalVisible, setCartModalVisible] = useState(false);
    const [medicineToAdd, setMedicineToAdd] = useState<Medicine | null>(null);
    const backgroundColor = useThemeColor({}, 'background');

    // Simula busca de medicamentos de farmácias parceiras
    const fetchMedicines = async () => {
        try {
            setLoading(true);
            setError(null);

            // Simula delay da API
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Simula dados vindos de farmácias parceiras
            const mockMedicines: Medicine[] = [
                {
                    id: '1',
                    name: 'Paracetamol 500mg',
                    description: 'Analgésico e antitérmico',
                    price: 8.50,
                    originalPrice: 12.00,
                    discount: 29,
                    laboratory: 'EMS',
                    category: 'analgesicos',
                    image: 'pills.fill',
                    inStock: true,
                    quantity: 1,
                },
                {
                    id: '2',
                    name: 'Ibuprofeno 400mg',
                    description: 'Anti-inflamatório e analgésico',
                    price: 15.90,
                    originalPrice: 22.50,
                    discount: 29,
                    laboratory: 'Eurofarma',
                    category: 'anti-inflamatorios',
                    image: 'pills.fill',
                    inStock: true,
                    quantity: 1,
                },
                {
                    id: '3',
                    name: 'Omeprazol 20mg',
                    description: 'Protetor gástrico',
                    price: 18.75,
                    originalPrice: 28.00,
                    discount: 33,
                    laboratory: 'Germed',
                    category: 'gastrico',
                    image: 'pills.fill',
                    inStock: true,
                    quantity: 1,
                },
                {
                    id: '4',
                    name: 'Losartana 50mg',
                    description: 'Anti-hipertensivo',
                    price: 12.30,
                    originalPrice: 18.50,
                    discount: 34,
                    laboratory: 'Cimed',
                    category: 'cardiovascular',
                    image: 'pills.fill',
                    inStock: false,
                    quantity: 1,
                },
                {
                    id: '5',
                    name: 'Metformina 850mg',
                    description: 'Antidiabético',
                    price: 9.80,
                    originalPrice: 14.20,
                    discount: 31,
                    laboratory: 'EMS',
                    category: 'diabetes',
                    image: 'pills.fill',
                    inStock: true,
                    quantity: 1,
                },
            ];

            setMedicines(mockMedicines);
        } catch (err) {
            setError('Erro ao carregar medicamentos. Tente novamente.');
            console.error('Erro ao buscar medicamentos:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMedicines();
    }, []);

    const handleUpdateQuantity = (medicineId: string, newQuantity: number) => {
        if (newQuantity < 1) return;

        setMedicines(prevMedicines =>
            prevMedicines.map(medicine =>
                medicine.id === medicineId ? { ...medicine, quantity: newQuantity } : medicine
            )
        );
    };

    const categories = [
        { id: 'all', name: 'Todos', icon: 'list.bullet' },
        { id: 'analgesicos', name: 'Analgésicos', icon: 'pills.fill' },
        { id: 'anti-inflamatorios', name: 'Anti-inflamatórios', icon: 'cross.fill' },
        { id: 'gastrico', name: 'Gástrico', icon: 'stomach.fill' },
        { id: 'cardiovascular', name: 'Cardiovascular', icon: 'heart.fill' },
        { id: 'diabetes', name: 'Diabetes', icon: 'drop.fill' },
    ];

    const filteredMedicines = medicines.filter(medicine => {
        const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            medicine.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || medicine.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleAddToCart = (medicine: Medicine) => {
        setMedicineToAdd(medicine);
        setCartModalVisible(true);
    };

    const confirmAddToCart = async () => {
        if (!medicineToAdd) return;

        try {
            const totalPrice = medicineToAdd.price * medicineToAdd.quantity;

            // Simula chamada para API de farmácia parceira
            console.log('Enviando pedido para farmácia parceira:', {
                medicineId: medicineToAdd.id,
                quantity: medicineToAdd.quantity,
                totalPrice: totalPrice,
                laboratory: medicineToAdd.laboratory
            });

            // Aqui seria feita a integração real com a API da farmácia
            // await addToCartAPI(medicineToAdd.id, medicineToAdd.quantity);

            setCartModalVisible(false);
            setMedicineToAdd(null);

            // Mostrar feedback de sucesso
            Alert.alert('Sucesso!', 'Medicamento adicionado ao carrinho com sucesso!');
        } catch (err) {
            console.error('Erro ao adicionar ao carrinho:', err);
            Alert.alert('Erro', 'Não foi possível adicionar ao carrinho. Tente novamente.');
        }
    };

    const cancelAddToCart = () => {
        setCartModalVisible(false);
        setMedicineToAdd(null);
    };

    const handleViewDetails = (medicine: Medicine) => {
        setSelectedMedicine(medicine);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedMedicine(null);
    };

    const renderMedicine = ({ item }: { item: Medicine }) => (
        <TouchableOpacity style={styles.medicineCard} onPress={() => handleViewDetails(item)}>
            <View style={styles.medicineHeader}>
                <View style={styles.medicineIcon}>
                    <IconSymbol name={item.image as any} size={24} color="#4CAF50" />
                </View>
                <View style={styles.medicineInfo}>
                    <ThemedText style={styles.medicineName}>{item.name}</ThemedText>
                    <ThemedText style={styles.medicineDescription}>{item.description}</ThemedText>
                    <ThemedText style={styles.medicineLaboratory}>{item.laboratory}</ThemedText>
                </View>
                <View style={styles.medicinePrice}>
                    <ThemedText style={styles.priceOriginal}>R$ {item.originalPrice.toFixed(2)}</ThemedText>
                    <ThemedText style={styles.priceFinal}>R$ {item.price.toFixed(2)}</ThemedText>
                    <View style={styles.discountBadge}>
                        <ThemedText style={styles.discountText}>-{item.discount}%</ThemedText>
                    </View>
                </View>
            </View>
            <View style={styles.medicineFooter}>
                <View style={styles.stockStatus}>
                    <IconSymbol
                        name={item.inStock ? "checkmark.circle.fill" : "xmark.circle.fill"}
                        size={16}
                        color={item.inStock ? "#4CAF50" : "#F44336"}
                    />
                    <ThemedText style={[styles.stockText, { color: item.inStock ? "#4CAF50" : "#F44336" }]}>
                        {item.inStock ? "Em estoque" : "Fora de estoque"}
                    </ThemedText>
                </View>
            </View>

            {item.inStock && (
                <View style={styles.quantitySection}>
                    <View style={styles.quantityControls}>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        >
                            <IconSymbol name="minus" size={16} color="#FF6B35" />
                        </TouchableOpacity>
                        <ThemedText style={styles.quantityText}>{item.quantity}</ThemedText>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        >
                            <IconSymbol name="plus" size={16} color="#FF6B35" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => handleAddToCart(item)}
                    >
                        <ThemedText style={styles.addButtonText}>
                            Adicionar ({item.quantity}x)
                        </ThemedText>
                    </TouchableOpacity>
                </View>
            )}
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
                        Medicamentos
                    </ThemedText>
                    <TouchableOpacity style={styles.cartButton} onPress={() => router.push('/cart')}>
                        <IconSymbol name="cart.fill" size={24} color="#FF6B35" />
                        <View style={styles.cartBadge}>
                            <ThemedText style={styles.cartBadgeText}>2</ThemedText>
                        </View>
                    </TouchableOpacity>
                </View>

                <ThemedText style={styles.headerSubtitle}>
                    Compre direto dos laboratórios com preços especiais
                </ThemedText>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <IconSymbol name="magnifyingglass" size={20} color="#999" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar medicamentos..."
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

            {/* Medicines List */}
            <View style={styles.medicinesContainer}>
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <IconSymbol name="arrow.clockwise" size={40} color="#FF6B35" />
                        <ThemedText style={styles.loadingText}>
                            Carregando medicamentos das farmácias parceiras...
                        </ThemedText>
                    </View>
                ) : error ? (
                    <View style={styles.errorContainer}>
                        <IconSymbol name="exclamationmark.triangle" size={40} color="#F44336" />
                        <ThemedText style={styles.errorText}>{error}</ThemedText>
                        <TouchableOpacity style={styles.retryButton} onPress={fetchMedicines}>
                            <ThemedText style={styles.retryButtonText}>Tentar Novamente</ThemedText>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <>
                        <View style={styles.resultsHeader}>
                            <ThemedText style={styles.resultsText}>
                                {filteredMedicines.length} medicamentos encontrados
                            </ThemedText>
                        </View>

                        <FlatList
                            data={filteredMedicines}
                            renderItem={renderMedicine}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.medicinesList}
                        />
                    </>
                )}
            </View>

            {/* Modal Customizado */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        {selectedMedicine && (
                            <>
                                {/* Header do Modal */}
                                <View style={styles.modalHeader}>
                                    <View style={styles.modalIcon}>
                                        <IconSymbol name={selectedMedicine.image as any} size={32} color="#4CAF50" />
                                    </View>
                                    <View style={styles.modalTitleContainer}>
                                        <ThemedText style={styles.modalTitle}>{selectedMedicine.name}</ThemedText>
                                        <ThemedText style={styles.modalLaboratory}>
                                            Laboratório: {selectedMedicine.laboratory}
                                        </ThemedText>
                                    </View>
                                    <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                                        <IconSymbol name="xmark" size={20} color="#999" />
                                    </TouchableOpacity>
                                </View>

                                {/* Conteúdo do Modal */}
                                <View style={styles.modalContent}>
                                    <ThemedText style={styles.modalDescription}>
                                        {selectedMedicine.description}
                                    </ThemedText>

                                    {/* Informações de Preço */}
                                    <View style={styles.priceSection}>
                                        <View style={styles.priceRow}>
                                            <ThemedText style={styles.priceLabel}>Preço original:</ThemedText>
                                            <ThemedText style={styles.originalPrice}>
                                                R$ {selectedMedicine.originalPrice.toFixed(2)}
                                            </ThemedText>
                                        </View>
                                        <View style={styles.priceRow}>
                                            <ThemedText style={styles.priceLabel}>Desconto:</ThemedText>
                                            <View style={styles.discountContainer}>
                                                <ThemedText style={styles.modalDiscountText}>
                                                    -{selectedMedicine.discount}%
                                                </ThemedText>
                                            </View>
                                        </View>
                                        <View style={[styles.priceRow, styles.finalPriceRow]}>
                                            <ThemedText style={styles.finalPriceLabel}>Preço final:</ThemedText>
                                            <ThemedText style={styles.finalPrice}>
                                                R$ {selectedMedicine.price.toFixed(2)}
                                            </ThemedText>
                                        </View>
                                    </View>

                                    {/* Status de Estoque */}
                                    <View style={styles.stockSection}>
                                        <View style={styles.stockInfo}>
                                            <IconSymbol
                                                name={selectedMedicine.inStock ? "checkmark.circle.fill" : "xmark.circle.fill"}
                                                size={20}
                                                color={selectedMedicine.inStock ? "#4CAF50" : "#F44336"}
                                            />
                                            <ThemedText style={[
                                                styles.modalStockText,
                                                { color: selectedMedicine.inStock ? "#4CAF50" : "#F44336" }
                                            ]}>
                                                {selectedMedicine.inStock ? "Em estoque" : "Fora de estoque"}
                                            </ThemedText>
                                        </View>
                                    </View>
                                </View>

                                {/* Footer do Modal */}
                                <View style={styles.modalFooter}>
                                    <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                                        <ThemedText style={styles.modalButtonText}>Fechar</ThemedText>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </View>
                </View>
            </Modal>

            {/* Modal de Adicionar ao Carrinho */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={cartModalVisible}
                onRequestClose={cancelAddToCart}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.cartModalContainer}>
                        {medicineToAdd && (
                            <>
                                {/* Header do Modal */}
                                <View style={styles.cartModalHeader}>
                                    <View style={styles.cartModalIcon}>
                                        <IconSymbol name="cart.fill" size={24} color="#FF6B35" />
                                    </View>
                                    <ThemedText style={styles.cartModalTitle}>Adicionar ao Carrinho</ThemedText>
                                </View>

                                {/* Conteúdo do Modal */}
                                <View style={styles.cartModalContent}>
                                    <View style={styles.cartMedicineInfo}>
                                        <View style={styles.cartMedicineIcon}>
                                            <IconSymbol name={medicineToAdd.image as any} size={32} color="#4CAF50" />
                                        </View>
                                        <View style={styles.cartMedicineDetails}>
                                            <ThemedText style={styles.cartMedicineName}>
                                                {medicineToAdd.name}
                                            </ThemedText>
                                            <ThemedText style={styles.cartMedicineLaboratory}>
                                                {medicineToAdd.laboratory}
                                            </ThemedText>
                                        </View>
                                    </View>

                                    <View style={styles.cartQuantityInfo}>
                                        <ThemedText style={styles.cartQuantityText}>
                                            Quantidade: {medicineToAdd.quantity}x
                                        </ThemedText>
                                        <ThemedText style={styles.cartPriceText}>
                                            R$ {medicineToAdd.price.toFixed(2)} cada
                                        </ThemedText>
                                    </View>

                                    <View style={styles.cartTotalSection}>
                                        <View style={styles.cartTotalRow}>
                                            <ThemedText style={styles.cartTotalLabel}>Total:</ThemedText>
                                            <ThemedText style={styles.cartTotalValue}>
                                                R$ {(medicineToAdd.price * medicineToAdd.quantity).toFixed(2)}
                                            </ThemedText>
                                        </View>
                                    </View>

                                    <ThemedText style={styles.cartConfirmationText}>
                                        Deseja adicionar este medicamento ao seu carrinho?
                                    </ThemedText>
                                </View>

                                {/* Footer do Modal */}
                                <View style={styles.cartModalFooter}>
                                    <TouchableOpacity
                                        style={styles.cartCancelButton}
                                        onPress={cancelAddToCart}
                                    >
                                        <ThemedText style={styles.cartCancelButtonText}>Cancelar</ThemedText>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.cartConfirmButton}
                                        onPress={confirmAddToCart}
                                    >
                                        <ThemedText style={styles.cartConfirmButtonText}>Adicionar</ThemedText>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
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
    cartButton: {
        position: 'relative',
        padding: 8,
    },
    cartBadge: {
        position: 'absolute',
        top: 4,
        right: 4,
        backgroundColor: '#F44336',
        borderRadius: 10,
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cartBadgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
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
    medicinesContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    resultsHeader: {
        marginBottom: 16,
    },
    resultsText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FF6B35',
    },
    medicinesList: {
        paddingBottom: 20,
    },
    medicineCard: {
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
    medicineHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    medicineIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    medicineInfo: {
        flex: 1,
        marginRight: 12,
    },
    medicineName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    medicineDescription: {
        fontSize: 14,
        opacity: 0.7,
        marginBottom: 4,
    },
    medicineLaboratory: {
        fontSize: 12,
        color: '#FF6B35',
        fontWeight: '600',
    },
    medicinePrice: {
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
    medicineFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    stockStatus: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    stockText: {
        marginLeft: 6,
        fontSize: 14,
        fontWeight: '600',
    },
    addButton: {
        backgroundColor: '#FF6B35',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
    },
    addButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
    quantitySection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0, 0, 0, 0.1)',
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 107, 53, 0.1)',
        borderRadius: 20,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    quantityButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    quantityText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 16,
        color: '#FF6B35',
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        textAlign: 'center',
        opacity: 0.7,
    },
    errorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
        paddingHorizontal: 40,
    },
    errorText: {
        marginTop: 16,
        fontSize: 16,
        textAlign: 'center',
        color: '#F44336',
        marginBottom: 20,
    },
    retryButton: {
        backgroundColor: '#FF6B35',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
    },
    retryButtonText: {
        color: 'white',
        fontSize: 16,
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
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    modalTitleContainer: {
        flex: 1,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    modalLaboratory: {
        fontSize: 14,
        color: '#FF6B35',
        fontWeight: '600',
    },
    closeButton: {
        padding: 8,
    },
    modalContent: {
        padding: 20,
    },
    modalDescription: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 20,
        opacity: 0.8,
    },
    priceSection: {
        backgroundColor: 'rgba(76, 175, 80, 0.05)',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    finalPriceRow: {
        marginBottom: 0,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0, 0, 0, 0.1)',
    },
    priceLabel: {
        fontSize: 14,
        opacity: 0.7,
    },
    originalPrice: {
        fontSize: 14,
        textDecorationLine: 'line-through',
        opacity: 0.6,
    },
    discountContainer: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    modalDiscountText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    finalPriceLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    finalPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    stockSection: {
        alignItems: 'center',
        marginBottom: 20,
    },
    stockInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalStockText: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: '600',
    },
    modalFooter: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalButton: {
        backgroundColor: '#FF6B35',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    // Estilos do Modal do Carrinho
    cartModalContainer: {
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
    cartModalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    },
    cartModalIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 107, 53, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    cartModalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF6B35',
    },
    cartModalContent: {
        padding: 20,
    },
    cartMedicineInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    cartMedicineIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    cartMedicineDetails: {
        flex: 1,
    },
    cartMedicineName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    cartMedicineLaboratory: {
        fontSize: 14,
        color: '#FF6B35',
        fontWeight: '600',
    },
    cartQuantityInfo: {
        backgroundColor: 'rgba(255, 107, 53, 0.05)',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    cartQuantityText: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
    },
    cartPriceText: {
        fontSize: 14,
        opacity: 0.7,
    },
    cartTotalSection: {
        backgroundColor: 'rgba(76, 175, 80, 0.05)',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    cartTotalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cartTotalLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    cartTotalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    cartConfirmationText: {
        fontSize: 14,
        textAlign: 'center',
        opacity: 0.7,
        lineHeight: 20,
    },
    cartModalFooter: {
        flexDirection: 'row',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0, 0, 0, 0.1)',
        gap: 12,
    },
    cartCancelButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#FF6B35',
        alignItems: 'center',
    },
    cartCancelButtonText: {
        color: '#FF6B35',
        fontSize: 16,
        fontWeight: '600',
    },
    cartConfirmButton: {
        flex: 1,
        backgroundColor: '#FF6B35',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    cartConfirmButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});
