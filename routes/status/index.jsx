/* eslint-disable react/prop-types */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {
  Button,
  DataTable,
  Divider,
  Provider as PaperProvider,
  Title,
} from 'react-native-paper';

import React from 'react';
import useSMS from '../../hooks/useSMS';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function PermissionStatus({
  READ_SMS_PERMISSION_STATUS,
  RECEIVE_SMS_PERMISSION_STATUS,
  requestReadSMSPermission,
}) {
  console.log(
    'READ_SMS_PERMISSION_STATUS, RECEIVE_SMS_PERMISSION_STATUS:',
    READ_SMS_PERMISSION_STATUS,
    RECEIVE_SMS_PERMISSION_STATUS
  );
  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Permission Status</DataTable.Title>
      </DataTable.Header>

      <DataTable.Row>
        <DataTable.Cell>READ_SMS:</DataTable.Cell>
        <DataTable.Cell>
          {`${READ_SMS_PERMISSION_STATUS}` || 'null'}
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell>RECEIVE_SMS:</DataTable.Cell>
        <DataTable.Cell>
          {`${RECEIVE_SMS_PERMISSION_STATUS}` || 'null'}
        </DataTable.Cell>
      </DataTable.Row>

      {(!READ_SMS_PERMISSION_STATUS || !RECEIVE_SMS_PERMISSION_STATUS) && (
        <Button onPress={requestReadSMSPermission} mode="contained">
          Request Permission
        </Button>
      )}
    </DataTable>
  );
}

export default function Status() {
  const {
    appState,
    buttonClickHandler,
    checkPermissions,
    hasReceiveSMSPermission,
    hasReadSMSPermission,
    requestReadSMSPermission,
    smsPermissionState,
    smsValue,
    smsError,
  } = useSMS();

  return (
    <PaperProvider>
      <View style={styles.container}>
        <StatusBar />
        <Title>ExpoReadSMS - Test Application (Expo)</Title>

        <DataTable>
          <DataTable.Row>
            <DataTable.Cell>App State:</DataTable.Cell>
            <DataTable.Cell>{appState}</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
        <Divider />
        <PermissionStatus
          READ_SMS_PERMISSION_STATUS={hasReadSMSPermission}
          RECEIVE_SMS_PERMISSION_STATUS={hasReceiveSMSPermission}
          requestReadSMSPermission={requestReadSMSPermission}
        />
        <DataTable>
          <DataTable.Row>
            <DataTable.Cell>
              <Text>smsPermissionState:</Text>
            </DataTable.Cell>
            <DataTable.Cell>{`${smsPermissionState}` || 'null'}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <Text>smsValue:</Text>
            </DataTable.Cell>
            <DataTable.Cell>{`${smsValue}` || 'null'}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <Text>smsError:</Text>
            </DataTable.Cell>
            <DataTable.Cell>{`${smsError}` || 'null'}</DataTable.Cell>
          </DataTable.Row>

          <Button onPress={checkPermissions} title="start" mode="contained">
            Recheck permission state
          </Button>
          <Button onPress={buttonClickHandler} title="start" mode="contained">
            Start
          </Button>
        </DataTable>
      </View>
    </PaperProvider>
  );
}
