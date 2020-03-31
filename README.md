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