import { View, Text } from 'react-native';
import { container, title } from '../config/GlobalStyles';

export default function FinanceScreen() {
  return (
    <View style={container}>
      <Text style={title}>Finance Tracker Screen</Text>
    </View>
  );
}