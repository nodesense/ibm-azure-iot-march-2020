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