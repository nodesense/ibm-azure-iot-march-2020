// alert-servicebus.js
// npm install @azure/service-bus

const { ServiceBusClient, ReceiveMode } = require("@azure/service-bus");

// Define connection string and related Service Bus entity names here
// create a policy with manage [send, listen, manage]
// take connection string from service bus shared access policy
const connectionString = "Endpoint=sb://krishiothub.servicebus.windows.net/;SharedAccessKeyName=energyall;SharedAccessKey=/lMVGcpN/J6goGUKfiELkI+ygEAqij5bGeZBOUaHako=;EntityPath=energyanalytics";

//queue name
const queueName = "energyanalytics";

async function main() {
  const sbClient = ServiceBusClient.createFromConnectionString(connectionString);

  // If receiving from a Subscription, use `createSubscriptionClient` instead of `createQueueClient`
  const queueClient = sbClient.createQueueClient(queueName);

  // To receive messages from sessions, use getSessionReceiver instead of getReceiver or look at
  // the sample in sessions.js file
  const receiver = queueClient.createReceiver(ReceiveMode.peekLock);

  try {
    for (let i = 0; i < 10000; i++) {
        // pull message from service bus queue
      const messages = await receiver.receiveMessages(1, 5);
      if (!messages.length) {
        console.log("No more messages to receive");
        continue;
      }
      console.log(`Received message #${i}: `, messages[0].body);
      for (const msg of messages) {
          // send acknowlege to the queue so that the queue can remove the message 
        await msg.complete();
      }
    }
    await queueClient.close();
  } finally {
    await sbClient.close();
  }
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});