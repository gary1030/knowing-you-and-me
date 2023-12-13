import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as SQLite from 'expo-sqlite';
import { useState } from 'react';

// First table: contact
// | column | type | example |
// | -------- | -------- | -------- |
// | id     | string (PK)    | 1  |
// | name     | string     | Alice  |
// | phone_number    | string (unique) | 0988123345  |

// Second table: question
// | column | type | example |
// | -------- | -------- | -------- |
// | id     | string (PK)    | 1  |
// | created_time     | datetime     | 20231119 12:00:00  |
// | text    | string | "想到電信公司你會想到什麼" |
// | partner_id | contact id (FK) | 1 |
// | my_response | string | "中華電信" |
// | partner_response | string | "台灣大哥大" |
// | partner_response_hash | string | "wgfewgwgewgewgew" |
// | my_response_created_time | string | 20231119 13:00:00 |
// | partner_response_created_time | string | 20231119 14:00:00 |
// | state | string | "WAITING" | // WAITING, RECEIVED, ANSWERED, PENDING, DONE

const useDatabase = () => {
  const dbName = 'knowingme.db';
  const [db, setDB] = useState(null);
  const initDB = async () => {
    try {
      if (
        !(
          await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite`)
        ).exists
      ) {
        await FileSystem.makeDirectoryAsync(
          `${FileSystem.documentDirectory}SQLite`
        );
      }

      const tempDB = SQLite.openDatabase(dbName);
      console.log('Start creating tables', tempDB);
      tempDB.transaction((tx) => {
        tx.executeSql(
          'create table if not exists contact (id integer primary key autoincrement, name text, phone_number text not null unique);'
        );
        tx.executeSql(
          'create table if not exists question (id integer primary key autoincrement, created_time datetime, text text, partner_id integer, my_response text, partner_response text, partner_response_hash text,  my_response_created_time datetime, partner_response_created_time datetime, state text, foreign key (partner_id) references contact(id), UNIQUE (partner_id, text));'
        );
      });
      setDB(tempDB);
      console.log('Init db done');
      return tempDB;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const exportDB = async () => {
    await Sharing.shareAsync(`${FileSystem.documentDirectory}${dbName}`);
  };

  const importDB = async () => {};

  const clearDB = async () => {
    try {
      // delete all tables
      db.transaction((tx) => {
        tx.executeSql('drop table if exists contact;');
        tx.executeSql('drop table if exists question;');
      });
      setDB(null);
      await FileSystem.deleteAsync(`${FileSystem.documentDirectory}${dbName}`);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    dbName,
    db,
    initDB,
    exportDB,
    importDB,
    clearDB,
  };
};

export default useDatabase;
