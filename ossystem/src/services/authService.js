import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = '@app:user';

// Salvar usuário logado
export async function saveUser(user) {
    try {
        const userData = JSON.stringify(user);
        await AsyncStorage.setItem(USER_KEY, userData);
        // console.log("✅ Usuário salvo no AsyncStorage:", user);

        // Verificar se salvou
        const saved = await AsyncStorage.getItem(USER_KEY);
        // console.log("🔍 Verificação - Usuário salvo:", saved);

        return { success: true };
    } catch (error) {
        console.error('❌ Erro ao salvar usuário:', error);
        return { success: false, error };
    }
}

// Buscar usuário logado
export async function getUser() {
    try {
        const userData = await AsyncStorage.getItem(USER_KEY);
        // console.log("🔍 Buscando usuário do AsyncStorage:", userData);

        if (userData) {
            return { success: true, user: JSON.parse(userData) };
        }
        return { success: false };
    } catch (error) {
        console.error('❌ Erro ao buscar usuário:', error);
        return { success: false, error };
    }
}

// Remover usuário (logout)
export async function removeUser() {
    try {
        await AsyncStorage.removeItem(USER_KEY);
        // console.log("✅ Usuário removido do AsyncStorage");
        return { success: true };
    } catch (error) {
        console.error('❌ Erro ao remover usuário:', error);
        return { success: false, error };
    }
}

// Verificar se está logado
export async function isLoggedIn() {
    const result = await getUser();
    return result.success;
}