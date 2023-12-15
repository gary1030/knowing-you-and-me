import PropTypes from 'prop-types';
import * as React from 'react';
import { useState } from 'react';
import { Button, Card, Divider, Text, TextInput } from 'react-native-paper';
import useQuestion from '../hooks/useQuestion';
import useSMS from '../hooks/useSMS';

export default function RoomCardAnswer({
  singleQuestionInfo,
  partnerName,
  partnerPhoneNumber,
}) {
  const { state } = singleQuestionInfo;
  const { sendSMS } = useSMS();
  const [answer, setAnswer] = useState('');
  const { updateState, insertMyResponse } = useQuestion();

  const onSendSMS = async () => {
    const messageJson = {
      type: 'answer',
      text: singleQuestionInfo.my_response
        ? singleQuestionInfo.my_response
        : answer,
    };
    console.log('prepared to send message: ', JSON.stringify(messageJson));
    // add to db
    switch (state) {
      case 'PENDING':
        // update state to ANSWERED
        await insertMyResponse(singleQuestionInfo.id, answer, 'ANSWERED');
        break;
      case 'RECEIVED':
        // update state to DONE
        await updateState(singleQuestionInfo.id, 'DONE');
        break;
      default:
        console.log('Unknown state:', state);
    }

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
          variant="labelSmall"
          style={{ alignSelf: 'center', marginTop: '5%', marginBottom: '5%' }}
        >
          #Question
        </Text>
        <Text
          variant="titleMedium"
          style={{ alignSelf: 'center', marginTop: '5%', marginBottom: '5%' }}
        >
          {singleQuestionInfo.text}
        </Text>
        <Divider bold="True" />
        <Divider bold="True" />

        <Text
          variant="labelLarge"
          style={{ alignSelf: 'center', marginTop: '20%', marginBottom: '5%' }}
        >
          你的回答
        </Text>
        {state === 'PENDING' ? (
          <TextInput
            label="你的回答"
            mode="outlined"
            value={answer}
            onChangeText={(text) => setAnswer(text)}
            style={{ marginLeft: '5%', marginRight: '5%' }}
          />
        ) : (
          <Text
            variant="bodyMedium"
            style={{ alignSelf: 'center', marginBottom: '5%' }}
          >
            {singleQuestionInfo.my_response}
          </Text>
        )}
        <Text
          variant="labelLarge"
          style={{ alignSelf: 'center', marginTop: '15%', marginBottom: '5%' }}
        >
          {`${partnerName}的回答`}
        </Text>
        {state === 'WAITING' ? (
          <Text
            variant="bodyMedium"
            style={{ alignSelf: 'center', marginBottom: '5%' }}
          >
            對方尚未回答
          </Text>
        ) : (
          <Text
            variant="bodyMedium"
            style={{
              alignSelf: 'center',
              marginBottom: '5%',
            }}
          >
            *******
          </Text>
        )}
        {(state === 'PENDING' || state === 'RECEIVED') && (
          <Button
            mode="contained"
            style={{ alignSelf: 'center', margin: '5%', marginTop: '10%' }}
            onPress={onSendSMS}
          >
            告訴對方你的答案
          </Button>
        )}
        {state === 'ANSWERED' && (
          <Button
            mode="contained"
            style={{ alignSelf: 'center', margin: '5%', marginTop: '15%' }}
            disabled
          >
            等待對方送出回覆...
          </Button>
        )}
      </Card.Content>
    </Card>
  );
}

RoomCardAnswer.propTypes = {
  singleQuestionInfo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    created_time: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    partner_id: PropTypes.number.isRequired,
    my_response: PropTypes.string.isRequired,
    partner_response: PropTypes.string.isRequired,
    partner_response_hash: PropTypes.string,
    my_response_created_time: PropTypes.number,
    partner_response_created_time: PropTypes.number,
    state: PropTypes.string.isRequired,
  }).isRequired,
  partnerName: PropTypes.string.isRequired,
  partnerPhoneNumber: PropTypes.string.isRequired,
};
