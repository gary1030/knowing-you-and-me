import * as React from 'react';
import PropTypes from 'prop-types';
import { Card, Divider, Text } from 'react-native-paper';

export default function RoomCardHistory({ total, index }) {
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
          {`#Q - ${Number(total) + Number(index)}`}
        </Text>
        <Text
          variant="titleMedium"
          style={{ alignSelf: 'center', marginTop: '5%', marginBottom: '5%' }}
        >
          你喜歡吃哈密瓜還是西瓜？
        </Text>
        <Divider bold="True" />
        <Divider bold="True" />

        <Text
          variant="labelLarge"
          style={{ alignSelf: 'center', marginTop: '15%', marginBottom: '5%' }}
        >
          Alice 的回答
        </Text>
        <Text
          variant="bodyMedium"
          style={{ alignSelf: 'center', marginBottom: '5%' }}
        >
          西瓜
        </Text>
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
          哈密瓜
        </Text>
      </Card.Content>
    </Card>
  );
}

RoomCardHistory.propTypes = {
  total: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};
