import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Image,
} from "react-native";
import { loginUser } from "../database/userService";
import { styles } from "../styles/LoginStyles";
import { saveUser } from "../services/authService";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin() {
        if (!email || !senha) {
            Alert.alert("Atenção", "Preencha todos os campos!");
            return;
        }

        // Validação de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert("Erro", "Por favor, insira um email válido!");
            return;
        }

        setLoading(true);
        const result = await loginUser({ email, senha });
        setLoading(false);
        if (result.success) {
            // Salvar usuário no AsyncStorage
            const saveResult = await saveUser(result.user);
            // console.log("Usuário salvo:", saveResult);
            // console.log("🚀 Tentando navegar para Home...");

            // Tenta diferentes formas de navegação
            try {
                navigation.replace("Home");
                // console.log("✅ Navegação executada");
            } catch (error) {
                console.error("❌ Erro ao navegar:", error);
                // Tenta navigate ao invés de replace
                navigation.navigate("Home");
            }
        } else {
            Alert.alert("Erro", "Usuário ou senha inválidos!");
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollView}>
                <SafeAreaView style={styles.container}>
                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.iconContainer}>
                            <Image
                                source={require('../../assets/icon.png')}
                                style={{ width: 180 }}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={styles.title}>Bem-vindo!</Text>
                        <Text style={styles.subtitle}>Faça login para continuar</Text>
                    </View>

                    {/* Form */}
                    <View style={styles.formContainer}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="seu@email.com"
                                placeholderTextColor="#9CA3AF"
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                keyboardType="email-address"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Senha</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="••••••••"
                                placeholderTextColor="#9CA3AF"
                                secureTextEntry
                                value={senha}
                                onChangeText={setSenha}
                                autoCapitalize="none"
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.button, loading && styles.buttonDisabled]}
                            onPress={handleLogin}
                            disabled={loading}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.buttonText}>
                                {loading ? "Entrando..." : "Entrar"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Não tem uma conta?</Text>
                        <TouchableOpacity
                            style={styles.secondaryButton}
                            onPress={() => navigation.navigate("Register")}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.secondaryButtonText}>Criar Conta</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}