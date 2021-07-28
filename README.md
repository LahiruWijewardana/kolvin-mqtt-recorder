Kolvin MQTT Recorder
==============

Kolvin MQTT Recorder is working as a MQTT client that records every payload receiving to a provided topic. It is using a specialy design folder structure to store the data.

Please follow https://mqtt.org/ if you do not know what is MQTT.

-------------

## Installation
    $ npm install kolvin-mqtt-recorder

## Prerequisite

You need to configure a MQTT broker in a server and generate necessary authentication (Username, password, certificate file etc.) to connect.

**OR**

You need to have necessary authentication to connect to a MQTT broker that already running.

```diff
- IMPORTANT: Your application need to have Read and Write permissions to create, write, read and delete files and folders.
```

## Usage

Kolvin MQTT Recorder is using [MQTT NPM library](https://www.npmjs.com/package/mqtt) to initialize the connection from the provided MQTT broker configurations. Example showing below is how to initialize MQTT connection and start recording.

```js
    import MQTT from 'kolvin-mqtt-recorder';

    const mqttHostAddress = 'mqtt://test.mosquitto.org/';

    const authenticationOptions = {
      port: 1883,
      username: 'username',
      password: 'password'
    };

    const topic = 'kolvinmqttrecorder/mqttTest'

    MQTT.mqttClientInitialize(mqttHostAddress, authenticationOptions, topic);
```

In the example, there are only three options provided inside **authenticationOptions**. There are multiple options you can provide. Please check [MQTT connect API](https://www.npmjs.com/package/mqtt#connect) for more connection options.

## How It's Working

After initializing Kolvin MQTT Recorder, it will subscribe to the *Topic* provided when initializing. According to the above example it will subscribe to below topic.
```
kolvinmqttrecorder/mqttTest/#
```
Recorder will create folder named ***records*** inside the Root directory. All the recorded data are inside this folder.

Let's say someone is publishing data to below topic.
```
kolvinmqttrecorder/mqttTest/recorder
```
Now the recorder will record data to ***history.rec** file in the below path.
```
Project_Root_Directory/records/kolvinmqttrecorder/mqttTest/recorder/history.rec
```
This is example view inside the **history.rec** file. All payloads recorded with the timestamp when it received.

```
2021-07-28T07:40:26.543Z * { message: 'This'}
2021-07-28T07:40:26.543Z * { message: 'is'}
2021-07-28T07:40:26.543Z * { message: 'test'}
```

## License
MIT

