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
} from "react-native";
import { loginUser } from "../database/userService";
import { styles } from "../styles/LoginStyles";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin() {
        if (!email || !senha) {
            Alert.alert("Atenção", "Preencha todos os campos!");
            return;
        }

        setLoading(true);
        const result = await loginUser({ email, senha });
        setLoading(false);

        if (result.success) {
            Alert.alert("Sucesso", `Bem-vindo(a) ${result.user.nome}!`);
            // navigation.navigate("Home");
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
                <View style={styles.content}>
                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.iconContainer}>
                            <Text style={styles.icon}>🔐</Text>
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
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}