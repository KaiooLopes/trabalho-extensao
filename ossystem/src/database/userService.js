import { getDatabase } from "./database";

export async function registerUser({ nome, email, senha }) {
    const db = await getDatabase();

    try {
        await db.runAsync(
            `INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)`,
            [nome, email, senha]
        );
        // console.log("✅ Usuário registrado com sucesso");
        return { success: true };
    } catch (error) {
        // console.error("❌ Erro ao registrar usuário:", error);
        return { success: false, error };
    }
}

export async function loginUser({ email, senha }) {
    const db = await getDatabase();

    try {
        // console.log("🔍 Tentando login com:", email);

        const result = await db.getFirstAsync(
            `SELECT * FROM usuarios WHERE email = ? AND senha = ?`,
            [email, senha]
        );

        // console.log("📦 Resultado da query:", result);

        if (result) {
            // console.log("✅ Login bem-sucedido!");
            return { success: true, user: result };
        } else {
            // console.log("❌ Usuário ou senha incorretos");
            return { success: false };
        }
    } catch (error) {
        console.error("❌ Erro ao fazer login:", error);
        return { success: false, error };
    }
}