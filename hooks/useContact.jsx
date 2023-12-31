/* eslint-disable no-underscore-dangle */
import * as SQLite from 'expo-sqlite';
import { useState } from 'react';
import useDatabase from './useDatabase';

const useContact = () => {
  const { dbName } = useDatabase();
  const [contacts, setContacts] = useState([]);

  const queryContacts = async () => {
    try {
      const db = await SQLite.openDatabase(dbName);
      const queryResult = await new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT * FROM contact',
            [],
            (_, { rows }) => {
              setContacts(rows._array);
              resolve(rows._array);
            },
            (_, error) => {
              reject(error);
            }
          );
        });
      });
      return queryResult;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const queryContactById = async (id) => {
    try {
      const db = await SQLite.openDatabase(dbName);
      const queryResult = await new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT * FROM contact WHERE id = ?',
            [id],
            (_, { rows }) => {
              if (rows._array.length === 0) {
                resolve(null);
              }
              resolve(rows._array[0]);
            },
            (_, error) => {
              reject(error);
            }
          );
        });
      });
      return queryResult;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const queryByPhoneNumber = async (phoneNumber) => {
    try {
      const db = await SQLite.openDatabase(dbName);
      const queryResult = await new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT * FROM contact WHERE phone_number = ?',
            [phoneNumber],
            (_, { rows }) => {
              if (rows._array.length === 0) {
                resolve(null);
              }
              resolve(rows._array[0]);
            },
            (_, error) => {
              reject(error);
            }
          );
        });
      });
      return queryResult;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const insertContact = async (name, phoneNumber) => {
    try {
      const db = await SQLite.openDatabase(dbName);
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
    } catch (error) {
      console.log(error);
    }
  };

  return {
    contacts,
    queryContacts,
    queryContactById,
    queryByPhoneNumber,
    insertContact,
  };
};

export default useContact;
