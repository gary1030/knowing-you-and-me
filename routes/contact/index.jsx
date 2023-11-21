import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import useContact from '../../hooks/useContact';
import useDatabase from '../../hooks/useDatabase';

export default function Contact({ navigation }) {
  const { db, initDB } = useDatabase();
  const { queryContacts } = useContact();
  const [contacts, setContacts] = useState([]);
  const [hasInitDB, setHasInitDB] = useState(false);
  const [hasQueryContacts, setHasQueryContacts] = useState(false);

  useEffect(() => {
    if (!hasInitDB) {
      initDB();
      setHasInitDB(true);
    }
  }, [db, hasInitDB, queryContacts]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const queryResult = await queryContacts(db);
        setContacts(queryResult);
      } catch (error) {
        console.log(error);
      }
    };
    if (hasInitDB && !hasQueryContacts && db) {
      fetchContacts();
      setHasQueryContacts(true);
    }
  }, [db, queryContacts]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Contact List</Text>
      {contacts?.map((contact) => (
        <Text key={contact.id}>{contact.name}</Text>
      ))}
      <Button
        mode="contained"
        title="Go back to home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

Contact.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
