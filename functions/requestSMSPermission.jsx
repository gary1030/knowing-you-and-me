/* eslint-disable operator-linebreak */
import { PermissionsAndroid, Platform } from 'react-native';
import checkIfHasSMSPermission from './checkIfHasSMSPermission';

async function requestSMSPermission() {
  if (Platform.OS === 'android') {
    const hasPermission = await checkIfHasSMSPermission();
    if (
      hasPermission.hasReadSmsPermission &&
      hasPermission.hasReceiveSmsPermission &&
      hasPermission.hasSendSmsPermission
    ) {
      return true;
    }
    const status = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      PermissionsAndroid.PERMISSIONS.SEND_SMS,
    ]);
    if (status === PermissionsAndroid.RESULTS.GRANTED) return true;
    if (status === PermissionsAndroid.RESULTS.DENIED) {
      console.log('Read Sms permission denied by user.', status);
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      console.log('Read Sms permission revoked by user.', status);
    }
    return false;
  }
  return false;
}

export default requestSMSPermission;
