# Install
 
1. Node.js 64bit MSI 12.x LTS
   
 https://nodejs.org/en/download/
 
2. Python 3.x 64bit https://www.python.org/ftp/python/3.7.7/python-3.7.7-amd64.exe


3. Azure Cli for Windows
   
    https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-windows?view=azure-cli-latest 


4. Microsoft Visual Studio Code - IDE 
 
    https://code.visualstudio.com/download


5. Azure Cli for IOT - Installed Later

    Done using cli / command prompt, after installaing Azure cli

    Open Command prompt and type below

    `az extension add --name azure-iot`


6. Azure Pass


# Languages supported

Node.js
Python
Java
.NET


# Node.js

    node - javascript runtime - execute javascript
    npm - package manager, install the libraries, tools for node.js
 


# create a node.js

open a command prompt

```
mkdir azure-iot

cd azure-iot

npm init -y 
```

so far, a file called package.json created

now install libraries for Azure IOT Hub

```
npm install azure-iot-device-mqtt

npm install azure-iot-device

```
```
1. create a file called temp-device.js, paste the content, include device primary connection string

2. Open terminal in Visual Studio Code

3. Type command  

        node temp-device.js
```

If you are running in powershell,

    ps> cmd
    c:\.......\azure-iot> node temp-device.js


# to Read message from EventHub, where all messages are stored

```
npm install @azure/event-hubs@2
```


1. create file called subscribe-messages.js 

2. paste the file content from github

3. run using 
    
    node subscribe-messages.js
   


# Receive message from IOT Hub

1. node device-receive-messages.js

2. Go to the device panel in IoT Hub, use "Message to Device" to send a message from IOT Hub UI



# Direct Methods

    Remote Method Invocation
        calls a function in the device
            [0, 10, 20, 25, 29, 35, .....]

        reset a meter to zero
            [0, 4, 6, 7, ....]

        Calibration

        Calls a function in the device
            input: function argument is passed from IOT CLoud
            output: the result returned by the device function is send to IOT Cloud


# Call remote method programatically like API service/mobile app

```
npm install azure-iothub

node invoke-method.js
```


# Azure Cli

az iot hub device-identity show-connection-string --hub-name krishiot --device-id energy-1 --output table

# ESP32

1. ESP 32 https://www.amazon.in/SquadPixel-ESP-32-Bluetooth-Development-Board/dp/B071XP56LM/ref=sr_1_1?dchild=1&keywords=esp32&qid=1585633195&sr=8-1

2. DHT 11 Sensor -  https://www.amazon.in/xcluma-Digital-Relative-Humidity-Temperature/dp/B072FJBF9T/ref=sr_1_1?crid=X6MVSFQD5AS0&dchild=1&keywords=dht11+sensor&qid=1585633219&sprefix=DHT11%2Caps%2C278&sr=8-1

3. Arduino https://www.arduino.cc/en/Main/Software

4. https://www.amazon.in/ApTechdeals-Jumper-Wires-Female-Breadboard/dp/B074J8M43C/ref=sr_1_2?crid=2BIIB4HUYSUHR&dchild=1&keywords=jumper+wire+female+to+female&qid=1585633349&sprefix=jumper+wire+%2Caps%2C276&sr=8-2

5. Relay https://www.amazon.in/s?k=arduino+relay+module&crid=3MPNRODXIKLW&sprefix=arduino+relay%2Caps%2C279&ref=nb_sb_ss_i_1_13

# Send message to device

1. run node device-receive-messages.js in one command prompt
2. run node send-message-to-device.js 



1. Device to IOT Hub
2. IOT Hub to Event Hub 
3. Event Hub is log storge, we cannot query/delete/data is deleted after retention period by default 1 day or upto 7 days


1. Device, report data once a day [Gas Level]
2. 100000+ devices deployed
3. As a customer/service service engineer, want ot know gas level
   1. Go to event hub and read data, we cannot fetch single device data, get all device data

4. What is last known gas level, instead waiting for whole day


# Device TWIN

    0. To know last known device state
    1. IOT Hub feature
    2. Per Device
    3. JSON Property Bag
       1. desired properties [Service/App side, requestign device to do something]
             1. From IOT Cloud side/mobile app/app side, instruct the deivce to do something/report addtional properties such as dianostic properties which is not send by default
       
            2. Upgrade firmware to latest
               1. the device is running on firmware verion 1.0
               2. OEM released firmware v 1.1
               3. how to inform this to device?
       2. reported properties [device, update last known state]
          1. The device last known state, reported by device itself to IOT Hub
          2. Update latest Gas Level


1. run node device-twin.js 

    go to iot hub --> devices --> pick a device-1 --> check device-twin tab



# File/Blob Upload

 Message Meter - 4 KB per msg is expensive


Create Storage Account [Pay separately along with IOT Hub] + Create Container +
    Attach the container to the IOT Hub

File are uploaded using HTTP protocol, DOES NOT CONSUME MESSAGE METER
 Log File - 10 MB every month
 Sensor Raw Data - massigve data



 Device Send the File to IOT Hub --> Iot Hub --> Blog Storage Container

 node upload-device-files.js


# Device Management APIS

    Create the devices/delete the device programatically

    node create-devices.js

    node delete-devices.js

---
# QUERIES

SELECT * FROM devices
  WHERE  properties.reported.metrics.gas_level < 75

node querying-devices.js 

# Message Routing

    Single IOT Hub
        differnt types of devices 
                water-flow meter
                energy meter
                temp meter
                home-appliances
                solar-energy
                ...

                all of them posting data to single iot hub

                how to seperate the device data?

        alert if true, 
            store them in to blob storage as backup
            pass to other azure services so that we can handle the noticiations


        if route matched,
            default fallback route - always exist.
                push messsage to Built in Event Hub


IOT Domain

    Upstream - Field Devices
    Downstream - data processing, storage, analytics

Industry - Oil

    Upstream - Pull crude oil from earth
    Downstream - Refineries, process crude oil, produce petrol, gas etc...



Service Bus
    Service Bus Queue
                    FIFO - Ordered Delivery, guarenteed to deliver message only one

                    publisher --> one susbcriber
                    msg1              msg1

                    push - add to queue
                    peek - pull from queue

    Service Bus Topics
                    AMQP
                        publisher --> multiple susbcribers 
                        publish msg 1 --> susbcribed by sub1, sub2, sub3, all get msg1

# Service bus

install

    npm install @azure/service-bus

run node alert-servicebus.js

# Stream Analytics

    Input ==> Query [Processing] ==> Output [Many types of output]

    Event Hub => avg current, voltage, energy con => service bus queue

    Input 
        Event Hub
        IOT Hub
        Blob 



    create Stream Analytics Job

    Add input, IotHub

    Add Output, ServiceBus Queue, ensure that policy is created manually, with manage permission

    add query from stream-analytics.sql

    Start the stream analytics job

    node analytics-servicebus.js

    


# Power BI - Visualization / Optionals