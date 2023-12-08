import PropTypes from 'prop-types';
import React from 'react';
import { Divider, List } from 'react-native-paper';

export default function Contact({ navigation, name, contactId, phoneNumber }) {
  const icon = () => (
    <List.Icon style={{ marginLeft: 10, marginRight: 15 }} icon="equal" />
  );
  return (
    <>
      <List.Item
        title={name}
        titleStyle={{ fontWeight: 'bold', fontSize: 18 }}
        description={phoneNumber}
        descriptionStyle={{ fontSize: 14 }}
        left={icon}
        onPress={() => {
          navigation.navigate('Room', { contactId });
        }}
      />
      <Divider style={{ borderColor: 'black' }} />
    </>
  );
}

Contact.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  contactId: PropTypes.number.isRequired,
  phoneNumber: PropTypes.string.isRequired,
};
