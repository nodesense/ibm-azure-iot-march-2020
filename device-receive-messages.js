// device-receive-messages.js
// receive message from IOT Hub, print the data


// Using the Azure CLI:
// az iot hub device-identity show-connection-string --hub-name {YourIoTHubName} --device-id MyNodeDevice --output table

// go to specific DEVICE, copy the primary connection string
//TODO: Paste your device-1 primary connection string
var connectionString = 'HostName=krishiot.azure-devices.net;DeviceId=device-1;SharedAccessKey=s95b+gWiEVPlD+JuuCuBL2uIbCG1jyq87cx0BZBSToQ=';

// npm install azure-iot-device-mqtt
var Mqtt = require('azure-iot-device-mqtt').Mqtt; // Protocol
var DeviceClient = require('azure-iot-device').Client
var Message = require('azure-iot-device').Message;

// Client connection object, using MQTT protocol
// use MQTT to send device data from device to IOT HUB
var client = DeviceClient.fromConnectionString(connectionString, Mqtt);

// FIXME: Sending message offline, not received by device

 // to receive messages posted/pushed from the Iot Hub to the Device
 // MQTT, subscription
 // whenever new message pushed to device from IOT hub, callback function is called automatically
 client.on('message', function callback(msg) {
    console.log('msg ', msg)
    console.log('Got message from cloud:  Id: ' + msg.messageId + ' Body: ' + msg.data);
    console.log('proeprties', msg.properties.propertyList);

    // acknowledgement back to the cloud that message is processed
    // don't send the message again
    client.complete(msg, function(error) {
        // confirmation from IOT Hub confirming ack received
        // error is null means, no error
        console.log('ack result ' + error)
    });
  });

 
