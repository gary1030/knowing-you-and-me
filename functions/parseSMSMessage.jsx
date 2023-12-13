function parseSMSMessage(smsString, messagePrefix) {
  const matchResult = smsString.match(/\[(\d+),\s*(.*)\]/);

  if (matchResult && matchResult.length === 3) {
    try {
      const phoneNumber = matchResult[1];
      const message = matchResult[2];

      if (!message.startsWith(messagePrefix)) {
        console.log('Message does not start with prefix');
        return null;
      }

      const messageWithoutPrefix = message.substring(messagePrefix.length);
      // eval to json object
      const messageObject = JSON.parse(messageWithoutPrefix);
      console.log('messageObject:', messageObject);
      return {
        phoneNumber,
        message: messageObject,
      };
    } catch (error) {
      console.log('Error parsing SMS message: ', error);
    }
  }
  return null;
}

export default parseSMSMessage;
