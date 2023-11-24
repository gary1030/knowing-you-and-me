import { PermissionsAndroid, Platform } from 'react-native';

const checkIfHasSMSPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version < 23) {
    return true;
  }

  const hasReceiveSmsPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.RECEIVE_SMS
  );
  const hasReadSmsPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.READ_SMS
  );
  const hasSendSmsPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.SEND_SMS
  );

  if (hasReceiveSmsPermission && hasReadSmsPermission && hasSendSmsPermission) {
    return true;
  }

  return {
    hasReceiveSmsPermission,
    hasReadSmsPermission,
    hasSendSmsPermission,
  };
};

export default checkIfHasSMSPermission;
