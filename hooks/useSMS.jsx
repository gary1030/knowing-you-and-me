/* eslint-disable operator-linebreak */
import { useEffect, useState } from 'react';
import { PermissionsAndroid } from 'react-native';

import * as SMS from 'expo-sms';
import { startReadSMS } from 'react-native-expo-read-sms';
import parseSMSMessage from '../functions/parseSMSMessage';
import requestSMSPermission from '../functions/requestSMSPermission';
import useContact from './useContact';
import usePrevious from './usePrevious';
import useQuestion from './useQuestion';

const useSMS = () => {
  const MESSAGE_PREFIX = 'knowingus';
  const [appState, setAppState] = useState(null);
  const [hasReceiveSMSPermission, setHasReceiveSMSPermission] = useState(null);
  const [hasReadSMSPermission, setHasReadSMSPermission] = useState(null);
  const [hasSendSMSPermission, setHasSendSMSPermission] = useState(null);
  const [smsPermissionState, setSmsPermissionState] = useState(null);
  const [successCallbackStatus, setSuccessCallbackStatus] = useState(null);
  const [errorCallbackStatus, setErrorCallbackStatus] = useState(null);
  const [smsValue, setSmsValue] = useState(null);
  const [smsError, setSMSError] = useState(null);
  const [smsMessage, setSMSMessage] = useState(null);
  const [smsPhoneNumber, setSMSPhoneNumber] = useState(null);
  const [smsText, setSMSText] = useState(null);
  const prevSmsPhoneNumber = usePrevious(smsPhoneNumber);
  const prevSmsText = usePrevious(smsText);

  const {
    insertQuestion,
    insertPartnerResponse,
    getInProgressQuestionByPartnerId,
  } = useQuestion();
  const { queryByPhoneNumber, insertContact } = useContact();

  useEffect(() => {
    const processSMS = async (phoneNumber, messageObject) => {
      try {
        console.log('messageObject:', messageObject);
        const { type, text } = messageObject;
        let contact = await queryByPhoneNumber(phoneNumber);
        if (!contact) {
          // save as new contact
          await insertContact('Anonymous', phoneNumber);
          contact = await queryByPhoneNumber(phoneNumber);
        }
        const partnerId = contact.id;
        if (type === 'question') {
          // save as new question, and state is PENDING
          await insertQuestion(
            partnerId,
            text,
            'PENDING',
            messageObject.answer_hash
          );
        } else if (type === 'answer') {
          // save as new answer, and state is DONE
          // find the question id first, by partner id and state is not DONE
          const question = await getInProgressQuestionByPartnerId(partnerId);
          if (!question) {
            console.log(
              'Cannot find in progress question for partner id:',
              partnerId
            );
            return;
          }

          switch (question.state) {
            case 'WAITING':
              await insertPartnerResponse(question.id, text, 'RECEIVED');
              break;
            case 'ANSWERED':
              await insertPartnerResponse(question.id, text, 'DONE');
              break;
            default:
              setSMSError(`Unknown question state:${String(question.state)}`);
          }
        } else {
          setSMSError('Unknown message type');
        }
      } catch (error) {
        console.log('Process SMS error: ', error);
        setSMSError(error);
      }
    };

    if (smsPhoneNumber && smsText) {
      if (prevSmsPhoneNumber !== smsPhoneNumber || prevSmsText !== smsText) {
        processSMS(smsPhoneNumber, smsMessage);
      }
    }
  }, [smsPhoneNumber, smsText]);

  const callbackFn1 = async (status, sms, error) => {
    setSmsPermissionState('Success Callback!');

    if (status === 'success') {
      setSuccessCallbackStatus('just success');
      setSmsValue(sms);
      // transform smsString to array
      try {
        const { phoneNumber, message } = parseSMSMessage(sms, MESSAGE_PREFIX);
        if (phoneNumber && message) {
          setSMSPhoneNumber(phoneNumber);
          setSMSMessage(message);
          setSMSText(message.text);
        }
      } catch (e) {
        console.log('Parse SMS error:', error);
        setSMSError(e);
      }
    } else {
      setSuccessCallbackStatus('Error in success callback');
      setSMSError(error);
      console.log('Read SMS error:', error);
    }
  };

  const callbackFn2 = () => {
    setSmsPermissionState('Error Callback!');
    setErrorCallbackStatus('Start Read SMS failed');
  };

  const buttonClickHandler = () => {
    startReadSMS(callbackFn1, callbackFn2);
  };

  const checkPermissions = async () => {
    const customHasReceiveSMSPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS
    );
    const customHasReadSMSPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_SMS
    );
    const customHasSendSMSPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.SEND_SMS
    );

    setHasReceiveSMSPermission(customHasReceiveSMSPermission);
    setHasReadSMSPermission(customHasReadSMSPermission);
    setHasSendSMSPermission(customHasSendSMSPermission);
    setAppState('Permission check complete');
  };

  useEffect(() => {
    console.log('requestSMSPermission:', requestSMSPermission);
    setAppState('init');
    checkPermissions();
  }, []);

  const sendSMS = async (phoneNumber, message) => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const { result } = await SMS.sendSMSAsync(
        [phoneNumber],
        `${MESSAGE_PREFIX}${message}`
      );
      console.log('result:', result);
      return result;
    }
    console.log('SMS is not available on this device');
    return false;
  };

  return {
    appState,
    buttonClickHandler,
    checkPermissions,
    errorCallbackStatus,
    hasReceiveSMSPermission,
    hasReadSMSPermission,
    hasSendSMSPermission,
    requestSMSPermission,
    smsPermissionState,
    successCallbackStatus,
    smsValue,
    smsError,
    sendSMS,
    smsMessage,
  };
};

export default useSMS;
