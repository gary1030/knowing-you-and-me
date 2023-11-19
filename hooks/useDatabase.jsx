import * as SQLite from 'expo-sqlite';
import { useState } from 'react';

// First table: person
// | column | type | example |
// | -------- | -------- | -------- |
// | id     | string (PK)    | 1  |
// | name     | string     | Alice  |
// | phone_number    | string (unique) | 0988123345  |
// | is_self | bool (default false) | true|

// Second table: question
// | column | type | example |
// | -------- | -------- | -------- |
// | id     | string (PK)    | 1  |
// | created_time     | datetime     | 20231119 12:00:00  |
// | text    | string | "想到電信公司你會想到什麼" |
// | questioner_id | person id (FK) | 1 |
// | questionee_id | person id (FK) | 2 |
// | questioner_response | string | "中華電信" |
// | questionee_response | string | "台灣大哥大" |
// | questioner_response_created_time | string | 20231119 13:00:00 |
// | questionee_response_created_time | string | 20231119 14:00:00 |

const useDatabase = () => {
  const [db, setDB] = useState(null);
  const initDB = () => {
    const tempDB = SQLite.openDatabase('knowing.db');
    tempDB.transaction((tx) => {
      tx.executeSql(
        'create table if not exists person (id integer primary key not null, name text, phone_number text, is_self integer);'
      );
      tx.executeSql(
        'create table if not exists question (id integer primary key not null, created_time text, text text, questioner_id integer, questionee_id integer, questioner_response text, questionee_response text, questioner_response_created_time text, questionee_response_created_time text, foreign key(questioner_id) references person(id), foreign key(questionee_id) references person(id));'
      );
    });
    setDB(tempDB);
    return tempDB;
  };

  return { db, initDB };
};

export default useDatabase;
