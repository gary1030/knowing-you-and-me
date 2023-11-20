const useContact = () => {
  const queryContacts = (db) => {
    if (!db) {
      return;
    }
    db.transaction((tx) => {
      tx.executeSql('select * from contact', null, (_, { rows }) => {
        console.log(rows);
      });
    });
  };

  const insertContact = (db, name, phoneNumber, isSelf) => {
    if (!db) {
      return;
    }
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO contact (name, phone_number, is_self) values (?, ?, ?)',
        [name, phoneNumber, isSelf],
        (_, { rows }) => {
          console.log(rows);
        },
        (_, error) => {
          console.log(error);
        }
      );
    });
  };

  return {
    queryContacts,
    insertContact,
  };
};

export default useContact;
