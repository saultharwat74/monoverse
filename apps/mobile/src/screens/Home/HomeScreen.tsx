import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useCounter, useAuth } from "@monoverse/state";
import { Ionicons } from "@expo/vector-icons";
import { ThemedSafeAreaView } from "components/ThemedSafeAreaView";

export default function Dashboard() {
  const { count, increment, decrement, reset } = useCounter();
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/(auth)/login");
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.replace("/(auth)/login");
  };

  return (
    <ThemedSafeAreaView
      edges={["top"]}
      style={[styles.container, { backgroundColor: "#fff" }]}
    >
      <View style={styles.container}>
        <View style={styles.welcomeSection}>
          <View style={styles.welcomeLeft}>
            <View style={styles.userAvatar}>
              <Ionicons name="person" size={24} color="#007AFF" />
            </View>
            <View style={styles.welcomeText}>
              <Text style={styles.welcomeTitle}>Welcome back!</Text>
              {user && (
                <Text style={styles.userGreeting}>Hello, {user.name}</Text>
              )}
            </View>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="pulse" size={20} color="#34C759" />
            <View style={styles.statContent}>
              <Text style={styles.statValue}>42</Text>
              <Text style={styles.statLabel}>Actions Today</Text>
            </View>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="trending-up" size={20} color="#FF9500" />
            <View style={styles.statContent}>
              <Text style={styles.statValue}>+12%</Text>
              <Text style={styles.statLabel}>Growth</Text>
            </View>
          </View>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.widget}>
            <View style={styles.widgetHeader}>
              <Text style={styles.widgetTitle}>Interactive Counter</Text>
              <Ionicons name="flash" size={20} color="#007AFF" />
            </View>

            <View style={styles.counterDisplay}>
              <Text style={styles.counterValue}>{count}</Text>
              <Text style={styles.counterLabel}>Current Value</Text>
            </View>

            <View style={styles.counterControls}>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={decrement}
              >
                <Ionicons name="remove" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.counterButton, styles.incrementButton]}
                onPress={increment}
              >
                <Ionicons name="add" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.resetButton} onPress={reset}>
              <Ionicons name="refresh" size={16} color="#007AFF" />
              <Text style={styles.resetButtonText}>Reset to Zero</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.widget}>
            <View style={styles.widgetHeader}>
              <Text style={styles.widgetTitle}>Quick Actions</Text>
            </View>
            <View style={styles.actionGrid}>
              <TouchableOpacity style={styles.actionItem}>
                <Ionicons name="analytics" size={24} color="#007AFF" />
                <Text style={styles.actionText}>Analytics</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionItem}>
                <Ionicons name="trending-up" size={24} color="#34C759" />
                <Text style={styles.actionText}>Reports</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionItem}>
                <Ionicons name="person" size={24} color="#FF9500" />
                <Text style={styles.actionText}>Profile</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.widget}>
            <View style={styles.widgetHeader}>
              <Text style={styles.widgetTitle}>Recent Activity</Text>
            </View>
            <View style={styles.activityList}>
              <View style={styles.activityItem}>
                <View style={[styles.activityDot, styles.incrementDot]} />
                <View style={styles.activityContent}>
                  <Text style={styles.activityText}>
                    Counter incremented to {count > 0 ? count : 1}
                  </Text>
                  <Text style={styles.activityTime}>Just now</Text>
                </View>
              </View>
              <View style={styles.activityItem}>
                <View style={[styles.activityDot, styles.resetDot]} />
                <View style={styles.activityContent}>
                  <Text style={styles.activityText}>Counter was reset</Text>
                  <Text style={styles.activityTime}>2 minutes ago</Text>
                </View>
              </View>
              <View style={styles.activityItem}>
                <View style={[styles.activityDot, styles.userDot]} />
                <View style={styles.activityContent}>
                  <Text style={styles.activityText}>Welcome to dashboard</Text>
                  <Text style={styles.activityTime}>5 minutes ago</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  welcomeSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  welcomeLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  welcomeText: {
    marginLeft: 12,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1D1D1F",
  },
  userGreeting: {
    fontSize: 14,
    color: "#8E8E93",
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statContent: {
    marginLeft: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1D1D1F",
  },
  statLabel: {
    fontSize: 12,
    color: "#8E8E93",
    marginTop: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  widget: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  widgetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  widgetTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1D1D1F",
  },
  counterDisplay: {
    alignItems: "center",
    marginBottom: 24,
  },
  counterValue: {
    fontSize: 48,
    fontWeight: "700",
    color: "#007AFF",
  },
  counterLabel: {
    fontSize: 14,
    color: "#8E8E93",
    marginTop: 4,
  },
  counterControls: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 20,
  },
  counterButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FF3B30",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  incrementButton: {
    backgroundColor: "#34C759",
    shadowColor: "#34C759",
  },
  resetButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F8FF",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#E3F2FD",
  },
  resetButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  actionGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  actionItem: {
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#F9F9F9",
    minWidth: 80,
  },
  actionText: {
    fontSize: 12,
    color: "#1D1D1F",
    marginTop: 8,
    fontWeight: "600",
  },
  activityList: {
    gap: 12,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    marginRight: 12,
  },
  incrementDot: {
    backgroundColor: "#34C759",
  },
  resetDot: {
    backgroundColor: "#FF9500",
  },
  userDot: {
    backgroundColor: "#007AFF",
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: "#1D1D1F",
    lineHeight: 20,
  },
  activityTime: {
    fontSize: 12,
    color: "#8E8E93",
    marginTop: 2,
  },
  logoutButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#FFF5F5",
  },
});
