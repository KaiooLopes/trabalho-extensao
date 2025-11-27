import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { removeUser } from "../services/authService";
import { styles } from "../styles/HomeStyles";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen({ navigation }) {
    async function handleLogout() {
        Alert.alert(
            "Sair",
            "Tem certeza que deseja sair?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Sair",
                    style: "destructive",
                    onPress: async () => {
                        await removeUser();
                        navigation.replace("Login");
                    }
                }
            ]
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Content */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <Header title="Menu Principal" showBack={false} navigation={navigation} />

                <View style={styles.cardsContainer}>
                    {/* Dashboard Card */}
                    <TouchableOpacity
                        style={styles.card}
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate("Dashboard")}
                    >
                        <View style={[styles.cardIconContainer, styles.dashboardIcon]}>
                            <Text style={styles.cardIcon}>📊</Text>
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>Dashboard</Text>
                            <Text style={styles.cardDescription}>
                                Visualize estatísticas e relatórios
                            </Text>
                        </View>
                        <Text style={styles.cardArrow}>›</Text>
                    </TouchableOpacity>

                    {/* Ordens de Serviço Card */}
                    <TouchableOpacity
                        style={styles.card}
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate("Orders")}
                    >
                        <View style={[styles.cardIconContainer, styles.ordersIcon]}>
                            <Text style={styles.cardIcon}>📋</Text>
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>Ordens de Serviço</Text>
                            <Text style={styles.cardDescription}>
                                Gerencie suas ordens de serviço
                            </Text>
                        </View>
                        <Text style={styles.cardArrow}>›</Text>
                    </TouchableOpacity>
                </View>

                {/* Logout Button */}
                <TouchableOpacity
                    style={styles.logoutButton}
                    activeOpacity={0.8}
                    onPress={handleLogout}
                >
                    <Text style={styles.logoutIcon}>🚪</Text>
                    <Text style={styles.logoutText}>Sair</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}