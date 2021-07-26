const MQTT = require('mqtt');
const LOGGER = require('kolvin-node-logger');
const FileOperations = require('./readWriteOperations');

const mqttClientInitialize = async (host, connectionOptions, baseTopic) => {
  try {
    const mqttClient = MQTT.connect(host, connectionOptions);

    mqttClient.on('connect', () => {
      mqttClient.subscribe(`${baseTopic}/#`, (error) => {
        if (error) {
          LOGGER.error(error);
        } else {
          LOGGER.info('Recorder Client connected');
        }
      });
    });

    mqttClient.on('message', async (topic, message) => {
      FileOperations.writeToFile(topic, message.toString());
    });
  } catch (error) {
    LOGGER.error(error);
  }
};

module.exports = {
  mqttClientInitialize
};