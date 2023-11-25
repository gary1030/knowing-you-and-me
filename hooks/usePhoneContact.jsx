/* eslint-disable implicit-arrow-linebreak */
import * as Contacts from 'expo-contacts';
import React, { useEffect } from 'react';

function usePhoneContact() {
  const [contacts, setContacts] = React.useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          // filter out contacts that do not have phone numbers
          setContacts(
            data
              .filter(
                (contact) =>
                  contact.phoneNumbers && contact.phoneNumbers.length > 0
              )
              .map((contact) => ({
                name: contact.name,
                phoneNumber: contact.phoneNumbers[0]?.number,
              }))
          );
        }
      }
    })();
  }, []);

  return {
    contacts,
  };
}

export default usePhoneContact;
