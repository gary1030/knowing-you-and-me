import PropTypes from 'prop-types';
import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import RoomCardQuestion from '../../components/roomCardQuestion';
import LeftRightButton from '../../components/leftRightButton';
import RoomCardHistory from '../../components/roomCardHistory';

export default function Room() {
  const [index, setIndex] = React.useState(0);
  return (
    <View
      style={{
        flex: 10,
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 18,
            marginBottom: '1%',
          }}
        >
          A world between you and Alice!
        </Text>
      </View>
      <View
        style={{
          flex: 9,
          alignItems: 'center',
          justifyContent: 'space-around',
          flexDirection: 'row',
        }}
      >
        <LeftRightButton
          icon="chevron-left-circle"
          direction="left"
          index={index}
          setIndex={setIndex}
        />
        {index === 0 ? (
          <ScrollView>
            <RoomCardQuestion name="Alice" />
          </ScrollView>
        ) : (
          <RoomCardHistory total="30" index={index} />
        )}
        <LeftRightButton
          icon="chevron-right-circle"
          direction="right"
          index={index}
          setIndex={setIndex}
        />
      </View>
    </View>
  );
}

Room.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
