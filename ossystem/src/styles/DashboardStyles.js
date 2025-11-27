import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    header: {
        backgroundColor: '#3B82F6',
        paddingHorizontal: 24,
        paddingTop: 30,
        paddingBottom: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButtonText: {
        color: '#FFFFFF',
        fontSize: 24,
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center'
    },
    content: {
        flex: 1,
        padding: 16,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 12,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    statCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 16,
        flex: 1,
        minWidth: '47%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    statIcon: {
        fontSize: 32,
        marginBottom: 8,
    },
    statValue: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 14,
        color: '#6B7280',
    },
    chartCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    chartTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 16,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    statusLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    statusDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 12,
    },
    dotPendente: {
        backgroundColor: '#F59E0B',
    },
    dotAndamento: {
        backgroundColor: '#3B82F6',
    },
    dotConcluido: {
        backgroundColor: '#10B981',
    },
    statusName: {
        fontSize: 14,
        color: '#374151',
        flex: 1,
    },
    statusCount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1F2937',
        marginRight: 8,
    },
    progressBar: {
        height: 6,
        backgroundColor: '#E5E7EB',
        borderRadius: 3,
        overflow: 'hidden',
        width: 60,
    },
    progressFill: {
        height: '100%',
        borderRadius: 3,
    },
    progressPendente: {
        backgroundColor: '#F59E0B',
    },
    progressAndamento: {
        backgroundColor: '#3B82F6',
    },
    progressConcluido: {
        backgroundColor: '#10B981',
    },
    clientRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    clientName: {
        fontSize: 14,
        color: '#374151',
        flex: 1,
    },
    clientBadge: {
        backgroundColor: '#DBEAFE',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    clientCount: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1E40AF',
    },
    recentCard: {
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        padding: 12,
        marginBottom: 8,
        borderLeftWidth: 4,
    },
    recentBorderPendente: {
        borderLeftColor: '#F59E0B',
    },
    recentBorderAndamento: {
        borderLeftColor: '#3B82F6',
    },
    recentBorderConcluido: {
        borderLeftColor: '#10B981',
    },
    recentTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 4,
    },
    recentClient: {
        fontSize: 12,
        color: '#6B7280',
    },
    emptyState: {
        alignItems: 'center',
        padding: 32,
    },
    emptyIcon: {
        fontSize: 48,
        marginBottom: 12,
    },
    emptyText: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
    },
    trendContainer: {
        paddingVertical: 8,
    },
    trendRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    trendDate: {
        fontSize: 12,
        color: '#6B7280',
        width: 80,
    },
    trendBarContainer: {
        flex: 1,
        height: 24,
        backgroundColor: '#F3F4F6',
        borderRadius: 4,
        overflow: 'hidden',
        marginRight: 8,
    },
    trendBar: {
        height: '100%',
        backgroundColor: '#3B82F6',
        borderRadius: 4,
    },
    trendCount: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1F2937',
        width: 30,
        textAlign: 'right',
    },
});