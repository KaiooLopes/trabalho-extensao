// DashboardScreen.js (Conteúdo COMPLETO SUBSTITUÍDO)

import { useState, useEffect } from "react";
// 🚨 Adicione os novos imports
import { View, Text, ScrollView, RefreshControl, TouchableOpacity, Modal, Button, Platform } from "react-native";

import { styles } from "../styles/DashboardStyles";
// 🚨 Importe a nova função de serviço
import { getDashboardStats, getMonthlyOrders } from "../database/dashboardService";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

// 🚨 Imports para Geração e Compartilhamento de PDF
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export default function DashboardScreen({ navigation }) {
    const [stats, setStats] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    // 🚨 Novo estado para o modal
    const [modalVisible, setModalVisible] = useState(false);
    // 🚨 Novo estado para a data (mês/ano) selecionada
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        loadStats();
    }, []);

    // ... (loadStats, onRefresh, getStatusColor, getProgressColor, getBorderColor permanecem os mesmos)

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
        // Lida com datas que podem vir em formato ISO do banco de dados para o relatório
        const date = new Date(dateString);
        // Garante que o UTC não estrague a data para o relatório
        const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
        return utcDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }

    // --- FUNÇÃO AUXILIAR: TEMPLATE HTML PARA O PDF ---
    // DashboardScreen.js

    // ... (Restante do código)

    // --- FUNÇÃO AUXILIAR: TEMPLATE HTML PARA O PDF ---
    const htmlContent = (orders, monthYear) => `
        <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h1 { color: #3B82F6; text-align: center; margin-bottom: 10px; }
                    .header-info { text-align: center; margin-bottom: 25px; color: #666; font-size: 14px; }
                    table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px; }
                    th, td { border: 1px solid #ddd; padding: 6px; text-align: left; }
                    th { background-color: #E5E7EB; color: #1F2937; font-weight: bold; }
                    .status-Concluído { background-color: #E6FFED; color: #10B981; }
                    .status-Em-Andamento { background-color: #DBEAFE; color: #3B82F6; }
                    .status-Pendente { background-color: #FFFBE6; color: #F59E0B; }
                </style>
            </head>
            <body>
            <h1>Relatório de Ordens de Serviço</h1>
            <div class="header-info">Mês de Referência: ${monthYear}</div>
            
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Cliente</th>
                        <th>Valor</th>
                        <th>Status</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    ${orders.map(order => {
        const valorFormatado = order.valor ? `R$ ${order.valor.toFixed(2).replace('.', ',')}` : 'R$ 0,00';
        const date = formatDate(order.data_criacao);
        const statusClass = `status-${order.status.replace(/\s/g, '-')}`;

        return `
                            <tr class="${statusClass}">
                                <td>${order.id}</td>
                                <td>${order.titulo}</td>
                                <td>${order.cliente}</td>
                                <td>${valorFormatado}</td>
                                <td>${order.status}</td>
                                <td>${date}</td>
                            </tr>
                        `;
    }).join('')}
                </tbody>
            </table>
        </body>
    </html>
    `;

    // --- FUNÇÃO PRINCIPAL: GERAR E COMPARTILHAR PDF ---
    async function generatePdfAndShare() {
        setModalVisible(false);

        const month = selectedDate.getMonth() + 1;
        const year = selectedDate.getFullYear();

        const fetchResult = await getMonthlyOrders(month, year);

        if (!fetchResult.success) {
            alert('Erro ao buscar dados para o relatório.');
            return;
        }

        const ordersToExport = fetchResult.orders;

        if (ordersToExport.length === 0) {
            alert(`Não há ordens de serviço para exportar em ${month}/${year}.`);
            return;
        }

        const monthYear = selectedDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

        // Gera o HTML
        const html = htmlContent(ordersToExport, monthYear);

        try {
            // Cria o PDF
            const { uri } = await Print.printToFileAsync({
                html: html,
                base64: false,
                name: `Relatorio_OS_${monthYear.replace(/ /g, '_')}`
            });

            // Compartilha/Salva o PDF no celular
            if (Platform.OS !== 'web' && await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(uri, {
                    mimeType: 'application/pdf',
                    dialogTitle: `Exportar Ordens - ${monthYear}`,
                });
            } else {
                alert("O compartilhamento não está disponível no seu dispositivo.");
            }
        } catch (error) {
            console.error('Erro ao gerar/compartilhar PDF:', error);
            alert('Houve um erro ao gerar o relatório. Tente novamente.');
        }
    }

    // --- COMPONENTE MODAL ---
    const ExportModal = () => (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Exportar Ordens de Serviço</Text>

                    {/* Navegação de Mês */}
                    <View style={styles.datePickerContainer}>
                        <TouchableOpacity
                            onPress={() => setSelectedDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
                            style={styles.datePickerButton}
                        >
                            <Text style={styles.datePickerButtonText}>{'<'}</Text>
                        </TouchableOpacity>

                        <Text style={styles.currentMonthText}>
                            {selectedDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                        </Text>

                        {/* Garante que não é possível avançar para o futuro */}
                        <TouchableOpacity
                            onPress={() => setSelectedDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
                            style={styles.datePickerButton}
                            disabled={selectedDate.getMonth() === new Date().getMonth() && selectedDate.getFullYear() === new Date().getFullYear()}
                        >
                            <Text style={styles.datePickerButtonText}>{'>'}</Text>
                        </TouchableOpacity>
                    </View>

                    <Button
                        title={`Exportar ${selectedDate.toLocaleDateString('pt-BR', { month: 'long' })} para PDF`}
                        onPress={generatePdfAndShare}
                    />

                    <View style={{ marginTop: 15 }}>
                        <Button
                            title="Cancelar"
                            onPress={() => setModalVisible(false)}
                            color="#dc3545"
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );

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
            {ExportModal()}

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {/* 🚨 Novo Container para o Header e o Botão */}
                <Header title="Dashboard" navigation={navigation} />

                <View style={styles.headerWithButtonContainer}>
                    <TouchableOpacity
                        onPress={() => setModalVisible(true)}
                        style={styles.exportButton}
                    >
                        <Text style={styles.exportButtonText}>Exportar 📥</Text>
                    </TouchableOpacity>
                </View>
                {/* ... Restante do seu código: Stats Cards, Distribution, etc. */}
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