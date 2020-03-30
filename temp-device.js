// temp-device.js
// Simulate a temperature device [Edge device, simulated], 

// if temp > 40, move the messsage to event hub, using routes

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

// Timer, to send message periodically
// Create a random message and send it to the IoT hub every 10 seconds
setInterval(function(){
  // Simulate telemetry.
  var temperature = Math.ceil(20 + (Math.random() * 30)); // range from 20 to 50
  var humidity =  Math.ceil(40 + (Math.random() * 50)) // 60 to 90

  // data we post can be in any format, /structured or unstructed
  // in JSON/XML/Binary format

  // convert object to JSON string format
  // 1. MESSAGE [PAYLOAD]

  // {temperature: 38, humidity:59} to be send to IOT Hub
  var message = new Message(JSON.stringify({
    temperature: temperature,
    humidity: humidity
  }));

  // Add a custom application property to the message.
  // An IoT hub can filter on these properties without access to the message body.
  // Attached to rule alert = true
  // key, value pair
  // key and value can be anything

  // additional meta information send along with message, optional
  message.properties.add('alert', (temperature > 40) ? 'true' : 'false');
  
  // What is inside the message
  message.contentType = "application/json";
  message.contentEncoding = "utf-8";

  console.log('Sending message: ' + message.getData());

  // Send the message to the cloud, iot hub using MQTT Protocol
  // telemetric data
  //callback is called after postign message to IOT Hub
  client.sendEvent(message, function callback(err) {
    if (err) {
      console.error('send error: ' + err.toString());
    } else {
      console.log('message sent');
    }
  });
}, 10 * 1000); // 10 seconds


