import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Divider, Text, TextInput } from 'react-native-paper';
import useContact from '../../hooks/useContact';

export default function AddContact({ navigation }) {
  const { insertContact } = useContact();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');

  const isValidNumber = (number) => {
    const regex = /^[0-9]*$/;
    return regex.test(number);
  };

  const handleAddContact = async () => {
    if (isValidNumber(phoneNumber) && name !== '' && phoneNumber !== '') {
      await insertContact(name, phoneNumber);
      setPhoneNumber('');
      setName('');
      navigation.navigate('Home');
    } else {
      console.log('Invalid phone number');
    }
  };

  return (
    <View style={{ flex: 1, margin: 30 }}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 24,
          marginBottom: '10%',
          paddingTop: '3%',
        }}
      >
        新增聯絡人
      </Text>
      <Text variant="titleMedium" style={{ alignSelf: 'center', margin: '5%' }}>
        請輸入聯絡人手機號碼
      </Text>
      <TextInput
        label="聯絡人電話"
        placeholder="ex. 0912345678"
        mode="outlined"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        style={{ margin: '5%' }}
      />
      <Divider bold="True" style={{ margin: '2.5%' }} />
      <Text variant="titleMedium" style={{ alignSelf: 'center', margin: '5%' }}>
        請輸入聯絡人名稱
      </Text>
      <TextInput
        label="聯絡人名稱"
        mode="outlined"
        value={name}
        onChangeText={(text) => setName(text)}
        style={{ margin: '5%' }}
      />
      <Button
        mode="contained"
        style={{ alignSelf: 'center', margin: '5%' }}
        onPress={() => {
          handleAddContact();
        }}
      >
        新增
      </Button>
    </View>
  );
}

AddContact.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
