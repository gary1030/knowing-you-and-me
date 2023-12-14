import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { CONSTANTS, JSHash } from 'react-native-hash';
import { TextInput } from 'react-native-paper';
import useContact from '../../hooks/useContact';
import useDatabase from '../../hooks/useDatabase';
import useQuestion from '../../hooks/useQuestion';
import useSMS from '../../hooks/useSMS';

export default function Manage() {
  const { initDB, clearDB } = useDatabase();
  const { insertContact } = useContact();
  const { insertFakeQuestionRow } = useQuestion();
  const [hasInit, setHasInit] = useState(false);
  const [targetPhoneNumber, setTargetPhoneNumber] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [partnerAnswer, setPartnerAnswer] = useState('');
  const [partnerId, setPartnerId] = useState(0);
  const { sendSMS, callbackFn1 } = useSMS();

  function testSMS() {
    if (answer !== '') {
      const mockMessage = `[0988123345, knowingus{"type":"answer","text":"${answer}"}]`;
      callbackFn1('success', mockMessage, null);
    } else if (question !== '') {
      const mockMessage = `[0988123345, knowingus{"type":"question","text":"${question}","answer_hash":"123456"}]`;
      callbackFn1('success', mockMessage, null);
    }
  }

  useEffect(() => {
    if (!hasInit) {
      initDB();
      setHasInit(true);
    }
  }, [hasInit]);

  const onSendSMS = async () => {
    const answerHash = await JSHash(answer, CONSTANTS.HashAlgorithms.md5);
    const messageJson = {
      type: 'question',
      text: question,
      answer_hash: answerHash,
    };
    const res = await sendSMS(targetPhoneNumber, JSON.stringify(messageJson));
    console.log('res:', res);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Developer Only!</Text>
      <Button
        title="Insert contact"
        onPress={() => insertContact('Alice', '0988123345')}
      />
      <Button
        title="Clear database"
        onPress={() => {
          clearDB();
          setHasInit(false);
        }}
      />
      <TextInput
        label="Target phone number"
        onChangeText={setTargetPhoneNumber}
      />
      <TextInput label="Question" onChangeText={setQuestion} />
      <TextInput label="Your Answer" onChangeText={setAnswer} />
      <Button title="Send SMS" onPress={() => onSendSMS()} />
      <Button title="Test SMS" onPress={() => testSMS()} />
      <TextInput label="Partner Id" onChangeText={setPartnerId} />
      <TextInput label="Partner Answer" onChangeText={setPartnerAnswer} />
      <Button
        title="Add history"
        onPress={() =>
          insertFakeQuestionRow(partnerId, question, answer, partnerAnswer)
        }
      />
    </View>
  );
}

Manage.propTypes = {};
