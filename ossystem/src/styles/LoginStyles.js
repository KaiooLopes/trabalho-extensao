import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3B82F6',
    },
    scrollView: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 48,
    },
    iconContainer: {
        width: 80,
        height: 80,
        backgroundColor: '#FFFFFF',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    icon: {
        fontSize: 40,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 36,
        fontWeight: 'bold',
    },
    subtitle: {
        color: '#BFDBFE',
        fontSize: 16,
        marginTop: 8,
    },
    formContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 10,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        color: '#374151',
        fontWeight: '600',
        marginBottom: 8,
        fontSize: 16,
    },
    input: {
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#3B82F6',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 8,
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonDisabled: {
        backgroundColor: '#93C5FD',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 18,
    },
    footer: {
        alignItems: 'center',
        marginTop: 32,
    },
    footerText: {
        color: '#BFDBFE',
        marginBottom: 12,
    },
    secondaryButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 12,
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    secondaryButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 16,
    },
});