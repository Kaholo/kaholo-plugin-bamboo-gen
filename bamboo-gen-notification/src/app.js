const parsers = require("./parsers");

async function createNotification(action){
  if(!action.params.environment)
    throw "You must specify environment"
  
  return {
    type : "notification",
    data : {
      environment: action.params.environment,
      notificationOptions: {
        events: [parsers.autocomplete(action.params.event)],
        users: parsers.text(action.params.usersRecipients),
        emails: parsers.text(action.params.emailsRecipients),
        groups: parsers.text(action.params.groupsRecipients)
      }
    }
  }
}

module.exports = {
  createNotification,
};

