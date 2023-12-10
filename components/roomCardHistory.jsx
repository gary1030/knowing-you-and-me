import * as React from 'react';
import PropTypes from 'prop-types';
import { Card, Divider, Text } from 'react-native-paper';

export default function RoomCardHistory({
  total,
  index,
  singleQuestionInfo,
  partnerName,
}) {
  return (
    <Card
      style={{
        height: '75%',
        width: '71%',
        margin: 4,
      }}
    >
      <Card.Content>
        <Text
          variant="labelSmall"
          style={{ alignSelf: 'center', marginTop: '5%', marginBottom: '5%' }}
        >
          {`#Q - ${Number(total) + 1 + Number(index)}`}
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
        <Text
          variant="bodyMedium"
          style={{ alignSelf: 'center', marginBottom: '5%' }}
        >
          {singleQuestionInfo.my_response}
        </Text>
        <Text
          variant="labelLarge"
          style={{ alignSelf: 'center', marginTop: '15%', marginBottom: '5%' }}
        >
          {`${partnerName} 的回答`}
        </Text>
        <Text
          variant="bodyMedium"
          style={{ alignSelf: 'center', marginBottom: '5%' }}
        >
          {singleQuestionInfo.partner_response}
        </Text>
      </Card.Content>
    </Card>
  );
}

RoomCardHistory.propTypes = {
  total: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
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
};
