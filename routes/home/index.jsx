import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import useContact from '../../hooks/useContact';
import useDatabase from '../../hooks/useDatabase';
import useSMS from '../../hooks/useSMS';

export default function Home({ navigation }) {
  const { db, initDB, clearDB } = useDatabase();
  const { insertContact } = useContact();
  const [hasInit, setHasInit] = useState(false);
  const [targetPhoneNumber, setTargetPhoneNumber] = useState(null);
  const [message, setMessage] = useState(null);
  const { sendSMS } = useSMS();

  useEffect(() => {
    if (!hasInit) {
      initDB();
      setHasInit(true);
    }
  }, [hasInit, initDB]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Insert contact"
        onPress={() => insertContact(db, 'Alice', '0988123345')}
      />
      <Button
        title="See contact"
        onPress={() => navigation.navigate('Contact', { db })}
      />
      <Button
        title="See status"
        onPress={() => navigation.navigate('Status')}
      />
      <Button
        title="See room"
        onPress={() => navigation.navigate('Room')}
      />
      <Button
        title="Clear database"
        onPress={() => {
          clearDB();
          setHasInit(false);
        }}
      />
      <TextInput
        label="Target phone number"
        onChangeText={setTargetPhoneNumber}
      />
      <TextInput label="Message" onChangeText={setMessage} />
      <Button
        title="Send SMS"
        onPress={() => sendSMS(targetPhoneNumber, message)}
      />
    </View>
  );
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
