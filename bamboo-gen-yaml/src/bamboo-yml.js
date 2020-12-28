const yaml = require("js-yaml");

class BambooYml {
  constructor(results) {
    this.yml = {
      version: 2,
    };

    this.setDeployment(results);
    this.setReleaseNaming(results);
    this.setEnvironments(results);
  }

  setEnvironments(results) {
    const self = this;
    results
      .filter((result) => result.type == "env")
      .forEach((envResult) => {
        if (!self.yml.environments) self.yml.environments = [];

        const env = envResult.data.envOptions;
        let tasks = [];
        let finalTasks = [];

        results
          .filter(
            (result) =>
              result.type == "task" &&
              result.data.environment == envResult.data.name
          )
          .forEach((taskResult) => {
            let task;
            if (!taskResult.data.task_options.params){
              task = taskResult.data.task_options.type;
            } else {
              task = {
                [taskResult.data.task_options.type]: taskResult.data.task_options.params
              }
            }
              
            if (taskResult.data.isFinal) {
              finalTasks.push(task);
            } else {
              tasks.push(task);
            }
          });
        
        if (tasks.length){
          env.tasks = tasks;
        }
        if (finalTasks.length){
          env["final-tasks"] = finalTasks;
        };

        self.yml[envResult.data.name] = env;
        self.yml.environments.push(envResult.data.name);
      });
  }

  setDeployment(results) {
    const self = this;
    const deployments = results.filter((result) => result.type == "deployment");
    
    if (!deployments.length) return;

    if (deployments.length > 1){
      throw "Only one deployment is allowd";
    };

    self.yml.deployment = deployments[0].data;
  }

  setReleaseNaming(results) {
    const self = this;
    const releaseNamings = results.filter((result) => result.type == "releaseNaming");
    
    if (!releaseNamings.length) return;

    if (releaseNamings.length > 1){
      throw "Only one release naming is allowd";
    };

    const releaseNaming = releaseNamings[0].data;
    releaseNaming['auto-increment'] = (releaseNaming['auto-increment']==='true' || releaseNaming['auto-increment']===true);
    releaseNaming['applies-to-branches'] = (releaseNaming['applies-to-branches']==='true' || releaseNaming['applies-to-branches']===true);
    self.yml['release-naming'] = releaseNaming;
  }

  toString() {
    const yamlString = `# This is an autogenerated Bamboo yaml
# By Kaholo :)
#
${yaml.safeDump(this.yml, { indent: 2 })}
`;
    return yamlString;
  }
}

module.exports = BambooYml;
