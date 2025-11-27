import { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet, Image } from "react-native";
import { isLoggedIn } from "../services/authService";
import { initDatabase } from "../database/database";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      // Inicializar banco de dados
      await initDatabase();
      // console.log("✅ Banco de dados inicializado");

      // Pequeno delay para exibir a splash
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Verificar se está logado
      const loggedIn = await isLoggedIn();
      // console.log("🔐 Está logado?", loggedIn);

      if (loggedIn) {
        navigation.replace("Home");
      } else {
        navigation.replace("Login");
      }
    } catch (error) {
      console.error("❌ Erro na splash:", error);
      navigation.replace("Login");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" color="#FFFFFF" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
});