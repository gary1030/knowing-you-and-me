import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import useContact from '../../hooks/useContact';
import useQuestion from '../../hooks/useQuestion';
import RoomCardQuestion from '../../components/roomCardQuestion';
import LeftRightButton from '../../components/leftRightButton';
import RoomCardHistory from '../../components/roomCardHistory';

export default function Room({ route }) {
  const { contactId } = route.params;
  const { queryContactById } = useContact();
  const { queryQuestionByPartnerId } = useQuestion();
  const [index, setIndex] = useState(0);
  const [contactInfo, setContactInfo] = useState({});
  const [questionInfo, setQuestionInfo] = useState({});

  useEffect(() => {
    const fetchSingleContact = async () => {
      try {
        setContactInfo(await queryContactById(contactId));
      } catch (error) {
        console.log('error', error);
      }
    };
    if (contactId !== undefined) {
      fetchSingleContact();
    }
  }, [contactId]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setQuestionInfo(await queryQuestionByPartnerId(contactId));
      } catch (error) {
        console.log('error', error);
      }
    };
    if (contactId !== undefined) {
      fetchQuestions();
    }
  }, [contactId]);

  useEffect(() => {
    console.log('contact', contactInfo);
    console.log('question', questionInfo);
    console.log('index', index);
    console.log('questionInfo.length: ', questionInfo.length);
    console.log(
      'questionInfo.length + 1 + index: ',
      questionInfo.length + 1 + index
    );
  }, [contactInfo, questionInfo]);

  if (contactInfo.name === undefined && questionInfo.length === undefined) {
    console.log('loading');
    return <View />;
  }

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
          {`A world between you and ${contactInfo.name}!`}
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
          total={questionInfo.length !== undefined ? questionInfo.length : 0}
          index={index}
          setIndex={setIndex}
        />
        {index === 0 ? (
          <ScrollView>
            <RoomCardQuestion name={contactInfo.name} />
          </ScrollView>
        ) : (
          <RoomCardHistory
            total={questionInfo.length !== undefined ? questionInfo.length : 0}
            index={index}
            singleQuestionInfo={questionInfo[questionInfo.length + index]}
            partnerName={contactInfo.name}
          />
        )}
        <LeftRightButton
          icon="chevron-right-circle"
          direction="right"
          total={questionInfo.length !== undefined ? questionInfo.length : 0}
          index={index}
          setIndex={setIndex}
        />
      </View>
    </View>
  );
}

Room.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      contactId: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
