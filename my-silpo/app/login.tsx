import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    useColorScheme,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';

export default function LoginScreen() {
    const colorScheme = useColorScheme();
    const dark = colorScheme === 'dark';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const t = {
        bg: dark ? '#0f0f0f' : '#ffffff',
        card: dark ? '#1a1a1a' : '#f5f5f5',
        border: dark ? '#2e2e2e' : '#e0e0e0',
        text: dark ? '#ffffff' : '#111111',
        muted: dark ? '#888888' : '#999999',
        accent: dark ? '#ffffff' : '#111111',
        accentText: dark ? '#000000' : '#ffffff',
        inputBg: dark ? '#111111' : '#ffffff',
    };

    return (
        <SafeAreaView style={[styles.safe, { backgroundColor: t.bg }]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.flex}
            >
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={[styles.logo, { backgroundColor: t.accent }]}>
                            <Text style={[styles.logoText, { color: t.accentText }]}>S</Text>
                        </View>
                        <Text style={[styles.title, { color: t.text }]}>Вхід до Silpo</Text>
                        <Text style={[styles.subtitle, { color: t.muted }]}>
                            Введіть свої дані для входу
                        </Text>
                    </View>

                    <View style={[styles.card, { backgroundColor: t.card, borderColor: t.border }]}>
                        <View style={styles.field}>
                            <Text style={[styles.label, { color: t.muted }]}>Email</Text>
                            <View style={[styles.inputWrapper, { backgroundColor: t.inputBg, borderColor: t.border }]}>
                                <TextInput
                                    style={[styles.input, { color: t.text }]}
                                    placeholder="your@email.com"
                                    placeholderTextColor={t.muted}
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                            </View>
                        </View>

                        <View style={styles.field}>
                            <Text style={[styles.label, { color: t.muted }]}>Пароль</Text>
                            <View style={[styles.inputWrapper, { backgroundColor: t.inputBg, borderColor: t.border }]}>
                                <TextInput
                                    style={[styles.input, { color: t.text }]}
                                    placeholder="••••••••"
                                    placeholderTextColor={t.muted}
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                    autoCapitalize="none"
                                />
                                <TouchableOpacity
                                    onPress={() => setShowPassword(!showPassword)}
                                    style={styles.eyeBtn}
                                >
                                    <Text style={{ color: t.muted, fontSize: 13 }}>
                                        {showPassword ? 'сховати' : 'показати'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.forgotWrapper}>
                            <Text style={[styles.forgot, { color: t.muted }]}>Забули пароль?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: t.accent }]}
                            activeOpacity={0.85}
                        >
                            <Text style={[styles.buttonText, { color: t.accentText }]}>Увійти</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.registerRow}>
                        <Text style={[styles.registerText, { color: t.muted }]}>Немає акаунту? </Text>
                        <TouchableOpacity>
                            <Text style={[styles.registerLink, { color: t.text }]}>Зареєструватись</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1 },
    flex: { flex: 1 },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        gap: 24,
    },
    header: {
        alignItems: 'center',
        gap: 8,
    },
    logo: {
        width: 56,
        height: 56,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
    },
    logoText: {
        fontSize: 26,
        fontWeight: '700',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 14,
        marginTop: 2,
    },
    card: {
        borderRadius: 20,
        borderWidth: 1,
        padding: 20,
        gap: 16,
    },
    field: {
        gap: 6,
    },
    label: {
        fontSize: 13,
        fontWeight: '500',
        marginLeft: 2,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 14,
        height: 48,
    },
    input: {
        flex: 1,
        fontSize: 15,
        height: '100%',
    },
    eyeBtn: {
        paddingLeft: 8,
    },
    forgotWrapper: {
        alignSelf: 'flex-end',
        marginTop: -4,
    },
    forgot: {
        fontSize: 13,
    },
    button: {
        height: 50,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 4,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.2,
    },
    registerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerText: {
        fontSize: 14,
    },
    registerLink: {
        fontSize: 14,
        fontWeight: '600',
    },
});