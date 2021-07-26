const Path = require('path');
const Fs = require('fs');
const LOGGER = require('kolvin-node-logger');

/*
* Creat directories according to the topic structure
*/
const createDirectory = async (pathToBase, pathFromBase, workingPlatform) => {
  const folderNameArray = pathFromBase.split(workingPlatform === 'win32' ? '\\' : '/');

  const folderArrayLength = folderNameArray.length;
  for (let folderCounter = 0; folderCounter < folderArrayLength; folderCounter += 1) {
    pathToBase = `${pathToBase}${workingPlatform === 'win32' ? '\\' : '/'}${folderNameArray[folderCounter]}`;
    try {
      Fs.mkdirSync(pathToBase);
    } catch (directoryCreatError) {
      if (directoryCreatError.code !== 'EEXIST') {
        throw new Error(directoryCreatError.message);
      }
    }
  }
};

/*
* Writing data to files.
*/
const writeToFile = async (topic, message) => {
  try {
    LOGGER.debug(topic);
    const workingPlatform = process.platform;

    const pathToBase = `${Path.resolve("./")}${workingPlatform === 'win32' ? '\\' : '/'}records`;
    const pathFromBase = topic.replace(/ /g, '-');
    const fulldirectoryPath = `${pathToBase}${workingPlatform === 'win32' ? '\\' : '/'}${pathFromBase}`;

    if (!Fs.existsSync(pathToBase)) {
      Fs.mkdirSync(pathToBase);
    }

    if (!Fs.existsSync(fulldirectoryPath)) {
      await createDirectory(pathToBase, pathFromBase);
    }

    const writeContent = `${new Date().toISOString()} * ${message}\n`;

    Fs.writeFile(`${fulldirectoryPath}/history.rec`, writeContent, { flag: 'a+' }, (error) => {
      if (error) {
        LOGGER.error(error);
      }
    });
  } catch (error) {
    LOGGER.error(error);
  }
};

exports.writeToFile = writeToFile;