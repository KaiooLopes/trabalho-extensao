import { getDatabase } from "./database";

// Estatísticas gerais
export async function getDashboardStats() {
    const db = await getDatabase();

    try {
        // Total de ordens
        const totalResult = await db.getFirstAsync(
            `SELECT COUNT(*) as total FROM ordens_servico`
        );

        // Ordens por status
        const statusResult = await db.getAllAsync(
            `SELECT status, COUNT(*) as count FROM ordens_servico GROUP BY status`
        );

        // Ordens do mês atual
        const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
        const monthResult = await db.getFirstAsync(
            `SELECT COUNT(*) as count FROM ordens_servico WHERE data_criacao LIKE ?`,
            [`${currentMonth}%`]
        );

        // Últimas 5 ordens
        const recentOrders = await db.getAllAsync(
            `SELECT * FROM ordens_servico ORDER BY id DESC LIMIT 5`
        );

        // Ordens por cliente (top 5)
        const topClients = await db.getAllAsync(
            `SELECT cliente, COUNT(*) as total FROM ordens_servico GROUP BY cliente ORDER BY total DESC LIMIT 5`
        );

        // Ordens criadas nos últimos 7 dias
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const weekOrders = await db.getAllAsync(
            `SELECT DATE(data_criacao) as date, COUNT(*) as count 
       FROM ordens_servico 
       WHERE data_criacao >= ? 
       GROUP BY DATE(data_criacao) 
       ORDER BY date ASC`,
            [sevenDaysAgo.toISOString()]
        );

        return {
            success: true,
            stats: {
                total: totalResult?.total || 0,
                byStatus: statusResult || [],
                thisMonth: monthResult?.count || 0,
                recentOrders: recentOrders || [],
                topClients: topClients || [],
                weekTrend: weekOrders || [],
            },
        };
    } catch (error) {
        console.error("Erro ao buscar estatísticas:", error);
        return { success: false, error };
    }
}