import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import useContact from '../../hooks/useContact';
import useDatabase from '../../hooks/useDatabase';

export default function Home({ navigation }) {
  const { db, initDB } = useDatabase();
  const { queryContacts, insertContact } = useContact();
  const [hasInit, setHasInit] = useState(false);

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
        onPress={() => insertContact(db, 'Alice', '0988123345', 1)}
      />
      <Button title="Query contacts" onPress={() => queryContacts(db)} />
      <Button
        title="See status"
        onPress={() => navigation.navigate('Status')}
      />
    </View>
  );
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
