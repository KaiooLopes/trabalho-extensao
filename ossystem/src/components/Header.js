import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Header({ title, showBack = true, navigation }) {
    return (
        <View
            style={{
                height: 60,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                borderBottomWidth: 1,
                borderBottomColor: 'rgba(0,0,0,0.05)',
                shadowColor: '#000',
                shadowOpacity: 0.05,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 4,
                elevation: 2,
                backgroundColor: '#fff',
                marginBottom: 20
            }}
        >
            {showBack ? (
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        width: 50,
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 10,
                        elevation: 10,
                    }}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Text
                        style={{
                            fontSize: 35,
                            fontWeight: '600',
                            marginBottom: 10, // só pra alinhar visualmente
                        }}
                    >
                        ↩
                    </Text>
                </TouchableOpacity>
            ) : (
                <View style={{ width: 40, height: 40 }} />
            )}


            <Text
                style={{
                    flex: 1,
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: '600',
                    color: '#333',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                }}
            >
                {title}
            </Text>

            {/* Espaço vazio para manter a centralização */}
            <View style={{ width: 40, height: 40 }} />
        </View>
    );
}
