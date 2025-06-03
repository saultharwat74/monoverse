import React from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

type IconName = keyof typeof Ionicons.glyphMap;

interface SettingItemProps {
  icon: IconName;
  title: string;
  value?: string;
  onPress?: () => void;
  showArrow?: boolean;
  showSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
}

function SettingItem({
  icon,
  title,
  value,
  onPress,
  showArrow = true,
  showSwitch = false,
  switchValue,
  onSwitchChange,
}: SettingItemProps) {
  return (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      disabled={showSwitch}
    >
      <View style={styles.settingLeft}>
        <View style={styles.settingIcon}>
          <Ionicons name={icon} size={24} color="#007AFF" />
        </View>
        <Text style={styles.settingTitle}>{title}</Text>
      </View>
      <View style={styles.settingRight}>
        {showSwitch ? (
          <Switch
            value={switchValue}
            onValueChange={onSwitchChange}
            trackColor={{ false: "#E5E5EA", true: "#34C759" }}
            thumbColor="#FFFFFF"
          />
        ) : (
          <>
            {value && <Text style={styles.settingValue}>{value}</Text>}
            {showArrow && (
              <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
            )}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
} 

export default SettingItem;