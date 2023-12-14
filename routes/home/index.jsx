import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import Contact from '../../components/contact';
import useContact from '../../hooks/useContact';
import useDatabase from '../../hooks/useDatabase';

export default function Home({ navigation }) {
  const { db, initDB } = useDatabase();
  const { contacts, queryContacts } = useContact();
  const [hasInit, setHasInit] = useState(false);

  const refreshContacts = async () => {
    await queryContacts();
  };

  useEffect(() => {
    if (!hasInit) {
      initDB();
      setHasInit(true);
    }
  }, [hasInit]);

  useEffect(() => {
    console.log('query contacts');
    queryContacts();
  }, [db]);

  console.log(contacts);

  return (
    <View style={{ flex: 1, margin: 30 }}>
      <View
        flexDirection="row"
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <View flexDirection="row">
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 24,
              marginBottom: '1%',
              paddingTop: '3%',
            }}
          >
            聯絡人
          </Text>
          <IconButton
            icon="refresh"
            size={40}
            onPress={() => refreshContacts()}
          />
        </View>
        <IconButton
          icon="plus-circle-outline"
          size={40}
          onPress={() => navigation.navigate('AddContact')}
        />
      </View>
      <View style={{ alignItems: 'center' }}>
        {contacts.map((contact) => (
          <Contact
            key={contact.id}
            contactId={contact.id}
            name={contact.name}
            phoneNumber={contact.phone_number}
            navigation={navigation}
          />
        ))}
      </View>

      <View style={{ position: 'absolute', bottom: 0 }}>
        <View flexDirection="row">
          <IconButton
            icon="tune-vertical-variant"
            size={20}
            onPress={() => navigation.navigate('Status')}
          />
          <IconButton
            icon="cog-outline"
            size={20}
            onPress={() => navigation.navigate('Manage')}
          />
        </View>
      </View>
    </View>
  );
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
