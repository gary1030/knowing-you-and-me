/* eslint-disable no-underscore-dangle */
import * as SQLite from 'expo-sqlite';
import useDatabase from './useDatabase';

const useQuestion = () => {
  const { dbName } = useDatabase();
  const queryQuestionByPartnerId = async (partnerId) => {
    try {
      const db = await SQLite.openDatabase(dbName);
      const queryResult = await new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT * FROM question WHERE partner_id = ?',
            [partnerId],
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
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const insertQuestion = async (
    partnerId,
    question,
    state,
    partnerResponseHash
  ) => {
    try {
      if (state !== 'WAITING' && state !== 'PENDING') {
        throw new Error('state must be WAITING or PENDING');
      }
      const db = await SQLite.openDatabase(dbName);

      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO question (created_time, text, partner_id, state, partner_response_hash) VALUES (?, ?, ?, ?, ?)',
          [
            new Date().getTime(),
            question,
            partnerId,
            state,
            partnerResponseHash || '',
          ],
          (_, { rows }) => {
            console.log(rows);
            // return question id
            return rows.insertId;
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

  const insertMyResponse = async (questionId, myResponse, state) => {
    try {
      const db = await SQLite.openDatabase(dbName);
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE question SET my_response = ?, my_response_created_time = ?, state = ? WHERE id = ?',
          [myResponse, new Date().getTime(), state, questionId],
          (_, { rows }) => {
            console.log(rows);
            // return question id
            return rows.insertId;
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

  const insertPartnerResponse = async (questionId, partnerResponse, state) => {
    try {
      const db = await SQLite.openDatabase(dbName);
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE question SET partner_response = ?, partner_response_created_time = ?, state = ?  WHERE id = ?',
          [partnerResponse, new Date().getTime(), state, questionId],
          (_, { rows }) => {
            console.log(rows);
            // return question id
            return rows.insertId;
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

  const getInProgressQuestionByPartnerId = async (partnerId) => {
    try {
      const db = await SQLite.openDatabase(dbName);
      const queryResult = await new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT * FROM question WHERE partner_id = ? AND NOT state = ?',
            [partnerId, 'DONE'],
            (_, { rows }) => {
              if (rows._array.length === 0) {
                resolve(null);
              } else {
                resolve(rows._array[0]);
              }
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

  return {
    queryQuestionByPartnerId,
    getInProgressQuestionByPartnerId,
    insertQuestion,
    insertMyResponse,
    insertPartnerResponse,
  };
};

export default useQuestion;
