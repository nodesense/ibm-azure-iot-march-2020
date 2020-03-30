// subscribe-messages.js
// susbcribe any messages posted by any device here.

// messgares are read from Event hub

 // Using the Azure CLI:
// az iot hub show-connection-string --hub-name {YourIoTHubName} --output table


// Shared Access Policies/iothubownwer/primary connection string
var connectionString = 'HostName=krishiot.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=HhGIQKswU1ih5MJl6quLdrS/xjF/EFq+2jy8lVHvKGo=';

// npm install @azure/event-hubs
var {  EventHubClient, EventPosition } = require('@azure/event-hubs');

var printError = function (err) {
  console.log("error", err.message);
};

// Display the message content - telemetry and properties.
// - Telemetry is sent in the message body
// - The device can add arbitrary application properties to the message
// - IoT Hub adds system properties, such as Device Id, to the message.
var printMessage = function (message) {
  // console.log('Partition ', message.partitionId);
  console.log('Telemetry received: ');
  console.log(JSON.stringify(message.body)); // send by the device {temperature, humidity..}
  console.log('Application properties (set by device): ')
  console.log(JSON.stringify(message.applicationProperties)); // alert: true/false value
  //console.log('System properties (set by IoT Hub): ')
  // console.log(JSON.stringify(message.annotations)); 
  console.log('');
};

// Connect to the partitions on the IoT Hub's Event Hubs-compatible endpoint.
// This example only reads messages sent after this application started.
var ehClient;
// connect to Event Hub first
// susbcribe for messages from all the partitions
// 4 default paritions, each paritions has an id, "0", "1", "2", "3"
EventHubClient.createFromIotHubConnectionString(connectionString)
                .then(function (client) {
                    console.log("Successully created the EventHub Client from iothub connection string.");
                    ehClient = client;
                    return ehClient.getPartitionIds();
                }).then(function (ids) {
                    console.log("The partition ids are: ", ids);
                        // ids are array, at this moment, ['0', '1','2', '3']
                        return ids.map(function (partitionId) {
                            //susbcribe message from paritions 0, 1, 2, 3
                            return ehClient.receive(partitionId, 
                                                    printMessage, 
                                                    printError, 
                                                    // read the data posted from now onwards
                                                    { eventPosition: EventPosition.fromEnqueuedTime(Date.now()) }
                                                    );
                        });
                }).catch(printError);
