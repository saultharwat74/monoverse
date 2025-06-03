import {
  NativeSafeAreaViewProps,
  SafeAreaView,
} from "react-native-safe-area-context";
export type ThemedSafeAreaViewProps = NativeSafeAreaViewProps & {
  backgroundColor?: string;
};

export function ThemedSafeAreaView({
  backgroundColor,
  style,
  ...props
}: ThemedSafeAreaViewProps) {
  return (
    <SafeAreaView
      style={style ? style : { flex: 0, backgroundColor }}
      {...props}
    />
  );
}
