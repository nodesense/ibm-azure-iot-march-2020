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

