const parsers = require("./parsers");

async function createDeployment(action){
  return {
    type : "deployment",
    data :{
      name : action.params.name,
      'source-plan' : action.params.sourcePlan
    }
  }
}

async function createReleaseNaming(action){
  return {
    type : "releaseNaming",
    data :{
      'next-version-name': action.params.nextVersionName,
      'applies-to-branches': parsers.boolean(action.params.appliesToBranches),
      'auto-increment':  parsers.boolean(action.params.autoIncrement),
      'auto-increment-variables' : parsers.text(action.params.autoIncrementVariables)
    }
  }
}


module.exports = {
  createDeployment,
  createReleaseNaming
};