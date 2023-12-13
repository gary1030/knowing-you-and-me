import { NativeEventEmitter, NativeModules, Platform } from 'react-native';
import checkIfHasSMSPermission from './checkIfHasSMSPermission';

const { RNExpoReadSms } = NativeModules;

export default RNExpoReadSms;

export async function startReadSMS(callback) {
  console.log('startReadSMS');
  console.log('RNExpoReadSms', RNExpoReadSms);
  const resultFun = (status, sms, error) => {
    if (callback) {
      callback(status, sms, error);
    }
  };
  if (Platform.OS === 'android') {
    const hasPermission = await checkIfHasSMSPermission();
    if (hasPermission) {
      RNExpoReadSms.startReadSMS(
        () => {
          new NativeEventEmitter(RNExpoReadSms).addListener(
            'received_sms',
            (sms) => {
              resultFun('success', sms);
            }
          );
        },
        (error) => {
          resultFun('error', '', error);
        }
      );
    } else {
      resultFun('error', '', 'Required RECEIVE_SMS and READ_SMS permission');
    }
  } else {
    resultFun('error', '', 'ReadSms Plugin is only for android platform');
  }
}
