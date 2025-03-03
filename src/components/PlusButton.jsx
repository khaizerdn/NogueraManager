import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, ScrollView, Pressable, Vibration, SafeAreaView } from 'react-native'; // Added SafeAreaView
import Svg, { Path } from 'react-native-svg';
import globalStyles, { COLORS, SIZES, SPACING } from '../config/GlobalStyles';

const PlusIcon = ({ size = 24, color = COLORS.bgLayer0 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 5v14M5 12h14"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const PlusButton = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [note, setNote] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('');
  const [wallet, setWallet] = useState('');
  const [date, setDate] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (modalVisible) {
      setDate(new Date().toLocaleDateString());
    }
  }, [modalVisible]);

  const handleSubmit = () => {
    console.log({ note, name, amount, type, wallet, date, dueDate });
    setModalVisible(false);
  };

  const handlePlusPress = () => {
    Vibration.vibrate(50);
    setModalVisible(true);
  };

  return (
    <>
      <Pressable
        onPress={handlePlusPress}
        style={({ pressed }) => ({
          width: 55,
          height: 45,
          borderRadius: SIZES.borderRadius,
          backgroundColor: pressed ? COLORS.btnPressed : COLORS.btnActive,
          alignItems: 'center',
          justifyContent: 'center',
        })}
      >
        <PlusIcon size={24} color={COLORS.bgLayer0} />
      </Pressable>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={globalStyles.container}>
          <ScrollView contentContainerStyle={globalStyles.modal.contentWrapper}>
            <View style={globalStyles.modal.innerContainer}>
              <Text style={globalStyles.modal.title}>New Entry</Text>

              <TextInput
                placeholder="Note"
                placeholderTextColor={COLORS.textMuted}
                style={globalStyles.input}
                value={note}
                onChangeText={setNote}
              />
              <TextInput
                placeholder="Name"
                placeholderTextColor={COLORS.textMuted}
                style={globalStyles.input}
                value={name}
                onChangeText={setName}
              />
              <TextInput
                placeholder="Amount"
                placeholderTextColor={COLORS.textMuted}
                style={globalStyles.input}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
              />
              <TextInput
                placeholder="Type"
                placeholderTextColor={COLORS.textMuted}
                style={globalStyles.input}
                value={type}
                onChangeText={setType}
              />
              <TextInput
                placeholder="Wallet"
                placeholderTextColor={COLORS.textMuted}
                style={globalStyles.input}
                value={wallet}
                onChangeText={setWallet}
              />
              <TextInput
                placeholder="Date"
                placeholderTextColor={COLORS.textMuted}
                style={globalStyles.input}
                value={date}
                editable={false}
              />
              <TextInput
                placeholder="Due Date"
                placeholderTextColor={COLORS.textMuted}
                style={globalStyles.input}
                value={dueDate}
                onChangeText={setDueDate}
              />

              <View style={globalStyles.modal.buttons}>
                <Pressable
                  onPress={() => setModalVisible(false)}
                  style={({ pressed }) => [
                    globalStyles.modal.actionButtonMuted,
                    pressed && globalStyles.modal.actionButtonPressedMuted,
                  ]}
                >
                  <Text style={globalStyles.modal.actionButtonText}>Cancel</Text>
                </Pressable>
                <Pressable
                  onPress={handleSubmit}
                  style={({ pressed }) => [
                    globalStyles.modal.actionButton,
                    pressed && globalStyles.modal.actionButtonPressed,
                  ]}
                >
                  <Text style={globalStyles.modal.actionButtonText}>Submit</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default PlusButton;