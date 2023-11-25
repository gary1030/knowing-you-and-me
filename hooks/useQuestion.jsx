/* eslint-disable no-underscore-dangle */
const useQuestion = () => {
  const queryQuestionByPartnerId = async (db, partnerId) => {
    if (!db) {
      return null;
    }
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
  };

  const insertQuestion = (db, partnerId, question, state) => {
    if (!db) {
      throw new Error('db is null');
    }
    // state must be "WAITING", "PENDING"
    if (state !== 'WAITING' && state !== 'PENDING') {
      throw new Error('state must be WAITING or PENDING');
    }

    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO question (created_time, text, partner_id, state) VALUES (?, ?, ?, ?)',
        [new Date().getTime(), question, partnerId, state],
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
  };

  const insertMyResponse = (db, questionId, myResponse) => {
    if (!db) {
      throw new Error('db is null');
    }
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE question SET my_response = ?, my_response_created_time = ? WHERE id = ?',
        [myResponse, new Date().getTime(), questionId],
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
  };

  const insertPartnerResponse = (db, questionId, partnerResponse) => {
    if (!db) {
      throw new Error('db is null');
    }
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE question SET partner_response = ?, partner_response_created_time = ? WHERE id = ?',
        [partnerResponse, new Date().getTime(), questionId],
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
  };

  return {
    queryQuestionByPartnerId,
    insertQuestion,
    insertMyResponse,
    insertPartnerResponse,
  };
};

export default useQuestion;
