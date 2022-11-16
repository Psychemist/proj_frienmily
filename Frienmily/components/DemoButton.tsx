import React from 'react';
import {
  StyleSheet,
  Text,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';

interface Props {
  onPress: () => void;
}

export function DemoButton({
  onPress,
  children,
}: React.PropsWithChildren<Props>) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{backgroundColor: 'skyblue'}, styles.container]}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}

interface Styles {
  container: ViewStyle;
  text: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    minWidth: '45%',
    maxWidth: '100%',
    marginHorizontal: 8,
    marginVertical: 4,
    borderRadius: 8,
  },
  text: {
    textAlign: 'center',
    color: 'white',
  },
});
