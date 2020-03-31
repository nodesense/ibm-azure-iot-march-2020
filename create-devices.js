//  create-devices.js
// create the devices on iot hub using SDK

var iothub = require('azure-iothub');
var uuid = require('uuid');

// take this from sas shared polices, iot hub owner/primary connection string
var connectionString = 'HostName=krishiot.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=GXk5btikuUUoBdk9+2Fzc3DcpYwB4Y9L3PWlrGNxhuo=';

var registry = iothub.Registry.fromConnectionString(connectionString);

// Specify the new devices.
var deviceAddArray = [
  {
    deviceId: 'device-10',
    status: 'enabled',
    authentication: {
      symmetricKey: {
        primaryKey: new Buffer(uuid.v4()).toString('base64'),
        secondaryKey: new Buffer(uuid.v4()).toString('base64')
      }
    }
  },
  {
    deviceId: 'device-11',
    status: 'disabled',
    authentication: {
      symmetricKey: {
        primaryKey: new Buffer(uuid.v4()).toString('base64'),
        secondaryKey: new Buffer(uuid.v4()).toString('base64')
      }
    }
  }
];
  
console.log('Adding devices: ' + JSON.stringify(deviceAddArray));

registry.addDevices(deviceAddArray, printAndContinue( 'adding', function () {
  console.log('devices added');
}));



function printAndContinue(op, next) {
  return function printResult(err, resultData) {
    if (err) console.log(op + ' error: ' + err.toString());
    if (resultData) {
      var arrayString = resultData.errors.length === 0 ? 'no errors' : JSON.stringify(resultData.errors);
      console.log(op + ' isSuccessful: ' + resultData.isSuccessful + ', errors returned: ' + arrayString);
    }
    if (next) next();
  };
}