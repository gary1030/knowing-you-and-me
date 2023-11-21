/* eslint-disable no-underscore-dangle */
const useContact = () => {
  const queryContacts = async (db) => {
    if (!db) {
      return null;
    }
    const queryResult = await new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM contact',
          [],
          (_, { rows }) => {
            resolve(rows._array);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
    return queryResult;
  };

  const insertContact = (db, name, phoneNumber) => {
    if (!db) {
      return;
    }
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO contact (name, phone_number) values (?, ?)',
        [name, phoneNumber],
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
