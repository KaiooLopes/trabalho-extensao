import { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Modal,
    TextInput,
    Alert,
} from "react-native";
import { Picker } from '@react-native-picker/picker';
import { styles } from "../styles/OrdersStyles";
import { getAllOrders, createOrder, updateOrder, deleteOrder } from "../database/orderService";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrdersScreen({ navigation }) {
    const [orders, setOrders] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingOrder, setEditingOrder] = useState(null);
    const [formData, setFormData] = useState({
        titulo: "",
        descricao: "",
        cliente: "",
        status: "Pendente",
    });

    useEffect(() => {
        loadOrders();
    }, []);

    async function loadOrders() {
        const result = await getAllOrders();
        if (result.success) {
            setOrders(result.orders);
        }
    }

    function openCreateModal() {
        setEditingOrder(null);
        setFormData({
            titulo: "",
            descricao: "",
            cliente: "",
            status: "Pendente",
        });
        setModalVisible(true);
    }

    function openEditModal(order) {
        setEditingOrder(order);
        setFormData({
            titulo: order.titulo,
            descricao: order.descricao,
            cliente: order.cliente,
            status: order.status,
        });
        setModalVisible(true);
    }

    async function handleSave() {
        if (!formData.titulo || !formData.descricao || !formData.cliente) {
            Alert.alert("Atenção", "Preencha todos os campos!");
            return;
        }

        let result;
        if (editingOrder) {
            result = await updateOrder(editingOrder.id, formData);
        } else {
            result = await createOrder(formData);
        }

        if (result.success) {
            Alert.alert("Sucesso", editingOrder ? "Ordem atualizada!" : "Ordem criada!");
            setModalVisible(false);
            loadOrders();
        } else {
            Alert.alert("Erro", "Não foi possível salvar a ordem!");
        }
    }

    function handleDelete(order) {
        Alert.alert(
            "Confirmar Exclusão",
            `Deseja realmente excluir a ordem "${order.titulo}"?`,
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: async () => {
                        const result = await deleteOrder(order.id);
                        if (result.success) {
                            Alert.alert("Sucesso", "Ordem excluída!");
                            loadOrders();
                        } else {
                            Alert.alert("Erro", "Não foi possível excluir a ordem!");
                        }
                    },
                },
            ]
        );
    }

    function getStatusStyle(status) {
        switch (status) {
            case "Pendente":
                return [styles.statusBadge, styles.statusPendente];
            case "Em Andamento":
                return [styles.statusBadge, styles.statusAndamento];
            case "Concluído":
                return [styles.statusBadge, styles.statusConcluido];
            default:
                return [styles.statusBadge, styles.statusPendente];
        }
    }

    function getStatusTextStyle(status) {
        switch (status) {
            case "Pendente":
                return [styles.statusText, styles.statusTextPendente];
            case "Em Andamento":
                return [styles.statusText, styles.statusTextAndamento];
            case "Concluído":
                return [styles.statusText, styles.statusTextConcluido];
            default:
                return [styles.statusText, styles.statusTextPendente];
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Content */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <Header title="Ordens de Serviço" navigation={navigation} />
                {/* Create Button */}
                <TouchableOpacity style={styles.createButton} onPress={openCreateModal}>
                    <Text style={styles.createButtonText}>➕ Nova Ordem</Text>
                </TouchableOpacity>

                {/* Orders List */}
                {orders.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={{ fontSize: 60 }}>📋</Text>
                        <Text style={styles.emptyText}>Nenhuma ordem cadastrada</Text>
                    </View>
                ) : (
                    orders.map((order) => (
                        <View key={order.id} style={styles.orderCard}>
                            <View style={styles.orderHeader}>
                                <Text style={styles.orderTitle}>{order.titulo}</Text>
                                <View style={getStatusStyle(order.status)}>
                                    <Text style={getStatusTextStyle(order.status)}>
                                        {order.status}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.orderInfo}>
                                <Text style={styles.orderLabel}>Cliente</Text>
                                <Text style={styles.orderValue}>{order.cliente}</Text>
                            </View>

                            <View style={styles.orderInfo}>
                                <Text style={styles.orderLabel}>Descrição</Text>
                                <Text style={styles.orderValue} numberOfLines={2}>
                                    {order.descricao}
                                </Text>
                            </View>

                            <View style={styles.orderActions}>
                                <TouchableOpacity
                                    style={[styles.actionButton, styles.editButton]}
                                    onPress={() => openEditModal(order)}
                                >
                                    <Text style={styles.actionButtonText}>✏️</Text>
                                    <Text style={[styles.actionButtonText, styles.editButtonText]}>
                                        Editar
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.actionButton, styles.deleteButton]}
                                    onPress={() => handleDelete(order)}
                                >
                                    <Text style={styles.actionButtonText}>🗑️</Text>
                                    <Text style={[styles.actionButtonText, styles.deleteButtonText]}>
                                        Excluir
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>

            {/* Modal Create/Edit */}
            <Modal
                visible={modalVisible}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>
                                {editingOrder ? "Editar Ordem" : "Nova Ordem"}
                            </Text>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.closeButtonText}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Título</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Ex: Manutenção de Computador"
                                    value={formData.titulo}
                                    onChangeText={(text) =>
                                        setFormData({ ...formData, titulo: text })
                                    }
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Cliente</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nome do cliente"
                                    value={formData.cliente}
                                    onChangeText={(text) =>
                                        setFormData({ ...formData, cliente: text })
                                    }
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Descrição</Text>
                                <TextInput
                                    style={[styles.input, styles.textArea]}
                                    placeholder="Descreva o serviço..."
                                    multiline
                                    numberOfLines={4}
                                    value={formData.descricao}
                                    onChangeText={(text) =>
                                        setFormData({ ...formData, descricao: text })
                                    }
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Status</Text>
                                <View style={styles.pickerContainer}>
                                    <Picker
                                        selectedValue={formData.status}
                                        onValueChange={(value) =>
                                            setFormData({ ...formData, status: value })
                                        }
                                    >
                                        <Picker.Item label="Pendente" value="Pendente" />
                                        <Picker.Item label="Em Andamento" value="Em Andamento" />
                                        <Picker.Item label="Concluído" value="Concluído" />
                                    </Picker>
                                </View>
                            </View>

                            <View style={styles.modalButtons}>
                                <TouchableOpacity
                                    style={[styles.modalButton, styles.cancelButton]}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.modalButton, styles.saveButton]}
                                    onPress={handleSave}
                                >
                                    <Text style={styles.saveButtonText}>Salvar</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}