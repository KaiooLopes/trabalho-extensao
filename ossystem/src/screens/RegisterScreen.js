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
import { registerUser } from "../database/userService";
import { styles } from "../styles/RegisterStyles";

export default function RegisterScreen({ navigation }) {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleRegister() {
        if (!nome || !email || !senha || !confirmarSenha) {
            Alert.alert("Atenção", "Preencha todos os campos!");
            return;
        }

        if (senha !== confirmarSenha) {
            Alert.alert("Erro", "As senhas não coincidem!");
            return;
        }

        if (senha.length < 6) {
            Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres!");
            return;
        }

        setLoading(true);
        const result = await registerUser({ nome, email, senha });
        setLoading(false);

        if (result.success) {
            Alert.alert("Sucesso", "Usuário registrado!", [
                { text: "OK", onPress: () => navigation.navigate("Login") },
            ]);
        } else {
            Alert.alert("Erro", "E-mail já registrado ou erro ao salvar!");
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
                            <Text style={styles.icon}>✨</Text>
                        </View>
                        <Text style={styles.title}>Criar Conta</Text>
                        <Text style={styles.subtitle}>Preencha seus dados abaixo</Text>
                    </View>

                    {/* Form */}
                    <View style={styles.formContainer}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Nome Completo</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="João Silva"
                                placeholderTextColor="#9CA3AF"
                                value={nome}
                                onChangeText={setNome}
                            />
                        </View>

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
                            <Text style={styles.hint}>Mínimo de 6 caracteres</Text>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Confirmar Senha</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="••••••••"
                                placeholderTextColor="#9CA3AF"
                                secureTextEntry
                                value={confirmarSenha}
                                onChangeText={setConfirmarSenha}
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.button, loading && styles.buttonDisabled]}
                            onPress={handleRegister}
                            disabled={loading}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.buttonText}>
                                {loading ? "Cadastrando..." : "Cadastrar"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Já tem uma conta?</Text>
                        <TouchableOpacity
                            style={styles.secondaryButton}
                            onPress={() => navigation.goBack()}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.secondaryButtonText}>Voltar para Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}