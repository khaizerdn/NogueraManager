import { View, Text } from 'react-native';
import { container, title } from '../config/GlobalStyles';

export default function TodoScreen() {
  return (
    <View style={container}>
      <Text style={title}>To-Do List Screen</Text>
    </View>
  );
}