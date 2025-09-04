import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface CartItem {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice: number;
    discount: number;
    laboratory: string;
    image: string;
    quantity: number;
}

export default function CartScreen() {
    const backgroundColor = useThemeColor({}, 'background');

    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: '1',
            name: 'Paracetamol 500mg',
            description: 'Analgésico e antitérmico',
            price: 8.50,
            originalPrice: 12.00,
            discount: 29,
            laboratory: 'EMS',
            image: 'pills.fill',
            quantity: 2,
        },
        {
            id: '2',
            name: 'Ibuprofeno 400mg',
            description: 'Anti-inflamatório e analgésico',
            price: 15.90,
            originalPrice: 22.50,
            discount: 29,
            laboratory: 'Eurofarma',
            image: 'pills.fill',
            quantity: 1,
        },
    ]);

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const calculateTotalSavings = () => {
        return cartItems.reduce((total, item) => total + ((item.originalPrice - item.price) * item.quantity), 0);
    };

    const calculateTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
        if (newQuantity <= 0) {
            handleRemoveItem(itemId);
            return;
        }

        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const handleRemoveItem = (itemId: string) => {
        Alert.alert(
            'Remover Item',
            'Deseja remover este item do carrinho?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Remover',
                    style: 'destructive',
                    onPress: () => {
                        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
                    }
                }
            ]
        );
    };

    const handleCheckout = () => {
        Alert.alert(
            'Finalizar Compra',
            `Total: R$ ${calculateSubtotal().toFixed(2)}\n\nVocê economizou: R$ ${calculateTotalSavings().toFixed(2)}`,
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Finalizar', onPress: () => console.log('Finalizando compra...') }
            ]
        );
    };

    const handleClearCart = () => {
        Alert.alert(
            'Limpar Carrinho',
            'Deseja remover todos os itens do carrinho?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Limpar',
                    style: 'destructive',
                    onPress: () => setCartItems([])
                }
            ]
        );
    };

    const renderCartItem = ({ item }: { item: CartItem }) => (
        <View style={styles.cartItem}>
            <View style={styles.itemHeader}>
                <View style={styles.itemIcon}>
                    <IconSymbol name={item.image as any} size={24} color="#4CAF50" />
                </View>
                <View style={styles.itemInfo}>
                    <ThemedText style={styles.itemName}>{item.name}</ThemedText>
                    <ThemedText style={styles.itemDescription}>{item.description}</ThemedText>
                    <ThemedText style={styles.itemLaboratory}>{item.laboratory}</ThemedText>
                </View>
                <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveItem(item.id)}
                >
                    <IconSymbol name="xmark.circle.fill" size={20} color="#F44336" />
                </TouchableOpacity>
            </View>

            <View style={styles.itemFooter}>
                <View style={styles.priceInfo}>
                    <ThemedText style={styles.priceOriginal}>R$ {item.originalPrice.toFixed(2)}</ThemedText>
                    <ThemedText style={styles.priceFinal}>R$ {item.price.toFixed(2)}</ThemedText>
                    <View style={styles.discountBadge}>
                        <ThemedText style={styles.discountText}>-{item.discount}%</ThemedText>
                    </View>
                </View>

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
            </View>

            <View style={styles.itemTotal}>
                <ThemedText style={styles.itemTotalLabel}>Subtotal:</ThemedText>
                <ThemedText style={styles.itemTotalValue}>
                    R$ {(item.price * item.quantity).toFixed(2)}
                </ThemedText>
            </View>
        </View>
    );

    const renderEmptyCart = () => (
        <View style={styles.emptyCart}>
            <IconSymbol name="cart" size={80} color="#999" />
            <ThemedText style={styles.emptyCartTitle}>Carrinho Vazio</ThemedText>
            <ThemedText style={styles.emptyCartDescription}>
                Adicione medicamentos ao seu carrinho para continuar
            </ThemedText>
            <TouchableOpacity
                style={styles.continueShoppingButton}
                onPress={() => router.back()}
            >
                <ThemedText style={styles.continueShoppingText}>Continuar Comprando</ThemedText>
            </TouchableOpacity>
        </View>
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
                        Carrinho
                    </ThemedText>
                    {cartItems.length > 0 && (
                        <TouchableOpacity
                            style={styles.clearButton}
                            onPress={handleClearCart}
                        >
                            <ThemedText style={styles.clearButtonText}>Limpar</ThemedText>
                        </TouchableOpacity>
                    )}
                </View>

                <ThemedText style={styles.headerSubtitle}>
                    {calculateTotalItems()} {calculateTotalItems() === 1 ? 'item' : 'itens'} no carrinho
                </ThemedText>
            </View>

            {cartItems.length === 0 ? (
                renderEmptyCart()
            ) : (
                <>
                    {/* Cart Items */}
                    <View style={styles.cartContainer}>
                        <FlatList
                            data={cartItems}
                            renderItem={renderCartItem}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.cartList}
                        />
                    </View>

                    {/* Order Summary */}
                    <View style={styles.orderSummary}>
                        <View style={styles.summaryRow}>
                            <ThemedText style={styles.summaryLabel}>Subtotal:</ThemedText>
                            <ThemedText style={styles.summaryValue}>R$ {calculateSubtotal().toFixed(2)}</ThemedText>
                        </View>
                        <View style={styles.summaryRow}>
                            <ThemedText style={styles.summaryLabel}>Você economizou:</ThemedText>
                            <ThemedText style={[styles.summaryValue, styles.savingsText]}>
                                -R$ {calculateTotalSavings().toFixed(2)}
                            </ThemedText>
                        </View>
                        <View style={styles.summaryDivider} />
                        <View style={styles.summaryRow}>
                            <ThemedText style={styles.totalLabel}>Total:</ThemedText>
                            <ThemedText style={styles.totalValue}>R$ {calculateSubtotal().toFixed(2)}</ThemedText>
                        </View>
                    </View>

                    {/* Checkout Button */}
                    <View style={styles.checkoutContainer}>
                        <TouchableOpacity
                            style={styles.checkoutButton}
                            onPress={handleCheckout}
                        >
                            <ThemedText style={styles.checkoutButtonText}>
                                Finalizar Compra - R$ {calculateSubtotal().toFixed(2)}
                            </ThemedText>
                        </TouchableOpacity>
                    </View>
                </>
            )}
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
    clearButton: {
        padding: 8,
    },
    clearButtonText: {
        color: '#F44336',
        fontSize: 16,
        fontWeight: '600',
    },
    headerSubtitle: {
        fontSize: 16,
        opacity: 0.7,
        textAlign: 'center',
    },
    cartContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    cartList: {
        paddingBottom: 20,
    },
    cartItem: {
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
    itemHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    itemIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    itemInfo: {
        flex: 1,
        marginRight: 12,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    itemDescription: {
        fontSize: 14,
        opacity: 0.7,
        marginBottom: 4,
    },
    itemLaboratory: {
        fontSize: 12,
        color: '#FF6B35',
        fontWeight: '600',
    },
    removeButton: {
        padding: 4,
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    priceInfo: {
        alignItems: 'flex-start',
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
    itemTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0, 0, 0, 0.1)',
    },
    itemTotalLabel: {
        fontSize: 14,
        fontWeight: '600',
    },
    itemTotalValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    emptyCart: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    emptyCartTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 12,
    },
    emptyCartDescription: {
        fontSize: 16,
        opacity: 0.7,
        textAlign: 'center',
        marginBottom: 30,
    },
    continueShoppingButton: {
        backgroundColor: '#FF6B35',
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 25,
    },
    continueShoppingText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    orderSummary: {
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginBottom: 12,
        padding: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    summaryLabel: {
        fontSize: 16,
        opacity: 0.7,
    },
    summaryValue: {
        fontSize: 16,
        fontWeight: '600',
    },
    savingsText: {
        color: '#4CAF50',
    },
    summaryDivider: {
        height: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        marginVertical: 12,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    totalValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF6B35',
    },
    checkoutContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    checkoutButton: {
        backgroundColor: '#FF6B35',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    checkoutButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
