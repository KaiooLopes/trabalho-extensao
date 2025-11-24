import { getDatabase } from "./database";

export async function registerUser({ nome, email, senha }) {
    const db = await getDatabase();

    try {
        await db.runAsync(
            `INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)`,
            [nome, email, senha]
        );
        return { success: true };
    } catch (error) {
        return { success: false, error };
    }
}

export async function loginUser({ email, senha }) {
    const db = await getDatabase();

    try {
        const result = await db.getFirstAsync(
            `SELECT * FROM usuarios WHERE email = ? AND senha = ?`,
            [email, senha]
        );

        if (result) {
            return { success: true, user: result };
        } else {
            return { success: false };
        }
    } catch (error) {
        return { success: false, error };
    }
}