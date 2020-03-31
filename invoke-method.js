// invoke-method.js

// how to invoke methods programatically

// Shared Access Policy/iothubowner/primary connection string


// Using the Azure CLI:
// az iot hub show-connection-string --hub-name {YourIoTHubName} --output table
// take primary connection string from IotHubOwner policy [Shared access policy]
var connectionString = 'HostName=krishiot.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=HhGIQKswU1ih5MJl6quLdrS/xjF/EFq+2jy8lVHvKGo=';
 
var Client = require('azure-iothub').Client;

var deviceId = 'energy-1';

// Connect to the service-side endpoint on your IoT hub.
var client = Client.fromConnectionString(connectionString);

// Set the direct method name, payload, and timeout values
var methodResetEnergyTotalParams = {
  methodName: 'ResetEnergyTotal',
  payload: JSON.stringify({})  , 
  responseTimeoutInSeconds: 30 // Number of seconds.
};

var methodResetDeviceParams = {
    methodName: 'ResetDevice',
    payload: JSON.stringify({})  , 
    responseTimeoutInSeconds: 30 // Number of seconds.
  };


var methodChangeUnitParams = {
    methodName: 'ChangeUnit',
    payload: JSON.stringify({ "energyUnit": "KiloWatt" })  , 
    responseTimeoutInSeconds: 30 // Number of seconds.
  };

// Call the direct method on your device using the defined parameters.
client.invokeDeviceMethod(deviceId, methodChangeUnitParams, function callback(err, result) {
  if (err) {
      console.error('Failed to invoke method \'' +  '\': ' + err.message);
  } else {
      console.log('Response is ',  JSON.stringify(result, null, 2));
  }
}); 

