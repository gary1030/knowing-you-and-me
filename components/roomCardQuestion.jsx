import * as React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Text, TextInput, Divider } from 'react-native-paper';
import { CONSTANTS, JSHash } from 'react-native-hash';
import useSMS from '../hooks/useSMS';

export default function RoomCardQuestion({ partnerName, partnerPhoneNumber }) {
  const { sendSMS } = useSMS();
  const exampleQuestions = ['Question 1', 'Question 2', 'Question 3'];
  const [question, setQuestion] = React.useState('');
  const [answer, setAnswer] = React.useState('');

  const generateRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * exampleQuestions.length);
    setQuestion(exampleQuestions[randomIndex]);
  };

  const onSendSMS = async () => {
    const answerHash = await JSHash(answer, CONSTANTS.HashAlgorithms.md5);
    const messageJson = {
      type: 'question',
      text: question,
      answer_hash: answerHash,
    };
    console.log('prepared to send message: ', JSON.stringify(messageJson));
    // add to db
    const res = await sendSMS(partnerPhoneNumber, JSON.stringify(messageJson));
    console.log('res:', res);
  };

  return (
    <Card
      style={{
        margin: 4,
      }}
    >
      <Card.Content>
        <Text
          variant="titleMedium"
          style={{ alignSelf: 'center', marginTop: '5%', marginBottom: '5%' }}
        >
          有什麼想問
          {partnerName}
          的嗎？
        </Text>
        <TextInput
          label="任何問題"
          mode="outlined"
          value={question}
          onChangeText={(text) => setQuestion(text)}
          style={{ margin: '5%' }}
        />
        <Text variant="bodyMedium" style={{ alignSelf: 'center' }}>
          OR
        </Text>
        <Button
          mode="contained-tonal"
          style={{ alignSelf: 'center', margin: '5%' }}
          onPress={generateRandomQuestion}
        >
          隨機出題
        </Button>
        <Divider bold="True" style={{ margin: '2.5%' }} />
        <Text
          variant="titleMedium"
          style={{ alignSelf: 'center', margin: '5%' }}
        >
          請輸入你的回答
        </Text>
        <TextInput
          label="你的回答"
          mode="outlined"
          value={answer}
          onChangeText={(text) => setAnswer(text)}
          style={{ margin: '5%' }}
        />
        <Button
          mode="contained"
          style={{ alignSelf: 'center', margin: '5%' }}
          onPress={onSendSMS}
        >
          確認送出
        </Button>
      </Card.Content>
    </Card>
  );
}

RoomCardQuestion.propTypes = {
  partnerName: PropTypes.string.isRequired,
  partnerPhoneNumber: PropTypes.string.isRequired,
};
