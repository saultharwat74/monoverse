import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useLoginForm } from "@monoverse/hooks";
import { useAuth } from "@monoverse/state";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Shield,
  Sparkles,
  ArrowRight,
} from "lucide-react-native";
import { Controller } from "react-hook-form";
import { router } from "expo-router";
import { Routes } from "routers";

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const { login } = useAuth();
  const form = useLoginForm();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = form;

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      setLoginError(null);
      await login(data.email, data.password);
      router.navigate(Routes.Home);
    } catch (error) {
      console.error("Login error:", error);
      setLoginError(
        error instanceof Error
          ? error.message
          : "Login failed. Please try again."
      );
    }
  };

  const handleDemoCredentials = (email: string, password: string) => {
    setValue("email", email);
    setValue("password", password);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Shield size={32} color="#4F46E5" />
        </View>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to your account</Text>
      </View>

      {loginError && (
        <View style={styles.errorContainer}>
          <AlertCircle size={20} color="#EF4444" />
          <Text style={styles.errorText}>{loginError}</Text>
        </View>
      )}

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <View
                style={[styles.inputWrapper, errors.email && styles.inputError]}
              >
                <Mail size={20} color="#6B7280" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                />
              </View>
            )}
          />
          {errors.email && (
            <View style={styles.errorMessage}>
              <AlertCircle size={16} color="#EF4444" />
              <Text style={styles.errorText}>{errors.email.message}</Text>
            </View>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <View
                style={[
                  styles.inputWrapper,
                  errors.password && styles.inputError,
                ]}
              >
                <Lock size={20} color="#6B7280" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  secureTextEntry={!showPassword}
                  onChangeText={onChange}
                  value={value}
                />
                <TouchableOpacity
                  style={styles.passwordToggle}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={20} color="#6B7280" />
                  ) : (
                    <Eye size={20} color="#6B7280" />
                  )}
                </TouchableOpacity>
              </View>
            )}
          />
          {errors.password && (
            <View style={styles.errorMessage}>
              <AlertCircle size={16} color="#EF4444" />
              <Text style={styles.errorText}>{errors.password.message}</Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.loginButton,
            isSubmitting && styles.loginButtonDisabled,
          ]}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <ActivityIndicator color="#FFFFFF" />
              <Text style={styles.loginButtonText}>Signing in...</Text>
            </>
          ) : (
            <>
              <Shield size={20} color="#FFFFFF" />
              <Text style={styles.loginButtonText}>Sign In</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.demoContainer}>
        <View style={styles.demoHeader}>
          <Sparkles size={20} color="#4F46E5" />
          <Text style={styles.demoTitle}>Demo Credentials</Text>
        </View>
        <View style={styles.demoItems}>
          <TouchableOpacity
            style={styles.demoItem}
            onPress={() =>
              handleDemoCredentials("admin@example.com", "password123")
            }
          >
            <Mail size={20} color="#6B7280" />
            <Text style={styles.demoText}>admin@example.com</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.demoItem}
            onPress={() =>
              handleDemoCredentials("admin@example.com", "password123")
            }
          >
            <Lock size={20} color="#6B7280" />
            <Text style={styles.demoText}>password123</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don&apos;t have an account? </Text>
        <TouchableOpacity onPress={() => router.navigate(Routes.Login)}>
          <Text style={styles.signupLink}>
            Sign up <ArrowRight size={16} color="#4F46E5" />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  header: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 32,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEE2E2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: "#EF4444",
    marginLeft: 8,
    fontSize: 14,
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  inputError: {
    borderColor: "#EF4444",
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
  },
  passwordToggle: {
    padding: 8,
  },
  errorMessage: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  loginButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4F46E5",
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
    gap: 8,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  demoContainer: {
    marginTop: 32,
    padding: 16,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
  },
  demoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  demoItems: {
    gap: 8,
  },
  demoItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    gap: 8,
  },
  demoText: {
    fontSize: 14,
    color: "#6B7280",
  },
  signupContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  signupText: {
    fontSize: 14,
    color: "#6B7280",
  },
  signupLink: {
    fontSize: 14,
    color: "#4F46E5",
    fontWeight: "600",
  },
});
