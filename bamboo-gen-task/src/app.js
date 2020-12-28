const parsers = require("./parsers");

async function testParserTask(action) {
  return createTask(action,'test-parser',{
    type : parsers.autocomplete(action.params.type),
    'test-results': parsers.text(action.params.testResults)
  });  
}

async function scriptTask(action) {
  return createTask(action,'script',parsers.text(action.params.commands));  
}

async function artifactDownloadTask(action) {
  return createTask(action,'artifact-download',{
    name : action.params.name,
    destination: action.params.destination
  });  
}

async function cleanTask(action) {
  return createTask(action,'clean');  
}


function createTask(action, type, params){
  if(!action.params.environment)
    throw "You must specify environment"
  
  return {
    type : "task",
    data : {
      environment: action.params.environment,
      isFinal: parsers.boolean(action.params.isFinal),
      task_options: {
        type,
        params
      }
    }
  }
}

module.exports = {
  artifactDownloadTask,
  scriptTask,
  testParserTask,
  cleanTask
};