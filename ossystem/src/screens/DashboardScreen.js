import { useState, useEffect } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { styles } from "../styles/DashboardStyles";
import { getDashboardStats } from "../database/dashboardService";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardScreen({ navigation }) {
    const [stats, setStats] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        loadStats();
    }, []);

    async function loadStats() {
        const result = await getDashboardStats();
        if (result.success) {
            setStats(result.stats);
        }
    }

    async function onRefresh() {
        setRefreshing(true);
        await loadStats();
        setRefreshing(false);
    }

    function getStatusColor(status) {
        switch (status) {
            case "Pendente":
                return styles.dotPendente;
            case "Em Andamento":
                return styles.dotAndamento;
            case "Concluído":
                return styles.dotConcluido;
            default:
                return styles.dotPendente;
        }
    }

    function getProgressColor(status) {
        switch (status) {
            case "Pendente":
                return styles.progressPendente;
            case "Em Andamento":
                return styles.progressAndamento;
            case "Concluído":
                return styles.progressConcluido;
            default:
                return styles.progressPendente;
        }
    }

    function getBorderColor(status) {
        switch (status) {
            case "Pendente":
                return styles.recentBorderPendente;
            case "Em Andamento":
                return styles.recentBorderAndamento;
            case "Concluído":
                return styles.recentBorderConcluido;
            default:
                return styles.recentBorderPendente;
        }
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    }

    if (!stats) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Dashboard</Text>
                </View>
                <View style={[styles.content, { justifyContent: 'center', alignItems: 'center' }]}>
                    <Text style={styles.emptyText}>Carregando...</Text>
                </View>
            </View>
        );
    }

    const totalOrders = stats.total;
    const statusCounts = stats.byStatus.reduce((acc, item) => {
        acc[item.status] = item.count;
        return acc;
    }, {});

    return (
        <SafeAreaView style={styles.container}>
            {/* Content */}
            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <Header title="Dashboard" navigation={navigation} />
                {/* Stats Cards */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Visão Geral</Text>
                    <View style={styles.statsGrid}>
                        <View style={styles.statCard}>
                            <Text style={styles.statIcon}>📊</Text>
                            <Text style={styles.statValue}>{totalOrders}</Text>
                            <Text style={styles.statLabel}>Total de Ordens</Text>
                        </View>

                        <View style={styles.statCard}>
                            <Text style={styles.statIcon}>📅</Text>
                            <Text style={styles.statValue}>{stats.thisMonth}</Text>
                            <Text style={styles.statLabel}>Este Mês</Text>
                        </View>

                        <View style={styles.statCard}>
                            <Text style={styles.statIcon}>⏳</Text>
                            <Text style={styles.statValue}>{statusCounts["Pendente"] || 0}</Text>
                            <Text style={styles.statLabel}>Pendentes</Text>
                        </View>

                        <View style={styles.statCard}>
                            <Text style={styles.statIcon}>✅</Text>
                            <Text style={styles.statValue}>{statusCounts["Concluído"] || 0}</Text>
                            <Text style={styles.statLabel}>Concluídos</Text>
                        </View>
                    </View>
                </View>

                {/* Status Distribution */}
                <View style={styles.section}>
                    <View style={styles.chartCard}>
                        <Text style={styles.chartTitle}>Distribuição por Status</Text>
                        {stats.byStatus.length > 0 ? (
                            stats.byStatus.map((item, index) => {
                                const percentage = totalOrders > 0 ? (item.count / totalOrders) * 100 : 0;
                                return (
                                    <View key={index} style={styles.statusRow}>
                                        <View style={styles.statusLeft}>
                                            <View style={[styles.statusDot, getStatusColor(item.status)]} />
                                            <Text style={styles.statusName}>{item.status}</Text>
                                        </View>
                                        <Text style={styles.statusCount}>{item.count}</Text>
                                        <View style={styles.progressBar}>
                                            <View
                                                style={[
                                                    styles.progressFill,
                                                    getProgressColor(item.status),
                                                    { width: `${percentage}%` },
                                                ]}
                                            />
                                        </View>
                                    </View>
                                );
                            })
                        ) : (
                            <View style={styles.emptyState}>
                                <Text style={styles.emptyIcon}>📭</Text>
                                <Text style={styles.emptyText}>Nenhum dado disponível</Text>
                            </View>
                        )}
                    </View>
                </View>

                {/* Week Trend */}
                {stats.weekTrend.length > 0 && (
                    <View style={styles.section}>
                        <View style={styles.chartCard}>
                            <Text style={styles.chartTitle}>Últimos 7 Dias</Text>
                            <View style={styles.trendContainer}>
                                {stats.weekTrend.map((item, index) => {
                                    const maxCount = Math.max(...stats.weekTrend.map(i => i.count));
                                    const width = maxCount > 0 ? (item.count / maxCount) * 100 : 0;
                                    return (
                                        <View key={index} style={styles.trendRow}>
                                            <Text style={styles.trendDate}>
                                                {formatDate(item.date)}
                                            </Text>
                                            <View style={styles.trendBarContainer}>
                                                <View
                                                    style={[styles.trendBar, { width: `${width}%` }]}
                                                />
                                            </View>
                                            <Text style={styles.trendCount}>{item.count}</Text>
                                        </View>
                                    );
                                })}
                            </View>
                        </View>
                    </View>
                )}

                {/* Top Clients */}
                {stats.topClients.length > 0 && (
                    <View style={styles.section}>
                        <View style={styles.chartCard}>
                            <Text style={styles.chartTitle}>Top 5 Clientes</Text>
                            {stats.topClients.map((client, index) => (
                                <View key={index} style={styles.clientRow}>
                                    <Text style={styles.clientName}>
                                        {index + 1}. {client.cliente}
                                    </Text>
                                    <View style={styles.clientBadge}>
                                        <Text style={styles.clientCount}>
                                            {client.total} {client.total === 1 ? 'ordem' : 'ordens'}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {/* Recent Orders */}
                {stats.recentOrders.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Ordens Recentes</Text>
                        {stats.recentOrders.map((order) => (
                            <View
                                key={order.id}
                                style={[styles.recentCard, getBorderColor(order.status)]}
                            >
                                <Text style={styles.recentTitle}>{order.titulo}</Text>
                                <Text style={styles.recentClient}>
                                    {order.cliente} • {order.status}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Empty State */}
                {totalOrders === 0 && (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyIcon}>📊</Text>
                        <Text style={styles.emptyText}>
                            Nenhuma ordem cadastrada ainda.{'\n'}
                            Crie sua primeira ordem para ver as estatísticas!
                        </Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}