import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import LeftRightButton from '../../components/leftRightButton';
import RoomCardHistory from '../../components/roomCardHistory';
import RoomCardQuestion from '../../components/roomCardQuestion';
import useContact from '../../hooks/useContact';
import useQuestion from '../../hooks/useQuestion';
import RoomCardAnswer from '../../components/roomCardAnswer';

export default function Room({ route }) {
  const { contactId } = route.params;
  const { queryContactById } = useContact();
  const { queryQuestionByPartnerId } = useQuestion();
  const [index, setIndex] = useState(0);
  const [contactInfo, setContactInfo] = useState({});
  const [questionInfo, setQuestionInfo] = useState({});
  const [state, setState] = useState('DONE');

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
        const fakeQuestionInfo = [
          {
            created_time: 1702214091394,
            id: 1,
            my_response: '晚上',
            my_response_created_time: 1702214091394,
            partner_id: 1,
            partner_response: '早上',
            partner_response_created_time: 1702214091394,
            partner_response_hash: 'c8c0ba481d742078cfa40544a3eacfb2',
            state: 'DONE',
            text: '你喜歡早上還是晚上？',
          },
          {
            created_time: 1702214091394,
            id: 2,
            my_response: '狗',
            my_response_created_time: 1702214091394,
            partner_id: 1,
            partner_response: '貓',
            partner_response_created_time: 1702214091394,
            partner_response_hash: 'c8c0ba481d742078cfa40544a3eacfb2',
            state: 'DONE',
            text: '你喜歡狗還是貓？',
          },
          {
            created_time: 1702214091394,
            id: 3,
            my_response: '',
            my_response_created_time: null,
            partner_id: 1,
            partner_response: '藍色',
            partner_response_created_time: 1702214091394,
            partner_response_hash: 'c8c0ba481d742078cfa40544a3eacfb2',
            state: 'PENDING',
            text: '你喜歡哪一個顏色？',
          },
        ];
        // setQuestionInfo(fakeQuestionInfo);
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
      'questionInfo.length - 1 + index: ',
      questionInfo.length - 1 + index
    );
    if (questionInfo.length === 0 || questionInfo.length === undefined) {
      return;
    }
    setState(questionInfo[questionInfo.length - 1].state);
  }, [contactInfo, questionInfo]);

  const renderCard = () => {
    if (questionInfo.length === 0) {
      return (
        <ScrollView>
          <RoomCardQuestion
            partnerName={contactInfo.name}
            partnerPhoneNumber={contactInfo.phone_number}
          />
        </ScrollView>
      );
    }
    if (index === 0 && state === 'DONE') {
      return (
        <ScrollView>
          <RoomCardQuestion
            partnerName={contactInfo.name}
            partnerPhoneNumber={contactInfo.phone_number}
          />
        </ScrollView>
      );
    }
    if (index === 0 && state !== 'DONE') {
      return (
        <RoomCardAnswer
          singleQuestionInfo={questionInfo[questionInfo.length - 1]}
          partnerName={contactInfo.name}
          partnerPhoneNumber={contactInfo.phone_number}
        />
      );
    }

    return (
      <RoomCardHistory
        total={questionInfo.length !== undefined ? questionInfo.length : 0}
        index={state === 'DONE' ? index : index - 1}
        singleQuestionInfo={
          state === 'DONE'
            ? questionInfo[questionInfo.length + index]
            : questionInfo[questionInfo.length + index - 1]
        }
        partnerName={contactInfo.name}
      />
    );
  };

  if (contactInfo.name === undefined || questionInfo.length === undefined) {
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
          total={
            state === 'DONE' ? questionInfo.length : questionInfo.length - 1
          }
          index={index}
          setIndex={setIndex}
        />
        {renderCard()}
        <LeftRightButton
          icon="chevron-right-circle"
          direction="right"
          total={
            state === 'DONE' ? questionInfo.length : questionInfo.length - 1
          }
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
