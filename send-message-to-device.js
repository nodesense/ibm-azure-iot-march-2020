// message-to-device.js

//sending a message from backend code such as web service/mobile app etc

// Using the Azure CLI:
// az iot hub show-connection-string --hub-name {YourIoTHubName} --output table
// shared access policies/iothubowner/primary connection string
var connectionString = 'HostName=krishiot.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=GXk5btikuUUoBdk9+2Fzc3DcpYwB4Y9L3PWlrGNxhuo=';

// npm install azure-iothub

var Client = require('azure-iothub').Client;

var deviceId = 'esp-temp-device-2';

// Connect to the service-side endpoint on your IoT hub.
var client = Client.fromConnectionString(connectionString);
 

client.send(deviceId, "Message2 coming from App", function callback() {
    console.log('message sent ');
})