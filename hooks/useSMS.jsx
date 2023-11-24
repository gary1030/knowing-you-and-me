/* eslint-disable operator-linebreak */
import { useEffect, useState } from 'react';
import { PermissionsAndroid } from 'react-native';

import { startReadSMS } from '@maniac-tech/react-native-expo-read-sms';
import * as SMS from 'expo-sms';
import requestReadSMSPermission from '../functions/requestSMSPermission';

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

  const callbackFn1 = (status, sms, error) => {
    setSmsPermissionState('Success Callback!');

    if (status === 'Start Read SMS successfully') {
      setSuccessCallbackStatus('Start Read SMS successfully');
      setSmsValue(sms);
    } else if (status === 'success') {
      setSuccessCallbackStatus('just success');
      setSmsValue(sms);
    } else {
      setSuccessCallbackStatus('Error in success callback');
      setSMSError(error);
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
    console.log('requestReadSMSPermission:', requestReadSMSPermission);
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
    } else {
      console.log('SMS is not available on this device');
    }
  };

  return {
    appState,
    buttonClickHandler,
    checkPermissions,
    errorCallbackStatus,
    hasReceiveSMSPermission,
    hasReadSMSPermission,
    hasSendSMSPermission,
    requestReadSMSPermission,
    smsPermissionState,
    successCallbackStatus,
    smsValue,
    smsError,
    sendSMS,
  };
};

export default useSMS;
