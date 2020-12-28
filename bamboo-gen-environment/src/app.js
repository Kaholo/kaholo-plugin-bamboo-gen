const parsers = require('./parsers');

async function createEnv(action){
  const docker = action.params.dockerImage ? {image: action.params.dockerImage} : undefined;
  return {
    type : "env",
    data :{
      name : action.params.name,
      envOptions: {
        variables: parsers.environmentVariables(action.params.variables),
        docker: docker
      }
    }
  }
}


module.exports = {
  createEnv
};