const MQTT = require('../lib/index');

describe('Logger Test', async () => {
  it('Should connect', async () => {
    await MQTT.mqttClientInitialize('mqtt://test.mosquitto.org/', { port: 1883 }, 'lahirumqttrecorder');
  });
});
